import express from 'express';
import { createContactMessage, getAllContactMessages } from '../controller/contact.controller.js'; // Adjust the path as needed
import { isAuthenticated } from '../middleware/authUser.js'; // Adjust the path as needed

const router = express.Router(); // Use express.Router()

// POST request to handle contact form submission
router.post('/submitMessages', createContactMessage);

// GET request to retrieve all contact messages (optional, for admin use or debugging)
router.get('/getMessages', isAuthenticated, getAllContactMessages);

export default router;
