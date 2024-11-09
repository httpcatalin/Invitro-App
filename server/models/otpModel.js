const mongoose = require("mongoose");

const otpModel = new mongoose.Schema({
    otp: String,
    email: String,
    createdAt: Date,
    expiresAt: Date,
},{ collection: "userOTPVerification" }
);

const otp = mongoose.model("userOTPVerification", otpModel);
module.exports = otp;