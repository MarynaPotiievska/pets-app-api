const { ctrlWrapper } = require("../helpers");
const { Notice } = require("../models/notice");

const HttpError = require("../helpers/HttpError");

const getNoticesByCategory = async (req, res) => {
  const { category } = req.params;
  const { title = null } = req.query;

  const query = {
    category,
    title,
  };
  const isInQuery = (query) => {
    return Object.entries(query).reduce((acc, [key, value]) => {
      if (Boolean(value) === true) {
        const mapping = { [key]: value };
        return Object.assign(acc, mapping);
      }
      return acc;
    }, {});
  };

  const noticesList = await Notice.find(isInQuery(query)); //, "-owner",
  res.json(noticesList);
};

const getNoticeById = async (req, res) => {
  const { noticeId } = req.params;
  const result = await Notice.findById(noticeId);

  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
  
};

const addToFavorite = async (req, res) => {
  const { _id: owner } = req.user;

  const { noticeId } = req.params;
  const notice = await Notice.findById(noticeId);

  const result = await Notice.findOneAndUpdate(
    { _id: noticeId },
    { favorite: [...notice.favorite, owner] },
    {
      new: true,
    }
  );
  res.json(result);
};

const getFavorite = async (req, res) => {
  const { _id: owner } = req.user;
  const noticesList = await Notice.find();
  const result = noticesList.filter((notice) =>
    notice.favorite.includes(owner)
  );

  res.json(result);
};

const removeFromFavorite = async (req, res) => {
  const { _id: owner } = req.user;
  const { noticeId } = req.params;
  const notice = await Notice.findById(noticeId);
  notice.favorite = notice.favorite.filter((fav) => fav !== owner);
  await notice.save();

  res.status(204);
};

const addNotice = async (req, res) => {
  const { _id: owner } = req.user;

  const noticeData = req.body;

  if (!req.file) {
    throw HttpError(400, "The file must be downloaded");
  }
  const data = { ...noticeData, owner, fileURL: req.file.path };

  const result = await Notice.create(data);

  res.status(201).json(result);
};

const getNoticesByUser = async (req, res) => {
  const { _id: owner } = req.user;
  const noticesList = await Notice.find();
  const result = noticesList.filter((notice) => notice.owner === owner);

  res.json(result);
};

const removeNotice = async (req, res) => {
  const { noticeId } = req.params;
  const result = await Notice.findByIdAndRemove(noticeId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "Notice deleted",
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
