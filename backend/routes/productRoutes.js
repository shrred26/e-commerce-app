const express = require('express');
const { getProduct, getProducts } = require('../controllers/productController');

const router = express.Router();

router.route('/products').get(getProducts);

router.route('/product/:id').get(getProduct);

module.exports = router;