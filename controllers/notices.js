const { ctrlWrapper } = require("../helpers");
const {Notice} = require("../models/notice");
const HttpError = require('../helpers/HttpError')



const getNoticesByCategory = async (req, res) => {
  const result = await Notice.find();
  res.status(200).json(result);
};

const getNoticeById = async (req, res) => {
  const { noticeId} = req.params;
  const result = await Notice.findById(noticeId);
  if (!result) {
    throw HttpError (404, "Not found");
  }
  res.status(200).json(result);
};

const addToFavorite = async (req, res) => {};

const getFavorite = async (req, res) => {};

const removeFromFavorite = async (req, res) => {};

const addNotice = async (req, res) => {
// const {_id: owner } = req.user;
const {category} = req.params;
const noticeDate = req.body;

if(!req.file) {
  throw HttpError (400, "The file must be downloaded")
}
const data = req.file
? {...noticeDate, category, fileURL: req.file.path}
: {...noticeDate, category}

const result = await Notice.create(data);




 
  res.status(201).json(result);
};

const getNoticesByUser = async (req, res) => {};

const removeNotice = async (req, res) => {
  const { noticeId } = req.params;
  const result = await Notice.findByIdAndRemove(noticeId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

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
