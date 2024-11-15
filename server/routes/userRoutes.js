const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post('/registerUser',userController.registerUser);
router.post('/registerUserAPI',userController.registerUser_API);
router.post('/loginUser',userController.loginUser);
router.post("/registerUserGoogle", userController.registerUserGoogle);
router.post('/check-email',userController.checkEmail);

module.exports = router;
