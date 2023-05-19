const { ctrlWrapper } = require("../helpers");

const addPet = async (req, res) => {};

const removePet = async (req, res) => {};

module.exports = {
  addPet: ctrlWrapper(addPet),
  removePet: ctrlWrapper(removePet),  
};