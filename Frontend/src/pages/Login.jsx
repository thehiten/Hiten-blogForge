import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigateTo = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { isAuthenticated, setIsAuthenticated, setProfile, fetchProfile } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!email || !password || !role) {
      toast.error("Please fill all required fields", {
        duration: 3000,
      });
      return;
    }

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    try {
      
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        formData,
        {
          withCredentials: true, // <-- Move it here
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      
      console.log(response);
      // Don't store token in localStorage - backend handles cookies
      toast.success(response.data.message || "User Login successfully");

      // Set profile information from response
      if (response.data.user) {
        setProfile({
          user: {
            role: response.data.user.role,
            email: response.data.user.email,
            name: response.data.user.name
          }
        });
      }

      // Reset form fields
      setEmail("");
      setPassword("");
      setRole("");

      // Set authentication state
      console.log("Setting isAuthenticated to true");
      setIsAuthenticated(true);
      
      // Wait a moment for state to update, then navigate
      setTimeout(() => {
        console.log("Navigating to home page");
        navigateTo("/");
        
        // Fetch complete profile data from server after navigation
        setTimeout(() => {
          console.log("Fetching profile after navigation");
          fetchProfile();
        }, 200);
      }, 100);
    } catch (error) {
      console.log("Login error:", error);
      
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        toast.error("Cannot connect to server. Please check if backend is running.", {
          duration: 5000,
        });
      } else if (error.response?.status === 401) {
        toast.error("Invalid email or password", {
          duration: 3000,
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message, {
          duration: 3000,
        });
      } else {
        toast.error("Login failed. Please try again.", {
          duration: 3000,
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="font-semibold text-xl text-center text-blue-400">
            <span className="text-purple-400">Hit</span>-Blogs
          </div>
          <h1 className="text-xl font-semibold text-center">Login</h1>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Role</option>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
          />

          <div className="text-center">
            <p>
              New User?{" "}
              <Link to="/register" className="text-blue-400">
                Register Now
              </Link>
            </p>
          </div>

          <button
            type="submit"
            className="w-full p-2 text-white bg-purple-400 rounded-md hover:bg-purple-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
