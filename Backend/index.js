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
import path from 'path';

// Load environment variables from .env
dotenv.config();

const app = express();

const __dirname = path.resolve();

// Define port and MongoDB connection URL from environment variables
const port = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGODB_URL;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for handling file uploads
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

// Middleware for CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(MONGO_URL)
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

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: err.message,
  });
});


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', "dist", 'index.html'));
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`CORS enabled for origin: http://localhost:5173`);
});
