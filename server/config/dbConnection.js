const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env.local" });

const mongoUri = process.env.MONGO_URI;

const dbConnection = async () => {
  try {
      await mongoose.connect(mongoUri);
      console.log("Database connected!");
  } catch (e) {
    console.log(e);
  }
};
module.exports = dbConnection;
