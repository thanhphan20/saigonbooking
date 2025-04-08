const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// Get all restaurants
router.get('/', restaurantController.getAllRestaurants);

// Get restaurant by ID
router.get('/id/:id', restaurantController.getRestaurantById);

// Get restaurant by slug
router.get('/slug/:slug', restaurantController.getRestaurantBySlug);

// Search restaurants
router.get('/search', restaurantController.searchRestaurants);

// Filter by district
router.get('/district/:district', restaurantController.filterByDistrict);

// Filter by food type
router.get('/food-type/:type', restaurantController.filterByFoodType);

module.exports = router; 
