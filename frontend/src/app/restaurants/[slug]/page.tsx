import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/services/api";
import { Restaurant } from "@/types/restaurant";
import RestaurantImage from "@/components/restaurant/RestaurantImage";
import ReviewSection from "@/components/restaurant/ReviewSection";

interface RestaurantDetailPageProps {
  params: {
    slug: string;
  };
}

async function getRestaurant(slug: string): Promise<Restaurant | null> {
  try {
    return await api.getRestaurantBySlug(slug);
  } catch (error) {
    console.error(`Error fetching restaurant with slug ${slug}:`, error);
    return null;
  }
}

export default async function RestaurantDetailPage({ params }: RestaurantDetailPageProps) {
  const restaurant = await getRestaurant(params.slug);

  if (!restaurant) {
    notFound();
  }

  const defaultImage = "/restaurant-placeholder.jpg";

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-6">
        <Link href="/restaurants" className="text-blue-600 hover:underline">
          ← Back to Restaurants
        </Link>
      </nav>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-56 md:h-72 lg:h-96">
          <RestaurantImage
            src={restaurant.imageUrl || ""}
            alt={restaurant.name}
            defaultImage={defaultImage}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
          <div className="text-gray-600 mb-6">{restaurant.foodType}</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Information</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-600 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <div className="text-gray-700 font-medium">Location</div>
                    <div className="text-gray-600">District {restaurant.district}</div>
                    <div className="text-gray-600">{restaurant.address}</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-600 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <div className="text-gray-700 font-medium">Operating Hours</div>
                    <div className="text-gray-600">{restaurant.operatingHours}</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-600 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <div className="text-gray-700 font-medium">Price Range</div>
                    <div className="text-gray-600">{restaurant.priceRange}</div>
                  </div>
                </div>

                {restaurant.menuLink && (
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-600 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <div>
                      <div className="text-gray-700 font-medium">Menu</div>
                      <a
                        href={restaurant.menuLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Menu
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              {restaurant.location && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Location</h2>
                  <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                    <p className="text-gray-600 text-center p-4">
                      Map will be integrated here in the next phase.
                      <br />
                      <span className="block mt-2">
                        Coordinates: {restaurant.location.lat}, {restaurant.location.lng}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Review Section */}
          <ReviewSection restaurantId={restaurant._id} />
        </div>
      </div>
    </div>
  );
}
