import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoCloseSharp, 
  IoSearchOutline, 
  IoMoonOutline, 
  IoSunnyOutline,
  IoMenuOutline,
  IoPersonOutline,
  IoLogOutOutline,
  IoHomeOutline,
  IoBookOutline,
  IoPeopleOutline,
  IoInformationCircleOutline,
  IoMailOutline,
  IoSettingsOutline
} from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/ThemeProvider";
import toast from "react-hot-toast";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    setShow(!show);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/user/logout", {}, {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      toast.success("Logged out successfully.");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blogs?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  const navItems = [
    { to: "/", label: "Home", icon: IoHomeOutline },
    { to: "/blogs", label: "Blogs", icon: IoBookOutline },
    { to: "/creators", label: "Creators", icon: IoPeopleOutline },
    { to: "/about", label: "About", icon: IoInformationCircleOutline },
    { to: "/contact", label: "Contact", icon: IoMailOutline },
  ];

  const renderLinks = (isMobile = false) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 ${
              isMobile ? "text-lg" : "text-sm font-medium"
            }`}
            onClick={isMobile ? () => setShow(false) : undefined}
          >
            <Icon className="w-4 h-4" />
            {item.label}
          </Link>
        );
      })}
      {isAuthenticated && profile?.user?.role === "admin" && (
        <Link
          to="/dashboard"
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 ${
            isMobile ? "text-lg" : "text-sm font-medium"
          }`}
          onClick={isMobile ? () => setShow(false) : undefined}
        >
          <IoSettingsOutline className="w-4 h-4" />
          Dashboard
        </Link>
      )}
    </>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-medium border-b border-neutral-200/50 dark:border-neutral-700/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 group"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-display font-bold text-gradient">
                BlogForge
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {renderLinks()}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <IoSunnyOutline className="w-5 h-5 text-yellow-500" />
                ) : (
                  <IoMoonOutline className="w-5 h-5 text-neutral-600" />
                )}
              </button>

              {/* Mobile Search Toggle */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="md:hidden p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200"
                aria-label="Toggle search"
              >
                <IoSearchOutline className="w-5 h-5" />
              </button>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-2">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/login"
                      className="btn-ghost"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="btn-primary"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2 px-3 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                      <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {profile?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {profile?.user?.name || 'User'}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-2 rounded-lg bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 hover:bg-accent-200 dark:hover:bg-accent-900/50 transition-all duration-200"
                      aria-label="Logout"
                    >
                      <IoLogOutOutline className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={handleClick}
                className="lg:hidden p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200"
                aria-expanded={show}
                aria-controls="mobile-menu"
              >
                {show ? (
                  <IoCloseSharp className="w-5 h-5" />
                ) : (
                  <IoMenuOutline className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-neutral-200 dark:border-neutral-700"
            >
              <div className="px-4 py-3">
                <form onSubmit={handleSearch} className="relative">
                  <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {show && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setShow(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-neutral-900 shadow-large z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
                  <span className="text-lg font-display font-bold text-gradient">
                    Menu
                  </span>
                  <button
                    onClick={() => setShow(false)}
                    className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <IoCloseSharp className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Menu Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-2">
                    {renderLinks(true)}
                  </div>

                  {/* Mobile Auth Section */}
                  <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                    {!isAuthenticated ? (
                      <div className="space-y-3">
                        <Link
                          to="/login"
                          className="flex items-center gap-2 w-full px-4 py-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                          onClick={() => setShow(false)}
                        >
                          <IoPersonOutline className="w-5 h-5" />
                          Sign In
                        </Link>
                        <Link
                          to="/register"
                          className="flex items-center gap-2 w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                          onClick={() => setShow(false)}
                        >
                          <IoPersonOutline className="w-5 h-5" />
                          Sign Up
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                          <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {profile?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">
                              {profile?.user?.name || 'User'}
                            </p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                              {profile?.user?.email}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            handleLogout();
                            setShow(false);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-3 bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 rounded-lg hover:bg-accent-200 dark:hover:bg-accent-900/50 transition-colors"
                        >
                          <IoLogOutOutline className="w-5 h-5" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}

export default Navbar;
