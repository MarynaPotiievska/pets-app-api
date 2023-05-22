const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody, authenticate } = require("../../middlewares");
//const { schema } = require("../../models/user");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/register",
  validateBody([
    body("email").isString().notEmpty().emailRegexp,
    body("password").isString().notEmpty().isLength({ min: 6 }),
  ]),
  ctrl.register
);

router.post(
  "/login",
  validateBody([
    body("email").isString().notEmpty().emailRegexp,
    body("password").isString().notEmpty().isLength({ min: 6 }),
  ]),
  ctrl.login
);

router.put("/:userId", ctrl.updateUser);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
