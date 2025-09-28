import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoTimeOutline, 
  IoCloseOutline, 
  IoRocketOutline,
  IoCheckmarkCircleOutline,
  IoMailOutline
} from 'react-icons/io5';

const ComingSoon = ({ 
  trigger, 
  title = "Coming Soon", 
  message = "This feature is currently under development. Stay tuned for updates!",
  showEmailSignup = true 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTrigger = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Element */}
      <div onClick={handleTrigger} className="cursor-pointer">
        {trigger}
      </div>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-700 w-full max-w-md mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-6 py-6 text-white rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <IoRocketOutline className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold">{title}</h2>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <IoCloseOutline className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IoTimeOutline className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {message}
                  </p>
                </div>

                {showEmailSignup && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <IoMailOutline className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">
                        Get Notified
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                      We'll notify you when this feature is ready!
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 text-sm"
                      />
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Notify Me
                      </button>
                    </div>
                  </div>
                )}

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <IoCheckmarkCircleOutline className="w-4 h-4 text-green-500" />
                    <span className="text-neutral-600 dark:text-neutral-400">Enhanced user experience</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <IoCheckmarkCircleOutline className="w-4 h-4 text-green-500" />
                    <span className="text-neutral-600 dark:text-neutral-400">Improved functionality</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <IoCheckmarkCircleOutline className="w-4 h-4 text-green-500" />
                    <span className="text-neutral-600 dark:text-neutral-400">Better performance</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    className="flex-1 px-4 py-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors font-medium"
                  >
                    Got it
                  </button>
                  <button
                    onClick={() => {
                      // You can add navigation to a contact or feedback page here
                      handleClose();
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ComingSoon;
