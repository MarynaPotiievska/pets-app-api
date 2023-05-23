const express = require("express");
const ctrl = require("../../controllers/notices");
const {
  validateBody,
  upload,
  isValidId,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/notice");

const router = express.Router();

router.get("/category/:category", ctrl.getNoticesByCategory); // для вибірки по категорії + по заголовку

router.get("/favorite", authenticate, ctrl.getFavorite); // для вибірки усіх обраних оголошення авторизованого користувача

router.get("/:noticeId", isValidId, ctrl.getNoticeById); // для знаходження по id

router.get("/user/:userId", authenticate, ctrl.getNoticesByUser); // для отримання оголошень, створених авторизованим користувачем

router.patch("/:noticeId", authenticate, isValidId, ctrl.addToFavorite); // для додавання в обрані

router.delete(
  "/favorite/:noticeId",
  authenticate,
  isValidId,
  ctrl.removeFromFavorite
); // для видалення оголошення з обраних

router.post(
  "/",
  authenticate,
  upload.single("file"),
  validateBody(schemas),
  ctrl.addNotice
); // для створення оголошення

router.delete("/:noticeId", authenticate, isValidId, ctrl.removeNotice); // для видалення оголошення, створеного авторизованим користувачем

module.exports = router;
