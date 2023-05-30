const express = require("express");

const ctrl = require("../../controllers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.registerSchema), ctrl.login);

router.patch(
  "/:userId",
  authenticate,
  upload.single("avatar"),
  validateBody(schemas.updateSchema),
  ctrl.updateUser
);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
