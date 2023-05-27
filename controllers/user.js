const { Pet } = require("../models/pet");
const { ctrlWrapper } = require("../helpers");

const getUserInfo = async (req, res) => {
  const { _id, name, email, birthday, phone, city, avatarURL, isNewUser } =
    req.user;
  const pets = await Pet.find({ owner: _id }, "-owner");
  res.json({
    user: { _id, name, email, birthday, phone, city, avatarURL, isNewUser },
    pets,
  });
};

module.exports = {
  getUserInfo: ctrlWrapper(getUserInfo),
};
