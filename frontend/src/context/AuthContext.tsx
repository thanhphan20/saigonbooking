"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/current-user", {
          credentials: "include",
        });
        const data = await response.json();

        if (data.isAuthenticated) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Failed to check authentication status:", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function - redirects to Google OAuth
  const login = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  // Logout function
  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        credentials: "include",
      });
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
