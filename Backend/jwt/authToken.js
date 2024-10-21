import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Ensure you import bcrypt if you're using it
// import User from "../models/user.model.js";

// Function to create token and set cookies
export const createTokenAndSaveCookies = async (userId, res) => {
  try {
    // Generate JWT token
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
      expiresIn: "1h", // Token expiration time
    });

    // Set cookie with JWT
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3600000), // Cookie expiry time (1 hour)
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: true, // Ensure your app runs on HTTPS in production
      sameSite: "None", // Required for cross-origin requests
    });

    console.log(token); // Log token for debugging (optional)
    return token;
  } catch (error) {
    console.error("Error creating token or setting cookie:", error);
    // Handle error appropriately, possibly by sending a response
    throw new Error("Unable to set cookie"); // Throw error for higher-level handling
  }
};