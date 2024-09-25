import React, { useState, useRef } from "react";
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
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    try {
      const response = await axios.post("http://localhost:3000/api/user/login", formData, {
        headers: {
          withCredentials: true,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      localStorage.setItem("jwt", response.data.token);
      toast.success(response.data.message || "User Login successfully");

      // Reset form fields
      
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setRole("");

      navigateTo("/");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message) || "Please fill the required fields",
      {
        duration: 100,
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
