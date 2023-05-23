const express = require("express");

const { authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/user");

const router = express.Router();

router.get("/", authenticate, ctrl.getUserInfo); // для отримання інформації про юзера та його тварин на сторінці користувача

module.exports = router;
