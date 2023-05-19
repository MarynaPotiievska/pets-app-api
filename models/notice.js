const { Schema, model } = require("mongoose");

const noticeSchema = new Schema({})

const schemas = {
 
};

const Notice = model("notice", noticeSchema);

module.exports = { Notice, schemas };