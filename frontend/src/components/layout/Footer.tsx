import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Saigon Booking</h3>
            <p className="text-gray-600">Discover the best restaurants and cafes in Ho Chi Minh City.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/restaurants" className="text-gray-600 hover:text-blue-500">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-600 hover:text-blue-500">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-500">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-600">Ho Chi Minh City, Vietnam</p>
            <p className="text-gray-600 mt-2">Email: info@saigonbooking.com</p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} Saigon Booking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
