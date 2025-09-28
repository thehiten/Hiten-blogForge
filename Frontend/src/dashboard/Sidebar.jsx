import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CiMenuBurger } from "react-icons/ci";
import { 
  IoHomeOutline,
  IoCreateOutline,
  IoBookOutline,
  IoPersonOutline,
  IoLogOutOutline,
  IoCloseOutline,
  IoStatsChartOutline
} from "react-icons/io5";

function Sidebar({ component, setComponent }) {
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  // Redirect if the user is not authenticated
  if (!isAuthenticated) {
    return <div>Please log in to see your profile.</div>;
  }

  // Handle user logout
  const handleLogout = async () => {
    try {
      await axios.post("https://hiten-blogforge-1.onrender.com/api/user/logout", {}, {
        withCredentials: true
      });
      setIsAuthenticated(false);
      toast.success("Logged out successfully.");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  const user = profile.user || {};

  // Menu items with icons
  const menuItems = [
    { name: "Dashboard", icon: IoStatsChartOutline, path: "Dashboard" },
    { name: "My Blogs", icon: IoBookOutline, path: "My Blogs" },
    { name: "Create Blog", icon: IoCreateOutline, path: "Create Blog" },
    { name: "My Profile", icon: IoPersonOutline, path: "My Profile" },
  ];

  return (
    <div>
      {/* Mobile overlay */}
      {show && (
        <div
          className="fixed inset-0 bg-black/50 z-20 sm:hidden"
          onClick={() => setShow(false)}
        />
      )}

      {/* Menu icon for small screens */}
      <div
        className="sm:hidden fixed top-14 sm:top-16 left-4 z-40 cursor-pointer bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-2"
        onClick={() => setShow(!show)}
      >
        {show ? (
          <IoCloseOutline className="text-2xl text-neutral-700 dark:text-neutral-300" />
        ) : (
          <CiMenuBurger className="text-2xl text-neutral-700 dark:text-neutral-300" />
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`${
          show ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 duration-300 ease-in-out w-72 h-full fixed z-30 shadow-2xl bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border-r border-neutral-200 dark:border-neutral-700`}
      >
        {/* Profile Section */}
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                {user.photo ? (
                  <img
                    src={user.photo.url}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-neutral-800"></div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                {user?.name || 'User'}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Blog Creator
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = component === item.path;
              
              return (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      setComponent(item.path);
                      setShow(false); // Close mobile menu
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-transform duration-200 ${
                      isActive ? 'scale-110' : 'group-hover:scale-105'
                    }`} />
                    <span className="font-medium">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <div className="my-6 border-t border-neutral-200 dark:border-neutral-700"></div>

          {/* Additional Actions */}
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => {
                  navigate("/");
                  setShow(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 group"
              >
                <IoHomeOutline className="w-5 h-5 transition-transform duration-200 group-hover:scale-105" />
                <span className="font-medium">View Site</span>
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 group"
              >
                <IoLogOutOutline className="w-5 h-5 transition-transform duration-200 group-hover:scale-105" />
                <span className="font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-200 dark:border-neutral-700">
          <div className="text-center">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              BlogForge Dashboard
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
              v1.0.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
