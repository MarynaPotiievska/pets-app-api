const { Pet } = require("../models/pet");
const { ctrlWrapper, HttpError } = require("../helpers");

const addPet = async (req, res) => {
  const { _id: owner } = req.user;

  if (!req.file) {
    throw HttpError(400, "The file must be downloaded");
  }
  const result = await Pet.create({
    ...req.body,
    fileURL: req.file.path,
    owner,
  });

  res.status(201).json(result);
};

const removePet = async (req, res) => {
  const { petId } = req.params;
  const { _id: owner } = req.user;
  const result = await Pet.findOneAndRemove({ _id: petId, owner });
  if (!result) {
    throw HttpError(404, "This is not your pet");
  }
  res.json({
    message: "The card has been deleted",
  });
};

module.exports = {
  addPet: ctrlWrapper(addPet),
  removePet: ctrlWrapper(removePet),
};
