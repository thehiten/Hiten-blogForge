import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Trending() {
  const { blogs } = useAuth();

  // Responsive settings for the carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-2xl font-semibold text-blue-400 mb-4">
        <span className="text-purple-400">Trending</span> Blogs
      </h1>
      <Carousel
        responsive={responsive}
        itemClass="p-2" // Adjusted to ensure proper spacing
      >
        {blogs && blogs.length > 0 ? (
          blogs.map((element) => (
            <Link
              to={`/blog/${element._id}`}
              key={element._id}
              className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
              style={{ height: '400px' }} // Ensuring a fixed height for all boxes
            >
              <div className="h-full flex flex-col justify-between">
                <img
                  src={element.blogImage.url}
                  className="w-full h-48 object-cover" // Fixed image height
                  alt={element.title}
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h1 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {element.title}
                  </h1>
                  <div className="flex items-center gap-3">
                    <img
                      src={element.adminPhoto}
                      alt={element.adminName}
                      className="w-12 h-12 rounded-full border-2 border-purple-500 shadow-md"
                    />
                    <div>
                      <span className="font-medium text-gray-700">
                        {element.adminName}
                      </span>
                      <p className="text-sm text-gray-500">New</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center text-gray-700">No blogs available.</div>
        )}
      </Carousel>
    </div>
  );
}

export default Trending;
