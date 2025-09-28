import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { 
  IoTimeOutline, 
  IoEyeOutline, 
  IoHeartOutline, 
  IoBookmarkOutline,
  IoTrendingUpOutline,
  IoStarOutline,
  IoChevronForwardOutline,
  IoPersonCircleOutline,
  IoFlameOutline,
  IoArrowForwardOutline
} from "react-icons/io5";

function Trending() {
  const { blogs } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [blogs]);

  // Enhanced responsive settings for the carousel - smaller cards
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
    },
  };

  // Enhanced loading skeleton component - smaller cards
  const LoadingCard = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-32 bg-gradient-to-r from-gray-200 to-gray-300"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
        <div className="flex items-center space-x-2 pt-2">
          <div className="w-6 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
          <div className="space-y-1">
            <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
            <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-12"></div>
          </div>
        </div>
      </div>
    </div>
  );

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

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
              <IoFlameOutline className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Trending Now
            </h2>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the hottest content that's setting the community on fire
          </p>
        </motion.div>

        {/* Enhanced Trending Blogs Carousel */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            >
              {[1, 2, 3, 4].map((i) => (
                <LoadingCard key={i} />
              ))}
            </motion.div>
          ) : blogs && blogs.length > 0 ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Carousel
                responsive={responsive}
                itemClass="px-3"
                containerClass="pb-8"
                showDots={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                customTransition="all .5s"
                transitionDuration={500}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                className="trending-carousel"
              >
                {blogs.map((element, index) => (
                  <motion.div
                    key={element._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <Link
                      to={`/blog/${element._id}`}
                      className="group block h-full"
                    >
                      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col overflow-hidden border border-gray-100 hover:border-orange-200">
                        {/* Compact Image Section */}
                        <div className="relative overflow-hidden">
                          <img
                            src={element.blogImage?.url || '/api/placeholder/400/250'}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                            alt={element.title}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400x200/ff6b6b/ffffff?text=Trending+Blog';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Compact Read Time */}
                          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-xs">
                            <IoTimeOutline className="w-2 h-2 inline mr-1" />
                            5m
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Compact Content Section */}
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="text-sm font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-200 mb-2 line-clamp-2">
                            {element.title}
                          </h3>
                          
                          <p className="text-gray-600 text-xs mb-3 line-clamp-2 flex-grow">
                            {element.description || "Discover amazing insights and stories from our community..."}
                          </p>

                          {/* Compact Stats */}
                          <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <IoEyeOutline className="w-3 h-3 text-blue-500" />
                              <span>0</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <IoHeartOutline className="w-3 h-3 text-red-500" />
                              <span>0</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <IoBookmarkOutline className="w-3 h-3 text-purple-500" />
                              <span>0</span>
                            </div>
                          </div>

                          {/* Compact Author Section */}
                          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                              <div className="relative">
                                <img
                                  src={element.adminPhoto || '/api/placeholder/40/40'}
                                  alt={element.adminName}
                                  className="w-6 h-6 rounded-full object-cover border border-white shadow-sm"
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/24x24/6366f1/ffffff?text=' + (element.adminName?.charAt(0) || 'A');
                                  }}
                                />
                                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-white"></div>
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 text-xs">
                                  {element.adminName || 'Anonymous'}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatDate(element.createdAt)}
                                </p>
                              </div>
                            </div>
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <IoArrowForwardOutline className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </Carousel>
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
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IoFlameOutline className="w-10 h-10 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  No Trending Content Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Be the first to create amazing content and watch it trend! Your creativity could be the next big thing.
                </p>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <IoPersonCircleOutline className="w-5 h-5 mr-2" />
                  Create Your First Blog
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Button */}
        {blogs && blogs.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/blogs"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore All Trending Blogs
              <IoArrowForwardOutline className="ml-2 w-5 h-5" />
            </Link>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .trending-carousel .react-multi-carousel-dot-list {
          bottom: -40px;
        }
        .trending-carousel .react-multi-carousel-dot button {
          border: none;
          background: #fbbf24;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin: 0 4px;
        }
        .trending-carousel .react-multi-carousel-dot--active button {
          background: linear-gradient(to right, #f97316, #dc2626);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}

export default Trending;
