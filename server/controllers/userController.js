const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const https = require('https');
const axios = require('axios');

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, personId } = req.body;

  const oldUser = await User.findOne({ email: email.toLowerCase() });
  if (oldUser) return res.status(409).json({ data: "User already exists" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      personId: personId
    });

    res.status(201).json({ status: "ok", data: "User created!" });

  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

exports.registerUser_API = async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    const personData = { firstName, lastName };
    console.log(`${process.env.API_URL}/api/persons`);
    
    const response = await axios.post(
      `${process.env.API_URL}/api/persons`,
      personData,
      { httpsAgent }
    );

    res.status(201).json({ id: response.data.id });

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.registerUserGoogle = async (req, res) => {
  const { firstName, lastName, email, personId, googleId, picture } = req.body;

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {

      return res.send({
        status: "ok",
        data: "User already exists -> logged in",
        user: existingUser,
      });
    }

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email.toLowerCase(),
      personId: personId,
      googleId: googleId,
      picture: picture,
    });
    res.send({
      status: "ok",
      data: "User created!",
      user: newUser,
    });
  } catch (error) {
    res.send({
      status: "error",
      data: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email: ", email);

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user)
      return res.status(404).send({ status: "error", data: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid: ", isPasswordValid);

    if (!isPasswordValid)
      return res
        .status(401)
        .send({ status: "error", data: "Invalid password" });

    res.send({ status: "ok", data: "Login successful" });
  } catch (error) {
    console.error("Login error: ", error.message);
    res.send({ status: "error", data: error.message });
  }
};

exports.checkEmail = async (req, res) => {
  const { email } = req.body; 
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(200).send({ status: "ok", message: "User not found" });
    }
    return res.status(200).send({ status: "error", message: "User already exists" });
  } catch (err) {
    console.error("Error checking email: ", err.message);
    res.status(500).send({ status: "error", message: err.message });
  }
};
