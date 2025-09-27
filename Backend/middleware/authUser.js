import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// authentication (only with  token can add blog)

// it only checks login or not user
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("Auth middleware - token:", token ? "present" : "missing");
    console.log("Auth middleware - cookies:", req.cookies);
    
    if (!token) {
      console.log("Auth middleware - No token provided");
      return res.status(401).json({ error: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log("Auth middleware - User not found");
      return res.status(403).json({ error: "Unauthorized access" });
    }
    req.user = user;
    console.log("Auth middleware - User authenticated:", user.email);

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
  