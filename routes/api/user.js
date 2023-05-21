const express = require("express");

const ctrl = require("../../controllers/user");

const router = express.Router();

router.post("/", ctrl.getUserInfo); // для отримання інформації про юзера та його тварин на сторінці користувача

module.exports = router;
