import pandas as pd
import json
import re
from slugify import slugify
from dotenv import load_dotenv
import os
import requests

# Load environment variables (for API keys)
load_dotenv()

# Read the Excel file
file_path = "docs/hò hẹn hẹn hò ở SG.xlsx"
df = pd.read_excel(file_path)

# Clean column names
df.columns = [
    "food_type",
    "name", 
    "district", 
    "price_range", 
    "operating_hours", 
    "address", 
    "menu_link"
]

# Function to geocode addresses using Google Maps API
def geocode_address(address):
    api_key = os.getenv("GOOGLE_MAPS_API_KEY", "")
    if not api_key:
        print("Warning: No Google Maps API key found. Skipping geocoding.")
        return {"lat": 0, "lng": 0}
    
    # For now, return dummy coordinates to avoid API calls
    # In production, uncomment the API call below
    print(f"Would geocode: {address}")
    return {"lat": 0, "lng": 0}
    
    """
    # API call code - uncomment when ready with API key
    url = f"https://maps.googleapis.com/maps/api/geocode/json?address={address}, Ho Chi Minh City, Vietnam&key={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        result = response.json()
        if result["status"] == "OK" and result["results"]:
            location = result["results"][0]["geometry"]["location"]
            return location
    return {"lat": 0, "lng": 0}
    """

# Process the data
restaurants = []

for _, row in df.iterrows():
    # Clean NaN values
    row = row.fillna("")
    
    # Create slug from name
    slug = slugify(row["name"])
    
    # Process menu link
    menu_link = "" if row["menu_link"] != "click here" else ""
    
    # Geocode address
    location = geocode_address(row["address"])
    
    # Clean price range
    price_range = row["price_range"].strip()
    
    # Format operating hours
    operating_hours = row["operating_hours"].replace("\\n", ", ")
    
    # Create restaurant object
    restaurant = {
        "name": row["name"].strip(),
        "foodType": row["food_type"].strip(),
        "district": int(row["district"]),
        "priceRange": price_range,
        "operatingHours": operating_hours,
        "address": row["address"].strip(),
        "location": location,
        "menuLink": menu_link,
        "imageUrl": "", # To be added later
        "slug": slug
    }
    
    restaurants.append(restaurant)

# Save to JSON
with open('processed_restaurants.json', 'w', encoding='utf-8') as f:
    json.dump(restaurants, f, ensure_ascii=False, indent=2)

print(f"Processed {len(restaurants)} restaurants and saved to processed_restaurants.json")
print("Note: This script requires a Google Maps API key to geocode addresses properly.")
print("For now, dummy coordinates have been used. Update the GOOGLE_MAPS_API_KEY in .env file when ready.") 
