import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    try {
      await axios.post("https://hiten-blogforge.onrender.com/api/contact/submitMessages", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Message sent successfully");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Contact error:", error.response?.data || error.message || "Unknown error");
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="font-semibold text-xl text-center text-blue-400">
            <span className="text-purple-400">Hit</span>-Blogs
          </div>
          <h1 className="text-xl font-semibold text-center">Contact Us</h1>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            aria-label="Name"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            aria-label="Email"
            required
          />

          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows="4"
            aria-label="Message"
            required
          />

          <button
            type="submit"
            className="w-full p-2 text-white bg-purple-400 rounded-md hover:bg-purple-800"
          >
            Send Message
          </button>

          <div className="mt-4">
            <div className="text-center font-semibold">Contact Info</div>
            <div>Name: Hiten</div>
            <div>
              Website:{" "}
              <a
                href="https://the-hiten-portfolio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
                aria-label="Hiten's Portfolio"
              >
                https://the-hiten-portfolio.netlify.app/
              </a>
            </div>
            <div>Email: Hiten.aggarwal005@gmail.com</div>
            <div>Phone: +91 9319417534</div>
            <div>Address: H no. 270, gali no. 2, 121005, Faridabad</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
