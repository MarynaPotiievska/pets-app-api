const { Schema, model } = require("mongoose");
const { body, check } = require("express-validator");
const { handleMongooseError } = require("../helpers");
const validateData = require("../middlewares/validateData");
const {
  namePattern,
  datePattern,
  phonePattern,
  emailPattern,
  passwordPattern,
  locationPattern,
} = require("../constants/RegExp");

const userSchema = new Schema(
  {
    name: {
      type: String,
      validate: {
        validator: validateData.validateName,
        message: "Name is invalid",
      },
    },
    email: {
      type: String,
      validate: {
        validator: validateData.validateEmail,
        message: "Email is invalid",
      },
      required: [true, "Email is required"],
      unique: true,
    },
    birthday: {
      type: String,
      validate: {
        validator: validateData.validateDate,
        message: "Date of birth is invalid",
      },
      default: "",
    },
    phone: {
      type: String,
      validate: {
        validator: validateData.validatePhone,
        message: "The phone number is invalid",
      },
      default: "",
    },
    city: {
      type: String,
      validate: {
        validator: validateData.validateLocatione,
        message: 'Location should be in the format of "City".',
      },
      default: "",
    },
    password: {
      type: String,
      validate: {
        validator: validateData.validatePassword,
        message: "Password is invalid",
      },
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
  check("city").optional().isString().matches(locationPattern),
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
