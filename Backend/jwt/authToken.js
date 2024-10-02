export const createTokenAndSaveCookies = async (userId, res) => {
  try {
    // Generate JWT token
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    });

    // Set cookie with JWT dynamically for both production and development environments
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3600000), // Set cookie expiry (1 hour)
      httpOnly: true, // Cookie accessible only by the server, preventing client-side JS from accessing it
      secure: process.env.NODE_ENV === "production" || process.env.FORCE_SECURE === "true", // Use HTTPS in production or if explicitly forced
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cross-origin in production, more relaxed for local development
    });

    console.log("JWT Cookie Set Successfully:", token);
    return token;
  } catch (error) {
    console.error("Error creating token or setting cookie:", error);
    throw error; // Rethrow the error to handle it properly in your route/controller
  }
};
