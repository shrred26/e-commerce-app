const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
require("colors");
const connectDb = require("./config/config");
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoute');
const { errorHandler } = require('./middlewares/errorMiddleware');

//dot env config
dotenv.config();

//connecting to mongodb
connectDb();

const app = express()
app.use(cors())
app.options('*', cors());

//middleware body parser
app.use(express.json());
app.use('/api', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/config/paypal', (req, res) => {
    res.json({ id: process.env.PAYPAL_CLIENT_ID });
})
app.use(errorHandler);


app.get('/', (req, res) => {
    res.send('<h1>welcome to node server</h1>')
})



const PORT = 8080
app.listen(process.env.PORT || PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.inverse);
})