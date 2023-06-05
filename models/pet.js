const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const { body } = require("express-validator");
const { validateData } = require("../middlewares");
const {
  breedPattern,
  datePattern,
  namePattern,
} = require("../constants/RegExp");

const petSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 16,
      validate: {
        validator: validateData.validateName,
        message: "Name is invalid",
      },
      required: [true, "Name is required"],
    },

    date: {
      type: String,
      validate: {
        validator: validateData.validateDate,
        message: "Date of birth is invalid",
      },
      required: [true, "Date of birth is required"],
    },

    breed: {
      type: String,
      minLength: 2,
      maxLength: 16,
      validate: {
        validator: validateData.validateBreed,
        message: "Breed is invalid",
      },
      required: [true, "Breed is required"],
    },
    comments: {
      type: String,
      minLength: 8,
      maxLength: 120,
    },
    fileURL: {
      type: String,
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
    .matches(namePattern),
  body("date")
    .isString()
    .notEmpty()
    .matches(datePattern)
    .withMessage("Date is required and must be in the format DD.MM.YYYY"),

  body("breed")
    .isString()
    .notEmpty()
    .isLength({ min: 2, max: 16 })
    .matches(breedPattern),
  body("comments").isString().isLength({ min: 8, max: 120 }),
];

const Pet = model("pet", petSchema);

module.exports = { Pet, schemas };
