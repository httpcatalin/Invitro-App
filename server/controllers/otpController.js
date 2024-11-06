const User = require('../models/userModel');
const otpModel = require('../models/otpModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

exports.sendOTP = async (email) => {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error("There is an account with this email");

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
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASS,
            },
        });

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Email Verification',
            text: `Verify your email with the code below: \n\n${otp}\n\nThis code expires in 1 hour.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending OTP email:', error);
            } else {
                console.log('OTP sent:', info.response);
            }
        });

    } catch (e) {
        console.log('Error during OTP sending:', e);
    }
};

exports.verifyOTP = async (email, otpInput) => {
    try {
        const otpRecord = await otpModel.findOne({ email });

        if (!otpRecord) throw new Error("No OTP found for this email");

        if (otpRecord.expiresAt < new Date()) throw new Error("OTP has expired");

        const isMatch = await bcrypt.compare(otpInput, otpRecord.otp);
        if (!isMatch) throw new Error("Invalid OTP");

        return { status: 'success', message: 'OTP verified successfully' };

    } catch (e) {
        return { status: 'error', message: e.message };
    }
};
