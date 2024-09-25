import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Detail() {
    const { id } = useParams();
    const [blog, setBlog] = useState({});

    // Fetch blog data on component mount
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axios.get(`https://hiten-blogforge.onrender.com/api/blog/getSingleBlog/${id}`, {
                    withCredentials: true,
                });
                setBlog(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBlog(); // Call the async function
    }, [id]); // Ensure 'id' is used as the dependency

    return (
        <>
            {blog && (
                <section className="container mx-auto p-4 flex flex-col md:flex-row gap-4">
                    {/* Left Section: Admin Info, Title, and Description */}
                    <div className="flex-1">
                        {/* Admin Information */}
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={blog?.adminPhoto}
                                alt={blog?.adminName}
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <span className="text-gray-800 font-bold">
                                    {blog?.adminName}
                                </span>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="text-blue-400 uppercase text-2xl font-bold mb-4">
                            {blog?.category}
                        </div>

                        {/* Blog Title */}
                        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
                            {blog?.title}
                        </h1>

                        {/* Blog Description */}
                        <div className="text-purple-400 mb-4 text-base md:text-lg">
                            {blog?.about}
                        </div>
                    </div>

                    {/* Right Section: Blog Image */}
                    {blog?.blogImage?.url && (
                        <div className="flex-1 sm:m-auto">
                            <img
                                src={blog.blogImage.url}
                                alt={blog?.title}
                                className="w-full h-64 object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    )}
                </section>
            )}
        </>
    );
}

export default Detail;
