import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

function Creator() {
  const [admin, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/user/getAdmins', {
          withCredentials: true
        });
        setAdmins(response.data);
        setError(null);
      } catch (error) {
        setError('Failed to load creators');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  // Enhanced responsive settings for the carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
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

  if (loading) {
    return (
      <div className="container mx-auto my-16 px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading creators...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto my-16 px-4">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-2">⚠️</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Meet Our Creators
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the talented individuals behind our amazing content
          </p>
        </div>

        {/* Enhanced Carousel */}
        <Carousel
          responsive={responsive}
          itemClass="px-3"
          containerClass="pb-4"
          showDots={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all .5s"
          transitionDuration={500}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          className="creator-carousel"
        >
          {admin && admin.length > 0 ? (
            admin.map((creator) => (
              <div key={creator._id} className="h-full">
                <Link
                  to={`/creators/${creator._id}`}
                  className="group block h-full"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 h-full flex flex-col items-center text-center border border-gray-100 hover:border-blue-200">
                    {/* Profile Image */}
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-400 p-1 bg-gradient-to-r from-blue-400 to-purple-400">
                        <img
                          src={creator.photo?.url || '/api/placeholder/80/80'}
                          className="w-full h-full object-cover rounded-full"
                          alt={creator.name}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/80x80/6366f1/ffffff?text=' + (creator.name?.charAt(0) || 'U');
                          }}
                        />
                      </div>
                      {/* Online Status Indicator */}
                      <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>

                    {/* Creator Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 mb-1">
                        {creator.name}
                      </h3>
                      <p className="text-sm text-purple-600 font-medium mb-2">
                        {creator.role}
                      </p>
                      <p className="text-xs text-gray-500 mb-4">
                        Content Creator
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="w-full">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        View Profile
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Creators Found</h3>
              <p className="text-gray-500">Check back later for amazing creators!</p>
            </div>
          )}
        </Carousel>

        {/* View All Button */}
        {admin && admin.length > 0 && (
          <div className="text-center mt-8">
            <Link
              to="/creators"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View All Creators
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .creator-carousel .react-multi-carousel-dot-list {
          bottom: -40px;
        }
        .creator-carousel .react-multi-carousel-dot button {
          border: none;
          background: #cbd5e1;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin: 0 4px;
        }
        .creator-carousel .react-multi-carousel-dot--active button {
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
        }
      `}</style>
    </section>
  );
}

export default Creator;
