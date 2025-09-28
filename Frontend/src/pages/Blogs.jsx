import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "../components/Pagination";
import LoadMore from "../components/LoadMore";
import { 
  IoSearchOutline,
  IoFilterOutline,
  IoEyeOutline,
  IoTimeOutline,
  IoPersonOutline,
  IoCalendarOutline,
  IoTrendingUpOutline,
  IoBookOutline,
  IoGridOutline,
  IoListOutline,
  IoRefreshOutline,
  IoSettingsOutline
} from "react-icons/io5";

function Blogs() {
  const { blogs } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, popular
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [paginationMode, setPaginationMode] = useState("pagination"); // pagination or loadmore
  const [displayedBlogs, setDisplayedBlogs] = useState([]);

  // Filter and sort blogs
  useEffect(() => {
    if (!blogs) {
      setLoading(false);
      return;
    }

    let filtered = [...blogs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.adminName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort blogs
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "popular":
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      default:
        break;
    }

    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
    setLoading(false);
  }, [blogs, searchTerm, sortBy]);

  // Update displayed blogs based on pagination
  useEffect(() => {
    if (paginationMode === "pagination") {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setDisplayedBlogs(filteredBlogs.slice(startIndex, endIndex));
    } else {
      // For load more mode, show all blogs up to current page * itemsPerPage
      const endIndex = currentPage * itemsPerPage;
      setDisplayedBlogs(filteredBlogs.slice(0, endIndex));
    }
  }, [filteredBlogs, currentPage, itemsPerPage, paginationMode]);

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const hasMore = displayedBlogs.length < filteredBlogs.length;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get relative time
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(dateString);
  };

  // Compact Blog Card Component
  const BlogCard = ({ blog, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group"
    >
      <Link
        to={`/blog/${blog._id}`}
        className="block h-full"
      >
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group-hover:-translate-y-1">
          {/* Compact Image */}
          <div className="relative overflow-hidden">
            <img
              src={blog.blogImage?.url || '/api/placeholder/400/250'}
              alt={blog.title}
              className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x200/3b82f6/ffffff?text=Blog+Post';
              }}
            />
            <div className="absolute top-2 left-2">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                Featured
              </span>
            </div>
            <div className="absolute top-2 right-2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-lg px-1.5 py-0.5 flex items-center gap-1">
              <IoEyeOutline className="w-2 h-2 text-neutral-600 dark:text-neutral-400" />
              <span className="text-xs text-neutral-600 dark:text-neutral-400">
                {blog.views || 0}
              </span>
            </div>
          </div>

          {/* Compact Content */}
          <div className="p-4">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {blog.title}
            </h3>
            
            <div className="flex items-center gap-2 mb-3">
              <div className="relative">
                <img
                  src={blog.adminPhoto || '/api/placeholder/40/40'}
                  alt={blog.adminName}
                  className="w-6 h-6 rounded-full object-cover border border-white dark:border-neutral-700 shadow-sm"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/24x24/6366f1/ffffff?text=' + (blog.adminName?.charAt(0) || 'A');
                  }}
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-neutral-800"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-neutral-900 dark:text-neutral-100 text-xs truncate">
                  {blog.adminName}
                </p>
                <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                  <IoTimeOutline className="w-2 h-2" />
                  <span>{getRelativeTime(blog.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Compact Stats */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-700">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                  <IoEyeOutline className="w-2 h-2" />
                  <span>{blog.views || 0}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                  <IoCalendarOutline className="w-2 h-2" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs font-medium">
                <span>Read</span>
                <IoTrendingUpOutline className="w-2 h-2" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  // List View Component
  const BlogListItem = ({ blog, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group"
    >
      <Link
        to={`/blog/${blog._id}`}
        className="block"
      >
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-0.5">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 relative">
              <img
                src={blog.blogImage?.url || '/api/placeholder/400/250'}
                alt={blog.title}
                className="w-full h-48 md:h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Featured
                </span>
              </div>
            </div>
            
            <div className="md:w-2/3 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {blog.title}
                </h3>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <img
                      src={blog.adminPhoto || '/api/placeholder/40/40'}
                      alt={blog.adminName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-neutral-700 shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                      {blog.adminName}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                      <IoTimeOutline className="w-3 h-3" />
                      <span>{getRelativeTime(blog.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center gap-1">
                    <IoEyeOutline className="w-3 h-3" />
                    <span>{blog.views || 0} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IoCalendarOutline className="w-3 h-3" />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs font-medium">
                  <span>Read more</span>
                  <IoTrendingUpOutline className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 pt-20">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 pt-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Discover Amazing <span className="text-yellow-300">Blogs</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-blue-100 mb-8"
            >
              Explore insights, stories, and knowledge from our community of creators
            </motion.p>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative max-w-md mx-auto"
            >
              <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm border-0 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-8 py-8">
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6 mb-8"
        >
          {/* Top Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 rounded-lg p-1 shadow-soft border border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-500 text-white"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  <IoGridOutline className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-500 text-white"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  <IoListOutline className="w-5 h-5" />
                </button>
              </div>

              {/* Sort Options */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2 text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>

              {/* Pagination Mode Toggle */}
              <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 rounded-lg p-1 shadow-soft border border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={() => setPaginationMode("pagination")}
                  className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    paginationMode === "pagination"
                      ? "bg-blue-500 text-white"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  Pages
                </button>
                <button
                  onClick={() => setPaginationMode("loadmore")}
                  className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    paginationMode === "loadmore"
                      ? "bg-blue-500 text-white"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  Load More
                </button>
              </div>
            </div>

            {/* Results Counter */}
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {/* Items Per Page Control */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <IoSettingsOutline className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-1 text-sm text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={12}>12</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Blogs Grid/List */}
        <AnimatePresence mode="wait">
          {displayedBlogs.length > 0 ? (
            <motion.div
              key={`${viewMode}-${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                  : "space-y-4"
              }
            >
              {displayedBlogs.map((blog, index) =>
                viewMode === "grid" ? (
                  <BlogCard key={blog._id} blog={blog} index={index} />
                ) : (
                  <BlogListItem key={blog._id} blog={blog} index={index} />
                )
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <IoBookOutline className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                No blogs found
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "No blogs are available at the moment"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination or Load More */}
        {filteredBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            {paginationMode === "pagination" ? (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalItems={filteredBlogs.length}
                className="justify-center"
              />
            ) : (
              <LoadMore
                hasMore={hasMore}
                loading={false}
                onLoadMore={handleLoadMore}
                loadingText="Loading more blogs..."
                loadMoreText="Load More Blogs"
                noMoreText="You've reached the end! 🎉"
              />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Blogs;
