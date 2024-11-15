const User = require("../models/userModel");
const otpModel = require("../models/otpModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "An account already exists with this email" });
    }


    const otp = Math.floor(100000 + Math.random() * 900000);


    const otpDetails = {
      email,
      otp: await bcrypt.hash(otp.toString(), 10),
      createdAt: new Date(),
      expiresAt: new Date(new Date().getTime() + 3600 * 1000),
    };

    const createdOTP = new otpModel(otpDetails);
    await createdOTP.save();


    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Email Verification",
      html: `<p>Your OTP is: <strong>${otp}</strong>. It is valid for 60 minutes.</p>`,
    };


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending OTP email:", error);
        return res.status(500).json({ message: "Failed to send OTP email" });
      } else {
        console.log("OTP sent:", info.response);
        return res.status(200).json({ message: "OTP sent successfully" });
      }
    });
  } catch (e) {
    console.log("Error during OTP sending:", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otpInput } = req.body;

  try {

    const otpRecord = await otpModel.findOne({ email }).sort({ createdAt: -1 });
    if (!otpRecord) {
      return res.status(404).json({ message: "No OTP found for this email" });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }


    const isMatch = await bcrypt.compare(otpInput, otpRecord.otp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }


    res.status(200).json({ status: "success", message: "OTP verified successfully" });
  } catch (e) {
    console.log("Error during OTP verification:", e);
    res.status(500).json({ message: "Internal server error" });
  }
};
