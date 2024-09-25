import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import blogRoute from "./routes/blog.route.js";
import userRoute from "./routes/user.route.js";
import contactRoute from "./routes/contact.route.js";

import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();  // Load environment variables from .env file

const app = express();

const port = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGODB_URL;

// Middleware for parsing JSON
app.use(bodyParser.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for file upload
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// MongoDB connection function with SSL/TLS options and error handling
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true, // Enable TLS/SSL
      tlsAllowInvalidCertificates: false, // Ensure certificates are valid
      tlsAllowInvalidHostnames: false,    // Ensure hostnames are valid
      ssl: true // Enable SSL for the connection
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Call the MongoDB connection function
connectDB();

// Routes
app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);
app.use("/api/contact", contactRoute);

// Cloudinary configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY,  
  api_secret: process.env.CLOUD_SECRET_KEY 
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
