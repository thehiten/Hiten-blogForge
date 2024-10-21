import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const createTokenAndSaveCookies = async (userId, res) => {
  try {
    // Generate JWT token
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
      expiresIn: '1h',
    });

    // Set cookie with JWT
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 3600000), // 1 hour
      httpOnly: true, // Prevent client-side JavaScript access
      secure: process.env.NODE_ENV === 'production', // Use only in HTTPS for production
      sameSite: 'none', // Allow cross-origin cookies
    });

    console.log('Token:', token); // Log for debugging
    return token;
  } catch (error) {
    console.error('Error creating token or setting cookie:', error);
  }
};
