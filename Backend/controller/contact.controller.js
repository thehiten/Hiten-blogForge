import Contact from "../models/contact.model.js";

// Controller function to handle contact form submission
export const createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new contact document
    const contact = new Contact({ name, email, message });

    // Save the document to the database
    await contact.save();

    // Send a success response
    res.status(201).json({ message: 'Contact message saved successfully' });
  } catch (error) {
    // Handle errors (e.g., validation errors)
    res.status(400).json({ error: error.message });
  }
};

// Optionally add more controller functions if needed
// For example, to get all contact messages
export const getAllContactMessages = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
