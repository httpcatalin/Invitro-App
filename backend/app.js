const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const mongoUrl =
  "mongodb+srv://admin:admin@server.cvnicxe.mongodb.net/GIGAHACK?retryWrites=true&w=majority&appName=Server";

app.use(bodyParser.json());
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

const HOST_IP = "195.22.251.44";
const PORT = 5001;

app.listen(PORT, HOST_IP, () => {
  console.log(`Server started on http://${HOST_IP}:${PORT}`);
});
