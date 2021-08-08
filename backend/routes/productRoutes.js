const express = require('express');
const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler')

const router = express.Router();

router.get('/products', asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products)
}))

router.get('/product/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: "product not found" });
}))

module.exports = router;