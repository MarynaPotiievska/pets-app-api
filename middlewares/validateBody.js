const { HttpError } = require("../helpers");
const { validationResult } = require("express-validator");

const validateBody = (validations) => {
  return async (req, res, next) => {
    try {
      for (const validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) break;
      }
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      const errorMessages = errors.errors.map(
        (error) => `${error.msg} in ${error.param}`
      );
      next(new HttpError(400, errorMessages));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validateBody;
