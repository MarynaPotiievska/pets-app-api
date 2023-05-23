const express = require("express");
const { schemas } = require("../../models/pet");
const {
  validateBody,
  upload,
  authenticate,
  isValidId,
} = require("../../middlewares");

const ctrl = require("../../controllers/pets");

const router = express.Router();

router.post(
  "/",
  authenticate,
  upload.single("file"),
  validateBody(schemas),
  ctrl.addPet
);

router.delete("/:petId", authenticate, isValidId, ctrl.removePet);

module.exports = router;
