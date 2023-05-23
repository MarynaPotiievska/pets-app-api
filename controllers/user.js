const { Pet } = require("../models/pet");
const { ctrlWrapper } = require("../helpers");

const getUserInfo = async (req, res) => {
  const user = req.user;
  const pets = await Pet.find({ owner: user._id });
  res.json({ user, pets });
};

module.exports = {
  getUserInfo: ctrlWrapper(getUserInfo),
};
