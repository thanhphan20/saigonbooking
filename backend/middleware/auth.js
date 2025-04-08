/**
 * Middleware to check if user is authenticated
 */
module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'You must be logged in to access this resource' });
};

/**
 * Middleware to check if user is the review author
 */
module.exports.isReviewAuthor = async (req, res, next) => {
    const Review = require('../models/Review');

    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 
