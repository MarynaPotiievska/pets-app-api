const express = require("express");

const ctrl = require("../../controllers/news");

const router = express.Router();

router.get("/", ctrl.getNews);

module.exports = router;
