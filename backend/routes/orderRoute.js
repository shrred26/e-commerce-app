const express = require('express');
const { addOrderItem, getOrderById, updateOrderToPaid, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();


router.route('/myorders').get(protect, getMyOrders);
router.route('/').post(protect, addOrderItem);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

module.exports = router;