const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/registerUser',userController.registerUser);
router.post('/loginUser',userController.registerUser);

module.exports = router;
