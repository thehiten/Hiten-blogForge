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
  IoPersonCircleOutline
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

  // Responsive settings for the carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
    },
  };

  // Loading skeleton component
  const LoadingCard = () => (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <div className="skeleton h-32 w-full"></div>
      <div className="p-4 space-y-3">
        <div className="skeleton h-5 w-3/4 rounded"></div>
        <div className="skeleton h-3 w-full rounded"></div>
        <div className="flex items-center space-x-2">
          <div className="skeleton w-8 h-8 rounded-full"></div>
          <div className="space-y-1">
            <div className="skeleton h-3 w-16 rounded"></div>
            <div className="skeleton h-2 w-12 rounded"></div>
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
    <section className="py-8 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <IoTrendingUpOutline className="w-6 h-6 text-gradient" />
            <h2 className="text-2xl md:text-3xl font-bold text-gradient">
              Trending Blogs
            </h2>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Discover the most engaging content from our community
          </p>
        </motion.div>

        {/* Trending Blogs Carousel */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
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
                containerClass="trending-carousel"
                showDots={true}
                arrows={true}
                infinite={true}
                autoPlay={false}
                keyBoardControl={true}
                customDot={<div className="w-2 h-2 bg-neutral-300 dark:bg-neutral-600 rounded-full mx-1"></div>}
                customActiveDot={<div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-1"></div>}
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
                      <div className="card card-hover h-full flex flex-col overflow-hidden">
                        {/* Image Section */}
                        <div className="relative overflow-hidden">
                          <img
                            src={element.blogImage?.url || '/api/placeholder/400/250'}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                            alt={element.title}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Trending Badge */}
                          <div className="absolute top-2 left-2">
                            <div className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
                              <IoStarOutline className="w-2 h-2" />
                              Trending
                            </div>
                          </div>

                          {/* Read Time */}
                          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                            <IoTimeOutline className="w-2 h-2 inline mr-1" />
                            5m
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-gradient transition-colors duration-200 text-truncate-2">
                            {element.title}
                          </h3>
                          
                          <p className="text-neutral-600 dark:text-neutral-400 text-xs mb-3 text-truncate-2 flex-grow">
                            {element.description || "Discover amazing insights and stories from our community..."}
                          </p>

                          {/* Stats */}
                          <div className="flex items-center gap-3 mb-3 text-xs text-neutral-500 dark:text-neutral-400">
                            <div className="flex items-center gap-1">
                              <IoEyeOutline className="w-3 h-3" />
                              <span>1.2k</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <IoHeartOutline className="w-3 h-3" />
                              <span>89</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <IoBookmarkOutline className="w-3 h-3" />
                              <span>34</span>
                            </div>
                          </div>

                          {/* Author Section */}
                          <div className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-neutral-700">
                            <div className="flex items-center gap-2">
                              <img
                                src={element.adminPhoto || '/api/placeholder/40/40'}
                                alt={element.adminName}
                                className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-neutral-800 shadow-md"
                              />
                              <div>
                                <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs">
                                  {element.adminName || 'Anonymous'}
                                </p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                  {formatDate(element.createdAt)}
                                </p>
                              </div>
                            </div>
                            <IoChevronForwardOutline className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200" />
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
              className="text-center py-8"
            >
              <div className="max-w-sm mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IoBookmarkOutline className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  No Trending Blogs Yet
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  Be the first to create amazing content and watch it trend!
                </p>
                <Link
                  to="/dashboard"
                  className="btn-primary text-sm inline-flex items-center gap-2"
                >
                  <IoPersonCircleOutline className="w-4 h-4" />
                  Create Your First Blog
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Trending;
