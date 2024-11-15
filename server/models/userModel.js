const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    personId: Number,
    googleId: { type: String, default: "-1" },
    picture : { type: String, default: "" }
  },
  { collection: "users" }
);

const User = mongoose.model("users", userModel);
module.exports = User;
