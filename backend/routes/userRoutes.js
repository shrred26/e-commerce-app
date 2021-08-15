const express = require('express');

const { authController, getUserProfile } = require("../controllers/userController");
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', authController);
router.route('/profile').get(protect, getUserProfile);

module.exports = router;