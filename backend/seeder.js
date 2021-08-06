const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require('./data/users');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const products = require('./data/products');
const connectDb = require("./config/config");
require("colors");

dotenv.config();
connectDb();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        const createUser = await User.insertMany(users);
        const adminUser = createUser[0]._id;
        const sampleData = products.map((product) => {
            return { ...product, User: adminUser }
        })
        await Product.insertMany(sampleData);
        console.log("data imported !!".green.inverse);
        process.exit();
    } catch (e) {
        console.log(`${e.message}`.red.inverse);
        process.exit(1);
    }
}

const dataDestroy = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log("data deleted !!".green.inverse);
        process.exit();
    } catch (e) {
        console.log(`${e.message}`.red.inverse);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    dataDestroy();
} else {
    importData();
}
