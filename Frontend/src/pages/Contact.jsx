import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { 
  IoMailOutline, 
  IoCallOutline, 
  IoLocationOutline, 
  IoGlobeOutline,
  IoPersonOutline,
  IoCheckmarkCircleOutline,
  IoStarOutline,
  IoChatbubbleOutline,
  IoPaperPlaneOutline,
  IoTimeOutline
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
      console.error("Contact error:", error.response?.data || error.message || "Unknown error");
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <IoChatbubbleOutline className="w-8 h-8 text-purple-500" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">
              Get In Touch
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Connect</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Have a project in mind? Want to collaborate? Or just want to say hello? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-neutral-800 rounded-3xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-8"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Send me a message
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Name *
                </label>
                <div className="relative">
                  <IoPersonOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400"
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
                  <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400"
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
                  rows={6}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 resize-none"
                  placeholder="Tell me about your project, ideas, or just say hello..."
            required
          />
              </div>

          <button
            type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <IoPaperPlaneOutline className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-8">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IoPersonOutline className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                      Name
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Hiten Aggarwal
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IoMailOutline className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                      Email
                    </h4>
                    <a
                      href="mailto:Hiten.aggarwal005@gmail.com"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Hiten.aggarwal005@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IoCallOutline className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                      Phone
                    </h4>
                    <a
                      href="tel:+919319417534"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      +91 9319417534
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IoLocationOutline className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                      Location
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      H no. 270, gali no. 2, 121005, Faridabad
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IoGlobeOutline className="w-6 h-6 text-white" />
                  </div>
            <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                      Portfolio
                    </h4>
                    <a
                      href="https://the-hiten-portfolio.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View My Portfolio
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl border border-blue-200 dark:border-blue-800 p-6">
              <div className="flex items-center gap-3 mb-3">
                <IoTimeOutline className="w-6 h-6 text-blue-600" />
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Response Time
                </h4>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                I typically respond to messages within 24 hours. For urgent inquiries, feel free to call or text me directly.
              </p>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-8">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                Let's Connect
              </h3>
              <div className="flex flex-wrap gap-4">
              <a
                href="https://the-hiten-portfolio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200"
                >
                  <IoGlobeOutline className="w-5 h-5" />
                  Portfolio
                </a>
                <a
                  href="mailto:Hiten.aggarwal005@gmail.com"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors duration-200"
                >
                  <IoMailOutline className="w-5 h-5" />
                  Email
                </a>
                <a
                  href="tel:+919319417534"
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors duration-200"
                >
                  <IoCallOutline className="w-5 h-5" />
                  Call
                </a>
              </div>
            </div>
          </motion.div>
          </div>
      </div>
    </div>
  );
}

export default Contact;
