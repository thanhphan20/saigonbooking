# Saigon Food Explorer

A web application for discovering and exploring dining locations in Ho Chi Minh City, Vietnam.

## Project Overview

Saigon Food Explorer helps users discover restaurants, cafes, street food stalls, and other dining establishments in Ho Chi Minh City. Users can search for restaurants by district, food type, and other criteria, view restaurant details including location on a map, and read/write reviews.

## Features

- Browse restaurants by district or food type
- Search for restaurants by name or cuisine
- View restaurant details (operating hours, price range, address)
- See restaurant locations on an interactive map
- Read and write restaurant reviews
- Save favorite restaurants
- User authentication
- Mobile-responsive design

## Data Source

The initial restaurant data comes from "hò hẹn hẹn hò ở SG.xlsx" which contains information about 63 eating establishments in Ho Chi Minh City.

## Project Structure

The project follows a modern web application architecture:

- **Frontend**: React.js with Redux for state management and Tailwind CSS for styling
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Maps Integration**: Google Maps API

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB
- Google Maps API key

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/saigon-food-explorer.git
   cd saigon-food-explorer
   ```

2. Install backend dependencies:

   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```
   cd ../frontend
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file in the backend directory with:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
   - Create a `.env` file in the frontend directory with:
     ```
     REACT_APP_API_URL=http://localhost:5000/api
     REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
     ```

5. Process the restaurant data:

   ```
   cd ../
   pip install -r requirements.txt
   python process_data.py
   ```

6. Import the data to MongoDB:

   ```
   mongoimport --db saigon-food --collection restaurants --file processed_restaurants.json --jsonArray
   ```

7. Start the backend server:

   ```
   cd backend
   npm run dev
   ```

8. Start the frontend development server:

   ```
   cd ../frontend
   npm start
   ```

9. Open your browser and navigate to `http://localhost:3000`

## Project Plan

For detailed information about the project implementation plan, please refer to the [rules.md](./rules.md) file.

## License

MIT

## Acknowledgements

- Original data source: "hò hẹn hẹn hò ở SG.xlsx"
- Google Maps API for location services
