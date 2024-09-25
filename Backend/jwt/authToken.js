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
      httpOnly: false, // Prevents client-side JavaScript from accessing the cookie
      secure: true, // Cookie will only be sent over HTTPS connections
      sameSite: "none", // Cookie will only be sent to the same origin
    });
    console.log(token)
    return token;
  } catch (error) {
    console.error("Error creating token or setting cookie:", error);
    // Handle error appropriately
  }
};
