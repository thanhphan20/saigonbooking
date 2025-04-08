const Review = require('../models/Review');
const Restaurant = require('../models/Restaurant');

// Get all reviews for a restaurant
exports.getReviewsByRestaurant = async (req, res) => {
    try {
        const reviews = await Review.find({ restaurant: req.params.restaurantId })
            .populate('user', 'displayName profileImage')
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { restaurantId, rating, comment, visitDate } = req.body;

        // Check if restaurant exists
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Check if user already reviewed this restaurant
        const existingReview = await Review.findOne({
            user: req.user._id,
            restaurant: restaurantId
        });

        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this restaurant' });
        }

        // Create new review
        const review = await Review.create({
            user: req.user._id,
            restaurant: restaurantId,
            rating,
            comment,
            visitDate: visitDate || new Date()
        });

        // Populate user data before sending response
        await review.populate('user', 'displayName profileImage');

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    try {
        const { rating, comment, visitDate } = req.body;

        const review = await Review.findByIdAndUpdate(
            req.params.id,
            {
                rating,
                comment,
                visitDate: visitDate || undefined
            },
            { new: true, runValidators: true }
        ).populate('user', 'displayName profileImage');

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all reviews by the current user
exports.getUserReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.user._id })
            .populate('restaurant', 'name imageUrl district foodType')
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 
