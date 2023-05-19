const { ctrlWrapper } = require("../helpers");

const getUserInfo = async (req, res) => {};

module.exports = {
  getUserInfo: ctrlWrapper(getUserInfo),    
};