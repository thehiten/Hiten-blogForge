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


dotenv.config();

const app = express()

const port = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGODB_URL;

// Middleware for parsing JSON
app.use(bodyParser.json());

// Middleware for parsing cookies
app.use(cookieParser());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));


// Connect to MongoDB
try{
    mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB');
}

catch(error){
    console.error(error);
}



app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);





// Routes
app.use("/api/user", userRoute);

app.use("/api/blog", blogRoute);

app.use("/api/contact", contactRoute);



// cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY,  
  api_secret: process.env.CLOUD_SECRET_KEY  // Click 'View API Keys' above to copy your API secret
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})