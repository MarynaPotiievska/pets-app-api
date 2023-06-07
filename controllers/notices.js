const { ctrlWrapper } = require("../helpers");
const { Notice } = require("../models/notice");
const HttpError = require("../helpers/HttpError");

const getNoticesByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 6, keyword = null } = req.query;
  const skip = (page - 1) * limit;

  const query = {
    category,
    ...(keyword ? { title: { $regex: keyword, $options: "i" } } : {}),
  };
  const notices = await Notice.find(query).skip(skip).limit(limit).exec();
  if (!notices ?? notices.length === 0) {
    throw new Error(HttpError(400, "There is no notices by this request"));
  }
  res.json(notices);
};

const getNoticeById = async (req, res) => {
  const { noticeId: _id } = req.params;
  const result = await Notice.findById(_id).populate("owner", "phone").exec();
  if (!result) {
    throw new Error(HttpError(404));
  }
  res.json(result);
};

const addToFavorite = async (req, res) => {
  const { _id: owner } = req.user;
  const { noticeId } = req.params;
  await Notice.findOneAndUpdate(
    { _id: noticeId },
    { $push: { favorite: owner } },
    {
      new: true,
    }
  );
  res.json({
    message: "Notice was successfully added to favorite",
  });
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
  const notice = await Notice.findById({ _id: noticeId, owner });
  if (!notice) {
    throw HttpError(404, "Notice not found in favorites");
  }
  const index = notice.favorite.indexOf(req.user._id);
  if (index !== -1) {
    notice.favorite.splice(index, 1);
  }
  await notice.save();
  res.sendStatus(204);
};

const addNotice = async (req, res) => {
  const { _id: owner } = req.user;
  if (!req.file) {
    throw HttpError(400, "The file must be downloaded");
  }
  const data = { ...req.body, fileURL: req.file.path, owner };
  const result = await Notice.create(data);
  res.status(201).json(result);
};

const getNoticesByUser = async (req, res) => {
  const { _id: owner } = req.user;
  const noticesList = await Notice.find({ owner });
  const result = noticesList.filter((notice) => notice.owner.equals(owner));
  res.json(result);
};

const removeNotice = async (req, res) => {
  const { _id: owner } = req.user;
  const { noticeId } = req.params;
  const result = await Notice.findOneAndRemove({ _id: noticeId, owner });
  if (!result) {
    throw HttpError(404, "Notice not found");
  }
  res.json({
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
