import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { 
  IoMailOutline, 
  IoPersonOutline,
  IoChatbubbleOutline,
  IoPaperPlaneOutline
} from "react-icons/io5";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    try {
      await axios.post("http://localhost:3000/api/contact/submitMessages", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Message sent successfully! I'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <IoChatbubbleOutline className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
            <span className="text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">
              Get In Touch
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 sm:mb-6">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Connect</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto px-4 sm:px-0">
            Have a project in mind? Want to collaborate? Or just want to say hello? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto px-4 sm:px-0">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl sm:rounded-3xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-6 sm:p-8"
          >
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Send me a message
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Name *
                </label>
                <div className="relative">
                  <IoPersonOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 text-sm sm:text-base"
                    placeholder="Your full name"
            required
          />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 text-sm sm:text-base"
                    placeholder="your.email@example.com"
            required
          />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Message *
                </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-2.5 sm:py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 resize-none text-sm sm:text-base"
                  placeholder="Tell me about your project, ideas, or just say hello..."
            required
          />
              </div>

          <button
            type="submit"
                disabled={loading}
                className="w-full py-3 sm:py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <IoPaperPlaneOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
