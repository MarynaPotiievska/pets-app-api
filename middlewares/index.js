const validateBody = require("./validateBody");
const authenticate = require("./authenticate");
const upload = require("./upload");
const isValidId = require("./isValidId");
//const validateUpdateFields = require("./validateUpdateFields");

module.exports = {
  validateBody,
  authenticate,
  upload,
  isValidId,
  //validateUpdateFields,
};
