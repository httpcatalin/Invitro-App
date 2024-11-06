const express = require('express');
const router =  express.Router();
const doctorsController = require('../controllers/doctorsController');

router.get('/getalldoctors', doctorsController.getAllDoctors);


module.exports = router;