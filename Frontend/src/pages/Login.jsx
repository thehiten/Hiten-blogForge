import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { 
  IoMailOutline, 
  IoLockClosedOutline, 
  IoPersonOutline, 
  IoEyeOutline, 
  IoEyeOffOutline,
  IoLogInOutline,
  IoArrowForwardOutline,
  IoCheckmarkCircleOutline
} from "react-icons/io5";

function Login() {
  const navigateTo = useNavigate();
  const { isDark } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    try {
      const response = await axios.post(
        "https://hiten-blogforge-1.onrender.com/api/user/login",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      toast.success(response.data.message || "Login successful!");

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
      setIsAuthenticated(true);
      
      // Wait a moment for state to update, then navigate
      setTimeout(() => {
        navigateTo("/");
        
        // Fetch complete profile data from server after navigation
        setTimeout(() => {
          fetchProfile();
        }, 200);
      }, 100);
    } catch (error) {
      
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 dark:bg-secondary-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Login Card */}
        <div className="card p-8 shadow-large">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center"
            >
              <IoLogInOutline className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Welcome Back
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Select Role
              </label>
              <div className="relative">
                <IoPersonOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input pl-10"
                  required
                >
                  <option value="">Choose your role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Password
              </label>
              <div className="relative">
                <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="w-5 h-5" />
                  ) : (
                    <IoEyeOutline className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <IoLogInOutline className="w-5 h-5" />
                  Sign In
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200 dark:border-neutral-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <Link
            to="/register"
            className="w-full btn-outline flex items-center justify-center gap-2"
          >
            Create Account
            <IoArrowForwardOutline className="w-4 h-4" />
          </Link>

          {/* Features */}
          <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-2">
                  <IoCheckmarkCircleOutline className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
                <span className="text-xs text-neutral-600 dark:text-neutral-400">Secure Login</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center mb-2">
                  <IoCheckmarkCircleOutline className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                </div>
                <span className="text-xs text-neutral-600 dark:text-neutral-400">Fast Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            By signing in, you agree to our{" "}
            <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
