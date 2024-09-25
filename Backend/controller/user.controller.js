import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary"; // Make sure to configure Cloudinary
import bcrypt from "bcrypt";
import { createTokenAndSaveCookies } from "../jwt/authToken.js";

export const register = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { photo } = req.files;
    const allowedFormats = ["image/jpg", "image/jpeg", "image/png"];

    // Check file format
    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        error: "Invalid file format. Only .jpg and .png are allowed",
      });
    }

    const { email, name, password, phone, education, role } = req.body;

    // Check if all fields are provided
    if (!email || !name || !password || !phone || !education || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Upload the photo to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res
        .status(500)
        .json({ error: "Failed to upload photo to Cloudinary" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    // Create a new user
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      phone,
      education,
      role: role.trim(),
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    });

    // Save the new user
    await newUser.save();
    if (newUser) {
      const token = await createTokenAndSaveCookies(newUser._id, res);
      res.status(201).json({
        message: "User registered successfully",
        token, // Token included in the response
        user: {
          _id: newUser._id,
          email: newUser.email,
          name: newUser.name,
          phone: newUser.phone,
          education: newUser.education,
          role: newUser.role,
          photo: newUser.photo,
        },
      });
    }
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    // Check if all fields are provided
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Please fill the required fields" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    if (user.role !== role) {
      return res.status(401).json({ message: "Invalid role" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a token and set it in cookies
    const token = await createTokenAndSaveCookies(user._id, res);

    // Successful login response
    res.json({
      message: "User logged in successfully",
      token, // Token included in the response
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error during user logout:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const user = req.user; // Assuming req.user is set via authentication middleware

    if (!user) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    // Generate a new token and set it as a cookie
    const token = await createTokenAndSaveCookies(user._id, res);

    // Exclude sensitive information like password
    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      education: user.education,
      role: user.role,
      photo: user.photo, // Assuming this is public info
    };

    // Return the user profile along with the token
    res.json({
      user: safeUser,
      token, // Include the new token in the response
    });
  } catch (error) {
    // Catch and log any server error
    console.error("Error during user profile retrieval:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }); // here we can learn about find vs findone
    res.json(admins);
  } catch (error) {
    // Catch and log any server error
    console.error("Error during admin retrieval:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
