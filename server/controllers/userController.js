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
      `${process.env.INVITROAPI}/api/persons`,
      personData,
      { httpsAgent }
    );

    res.status(201).json({ id: response.data.id });

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email:", email);

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) 
      return res.status(404).json({ status: "error", data: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) 
      return res.status(401).json({ status: "error", data: "Invalid password" });

    res.status(200).json({ status: "ok", data: "Login successful" });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ status: "error", data: error.message });
  }
};
