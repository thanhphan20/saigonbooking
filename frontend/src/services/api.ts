import { Restaurant, RestaurantListResponse } from "@/types/restaurant";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Restaurant endpoints
  getRestaurants: async (page = 1, limit = 12): Promise<RestaurantListResponse> => {
    return fetchJson<RestaurantListResponse>(`${API_BASE_URL}/restaurants?page=${page}&limit=${limit}`);
  },

  getRestaurantById: async (id: string): Promise<Restaurant> => {
    return fetchJson<Restaurant>(`${API_BASE_URL}/restaurants/${id}`);
  },

  getRestaurantBySlug: async (slug: string): Promise<Restaurant> => {
    return fetchJson<Restaurant>(`${API_BASE_URL}/restaurants/slug/${slug}`);
  },

  searchRestaurants: async (query: string, page = 1, limit = 12): Promise<RestaurantListResponse> => {
    return fetchJson<RestaurantListResponse>(
      `${API_BASE_URL}/restaurants/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
  },

  getRestaurantsByDistrict: async (districtId: number, page = 1, limit = 12): Promise<RestaurantListResponse> => {
    return fetchJson<RestaurantListResponse>(
      `${API_BASE_URL}/restaurants/district/${districtId}?page=${page}&limit=${limit}`
    );
  },

  getRestaurantsByFoodType: async (type: string, page = 1, limit = 12): Promise<RestaurantListResponse> => {
    return fetchJson<RestaurantListResponse>(
      `${API_BASE_URL}/restaurants/food-type/${encodeURIComponent(type)}?page=${page}&limit=${limit}`
    );
  },
};
