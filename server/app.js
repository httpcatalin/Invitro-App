require("dotenv").config({ path: "../.env.local" });

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const mongoUrl = process.env.MONGO_URI;


mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

require("./models/userModel");
const User = mongoose.model("users");

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email: email.toLowerCase() });
  if (oldUser) return res.send({ data: "User already exists" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    res.send({ status: "ok", data: "User created! " });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email: ", email);

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log("User not found.");
      return res.status(404).send({ status: "error", data: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid: ", isPasswordValid);
    if (!isPasswordValid) {
      console.log("Invalid password.");
      return res
        .status(401)
        .send({ status: "error", data: "Invalid password" });
    }

    res.send({ status: "ok", data: "Login successful" });
  } catch (error) {
    console.error("Login error: ", error.message);
    res.send({ status: "error", data: error.message });
  }
});

app.get("/doctors", async (req, res) => {
  try {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false
    });

    const doctors = await axios.get("https://demo.docdream.com:8001/api/employees?includeNonActive=false", {httpsAgent})
    res.send(doctors.data);
  } catch (e) {
    res.send({message: e.message});
  }
});

app.listen(5001, () => {
  console.log("Server started!");
});
