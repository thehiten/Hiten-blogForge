import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Hero() {
  const { blogs } = useAuth();

  return (
    <div className="container mx-auto my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 4).map((element) => (
          <Link
            to={`/blog/${element._id}`}
            key={element._id}
            className="bg-slate-100 border rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div className="flex flex-col h-full">
              <img
                src={element.blogImage.url}
                className="w-full h-48 object-cover"
                alt={element.title}
              />
              <div className="flex-grow">
                <h1 className="text-lg font-bold p-4">{element.title}</h1>
              </div>
              <div className="p-4 flex items-center">
                <img
                  src={element.adminPhoto}
                  alt={element.adminName}
                  className="w-10 h-10 rounded-full border-2 border-purple-400 shadow-sm"
                />
                <div className="ml-4">
                  <span className="font-medium">{element.adminName}</span>
                  <p className="text-sm text-gray-500">New</p>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div>No blogs available.</div>
      )}
    </div>
  );
}

export default Hero;
