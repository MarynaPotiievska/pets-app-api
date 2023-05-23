const { isValidObjectId } = require("mongoose");

const HttpError = require("../helpers/HttpError");

const isValidId = (req, res, next) => {
  const { noticeId } = req.params;
  const { petId } = req.params;
  const id = noticeId || petId;
  if (!isValidObjectId(id)) return next(HttpError(404));

  next();
};

module.exports = isValidId;
