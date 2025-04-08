// Sample restaurant data for development
const restaurants = [
    {
        _id: "60d21b4667d0d8992e610c85",
        name: "Pho Hung",
        foodType: "Vietnamese",
        district: 1,
        priceRange: "$$",
        operatingHours: "7:00 AM - 10:00 PM",
        address: "123 Le Loi St, District 1, Ho Chi Minh City",
        location: {
            lat: 10.7769,
            lng: 106.7009
        },
        menuLink: "https://example.com/phohung-menu",
        imageUrl: "https://example.com/phohung.jpg",
        slug: "pho-hung",
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z"
    },
    {
        _id: "60d21b4667d0d8992e610c86",
        name: "Banh Mi 362",
        foodType: "Street Food",
        district: 3,
        priceRange: "$",
        operatingHours: "6:00 AM - 8:00 PM",
        address: "362 Vo Van Tan St, District 3, Ho Chi Minh City",
        location: {
            lat: 10.7772,
            lng: 106.6895
        },
        menuLink: null,
        imageUrl: "https://example.com/banhmi362.jpg",
        slug: "banh-mi-362",
        createdAt: "2023-01-02T00:00:00.000Z",
        updatedAt: "2023-01-02T00:00:00.000Z"
    },
    {
        _id: "60d21b4667d0d8992e610c87",
        name: "The Coffee House",
        foodType: "Cafe",
        district: 2,
        priceRange: "$$",
        operatingHours: "7:00 AM - 10:30 PM",
        address: "86 Thao Dien St, District 2, Ho Chi Minh City",
        location: {
            lat: 10.8031,
            lng: 106.7387
        },
        menuLink: "https://example.com/coffeehouse-menu",
        imageUrl: "https://example.com/coffeehouse.jpg",
        slug: "the-coffee-house",
        createdAt: "2023-01-03T00:00:00.000Z",
        updatedAt: "2023-01-03T00:00:00.000Z"
    },
    {
        _id: "60d21b4667d0d8992e610c88",
        name: "Pizza 4P's",
        foodType: "Italian",
        district: 1,
        priceRange: "$$$",
        operatingHours: "11:00 AM - 10:00 PM",
        address: "8 Thu Khoa Huan St, District 1, Ho Chi Minh City",
        location: {
            lat: 10.7721,
            lng: 106.7037
        },
        menuLink: "https://example.com/pizza4ps-menu",
        imageUrl: "https://example.com/pizza4ps.jpg",
        slug: "pizza-4ps",
        createdAt: "2023-01-04T00:00:00.000Z",
        updatedAt: "2023-01-04T00:00:00.000Z"
    },
    {
        _id: "60d21b4667d0d8992e610c89",
        name: "Bun Cha 145",
        foodType: "Vietnamese",
        district: 4,
        priceRange: "$",
        operatingHours: "10:00 AM - 8:00 PM",
        address: "145 Nguyen Thi Minh Khai St, District 4, Ho Chi Minh City",
        location: {
            lat: 10.7597,
            lng: 106.6977
        },
        menuLink: null,
        imageUrl: "https://example.com/buncha145.jpg",
        slug: "bun-cha-145",
        createdAt: "2023-01-05T00:00:00.000Z",
        updatedAt: "2023-01-05T00:00:00.000Z"
    },
    {
        _id: "60d21b4667d0d8992e610c8a",
        name: "Quan An Ngon",
        foodType: "Vietnamese",
        district: 1,
        priceRange: "$$",
        operatingHours: "9:00 AM - 10:00 PM",
        address: "160 Pasteur St, District 1, Ho Chi Minh City",
        location: {
            lat: 10.7815,
            lng: 106.6957
        },
        menuLink: "https://example.com/quanangon-menu",
        imageUrl: "https://example.com/quanangon.jpg",
        slug: "quan-an-ngon",
        createdAt: "2023-01-06T00:00:00.000Z",
        updatedAt: "2023-01-06T00:00:00.000Z"
    }
];

// Functions to simulate MongoDB operations
const findRestaurants = (query = {}, page = 1, limit = 10) => {
    // Apply filtering (simplified)
    let filtered = [...restaurants];

    if (query.district) {
        filtered = filtered.filter(r => r.district === Number(query.district));
    }

    if (query.foodType) {
        filtered = filtered.filter(r => r.foodType.toLowerCase() === query.foodType.toLowerCase());
    }

    if (query.search) {
        const searchTerm = query.search.toLowerCase();
        filtered = filtered.filter(r =>
            r.name.toLowerCase().includes(searchTerm) ||
            r.foodType.toLowerCase().includes(searchTerm) ||
            r.address.toLowerCase().includes(searchTerm)
        );
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = filtered.slice(startIndex, endIndex);

    return {
        restaurants: paginatedResults,
        total: filtered.length,
        page,
        limit
    };
};

const findRestaurantById = (id) => {
    return restaurants.find(r => r._id === id) || null;
};

const findRestaurantBySlug = (slug) => {
    return restaurants.find(r => r.slug === slug) || null;
};

const searchRestaurants = (query, page = 1, limit = 10) => {
    return findRestaurants({ search: query }, page, limit);
};

const getRestaurantsByDistrict = (districtId, page = 1, limit = 10) => {
    return findRestaurants({ district: districtId }, page, limit);
};

const getRestaurantsByFoodType = (foodType, page = 1, limit = 10) => {
    return findRestaurants({ foodType }, page, limit);
};

module.exports = {
    findRestaurants,
    findRestaurantById,
    findRestaurantBySlug,
    searchRestaurants,
    getRestaurantsByDistrict,
    getRestaurantsByFoodType
}; 
