const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const { body } = require("express-validator");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const dateRegexp = /^\d{2}.\d{2}.\d{4}$/;
const phoneRegexp = /^[+]380?[-\s]?([5|6|9][0|3|5|6|8|9])?[-.\s]?[0-9]{7}$/;
const nameRegexp = /^[a-zA-Z ]+$/;
const passwordRegexp = /^[a-zA-Z0-9]+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      match: nameRegexp,
      default: "",
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    birthday: {
      type: String,
      match: dateRegexp,
      default: "",
    },
    phone: {
      type: String,
      match: phoneRegexp,
      default: "",
    },
    city: {
      type: String,
      match: nameRegexp,
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
      type: String,
      default: true,
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const registerSchema = [
  body("email").isString().notEmpty().matches(emailRegexp),
  body("password")
    .isString()
    .notEmpty()
    .isLength({ min: 6, max: 16 })
    .matches(passwordRegexp),
];

const updateSchema = [
  body("email").isString().notEmpty().matches(emailRegexp),
  body("name").isString().matches(nameRegexp),
  body("birthday").isString().notEmpty().matches(dateRegexp),
  body("phone").isString().matches(phoneRegexp),
  body("city").isString().matches(nameRegexp),
];

const schemas = { registerSchema, updateSchema };

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
