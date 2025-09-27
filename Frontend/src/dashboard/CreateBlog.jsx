import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const fileInputRef = useRef(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !about) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    if (blogImage) {
      formData.append("blogImage", blogImage);
    }

    try {
      const response = await axios.post("http://localhost:3000/api/blog/create", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message || "Blog created successfully");

      // Reset form fields
      resetForm();
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error(error.response?.data?.message || "Error creating blog");
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setAbout("");
    setBlogImage(null);
    setBlogImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center shadow-4xl">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="font-semibold text-xl text-center text-blue-400">
            <span className="text-purple-400">Hit</span>-Blogs
          </div>
          <h1 className="text-xl font-semibold text-center">Create Blog</h1>

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
              accept="image/*" // Accept only image files
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

export default CreateBlog;
