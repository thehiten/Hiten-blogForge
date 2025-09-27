import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoAddOutline, 
  IoCreateOutline, 
  IoBookOutline, 
  IoCloseOutline,
  IoChevronUpOutline
} from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";

function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  const actions = [
    {
      label: "Write Blog",
      icon: IoCreateOutline,
      to: "/dashboard",
      color: "bg-primary-500 hover:bg-primary-600",
    },
    {
      label: "Quick Draft",
      icon: IoBookOutline,
      to: "/dashboard",
      color: "bg-secondary-500 hover:bg-secondary-600",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Action Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 space-y-3"
          >
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={action.to}
                    className={`flex items-center gap-3 px-4 py-3 ${action.color} text-white rounded-full shadow-large hover:shadow-xl transition-all duration-200 group`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium whitespace-nowrap">
                      {action.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full shadow-large flex items-center justify-center text-white transition-all duration-200 ${
          isOpen 
            ? "bg-accent-500 hover:bg-accent-600" 
            : "bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
        }`}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <IoCloseOutline className="w-6 h-6" />
          ) : (
            <IoAddOutline className="w-6 h-6" />
          )}
        </motion.div>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default FloatingActionButton;
