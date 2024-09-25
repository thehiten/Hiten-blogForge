import mongoose from "mongoose";
import User from "./user.model.js";


const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  blogImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  category: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  adminName: {
    type: String,
  },
  adminPhoto: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  }
});

// Corrected model name from "User" to "Blog"
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
