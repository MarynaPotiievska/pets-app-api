const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const { body } = require("express-validator");

const newsSchema = new Schema(
  {
    imgUrl: {
      type: String,
    },
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    date: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

newsSchema.post("save", handleMongooseError);

const schemas = [
  body("title").isString(),
  body("text").isString(),
  body("date").isString(),
  body("url").isString(),
];

const News = model("news", newsSchema);

module.exports = { News, schemas };
