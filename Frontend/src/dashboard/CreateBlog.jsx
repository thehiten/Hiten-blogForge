import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  IoImageOutline,
  IoTextOutline,
  IoCreateOutline,
  IoCheckmarkCircleOutline,
  IoCloudUploadOutline,
  IoTrashOutline
} from "react-icons/io5";

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
    <div>
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-8 py-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <IoCreateOutline className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Create New Blog</h1>
            </div>
            <p className="text-blue-100">Share your thoughts and ideas with the world</p>
          </div>

          {/* Form */}
          <form className="p-8 space-y-8" onSubmit={handleSubmit}>
            {/* Blog Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                <IoTextOutline className="w-4 h-4 inline mr-2" />
                Blog Title *
              </label>
              <input
                type="text"
                placeholder="Enter an engaging title for your blog..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 transition-all duration-200"
                required
              />
            </motion.div>

            {/* Blog Category */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                <IoCheckmarkCircleOutline className="w-4 h-4 inline mr-2" />
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 transition-all duration-200"
                required
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Business">Business</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Sports">Sports</option>
                <option value="Other">Other</option>
              </select>
            </motion.div>

            {/* Blog Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                <IoTextOutline className="w-4 h-4 inline mr-2" />
                Blog Content *
              </label>
              <textarea
                placeholder="Write your blog content here... Share your thoughts, experiences, and insights with your readers."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 resize-none transition-all duration-200"
                rows="8"
                required
              />
            </motion.div>

            {/* Blog Image Upload */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                <IoImageOutline className="w-4 h-4 inline mr-2" />
                Featured Image
              </label>
              <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-xl p-6 hover:border-blue-500 transition-colors duration-200">
                <div className="flex flex-col items-center space-y-4">
                  {blogImagePreview ? (
                    <div className="relative">
                      <img
                        src={blogImagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-xl shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setBlogImagePreview("");
                          setBlogImage(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <IoTrashOutline className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center">
                      <IoCloudUploadOutline className="w-12 h-12 text-blue-500" />
                    </div>
                  )}
                  <div className="text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={changePhotoHandler}
                      className="hidden"
                      accept="image/*"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <IoCloudUploadOutline className="w-4 h-4" />
                      {blogImagePreview ? "Change Image" : "Upload Image"}
                    </label>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-4 pt-4"
            >
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 px-6 py-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200 font-medium"
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <IoCheckmarkCircleOutline className="w-5 h-5 inline mr-2" />
                Publish Blog
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default CreateBlog;
