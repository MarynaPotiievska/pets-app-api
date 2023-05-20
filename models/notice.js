const { Schema, model } = require("mongoose");

const noticeSchema = new Schema({
  category: {
    type: String,
    enum: ["sell", "lost-found", "for-free"],
   
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
    type: Boolean,
    default: false, // якщо не передали це поле
  },
});
// owner: {
//     type: Schema.Types.ObjectId,
//     ref: "user",
//   },
const schemas = {};

const Notice = model("notice", noticeSchema);

module.exports = { Notice, schemas };
