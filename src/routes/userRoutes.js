const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');

router.post('/register', userController.registerUser); // Register User
router.post('/login', userController.loginUser); // Login User
router.get('/profile', auth, userController.getUserProfile); // Get User Profile (Protected Route)

module.exports = router;

