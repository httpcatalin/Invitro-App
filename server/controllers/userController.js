const bcrypt = require('bcrypt');
const User = require('../models/userModel');


exports.registerUser = async (req, res) => {
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

