const { Schema, model } = require("mongoose");

const petSchema = new Schema({})

const schemas = {
 
};

const Pet = model("pet", petSchema);

module.exports = { Pet, schemas };