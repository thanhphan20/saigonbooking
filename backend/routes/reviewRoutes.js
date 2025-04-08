const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { isAuthenticated, isReviewAuthor } = require('../middleware/auth');

// Get all reviews for a restaurant
router.get('/restaurant/:restaurantId', reviewController.getReviewsByRestaurant);

// Create a new review (authenticated)
router.post('/', isAuthenticated, reviewController.createReview);

// Update a review (authenticated + owner)
router.put('/:id', isAuthenticated, isReviewAuthor, reviewController.updateReview);

// Delete a review (authenticated + owner)
router.delete('/:id', isAuthenticated, isReviewAuthor, reviewController.deleteReview);

// Get a user's reviews (authenticated)
router.get('/user', isAuthenticated, reviewController.getUserReviews);

module.exports = router; 
