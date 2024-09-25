import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';

import blogRoute from './routes/blog.route.js';
import userRoute from './routes/user.route.js';
import contactRoute from './routes/contact.route.js';

// Load environment variables from .env
dotenv.config();

const app = express();

// Define port and MongoDB connection URL from environment variables
const port = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGODB_URL;

// Middleware for parsing JSON and URL-encoded data (replaces bodyParser)
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for handling file uploads
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/', // Ensure /tmp/ directory exists and has correct permissions
}));

// Middleware for CORS (Cross-Origin Resource Sharing)
app.use(cors({
  origin: 'https://hiten-blog-forge.vercel.app', // Replace with your Vercel front-end URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specified HTTP methods
  credentials: true, // Necessary to handle credentials (cookies, authentication)
}));

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// API Routes
app.use('/api/user', userRoute);
app.use('/api/blog', blogRoute);
app.use('/api/contact', contactRoute);

// Global error handler for catching errors and returning meaningful responses
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: err.message,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
