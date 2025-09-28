import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios"; 
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/ThemeProvider";
import { 
  IoPersonOutline, 
  IoMailOutline, 
  IoCallOutline, 
  IoLockClosedOutline, 
  IoSchoolOutline,
  IoCameraOutline,
  IoEyeOutline, 
  IoEyeOffOutline,
  IoCheckmarkCircleOutline,
  IoArrowForwardOutline,
  IoPersonCircleOutline
} from "react-icons/io5";

function Register() {
  const navigateTo = useNavigate();
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    education: "",
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();
  const fileInputRef = useRef(null);

  const steps = [
    { number: 1, title: "Personal Info", icon: IoPersonOutline },
    { number: 2, title: "Account Details", icon: IoLockClosedOutline },
    { number: 3, title: "Profile Setup", icon: IoCameraOutline },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPhotoPreview(reader.result);
        setPhoto(file);
      };
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 2:
        return formData.password && formData.role && formData.education;
      case 3:
        return true; // Photo is optional
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    } else {
      toast.error("Please fill all required fields");
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(1) || !validateStep(2)) {
      toast.error("Please complete all required fields");
      return;
    }

    setIsLoading(true);
    const submitData = new FormData();
    
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });
    submitData.append("photo", photo);

    try {
      const response = await axios.post(
        "https://hiten-blogforge-1.onrender.com/api/user/register",
        submitData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      toast.success(response.data.message || "Registration successful!");
      setProfile(response.data);
      setIsAuthenticated(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        education: "",
      });
      setPhoto(null);
      setPhotoPreview("");
      setCurrentStep(1);
      
      navigateTo("/");

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-50 via-white to-primary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary-200 dark:bg-secondary-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-200 dark:bg-primary-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-2xl"
      >
        {/* Registration Card */}
        <div className="card p-8 shadow-large">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-2xl flex items-center justify-center"
            >
              <IoPersonCircleOutline className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Create Your Account
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Join our community of writers and readers
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <div key={step.number} className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isCompleted
                          ? "bg-primary-500 text-white"
                          : isActive
                          ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                          : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400"
                      }`}
                    >
                      {isCompleted ? (
                        <IoCheckmarkCircleOutline className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </motion.div>
                    <span className={`text-xs mt-2 font-medium ${
                      isActive ? "text-primary-600 dark:text-primary-400" : "text-neutral-500 dark:text-neutral-400"
                    }`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <IoPersonOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <IoCallOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input pl-10"
                      required
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Account Details */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
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

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Role
                  </label>
                  <div className="relative">
                    <IoPersonOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="input pl-10"
                      required
                    >
                      <option value="">Choose your role</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Education
                  </label>
                  <div className="relative">
                    <IoSchoolOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <select
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      className="input pl-10"
                      required
                    >
                      <option value="">Select your education</option>
                      <option value="BCA">BCA</option>
                      <option value="MCA">MCA</option>
                      <option value="MBA">MBA</option>
                      <option value="BE">BE</option>
                      <option value="B.Tech">B.Tech</option>
                      <option value="M.Tech">M.Tech</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Profile Setup */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Profile Photo (Optional)
                  </label>
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center overflow-hidden">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <IoCameraOutline className="w-8 h-8 text-neutral-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={changePhotoHandler}
                        accept="image/*"
                        className="input"
                      />
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        Upload a profile photo to personalize your account
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
                  <h3 className="font-medium text-primary-900 dark:text-primary-100 mb-2">
                    Account Summary
                  </h3>
                  <div className="space-y-1 text-sm text-primary-700 dark:text-primary-300">
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Role:</strong> {formData.role}</p>
                    <p><strong>Education:</strong> {formData.education}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-ghost"
                >
                  Previous
                </button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary flex items-center gap-2"
                >
                  Next Step
                  <IoArrowForwardOutline className="w-4 h-4" />
                </button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <IoCheckmarkCircleOutline className="w-5 h-5" />
                      Create Account
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700 text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
