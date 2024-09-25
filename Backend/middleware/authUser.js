import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// authentication (only with  token can add blog)

// it only checks login or not user
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(403).json({ error: "Unauthorized access" });
    }
    req.user = user;

    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).json({ error: "Server error" });
  }
};


// authorization (only with admin can add blog)
// it checks it is admin or not 

export const isAdmin = async (req, res, next) => {
    try {
      const user = req.user; // Assuming user is already authenticated and user info is attached to the request
      if (!user) {
        return res.status(401).json({ error: "No user provided" });
      }
      if (user.role !== "admin") { // Check if the user's role is admin
        return res.status(403).json({ error: "given role user is not allowed" });
      }
      next(); // Allow the request to continue if the user is an admin
    } catch (error) {
      console.error("Error during authorization:", error);
      return res.status(500).json({ error: "Server error" });
    }
  };
  