const { Schema, model } = require("mongoose");

const userSchema = new Schema({})

const schemas = {
 
};

const User = model("user", userSchema);

module.exports = { User, schemas };