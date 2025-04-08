const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth routes
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect(process.env.CLIENT_URL);
    }
);

// Get current user
router.get('/current-user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            isAuthenticated: true,
            user: {
                id: req.user._id,
                displayName: req.user.displayName,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email,
                profileImage: req.user.profileImage
            }
        });
    } else {
        res.json({ isAuthenticated: false, user: null });
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to logout' });
        }
        res.json({ message: 'Successfully logged out' });
    });
});

module.exports = router; 
