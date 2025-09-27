import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Sidebar from "../dashboard/Sidebar";
import MyProfile from "../dashboard/MyProfile";
import MyBlog from "../dashboard/MyBlog";
import CreateBlog from "../dashboard/CreateBlog";
import Update from "../dashboard/Update";
import { 
  IoAnalyticsOutline, 
  IoHomeOutline, 
  IoNotificationsOutline, 
  IoSettingsOutline,
  IoCreateOutline,
  IoEyeOutline,
  IoTimeOutline,
  IoBookOutline,
  IoPersonOutline,
  IoChatbubbleOutline,
  IoHeartOutline,
  IoShareOutline,
  IoStatsChartOutline,
  IoSpeedometerOutline,
  IoCalendarOutline,
  IoGlobeOutline,
  IoSearchOutline,
  IoAddCircleOutline,
  IoTrendingUpOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
  IoRefreshOutline
} from "react-icons/io5";

function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [component, setComponent] = useState("Dashboard");
  const [dashboardData, setDashboardData] = useState({
    totalBlogs: 0,
    totalViews: 0,
    recentBlogs: [],
    analytics: {
      weeklyViews: 0,
      monthlyViews: 0,
      popularBlogs: []
    }
  });
  const [loading, setLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [blogsResponse] = await Promise.all([
          axios.get("http://localhost:3000/api/blog/getMyBlog", {
            withCredentials: true,
          })
        ]);
        
        const blogs = blogsResponse.data || [];
        setDashboardData({
          totalBlogs: blogs.length,
          totalViews: blogs.reduce((sum, blog) => sum + (blog.views || 0), 0),
          recentBlogs: blogs.slice(0, 5),
          analytics: {
            weeklyViews: Math.floor(blogs.reduce((sum, blog) => sum + (blog.views || 0), 0) * 0.3),
            monthlyViews: blogs.reduce((sum, blog) => sum + (blog.views || 0), 0),
            popularBlogs: blogs.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3)
          }
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  // Quick Action Cards
  const QuickActionCard = ({ icon: Icon, title, description, onClick, color = "blue" }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white dark:bg-neutral-800 rounded-2xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-6 cursor-pointer hover:shadow-lg transition-all duration-300 group`}
      onClick={onClick}
    >
      <div className={`w-12 h-12 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
        {title}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
        {description}
      </p>
    </motion.div>
  );

  // Stats Card Component
  const StatsCard = ({ icon: Icon, title, value, change, color = "blue" }) => (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <IoTrendingUpOutline className="w-4 h-4" />
            <span>{change > 0 ? '+' : ''}{change}%</span>
          </div>
        )}
      </div>
      <h3 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
        {value}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
        {title}
      </p>
    </div>
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <Sidebar component={component} setComponent={setComponent}/>
        <div className="flex-1 ml-72 pt-20 p-6 overflow-auto">
        <AnimatePresence mode="wait">
          {loading && component === "Dashboard" ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-64"
            >
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          ) : component === "Dashboard" ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Welcome Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Welcome back, {profile?.user?.name || 'User'}! 👋
                      </h1>
                      <p className="text-blue-100 text-lg">
                        Here's what's happening with your blog today.
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <IoStatsChartOutline className="w-10 h-10" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                <StatsCard
                  icon={IoBookOutline}
                  title="Total Blogs"
                  value={dashboardData.totalBlogs}
                  change={12}
                  color="blue"
                />
                <StatsCard
                  icon={IoEyeOutline}
                  title="Total Views"
                  value={dashboardData.totalViews.toLocaleString()}
                  change={8}
                  color="green"
                />
                <StatsCard
                  icon={IoHeartOutline}
                  title="Likes Received"
                  value={Math.floor(dashboardData.totalViews * 0.15).toLocaleString()}
                  change={-2}
                  color="red"
                />
                <StatsCard
                  icon={IoShareOutline}
                  title="Shares"
                  value={Math.floor(dashboardData.totalViews * 0.08).toLocaleString()}
                  change={15}
                  color="purple"
                />
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <QuickActionCard
                    icon={IoCreateOutline}
                    title="Create Blog"
                    description="Write and publish a new blog post"
                    onClick={() => setComponent("Create Blog")}
                    color="green"
                  />
                  <QuickActionCard
                    icon={IoAnalyticsOutline}
                    title="View Analytics"
                    description="Check your blog performance metrics"
                    onClick={() => toast.success("Analytics feature coming soon!")}
                    color="blue"
                  />
                  <QuickActionCard
                    icon={IoGlobeOutline}
                    title="View Site"
                    description="Visit your public blog site"
                    onClick={() => navigate("/")}
                    color="purple"
                  />
                  <QuickActionCard
                    icon={IoSettingsOutline}
                    title="Settings"
                    description="Manage your account settings"
                    onClick={() => setComponent("My Profile")}
                    color="orange"
                  />
                </div>
              </motion.div>

              {/* Recent Blogs & Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Blogs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                      Recent Blogs
                    </h2>
                    <button
                      onClick={() => setComponent("My Blogs")}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {dashboardData.recentBlogs.length > 0 ? (
                      dashboardData.recentBlogs.map((blog, index) => (
                        <div key={blog._id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                            {blog.blogImage?.url ? (
                              <img src={blog.blogImage.url} alt={blog.title} className="w-full h-full object-cover" />
                            ) : (
                              <IoBookOutline className="w-6 h-6 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm truncate">
                              {blog.title}
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                              {new Date(blog.createdAt).toLocaleDateString()} • {blog.views || 0} views
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <IoEyeOutline className="w-4 h-4 text-neutral-400" />
                            <span className="text-xs text-neutral-500">{blog.views || 0}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <IoBookOutline className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                          No blogs yet. Create your first blog to get started!
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Performance Analytics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                      Performance
                    </h2>
                    <IoRefreshOutline className="w-5 h-5 text-neutral-400" />
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                          <IoStatsChartOutline className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                            Weekly Views
                          </p>
                          <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                            Last 7 days
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          {dashboardData.analytics.weeklyViews}
                        </p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <IoTrendingUpOutline className="w-3 h-3" />
                          +12%
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <IoCalendarOutline className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                            Monthly Views
                          </p>
                          <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                            Last 30 days
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {dashboardData.analytics.monthlyViews}
                        </p>
                        <p className="text-xs text-blue-600 flex items-center gap-1">
                          <IoTrendingUpOutline className="w-3 h-3" />
                          +8%
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <IoHeartOutline className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                            Engagement Rate
                          </p>
                          <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                            Likes & Comments
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">
                          4.2%
                        </p>
                        <p className="text-xs text-purple-600 flex items-center gap-1">
                          <IoTrendingUpOutline className="w-3 h-3" />
                          +3%
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Popular Blogs */}
              {dashboardData.analytics.popularBlogs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-6"
                >
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                    Popular Blogs
                  </h2>
                  <div className="space-y-4">
                    {dashboardData.analytics.popularBlogs.map((blog, index) => (
                      <div key={blog._id} className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-700/50 dark:to-neutral-600/50">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm truncate">
                            {blog.title}
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <IoEyeOutline className="w-4 h-4 text-neutral-400" />
                          <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            {blog.views || 0}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : component === "My Profile" ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
          <MyProfile />
            </motion.div>
          ) : component === "My Blogs" ? (
            <motion.div
              key="blogs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MyBlog />
            </motion.div>
        ) : component === "Create Blog" ? (
            <motion.div
              key="create"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
          <CreateBlog />
            </motion.div>
        ) : component === "Update" ? (
            <motion.div
              key="update"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
          <Update />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
