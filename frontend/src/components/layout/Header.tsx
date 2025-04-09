"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();

  const isActive = (path: string) => {
    return pathname === path ? "text-blue-600" : "text-gray-700 hover:text-blue-500";
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Saigon Booking
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`font-medium ${isActive("/")}`}>
              Home
            </Link>
            <Link href="/restaurants" className={`font-medium ${isActive("/restaurants")}`}>
              Restaurants
            </Link>
            <Link href="/search" className={`font-medium ${isActive("/search")}`}>
              Search
            </Link>
            <Link href="/about" className={`font-medium ${isActive("/about")}`}>
              About
            </Link>

            {/* Auth Buttons */}
            {isLoading ? (
              <div className="w-24 h-9 bg-gray-200 animate-pulse rounded-md"></div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    {user?.displayName.charAt(0).toUpperCase()}
                  </div>
                  <span className="ml-2 font-medium text-gray-800">{user?.displayName.split(" ")[0]}</span>
                </div>
                <button onClick={logout} className="text-gray-600 hover:text-red-600 font-medium">
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                Sign In
              </button>
            )}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 border-t pt-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <Link href="/" className={`font-medium ${isActive("/")}`} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link
                href="/restaurants"
                className={`font-medium ${isActive("/restaurants")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Restaurants
              </Link>
              <Link
                href="/search"
                className={`font-medium ${isActive("/search")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
              <Link href="/about" className={`font-medium ${isActive("/about")}`} onClick={() => setIsMenuOpen(false)}>
                About
              </Link>

              {/* Auth Buttons for Mobile */}
              {isLoading ? (
                <div className="w-24 h-9 bg-gray-200 animate-pulse rounded-md"></div>
              ) : isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      {user?.displayName.charAt(0).toUpperCase()}
                    </div>
                    <span className="ml-2 font-medium text-gray-800">{user?.displayName}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-600 hover:text-red-600 font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    login();
                    setIsMenuOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors w-full"
                >
                  Sign In
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
