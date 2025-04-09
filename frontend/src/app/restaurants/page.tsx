"use client";

import { useEffect, useState } from "react";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import { Restaurant } from "@/types/restaurant";
import { api } from "@/services/api";

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const data = await api.getRestaurants(page, 12);
        setRestaurants(data.restaurants);
        setTotalPages(Math.ceil(data.total / data.limit));
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setError("Failed to load restaurants. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Restaurants</h1>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button onClick={() => setPage(1)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>

          {restaurants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No restaurants found.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 rounded ${
                      pageNum === page ? "bg-blue-600 text-white" : "bg-white border hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-3 py-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
}
