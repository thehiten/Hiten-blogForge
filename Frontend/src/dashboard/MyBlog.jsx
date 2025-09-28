import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "../components/Pagination";
import LoadMore from "../components/LoadMore";
import { 
  IoCreateOutline, 
  IoTrashOutline, 
  IoEyeOutline, 
  IoTimeOutline, 
  IoCalendarOutline,
  IoBookOutline,
  IoPersonOutline,
  IoAddOutline,
  IoPencilOutline,
  IoEllipsisVerticalOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
  IoSettingsOutline,
  IoGridOutline,
  IoListOutline,
  IoRefreshOutline
} from "react-icons/io5";
import toast from "react-hot-toast";

function MyBlog() {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [showActionsMenu, setShowActionsMenu] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [paginationMode, setPaginationMode] = useState("pagination");
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://hiten-blogforge-1.onrender.com/api/blog/getMyBlog", {
          withCredentials: true,
        });
        setMyBlogs(response.data);
      } catch (error) {
        setError("Failed to load your blogs");
        toast.error("Failed to load your blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, []);

  // Update displayed blogs based on pagination
  useEffect(() => {
    if (paginationMode === "pagination") {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setDisplayedBlogs(myBlogs.slice(startIndex, endIndex));
    } else {
      const endIndex = currentPage * itemsPerPage;
      setDisplayedBlogs(myBlogs.slice(0, endIndex));
    }
  }, [myBlogs, currentPage, itemsPerPage, paginationMode]);

  const handleDelete = async (blogId) => {
    try {
      setDeleting(blogId);
      await axios.delete(`https://hiten-blogforge-1.onrender.com/api/blog/delete/${blogId}`, {
        withCredentials: true,
      });
      setMyBlogs(myBlogs.filter((blog) => blog._id !== blogId));
      toast.success("Blog deleted successfully");
    } catch (error) {
      toast.error("Failed to delete blog");
    } finally {
      setDeleting(null);
    }
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  // Handle actions menu
  const handleActionsMenu = (blogId) => {
    setShowActionsMenu(showActionsMenu === blogId ? null : blogId);
  };

  // Close actions menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.actions-menu')) {
        setShowActionsMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalPages = Math.ceil(myBlogs.length / itemsPerPage);
  const hasMore = displayedBlogs.length < myBlogs.length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays < 7) return `${diffDays - 1} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const getBlogStatus = (createdAt) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return { label: "New", color: "bg-green-500" };
    if (diffDays <= 7) return { label: "Recent", color: "bg-blue-500" };
    return { label: "Published", color: "bg-neutral-500" };
  };

  // Loading skeleton component
  const LoadingCard = () => (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <div className="skeleton h-48 w-full"></div>
      <div className="p-6 space-y-4">
        <div className="skeleton h-6 w-3/4 rounded"></div>
        <div className="skeleton h-4 w-full rounded"></div>
        <div className="flex items-center justify-between">
          <div className="skeleton h-8 w-20 rounded"></div>
          <div className="skeleton h-8 w-20 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-2">
                My Blogs
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Manage and organize your published content
              </p>
            </div>
            <Link
              to="/dashboard/create"
              className="btn-primary inline-flex items-center gap-2 group"
            >
              <IoAddOutline className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              Create New Blog
            </Link>
          </div>
        </motion.div>

        {/* Stats Section */}
        {!loading && myBlogs.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 mb-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <IoBookOutline className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {myBlogs.length}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">Total Blogs</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <IoEyeOutline className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                0
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">Total Views</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <IoTimeOutline className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {myBlogs.filter(blog => {
                  const date = new Date(blog.createdAt);
                  const now = new Date();
                  const diffTime = Math.abs(now - date);
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 7;
                }).length}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">This Week</p>
            </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
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

              {/* Items Per Page Control */}
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
                  <option value={6}>6</option>
                  <option value={9}>9</option>
                  <option value={12}>12</option>
                  <option value={18}>18</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <IoWarningOutline className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Error Loading Blogs
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary inline-flex items-center gap-2 group"
              >
                <IoRefreshOutline className="w-5 h-5 group-hover:rotate-180 transition-transform duration-200" />
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        {/* Blogs Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <LoadingCard key={i} />
              ))}
            </motion.div>
          ) : displayedBlogs && displayedBlogs.length > 0 ? (
            <motion.div
              key={`${viewMode}-${currentPage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-4"
              }
            >
              {displayedBlogs.map((element, index) => (
                <motion.div
                  key={element._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group"
                >
                  <div className={`card card-hover overflow-hidden ${
                    viewMode === "grid" 
                      ? "h-full flex flex-col" 
                      : "flex flex-row h-32"
                  }`}>
                    {/* Image Section */}
                    <div className={`relative overflow-hidden ${
                      viewMode === "grid" ? "w-full" : "w-32 flex-shrink-0"
                    }`}>
                      <Link to={`/blog/${element._id}`}>
                        <img
                          src={element.blogImage?.url || '/api/placeholder/400/250'}
                          className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                            viewMode === "grid" ? "w-full h-48" : "w-full h-full"
                          }`}
                          alt={element.title}
                        />
                      </Link>
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <div className={`flex items-center gap-1 ${getBlogStatus(element.createdAt).color} text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg`}>
                          <IoCheckmarkCircleOutline className="w-3 h-3" />
                          {getBlogStatus(element.createdAt).label}
                        </div>
                      </div>

                      {/* Actions Menu */}
                      <div className="absolute top-4 right-4">
                        <div className="relative actions-menu">
                          <button 
                            onClick={() => handleActionsMenu(element._id)}
                            className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors"
                          >
                            <IoEllipsisVerticalOutline className="w-4 h-4" />
                          </button>
                          
                          {/* Actions Dropdown */}
                          {showActionsMenu === element._id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              className="absolute right-0 top-12 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 py-2 z-50"
                            >
                              <Link
                                to={`/blog/update/${element._id}`}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                                onClick={() => setShowActionsMenu(null)}
                              >
                                <IoPencilOutline className="w-4 h-4" />
                                Edit Blog
                              </Link>
                              <Link
                                to={`/blog/${element._id}`}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                                onClick={() => setShowActionsMenu(null)}
                              >
                                <IoEyeOutline className="w-4 h-4" />
                                View Blog
                              </Link>
                              <button
                                onClick={() => {
                                  handleDelete(element._id);
                                  setShowActionsMenu(null);
                                }}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
                              >
                                <IoTrashOutline className="w-4 h-4" />
                                Delete Blog
                              </button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className={`flex flex-col ${
                      viewMode === "grid" ? "p-6 flex-grow" : "p-4 flex-grow"
                    }`}>
                      <Link to={`/blog/${element._id}`}>
                        <h3 className={`font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-gradient transition-colors duration-200 ${
                          viewMode === "grid" 
                            ? "text-xl mb-3 text-truncate-2" 
                            : "text-lg mb-2 line-clamp-1"
                        }`}>
                          {element.title}
                        </h3>
                      </Link>
                      
                      <p className={`text-neutral-600 dark:text-neutral-400 flex-grow ${
                        viewMode === "grid" 
                          ? "text-sm mb-4 text-truncate-3" 
                          : "text-xs mb-2 line-clamp-2"
                      }`}>
                        {element.description || "Discover amazing insights and stories from our community..."}
                      </p>

                      {/* Meta Information */}
                      <div className={`flex items-center gap-4 text-neutral-500 dark:text-neutral-400 ${
                        viewMode === "grid" ? "mb-4 text-sm" : "mb-2 text-xs"
                      }`}>
                        <div className="flex items-center gap-1">
                          <IoCalendarOutline className="w-4 h-4" />
                          <span>{formatDate(element.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <IoEyeOutline className="w-4 h-4" />
                          <span>0</span>
                        </div>
                      </div>

                      {/* Author Info */}
                      <div className={`flex items-center gap-3 ${
                        viewMode === "grid" ? "mb-6" : "mb-3"
                      }`}>
                        <img
                          src={element.adminPhoto || '/api/placeholder/40/40'}
                          alt={element.adminName}
                          className={`rounded-full object-cover border-2 border-white dark:border-neutral-800 shadow-md ${
                            viewMode === "grid" ? "w-10 h-10" : "w-8 h-8"
                          }`}
                        />
                        <div>
                          <p className={`font-semibold text-neutral-900 dark:text-neutral-100 ${
                            viewMode === "grid" ? "text-sm" : "text-xs"
                          }`}>
                            {element.adminName || 'You'}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            Author
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {viewMode === "grid" && (
                        <div className="flex gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                          <Link
                            to={`/blog/update/${element._id}`}
                            className="flex-1 btn-outline text-sm py-2 inline-flex items-center justify-center gap-2 group"
                          >
                            <IoPencilOutline className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                            Edit
                          </Link>
                          <Link
                            to={`/blog/${element._id}`}
                            className="flex-1 btn-ghost text-sm py-2 inline-flex items-center justify-center gap-2 group"
                          >
                            <IoEyeOutline className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                            View
                          </Link>
                          <button
                            onClick={() => handleDelete(element._id)}
                            disabled={deleting === element._id}
                            className="px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                          >
                            {deleting === element._id ? (
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <IoTrashOutline className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IoBookOutline className="w-12 h-12 text-primary-500" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  No Blogs Yet
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Start your blogging journey by creating your first amazing content
                </p>
                <Link
                  to="/dashboard/create"
                  className="btn-primary inline-flex items-center gap-2 group"
                >
                  <IoCreateOutline className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  Create Your First Blog
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination or Load More */}
        {!loading && myBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            {paginationMode === "pagination" ? (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalItems={myBlogs.length}
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

export default MyBlog;
