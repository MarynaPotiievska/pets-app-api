const { isValidObjectId } = require("mongoose");

const HttpError = require("../helpers/HttpError");

const isValidId = (req, res, next) => {

    const { noticeId, petId } = req.params;
    
    const id = noticeId || petId;
    if (!isValidObjectId(id)) return next(HttpError(404, `${id} is not correct id format`));
  
    next();
  };

module.exports = isValidId;
