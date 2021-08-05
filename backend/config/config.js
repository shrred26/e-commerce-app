const mongoose = require("mongoose");
require("colors");

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log(`Mongodb connected ${conn.connection.host}`.yellow)
    } catch (e) {
        console.error(`Error: ${e.message}`.red);
        process.exit(1);
    }
}

module.exports = connectDb;