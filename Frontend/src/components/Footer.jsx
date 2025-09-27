import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  IoHomeOutline,
  IoBookOutline,
  IoPeopleOutline,
  IoInformationCircleOutline,
  IoMailOutline,
  IoSettingsOutline,
  IoLogoTwitter,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoInstagram,
  IoHeartOutline,
  IoArrowUpOutline
} from "react-icons/io5";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { to: "/", label: "Home", icon: IoHomeOutline },
    { to: "/blogs", label: "Blogs", icon: IoBookOutline },
    { to: "/creators", label: "Creators", icon: IoPeopleOutline },
    { to: "/about", label: "About", icon: IoInformationCircleOutline },
    { to: "/contact", label: "Contact", icon: IoMailOutline },
  ];

  const socialLinks = [
    { href: "#", icon: IoLogoTwitter, label: "Twitter" },
    { href: "#", icon: IoLogoGithub, label: "GitHub" },
    { href: "#", icon: IoLogoLinkedin, label: "LinkedIn" },
    { href: "#", icon: IoLogoInstagram, label: "Instagram" },
  ];

  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/" className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">H</span>
                  </div>
                  <span className="text-xl font-display font-bold text-gradient">
                    BlogForge
                  </span>
                </Link>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md">
                  A modern platform for sharing stories, insights, and connecting with a community of passionate writers and readers.
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200"
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-lg font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {footerLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                        >
                          <Icon className="w-4 h-4" />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </div>

            {/* Support */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-lg font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Support
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                      Community Guidelines
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400"
            >
              <span>&copy; {new Date().getFullYear()} BlogForge.</span>
              <span>Made with</span>
              <IoHeartOutline className="w-4 h-4 text-accent-500" />
              <span>by Hiten</span>
            </motion.div>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200"
            >
              <IoArrowUpOutline className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Top</span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
