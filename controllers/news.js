// const { News } = require("../models/news");
const { ctrlWrapper } = require("../helpers");

const getNews = async (req, res) => {};

const getNewsByTitle = async (req, res) => {};

module.exports = {
  getNews: ctrlWrapper(getNews),
  getNewsByTitle: ctrlWrapper(getNewsByTitle),
};
