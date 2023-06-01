const { HttpError } = require("../helpers");
const { validationResult } = require("express-validator");

const validateBody = (validations) => {
  return async (req, res, next) => {
    try {
      await Promise.all(validations.map((validation) => validation.run(req)));

      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }

      const errorFields = [];
      const errorMessages = [];

      errors.array().forEach((error) => {
        if (!errorFields.includes(error.path)) {
          errorFields.push(error.path);
          errorMessages.push(`${error.msg} in field ${error.path}`);
        }
      });

      next(HttpError(400, errorMessages.join(", ")));

    } catch (error) {
      next(error);
    }
  };
    }


module.exports = validateBody;
