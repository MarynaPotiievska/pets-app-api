const { News } = require("../models/news");
const { ctrlWrapper, HttpError } = require("../helpers");

const getNews = async (req, res) => {
  const { title = "", page = 1, limit = 6 } = req.query;

  const skip = (page - 1) * limit;

  const regex = new RegExp(title, "i");
  const result = await News.find({ title: regex }, "", { skip, limit });

  if (result.length === 0) {
    throw HttpError(404, "Тhere is no result for this request");
  }
  res.json(result);
};

module.exports = {
  getNews: ctrlWrapper(getNews),
};
