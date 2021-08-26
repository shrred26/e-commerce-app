const asyncHandler = require("express-async-handler");
const Order = require('../models/orderModel');

const addOrderItem = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod,
        itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order found');
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createOrder = await order.save();
        res.status(201).json(createOrder);
    }
})

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
        res.json(order);
    } else {
        res.status(404)
        throw new Error('order not found')
    }
})

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.paidAt = Date.now()
        order.isPaid = true
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updateOrder = await order.save();
        res.json(updateOrder);
    } else {
        res.status(404);
        throw new Error('order not found');
    }
})

module.exports = { addOrderItem, getOrderById, updateOrderToPaid }