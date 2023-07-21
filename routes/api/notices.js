const express = require("express");
const ctrl = require("../../controllers/notices");
const {
  validateBody,
  upload,
  isValidId,
  authenticate,
} = require("../../middlewares");
const { schema } = require("../../models/notice");

const router = express.Router();

router.get("/category/:category", ctrl.getNoticesByCategory);

router.get("/favorite", authenticate, ctrl.getFavorite);

router.get("/:noticeId", isValidId, ctrl.getNoticeById);

router.get("/user/:userId", authenticate, ctrl.getNoticesByUser);

router.patch(
  "/favorite/:noticeId",
  authenticate,
  isValidId,
  ctrl.addToFavorite
);

router.delete(
  "/favorite/:noticeId",
  authenticate,
  isValidId,
  ctrl.removeFromFavorite
);

router.post(
  "/",
  authenticate,
  upload.single("file"),
  validateBody(schema),
  ctrl.addNotice
);

router.delete("/:noticeId", authenticate, isValidId, ctrl.removeNotice);

module.exports = router;
