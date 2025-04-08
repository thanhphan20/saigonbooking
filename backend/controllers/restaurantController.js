// Use mock data for development
const mockData = require('../mock/restaurantData');

// Get all restaurants with pagination
exports.getAllRestaurants = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = mockData.findRestaurants({}, page, limit);

        res.json({
            restaurants: result.restaurants,
            page: result.page,
            total: result.total,
            limit: result.limit
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get restaurant by ID
exports.getRestaurantById = async (req, res) => {
    try {
        const restaurant = mockData.findRestaurantById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get restaurant by slug
exports.getRestaurantBySlug = async (req, res) => {
    try {
        const restaurant = mockData.findRestaurantBySlug(req.params.slug);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search restaurants
exports.searchRestaurants = async (req, res) => {
    try {
        const searchQuery = req.query.query;
        if (!searchQuery) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = mockData.searchRestaurants(searchQuery, page, limit);

        res.json({
            restaurants: result.restaurants,
            page: result.page,
            total: result.total,
            limit: result.limit
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Filter restaurants by district
exports.filterByDistrict = async (req, res) => {
    try {
        const district = parseInt(req.params.district);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = mockData.getRestaurantsByDistrict(district, page, limit);

        res.json({
            restaurants: result.restaurants,
            page: result.page,
            total: result.total,
            limit: result.limit
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Filter restaurants by food type
exports.filterByFoodType = async (req, res) => {
    try {
        const foodType = req.params.type;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = mockData.getRestaurantsByFoodType(foodType, page, limit);

        res.json({
            restaurants: result.restaurants,
            page: result.page,
            total: result.total,
            limit: result.limit
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 
