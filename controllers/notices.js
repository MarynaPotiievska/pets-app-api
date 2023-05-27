const { ctrlWrapper } = require("../helpers");
const { Notice } = require("../models/notice");

const HttpError = require("../helpers/HttpError");

const getNoticesByCategory = async (req, res) => {
  const { category } = req.params;
  const { title = null } = req.query; // page = 1, limit = 20,
  // const skip = (page - 1) * limit;

  // const query = {
  //   category,
  //   title,
  // };
  let query = {};

  category && title
    ? (query = { category, title })
    : title
    ? (query.title = title)
    : !!category && (query.category = category);

  res.json(await Notice.find(query));
  // .skip(skip)
  // .limit(limit);

  // const isInQuery = (query) => {
  //   return Object.entries(query).reduce((acc, [key, value]) => {
  //     if (Boolean(value) === true) {
  //       const mapping = { [key]: value };
  //       return Object.assign(acc, mapping);
  //     }
  //     return acc;
  //   }, {});
  // };

  // const noticesList = await Notice.find(isInQuery(query)); //, "-owner",
  // res.json(noticesList);
};

const getNoticeById = async (req, res) => {
  // const { _id: owner } = req.user;
  const { noticeId: _id } = req.params;
  const result = await Notice.findById(_id).populate("owner", "phone").exec();

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const addToFavorite = async (req, res) => {
  const { _id: owner } = req.user;
  const { noticeId } = req.params;

  await Notice.findOneAndUpdate(
    { _id: noticeId },
    { $push: { favorite: owner } },

    owner,
    {
      new: true,
    }
  );
  res.json({
    message: "Notice was successfully added to favorite"
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

  const index = notice.favorite.indexOf(req.user._id); // Знаходимо індекс елемента в масиві
  if (index !== -1) {
    notice.favorite.splice(index, 1); // Видаляємо елемент з масиву
  }

  await notice.save();

  res.status(204);
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
  const noticesList = await Notice.find({ owner: owner._id });
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
