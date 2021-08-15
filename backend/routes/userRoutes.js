const express = require('express');

const { authController, getUserProfile, registerUser } = require("../controllers/userController");
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', authController);
router.route('/profile').get(protect, getUserProfile);
router.route('/').post(registerUser);

module.exports = router;