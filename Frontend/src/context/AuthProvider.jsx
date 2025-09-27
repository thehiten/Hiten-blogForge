import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to fetch profile data
  const fetchProfile = async () => {
    try {
      console.log("Fetching profile...");
      const response = await axios.get(
        "http://localhost:3000/api/user/getMyProfile",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Profile fetched successfully:", response.data);
      setProfile(response.data);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      console.error("Error fetching profile", error);
      // Don't automatically set isAuthenticated to false on profile fetch failure
      // The user might still be authenticated even if profile fetch fails
      // Only reset auth state on explicit logout or if we're sure the session is invalid
      return null;
    }
  };

  // Function to check authentication status without fetching profile
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/user/getMyProfile",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProfile(response.data);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      return false;
    }
  };

  useEffect(() => {
    // Fetch blog data
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/blog/getBlog/");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };

    fetchBlogs(); // Call the function to get blog data
    
    // Check authentication status on mount (but don't interfere with login process)
    // This will only run if the user refreshes the page or comes back to the app
    const checkAuth = async () => {
      try {
        await checkAuthStatus();
      } catch (error) {
        console.log("Auth check on mount failed, user not authenticated");
      }
    };
    
    checkAuth();
  }, []); // Run once when the component mounts

  return (
    <AuthContext.Provider value={{ blogs, profile, isAuthenticated, setIsAuthenticated, setProfile, fetchProfile, checkAuthStatus }}>
      {children} {/* Render child components */}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
