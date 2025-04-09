export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">About Saigon Booking</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-6">
          Saigon Booking aims to be the definitive guide to dining in Ho Chi Minh City. We help locals and visitors
          discover the best restaurants, cafes, street food stalls, and other dining establishments throughout the city.
        </p>

        <h2 className="text-xl font-semibold mb-4">What We Offer</h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-6">
          <li>Comprehensive listings of restaurants across Ho Chi Minh City</li>
          <li>Detailed information including location, operating hours, and price ranges</li>
          <li>Easy search and filtering by district, food type, and more</li>
          <li>Updated and accurate information about dining options</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-600 mb-4">
          Saigon Booking was created by food enthusiasts who wanted to share their love for the diverse culinary scene
          in Ho Chi Minh City. What started as a personal collection of favorite spots has grown into a comprehensive
          resource for anyone looking to explore the city's food landscape.
        </p>
        <p className="text-gray-600">
          We're constantly updating our database with new restaurants and current information to ensure you have the
          best dining experience possible.
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Contact Us</h2>
        <p className="text-gray-700 mb-4">
          Have questions, suggestions, or want to list your restaurant? We'd love to hear from you!
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> info@saigonbooking.com
        </p>
      </div>
    </div>
  );
}
