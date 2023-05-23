const express = require("express");
const { schemas } = require("../../models/pet");
const { validateBody, upload } = require("../../middlewares");

const ctrl = require("../../controllers/pets");

const router = express.Router();

router.post("/", upload.single("file"), validateBody(schemas), ctrl.addPet);

router.delete("/:petId", ctrl.removePet);

module.exports = router;
