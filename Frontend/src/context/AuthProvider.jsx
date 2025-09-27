import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Fetch profile
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/getMyProfile",
          {
            withCredentials: true, // Ensure this is correct for your API
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProfile(response.data);
        setIsAuthenticated(true); // Set the user authenticated state
      } catch (error) {
        console.error("Error fetching profile", error);
        // Optionally handle unauthenticated state
        setIsAuthenticated(false);
      }
    };

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
    fetchProfile(); // Call the function to get profile data
  }, []); // Run once when the component mounts

  return (
    <AuthContext.Provider value={{ blogs, profile, isAuthenticated, setIsAuthenticated, setProfile }}>
      {children} {/* Render child components */}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
