import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications
import { useNavigate } from "react-router-dom";

function Update() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const fileInputRef = useRef(null);

  // Handle image change
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBlogImagePreview(reader.result);
        setBlogImage(file);
      };
    }
  };

  // Fetch blog data on component mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`https://hiten-blogforge.onrender.com/api/blog/getSingleBlog/${id}`, {
          withCredentials: true,
        });
        console.log(data); // Log the entire response data
        setTitle(data.title);
        setCategory(data.category);
        setAbout(data.about);
        setBlogImagePreview(data.blogImage.url); // Corrected typo from vlogImage to blogImage
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlog(); // Call the async function
  }, [id]); // Ensure 'id' is used as the dependency

  // Handle blog update form submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Check for required fields
    if (!title || !category || !about) {
      toast.error("Please fill out all required fields.");
      return;
    }

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    if (blogImage) {
      formData.append("blogImage", blogImage); // Add blog image only if provided
    }

    try {
      // Perform the update API request
      const response = await axios.put(`https://hiten-blogforge.onrender.com/api/blog/updateBlog/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message || "Blog updated successfully");
      navigateTo("/");

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error updating blog");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form className="space-y-6" onSubmit={handleUpdate}>
          <div className="font-semibold text-xl text-center text-blue-400">
            <span className="text-purple-400">Hit</span>-Blogs
          </div>
          <h1 className="text-xl font-semibold text-center">Update Blog</h1>

          {/* Blog Title */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />

          {/* Blog Category */}
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />

          {/* About Blog */}
          <textarea
            placeholder="About the blog..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows="4"
            required
          />

          {/* Blog Image Upload */}
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20">
              {blogImagePreview && (
                <img
                  src={blogImagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={changePhotoHandler}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 text-white bg-purple-400 rounded-md hover:bg-purple-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;
