import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const createTokenAndSaveCookies = async (userId, res) => {
  try {
    // Generate JWT token
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    });

    // Set cookie with JWT
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3600000), // Cookie expiry time (1 hour)
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    });
    console.log(token)
    return token;
  } catch (error) {
    console.error("Error creating token or setting cookie:", error);
    // Handle error appropriately
  }
};
