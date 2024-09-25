import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';

import blogRoute from './routes/blog.route.js';
import userRoute from './routes/user.route.js';
import contactRoute from './routes/contact.route.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGODB_URL;

// Middleware for parsing JSON
app.use(bodyParser.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for handling file uploads
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

// Middleware for CORS
app.use(cors({
  origin: 'https://hiten-blog-forge.vercel.app', // Replace with your Vercel URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
}));

// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error(error));

// Routes
app.use('/api/user', userRoute);
app.use('/api/blog', blogRoute);
app.use('/api/contact', contactRoute);

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
