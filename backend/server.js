const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
require("colors");
const connectDb = require("./config/config");
const products = require('./data/products')

//dot env config
dotenv.config();

//connecting to mongodb
connectDb();

const app = express()
app.use(cors())
app.options('*', cors());

app.get('/', (req, res) => {
    res.send('<h1>welcome to node server</h1>')
})

app.get('/products', (req, res) => {
    res.json(products)
})

app.get('/product/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
})

const PORT = 8080
app.listen(process.env.PORT || PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.inverse);
})