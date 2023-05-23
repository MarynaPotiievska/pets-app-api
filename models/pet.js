const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const { body } = require("express-validator");

const NAME_REGEX = /^[a-zA-Z ]+$/;
const DATE_REGEX = /^\d{2}.\d{2}.\d{4}$/;
const BREED_REGEX = /^[a-zA-Z ]+$/;

const petSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 16,
      match: NAME_REGEX,
      required: [true, "Name is required"],
    },

    birthday: {
      type: String,
      match: DATE_REGEX,
      required: [true, "Date of birth is required"],
    },

    breed: {
      type: String,
      minLength: 2,
      maxLength: 16,
      match: BREED_REGEX,
      required: [true, "Breed is required"],
    },
    comments: {
      type: String,
      minLength: 8,
      maxLength: 120,
    },
    photoURL: {
      type: String,
      required: [true, "Photo pet is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
  }
);

petSchema.post("save", handleMongooseError);

const schemas = [
  body("name")
    .isString()
    .notEmpty()
    .isLength({ min: 2, max: 16 })
    .matches(NAME_REGEX),
  body("birthday").isString().notEmpty().matches(DATE_REGEX),
  body("breed")
    .isString()
    .notEmpty()
    .isLength({ min: 2, max: 16 })
    .matches(BREED_REGEX),
];

const Pet = model("pet", petSchema);

module.exports = { Pet, schemas };
