const mongoose = require("mongoose");

require("dotenv").config();

const app = require("./app");

const { DB_URI, PORT } = process.env;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
