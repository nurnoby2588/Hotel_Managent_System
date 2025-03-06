const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    propertyName: {
        type: String,
        required: [true, 'Property name is required'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
    costPerNight: {
        type: Number,
        required: [true, 'Cost per night is required'],
        min: [0, 'Cost per night cannot be negative']
    },
    availableRooms: {
        type: Number,
        required: [true, 'Number of available rooms is required'],
        min: [0, 'Available rooms cannot be negative']
    },
    propertyImage: {
        type: String,
        required: [true, 'Property image URL is required'],
        trim: true
    },
    averageRating: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot be more than 5']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Property', propertySchema);
