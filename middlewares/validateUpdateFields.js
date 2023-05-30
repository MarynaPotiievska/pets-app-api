const { check, validationResult } = require("express-validator");

const emailPattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
const datePattern = /^\d{2}.\d{2}.\d{4}$/;
const phonePattern = /^[+]380?[-\s]?([5|6|9][0|3|5|6|8|9])?[-.\s]?[0-9]{7}$/;
const namePattern = /^[a-zA-Z ]+$/;

const validateUpdateFields = (req, res, next) => {
  const validationRules = [
    check("email")
      .optional()
      .notEmpty()
      .matches(emailPattern)
      .withMessage("Поле email не може бути порожнім"),
    check("birthday")
      .optional()
      .notEmpty()
      .matches(datePattern)
      .withMessage("Поле дати народження не може бути порожнім"),
    check("name").optional().isString().matches(namePattern),
    //.withMessage("Поле name не може бути порожнім"),
    check("phone").optional().isString().matches(phonePattern),
    //.withMessage("Поле phone не може бути порожнім"),
    check("city").optional().isString().matches(namePattern),
    ///.withMessage("Поле city не може бути порожнім"),
  ];

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validateUpdateFields;
