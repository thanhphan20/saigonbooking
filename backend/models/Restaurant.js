const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    foodType: {
        type: String,
        required: true,
        trim: true
    },
    district: {
        type: Number,
        required: true
    },
    priceRange: {
        type: String,
        trim: true
    },
    operatingHours: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        lat: {
            type: Number,
            default: 0
        },
        lng: {
            type: Number,
            default: 0
        }
    },
    menuLink: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add text index for search
restaurantSchema.index({ name: 'text', foodType: 'text', address: 'text' });

module.exports = mongoose.model('Restaurant', restaurantSchema); 
