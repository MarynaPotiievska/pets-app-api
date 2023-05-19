const { ctrlWrapper } = require("../helpers");

const getNoticesByCategory = async (req, res) => {};

const getNoticeById = async (req, res) => {};

const addToFavorite = async (req, res) => {};

const getFavorite = async (req, res) => {};

const removeFromFavorite = async (req, res) => {};

const addNotice = async (req, res) => {};

const getNoticesByUser = async (req, res) => {};

const removeNotice = async (req, res) => {};

module.exports = {
  getNoticesByCategory: ctrlWrapper(getNoticesByCategory),
  getNoticeById: ctrlWrapper(getNoticeById),
  addToFavorite: ctrlWrapper(addToFavorite),
  getFavorite: ctrlWrapper(getFavorite),
  removeFromFavorite: ctrlWrapper(removeFromFavorite),
  addNotice: ctrlWrapper(addNotice),
  getNoticesByUser: ctrlWrapper(getNoticesByUser),
  removeNotice: ctrlWrapper(removeNotice),
};
