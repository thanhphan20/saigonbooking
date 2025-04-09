export interface Restaurant {
  _id: string;
  name: string;
  foodType: string;
  district: number;
  priceRange: string;
  operatingHours: string;
  address: string;
  location?: {
    lat: number;
    lng: number;
  };
  menuLink?: string;
  imageUrl?: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  _id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface RestaurantListResponse {
  restaurants: Restaurant[];
  total: number;
  page: number;
  limit: number;
}
