const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    personId: Number,
  },
  { collection: "users" }
);

const User = mongoose.model("users", userModel); 
module.exports = User;
