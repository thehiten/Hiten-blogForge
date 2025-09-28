import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Pagination from '../components/Pagination';
import LoadMore from '../components/LoadMore';
import { 
  IoPersonOutline, 
  IoMailOutline, 
  IoGlobeOutline, 
  IoStarOutline,
  IoBookOutline,
  IoEyeOutline,
  IoHeartOutline,
  IoTrophyOutline,
  IoSparklesOutline,
  IoSettingsOutline,
  IoGridOutline,
  IoListOutline,
  IoSearchOutline,
  IoFilterOutline
} from 'react-icons/io5';

function Creator() {
  const [admin, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [paginationMode, setPaginationMode] = useState("pagination");
  const [displayedCreators, setDisplayedCreators] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCreators, setFilteredCreators] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://hiten-blogforge-1.onrender.com/api/user/getAdmins', {
          withCredentials: true
        });
        setAdmins(response.data || []);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  // Filter creators based on search term
  useEffect(() => {
    if (!admin || admin.length === 0) {
      setFilteredCreators([]);
      return;
    }

    let filtered = [...admin];

    if (searchTerm) {
      filtered = filtered.filter(creator =>
        creator.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.role?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCreators(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [admin, searchTerm]);

  // Update displayed creators based on pagination
  useEffect(() => {
    if (paginationMode === "pagination") {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setDisplayedCreators(filteredCreators.slice(startIndex, endIndex));
    } else {
      // For load more mode, show all creators up to current page * itemsPerPage
      const endIndex = currentPage * itemsPerPage;
      setDisplayedCreators(filteredCreators.slice(0, endIndex));
    }
  }, [filteredCreators, currentPage, itemsPerPage, paginationMode]);

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const totalPages = Math.ceil(filteredCreators.length / itemsPerPage);
  const hasMore = displayedCreators.length < filteredCreators.length;

  // Responsive settings for the carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4, // Adjust the number of items based on the container width
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <IoSparklesOutline className="w-8 h-8 text-purple-500" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">
              Our Amazing Team
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Creators</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-8">
            Discover the talented individuals behind our amazing content. Each creator brings unique perspectives and expertise to our community.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-md mx-auto mb-8"
          >
            <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search creators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </motion.div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-neutral-600 dark:text-neutral-400">Loading creators...</p>
            </div>
          </div>
        ) : filteredCreators && filteredCreators.length > 0 ? (
          <>
            {/* Pagination Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8"
            >
              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 rounded-lg p-1 shadow-soft border border-neutral-200 dark:border-neutral-700">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "grid"
                        ? "bg-purple-500 text-white"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400"
                    }`}
                  >
                    <IoGridOutline className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "list"
                        ? "bg-purple-500 text-white"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400"
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
                        ? "bg-purple-500 text-white"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400"
                    }`}
                  >
                    Pages
                  </button>
                  <button
                    onClick={() => setPaginationMode("loadmore")}
                    className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                      paginationMode === "loadmore"
                        ? "bg-purple-500 text-white"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400"
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
                  className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-1 text-sm text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value={8}>8</option>
                  <option value={12}>12</option>
                  <option value={16}>16</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </motion.div>

            {/* Featured Creators Grid */}
            <motion.div
              key={`${viewMode}-${currentPage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16"
                  : "space-y-6 mb-16"
              }
            >
              {displayedCreators.map((creator, index) => (
                viewMode === "grid" ? (
                  <motion.div
                    key={creator._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-soft border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                      {/* Profile Image */}
                      <div className="relative p-8 text-center">
                        <div className="relative inline-block">
                          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                            <img
                              src={creator.photo?.url || '/api/placeholder/128/128'}
                              alt={creator.name}
                              className="w-full h-full rounded-full object-cover border-4 border-white dark:border-neutral-800"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-neutral-800 flex items-center justify-center">
                            <IoStarOutline className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Creator Info */}
                      <div className="px-6 pb-6">
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1 text-center">
                          {creator.name}
                        </h3>
                        <p className="text-purple-600 dark:text-purple-400 font-medium text-center mb-4">
                          {creator.role || 'Content Creator'}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl">
                            <IoBookOutline className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                              0
                            </p>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400">Posts</p>
                          </div>
                          <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl">
                            <IoEyeOutline className="w-5 h-5 text-green-500 mx-auto mb-1" />
                            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                              0
                            </p>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400">Views</p>
                          </div>
                        </div>

                        {/* Action Button */}
                        <Link
                          to={`/blog/${creator._id}`}
                          className="block w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-center group-hover:shadow-lg"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={creator._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-0.5">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 relative">
                          <div className="w-full h-48 md:h-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 flex items-center justify-center">
                            <img
                              src={creator.photo?.url || '/api/placeholder/400/300'}
                              alt={creator.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="absolute top-3 left-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white dark:border-neutral-800 flex items-center justify-center">
                              <IoStarOutline className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:w-2/3 p-6 flex flex-col justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {creator.name}
                            </h3>
                            <p className="text-purple-600 dark:text-purple-400 font-medium mb-4">
                              {creator.role || 'Content Creator'}
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center gap-2 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                                <IoBookOutline className="w-5 h-5 text-blue-500" />
                                <div>
                                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                    0
                                  </p>
                                  <p className="text-xs text-neutral-600 dark:text-neutral-400">Posts</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                                <IoEyeOutline className="w-5 h-5 text-green-500" />
                                <div>
                                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                    0
                                  </p>
                                  <p className="text-xs text-neutral-600 dark:text-neutral-400">Views</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-neutral-500 dark:text-neutral-400">
                              <span className="font-medium">Active Creator</span>
                            </div>
                            <Link
                              to={`/blog/${creator._id}`}
                              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                            >
                              View Profile
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </motion.div>

            {/* Pagination or Load More */}
            {filteredCreators.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12"
              >
                {paginationMode === "pagination" ? (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredCreators.length}
                    className="justify-center"
                  />
                ) : (
                  <LoadMore
                    hasMore={hasMore}
                    loading={false}
                    onLoadMore={handleLoadMore}
                    loadingText="Loading more creators..."
                    loadMoreText="Load More Creators"
                    noMoreText="You've seen all creators! 🎉"
                  />
                )}
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                {searchTerm ? (
                  <IoSearchOutline className="w-12 h-12 text-blue-500" />
                ) : (
                  <IoPersonOutline className="w-12 h-12 text-blue-500" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                {searchTerm ? 'No Creators Found' : 'No Creators Yet'}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms to find creators'
                  : 'We\'re working on bringing amazing creators to our platform. Check back soon!'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <IoSearchOutline className="w-4 h-4" />
                  Clear Search
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white text-center mt-16"
        >
          <div className="max-w-3xl mx-auto">
            <IoTrophyOutline className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to Join Our Creator Community?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Share your knowledge, connect with readers, and grow your audience on our platform.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <IoMailOutline className="w-5 h-5" />
              Get In Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Creator;
