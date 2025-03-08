const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const propertyRoutes = require('./routes/propertyRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Root endpoint
app.get('/', async (req, res) => {
    console.log('Root endpoint accessed');
    await connectDB(); // ✅ Connect to MongoDB on each request
    res.send({ message: "Hotel management" });
});

// Routes
app.use('/api/properties', async (req, res, next) => {
    await connectDB(); // ✅ Ensure DB connection
    next();
}, propertyRoutes);

app.use('/api/users', async (req, res, next) => {
    await connectDB(); // ✅ Ensure DB connection
    next();
}, userRoutes);

// Error handling middleware
app.use(errorHandler);

// Export the app as a Vercel function
module.exports = async (req, res) => {
    await connectDB(); // ✅ Ensure DB connection
    return app(req, res);
};
