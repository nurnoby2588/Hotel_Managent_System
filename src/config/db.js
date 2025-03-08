const mongoose = require('mongoose');

let isConnected = false; // Prevent multiple connections

const connectDB = async () => {
    if (isConnected) {
        console.log("Using existing MongoDB connection");
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel_management', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        isConnected = true; // Mark as connected
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        throw new Error("MongoDB connection failed");
    }
};

module.exports = connectDB;
