import mongoose from "mongoose";
import Blog from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary"; // Make sure to configure Cloudinary

export const createBlog = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "Blog image is required" }); // Corrected "blog Image" to "Blog image" for consistency
    }

    const { blogImage } = req.files;
    const allowedFormats = ["image/jpg", "image/jpeg", "image/png"];

    // Check file format
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        error: "Invalid file format. Only .jpg and .png are allowed",
      });
    }

    const { title, category, about } = req.body;
    if (!title || !category || !about) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo?.url;
    const createdBy = req?.user?._id;

    // Upload the image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath // Ensure the correct field is used for file upload
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res
        .status(500)
        .json({ error: "Failed to upload image to Cloudinary" }); // Changed "photo" to "image" for clarity
    }

    // Create a new blog
    const blogData = new Blog({
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    });

    // Save the new blog
    const blog = await blogData.save(); // Corrected from `Blog.create(blogData)` to `blogData.save()`
    res.status(201).json({ message: "Blog created successfully", blog }); // Changed status code to 201
  } catch (error) {
    console.error("Error during blog creation:", error); // Log message reflects the current operation
    return res.status(500).json({ error: "Server error" });
  }
};

// delete

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error during blog deletion:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// get each blog

export const getBlog = async (req, res) => {
  try {
    const eachBlog = await Blog.find();
    res.json(eachBlog);
  } catch (error) {
    console.error("Error during blog retrieval:", error);
    return res.status(500).json({ error: "Server error" });
  }
};



export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the provided id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id format" });
    }

    // Find the blog by id
    const blog = await Blog.findById(id);

    // If no blog is found, return a 404 error
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // If blog is found, return it as a response
    res.json(blog);
  } catch (error) {
    // Catch any server errors and return a 500 status
    console.error("Error during blog retrieval:", error);
    return res.status(500).json({ error: "Server error" });
  }
};



// get my blog
export const getMyBlog = async (req, res) => {
  try {
    const userId = req.user.id; // Corrected destructuring
    console.log(userId);
    
    const myBlog = await Blog.find({ createdBy: userId });
    
    if (!myBlog || myBlog.length === 0) { // Check if myBlog is empty
      return res.status(404).json({ error: "No blog found for this user" });
    }

    res.json(myBlog);
  } catch (error) {
    console.error("Error during blog retrieval:", error);
    return res.status(500).json({ error: "Server error" });
  }
};


// update

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    // Update the blog and return the updated document
    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });

    // If blog not found
    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Return updated blog
    res.json(updatedBlog);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Server error" });
  }
};