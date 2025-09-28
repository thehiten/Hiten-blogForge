import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user was previously authenticated
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedProfile = localStorage.getItem('profile');
    if (savedAuth === 'true' && savedProfile) {
      try {
        return JSON.parse(savedAuth);
      } catch {
        return false;
      }
    }
    return false;
  });

  // Function to fetch profile data
  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        "https://hiten-blogforge-1.onrender.com/api/user/getMyProfile",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProfile(response.data);
      setIsAuthenticated(true);
      // Save to localStorage for persistence
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('profile', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
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
        "https://hiten-blogforge-1.onrender.com/api/user/getMyProfile",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProfile(response.data);
      setIsAuthenticated(true);
      // Save to localStorage for persistence
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('profile', JSON.stringify(response.data));
      return true;
    } catch (error) {
      setIsAuthenticated(false);
      // Clear localStorage on auth failure
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('profile');
      return false;
    }
  };

  // Function to clear authentication data
  const clearAuth = () => {
    setIsAuthenticated(false);
    setProfile({});
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('profile');
  };

  useEffect(() => {
    // Fetch blog data
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("https://hiten-blogforge-1.onrender.com/api/blog/getBlog/");
        setBlogs(response.data);
      } catch (error) {
      }
    };

    fetchBlogs(); // Call the function to get blog data
    
    // Check if user was previously authenticated and restore profile
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedProfile = localStorage.getItem('profile');
    
    if (savedAuth === 'true' && savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
        setIsAuthenticated(true);
        
        // Verify the session is still valid with the server
        checkAuthStatus().then((isValid) => {
          if (!isValid) {
            clearAuth();
          }
        });
      } catch (error) {
        clearAuth();
      }
    } else {
      // Check authentication status on mount if no saved data
      const checkAuth = async () => {
        try {
          await checkAuthStatus();
        } catch (error) {
          clearAuth();
        }
      };
      checkAuth();
    }
  }, []); // Run once when the component mounts

  return (
    <AuthContext.Provider value={{ blogs, profile, isAuthenticated, setIsAuthenticated, setProfile, fetchProfile, checkAuthStatus, clearAuth }}>
      {children} {/* Render child components */}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
