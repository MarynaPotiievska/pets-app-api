const { Schema, model } = require("mongoose");
const { body } = require("express-validator");
const { validateData } = require("../middlewares");
const {
  namePattern,
  datePattern,
  breedPattern,
  locationPattern,
} = require("../constants/RegExp");

const noticeSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["sell", "lost-found", "for-free"],
      required: [true, "Choose category"],
    },
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      validate: {
        validator: validateData.validateName,
        message: "Name is invalid",
      },
      required: [true, "Name is required"],
      minlength: 2,
      maxlength: 16,
    },
    date: {
      type: String,
      validate: {
        validator: validateData.validateDate,
        message: "Date of birth is invalid",
      },
      required: [true, "Date is required"],
    },
    breed: {
      type: String,
      validate: {
        validator: validateData.validateBreed,
        message: "Breed is invalid",
      },
      required: [true, "Breed is required"],
      minlength: 2,
      maxlength: 16,
    },
    fileURL: {
      type: String,
      required: true,
      default: null,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    location: {
      type: String,
      validate: {
        validator: validateData.validateLocatione,
        message: 'Location should be in the format of "City".',
      },
      required: true,
    },
    price: {
      type: Number,
      min: [1, "Price must be higher than 0"],
      validate: {
        validator: function (value) {
          return (
            this.category !== "lost-found" &&
            this.category !== "for-free" &&
            value !== null
          );
        },
        message: "Price is not allowed for this category",
      },
    },
    comments: {
      type: String,
      minlength: 8,
      maxlength: 120,
    },
    favorite: {
      type: Array,
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { versionKey: false }
);

const schema = [
  body("title").isString().notEmpty(),
  body("name")
    .isString()
    .notEmpty()
    .matches(namePattern)
    .isLength({ min: 2, max: 16 }),
  body("date").isString().notEmpty().matches(datePattern),
  body("breed")
    .isString()
    .notEmpty()
    .matches(breedPattern)
    .isLength({ min: 2, max: 16 }),
  body("category").isIn(["sell", "lost-found", "for-free"]).notEmpty(),
  body("sex").isString().notEmpty().isIn(["male", "female"]),
  body("comments").isString().isLength({ min: 8, max: 120 }),
  body("location")
    .isString()
    .notEmpty()
    .matches(locationPattern)
    .withMessage('Location should be in the format of "City".'),
  body("price")
    .if(body("category").exists().equals("sell"))
    .notEmpty()
    .isNumeric()
    .isFloat({ min: 0, gt: 0  })
    .isLength({ min: 1 })
    .withMessage("Price must be higher then 0"),
];

const Notice = model("notice", noticeSchema);

module.exports = { Notice, schema };