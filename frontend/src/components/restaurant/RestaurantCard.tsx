"use client";

import Link from "next/link";
import { Restaurant } from "@/types/restaurant";
import RestaurantImage from "./RestaurantImage";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const defaultImage = "/restaurant-placeholder.jpg";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48">
        <RestaurantImage
          src={restaurant.imageUrl || ""}
          alt={restaurant.name}
          defaultImage={defaultImage}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 truncate">{restaurant.name}</h3>

        <div className="text-gray-600 mb-2 flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>District {restaurant.district}</span>
        </div>

        <div className="text-gray-600 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{restaurant.operatingHours}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-medium">{restaurant.foodType}</span>
          <span className="bg-gray-100 px-2 py-1 rounded text-gray-700 text-sm">{restaurant.priceRange}</span>
        </div>

        <Link
          href={`/restaurants/${restaurant.slug}`}
          className="mt-4 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
