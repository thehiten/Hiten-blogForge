import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { 
  IoTimeOutline, 
  IoPersonOutline, 
  IoEyeOutline, 
  IoHeartOutline,
  IoBookmarkOutline,
  IoShareSocialOutline,
  IoArrowForwardOutline
} from "react-icons/io5";

function Hero() {
  const { blogs } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content?.split(' ').length || 0;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  if (!blogs || blogs.length === 0) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full flex items-center justify-center">
              <IoBookmarkOutline className="w-12 h-12 text-primary-500" />
            </div>
            <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              No blogs available yet
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
              Be the first to share your thoughts and experiences with the community.
            </p>
            <Link
              to="/dashboard"
              className="btn-primary inline-flex items-center gap-2"
            >
              <IoArrowForwardOutline className="w-4 h-4" />
              Create Your First Blog
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-primary-50/30 dark:from-neutral-900 dark:to-primary-900/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-4 leading-tight">
            <span className="block">Discover Amazing</span>
            <span className="text-gradient block">Stories & Insights</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Explore thought-provoking articles, creative stories, and expert insights from our community of writers and creators.
          </p>
        </motion.div>

        {/* Featured Blogs Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {blogs.slice(0, 8).map((blog, index) => (
            <motion.div
              key={blog._id}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="group"
            >
              <Link to={`/blog/${blog._id}`} className="block">
                <article className="card card-hover h-full overflow-hidden">
                  {/* Blog Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={blog.blogImage?.url || '/api/placeholder/400/250'}
                      alt={blog.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Featured Badge */}
                    {index < 2 && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Blog Content */}
                  <div className="p-6 flex flex-col h-full">
                    {/* Category/Tags */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 text-xs font-medium rounded-full">
                        {blog.category || 'General'}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-display font-bold text-neutral-900 dark:text-neutral-100 mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {blog.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-3 flex-grow">
                      {blog.description || blog.content?.substring(0, 120) + '...'}
                    </p>

                    {/* Meta Information */}
                    <div className="space-y-3">
                      {/* Author & Date */}
                      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {blog.adminName?.charAt(0)?.toUpperCase() || 'A'}
                            </span>
                          </div>
                          <span className="font-medium">{blog.adminName || 'Anonymous'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <IoTimeOutline className="w-3 h-3" />
                          <span>{formatDate(blog.createdAt)}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <IoEyeOutline className="w-3 h-3" />
                            <span>0</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <IoHeartOutline className="w-3 h-3" />
                            <span>0</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <IoTimeOutline className="w-3 h-3" />
                          <span>{calculateReadTime(blog.content)} min read</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              // Handle bookmark
                            }}
                            className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            aria-label="Bookmark"
                          >
                            <IoBookmarkOutline className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              // Handle share
                            }}
                            className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            aria-label="Share"
                          >
                            <IoShareSocialOutline className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-primary-600 dark:text-primary-400 text-xs font-medium group-hover:translate-x-1 transition-transform">
                          Read More
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/blogs"
            className="btn-outline inline-flex items-center gap-2"
          >
            View All Blogs
            <IoArrowForwardOutline className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
