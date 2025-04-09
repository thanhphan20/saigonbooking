import { api } from "@/services/api";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import Link from "next/link";

async function getFeaturedRestaurants() {
  try {
    const data = await api.getRestaurants(1, 6);
    return data.restaurants;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
}

export default async function Home() {
  const restaurants = await getFeaturedRestaurants();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover the Best Food in Ho Chi Minh City</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Find the perfect restaurant, cafe, or street food for any occasion
          </p>
          <Link
            href="/restaurants"
            className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium text-lg hover:bg-gray-100 transition-colors"
          >
            Browse All Restaurants
          </Link>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Restaurants</h2>
            <Link href="/restaurants" className="text-blue-600 hover:text-blue-800">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => <RestaurantCard key={restaurant._id} restaurant={restaurant} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No restaurants found. Please try again later.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Choose Saigon Booking</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy to Find</h3>
              <p className="text-gray-600">Find the perfect restaurant with our simple search and filter tools.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Updated Information</h3>
              <p className="text-gray-600">Get accurate details about operating hours, menus, and locations.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
              <p className="text-gray-600">Discover the best dining spots in Ho Chi Minh City, carefully selected.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
