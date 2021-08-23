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

module.exports = { addOrderItem }