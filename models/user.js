const { Schema, model } = require("mongoose");
const { body, check } = require("express-validator");

const { handleMongooseError } = require("../helpers");

const emailPattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
const datePattern = /^\d{2}.\d{2}.\d{4}$/;
const phonePattern = /^[+]380?[-\s]?([5|6|9][0|3|5|6|8|9])?[-.\s]?[0-9]{7}$/;
const namePattern = /^[a-zA-Z ]+$/;
const passwordPattern = /^[a-zA-Z0-9]+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      match: namePattern,
    },
    email: {
      type: String,
      match: emailPattern,
      required: [true, "Email is required"],
      unique: true,
    },
    birthday: {
      type: String,
      match: datePattern,
      default: "",
    },
    phone: {
      type: String,
      match: phonePattern,
      default: "",
    },
    city: {
      type: String,
      match: namePattern,
      default: "",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      default: "",
    },
    isNewUser: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const registerSchema = [
  body("email")
    .isString()
    .notEmpty()
    .matches(emailPattern)
    .withMessage("Email is required and must be a valid email address"),
  body("password")
    .isString()
    .notEmpty()
    .isLength({ min: 6, max: 16 })
    .matches(passwordPattern)
    .withMessage(
      "Password is required and must be 6-16 characters long, containing only letters and numbers"
    ),
  ,
];

const updateSchema = [
  check("email")
    .optional()
    .isString()
    .notEmpty()
    .matches(emailPattern)
    .withMessage("The email field cannot be empty"),
  check("name").optional().isString().matches(namePattern),
  check("birthday")
    .optional()
    .isString()
    .notEmpty()
    .matches(datePattern)
    .withMessage("The date of birth field cannot be empty"),
  check("phone").optional().isString().matches(phonePattern),
  check("city").optional().isString().matches(namePattern),
];

const schemas = {
  registerSchema,
  updateSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
