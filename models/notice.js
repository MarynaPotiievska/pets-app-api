const { Schema, model } = require("mongoose");
// const { ValidationChain, body} = require('express-validator')

const noticeSchema = new Schema({
  category: {
    type: String,
    enum: ["sell", "lost-found", "for-free"],
  },

  title: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: 2,
    maxlength: 16,
  },
  date: {
    type: String,
    match: /^\d{2}([.])\d{2}([.])\d{4}$/,
    required: [true, "Date is required"],
  },
  breed: {
    type: String,
    required: [true, "Breed is required"],
    minlength: 2,
    maxlength: 16,
  },
  fileURL: {
    type: String,
    default: null,
  },
  sex: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: function () {
      return this.category === "sell";
    },
    min: [1, "Price must be higher then 0"],
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
});
// owner: {
//     type: Schema.Types.ObjectId,
//     ref: "user",
//   },
// const schema = new ValidationChain([

// body("title").isString().notEmpty(),
// body("name").isString().notEmpty().isLength({min:2, max: 16}),
// body("date").isString().notEmpty().matches(/^\d{2}([.])\d{2}([.])\d{4}$/),
// body("breed").isString().notEmpty().isLength({min:2, max: 16}),
//  body("category").isIn(["sell", "lost-found", "for-free"]).notEmpty(),
// body("sex").isString().notEmpty().isIn(["male", "female"]),
// body('comments').isString().isLength({min:8, max: 120}),
// body("location").isString().notEmpty(),
// body('price').notEmpty().isNumeric().isLength({min:1}).withMessage('Price must be higher then 0'),

// ]);

const Notice = model("notice", noticeSchema);

module.exports = { Notice };
// , schema
