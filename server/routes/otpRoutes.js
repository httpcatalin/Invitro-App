const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');

router.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    try {
        await otpController.sendOTP(email);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/verify-otp', async (req, res) => {
    const { email, otpInput } = req.body;

    try {
        const result = await otpController.verifyOTP(email, otpInput);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
