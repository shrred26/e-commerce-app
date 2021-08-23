const express = require('express');
const { addOrderItem } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').post(protect, addOrderItem);

module.exports = router;