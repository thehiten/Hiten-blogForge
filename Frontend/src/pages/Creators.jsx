import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoPersonOutline, 
  IoMailOutline, 
  IoGlobeOutline, 
  IoStarOutline,
  IoBookOutline,
  IoEyeOutline,
  IoHeartOutline,
  IoTrophyOutline,
  IoSparklesOutline
} from 'react-icons/io5';

function Creator() {
  const [admin, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/user/getAdmins', {
          withCredentials: true
        });
        console.log(response.data);
        setAdmins(response.data || []);
      } catch (error) {
        console.error('Error fetching creators:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

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
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Discover the talented individuals behind our amazing content. Each creator brings unique perspectives and expertise to our community.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-neutral-600 dark:text-neutral-400">Loading creators...</p>
            </div>
          </div>
        ) : admin && admin.length > 0 ? (
          <>
            {/* Featured Creators Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16"
            >
              {admin.map((creator, index) => (
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
                            {Math.floor(Math.random() * 20) + 5}
                          </p>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400">Posts</p>
                        </div>
                        <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl">
                          <IoEyeOutline className="w-5 h-5 text-green-500 mx-auto mb-1" />
                          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            {Math.floor(Math.random() * 1000) + 100}k
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
              ))}
            </motion.div>

            {/* Carousel Section for Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="block lg:hidden"
            >
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 text-center">
                Featured Creators
              </h2>
              <Carousel
                responsive={responsive}
                itemClass="px-2"
                className="pb-8"
                autoPlay={true}
                autoPlaySpeed={3000}
                infinite={true}
                customTransition="all .5"
                transitionDuration={500}
              >
                {admin.map((creator) => (
                  <div key={creator._id} className="h-full">
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-6 mx-2 h-full">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 mb-4">
                          <img
                            src={creator.photo?.url || '/api/placeholder/80/80'}
                            alt={creator.name}
                            className="w-full h-full rounded-full object-cover"
                          />
              </div>
                        <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                          {creator.name}
                        </h3>
                        <p className="text-purple-600 dark:text-purple-400 text-sm mb-4">
                          {creator.role || 'Content Creator'}
                        </p>
                        <Link
                          to={`/blog/${creator._id}`}
                          className="inline-block py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                        >
                          View Profile
            </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </motion.div>
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
                <IoPersonOutline className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                No Creators Yet
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                We're working on bringing amazing creators to our platform. Check back soon!
              </p>
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
