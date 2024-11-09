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
    host: 'smtp.gmail.com',
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
  subject: 'Email Verification',
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Email Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      color: #333;
      background-color: #fff;
    }

    .container {
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      padding: 0 0px;
      padding-bottom: 10px;
      border-radius: 5px;
      line-height: 1.8;
    }

    .header {
      border-bottom: 1px solid #eee;
    }

    .header a {
      font-size: 1.4em;
      color: #000;
      text-decoration: none;
      font-weight: 600;
    }

    .content {
      min-width: 700px;
      overflow: auto;
      line-height: 2;
    }

    .otp {
      background: linear-gradient(to right, #00bc69 0, #00bc88 50%, #00bca8 100%);
      margin: 0 auto;
      width: max-content;
      padding: 0 10px;
      color: #fff;
      border-radius: 4px;
    }

    .footer {
      color: #aaa;
      font-size: 0.8em;
      line-height: 1;
      font-weight: 300;
    }

    .email-info {
      color: #666666;
      font-weight: 400;
      font-size: 13px;
      line-height: 18px;
      padding-bottom: 6px;
    }

    .email-info a {
      text-decoration: none;
      color: #00bc69;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <a>Prove Your Invitro Identity</a>
    </div>
    <br />
    <strong>Dear User,</strong>
    <p>
      We have received a login request for your Invitro account. For
      security purposes, please verify your identity by providing the
      following One-Time Password (OTP).
      <br />
      <b>Your One-Time Password (OTP) verification code is:</b>
    </p>
    <h2 class="otp">${otp}</h2>
    <p style="font-size: 0.9em">
      <strong>One-Time Password (OTP) is valid for 60 minutes.</strong>
      <br />
      <br />
      If you did not initiate this login request, please disregard this
      message. Please ensure the confidentiality of your OTP and do not share
      it with anyone.<br />
      <strong>Do not forward or give this code to anyone.</strong>
      <br />
      <br />
      <strong>Thank you for using Invitro App.</strong>
      <br />
      <br />
      Best regards,
      <br />
      <strong>Invitro</strong>
    </p>

    <hr style="border: none; border-top: 0.5px solid #131111" />
    <div class="footer">
      <p>This email can't receive replies.</p>
      <p>
        For more information about Invitro and your account, visit
        <strong>https://github.com/httpcatalin/Invitro-AppInvitro</strong>
      </p>
    </div>
  </div>
  <div style="text-align: center">
    <div class="email-info">
      <span>
        This email was sent to
        <a href="mailto:${email}">${email}</a>
      </span>
    </div>
    <div class="email-info">
      <a href="/">Invitro</a> | Moldova
      | Chisinau - MD-2027, Moldova
    </div>
    <div class="email-info">
      &copy; 2024 Invitro. All rights
      reserved.
    </div>
  </div>
</body>
</html>`
};
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) 
                console.log('Error sending OTP email:', error);
             else 
                console.log('OTP sent:', info.response);
            
        });

    } catch (e) {
        console.log('Error during OTP sending:', e);
    }
};

exports.verifyOTP = async (email, otpInput) => {
    try {
        const otpRecord = await otpModel.findOne({ email }).sort({ createdAt: -1 });

        if (!otpRecord) throw new Error("No OTP found for this email");

        if (otpRecord.expiresAt < new Date()) throw new Error("OTP has expired");

        const isMatch = await bcrypt.compare(otpInput, otpRecord.otp);
        
        if (!isMatch) throw new Error("Invalid OTP");

        return { status: 'success', message: 'OTP verified successfully' };

    } catch (e) {
        return { status: 'error', message: e.message };
    }
};
