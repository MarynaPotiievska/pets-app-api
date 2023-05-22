const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
//const { ValidationChain, body } = require("express-validator");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const dateRegexp = /^\d{2}.\d{2}.\d{4}$/;
const phoneRegexp = /^[+]380?[-\s]?([5|6|9][0|3|5|6|8|9])?[-.\s]?[0-9]{7}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
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
    },
    phone: {
      type: String,
      match: phoneRegexp,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
    },
    isNewUser: {
      type: String,
      default: true,
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

// const schema = new ValidationChain([
//   body("email").isString().notEmpty().emailRegexp,
//   body("password").isString().notEmpty().isLength({ min: 6 }),
// ]);

const schema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  schema,
};
