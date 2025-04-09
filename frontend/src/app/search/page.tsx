"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/services/api";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import { Restaurant } from "@/types/restaurant";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams?.get("query") || "";
  const initialDistrict = searchParams?.get("district") || "";

  const [query, setQuery] = useState(initialQuery);
  const [district, setDistrict] = useState(initialDistrict);
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchQuery = searchParams?.get("query");
    const districtFilter = searchParams?.get("district");

    if (searchQuery || districtFilter) {
      performSearch(searchQuery || "", districtFilter || "");
    }
  }, [searchParams]);

  const performSearch = async (searchQuery: string, districtFilter: string) => {
    try {
      setLoading(true);
      setError(null);

      let results;

      if (districtFilter && !searchQuery) {
        // Search by district only
        results = await api.getRestaurantsByDistrict(Number(districtFilter));
      } else if (searchQuery) {
        // Search by query (text search)
        results = await api.searchRestaurants(searchQuery);
      } else {
        // No filters applied, get all restaurants
        results = await api.getRestaurants();
      }

      setRestaurants(results.restaurants);
    } catch (error) {
      console.error("Search error:", error);
      setError("An error occurred while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    // Build query string
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (district) params.set("district", district);

    // Update URL with search params
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Restaurants</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="query" className="block text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, food type, etc."
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="district" className="block text-gray-700 mb-2">
                District
              </label>
              <select
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Districts</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    District {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Search Results */}
      <div>
        {initialQuery || initialDistrict ? (
          <h2 className="text-xl font-semibold mb-6">
            Search Results
            {initialQuery && <span> for "{initialQuery}"</span>}
            {initialDistrict && <span> in District {initialDistrict}</span>}
          </h2>
        ) : (
          <h2 className="text-xl font-semibold mb-6">All Restaurants</h2>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : restaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">No restaurants found matching your criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
