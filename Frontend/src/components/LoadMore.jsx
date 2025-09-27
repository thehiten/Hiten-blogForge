import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoRefreshOutline,
  IoChevronDownOutline,
  IoCheckmarkCircleOutline,
  IoEllipsisHorizontalOutline
} from "react-icons/io5";

function LoadMore({
  hasMore = true,
  loading = false,
  onLoadMore,
  loadingText = "Loading more items...",
  loadMoreText = "Load More",
  noMoreText = "No more items to load",
  className = "",
  threshold = 100
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const loadMoreRef = useRef(null);

  // Intersection Observer for automatic loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
        
        if (entry.isIntersecting && hasMore && !loading && !hasTriggered) {
          setHasTriggered(true);
          onLoadMore();
          // Reset trigger after a delay
          setTimeout(() => setHasTriggered(false), 1000);
        }
      },
      {
        threshold: 0.1,
        rootMargin: `${threshold}px`
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, loading, onLoadMore, threshold, hasTriggered]);

  const handleManualLoad = () => {
    if (hasMore && !loading) {
      onLoadMore();
    }
  };

  if (!hasMore) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-center py-8 ${className}`}
      >
        <div className="flex items-center justify-center gap-2 text-neutral-500 dark:text-neutral-400">
          <IoCheckmarkCircleOutline className="w-5 h-5" />
          <span className="text-sm font-medium">{noMoreText}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <div ref={loadMoreRef} className={`text-center py-8 ${className}`}>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              {loadingText}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="load-more"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Automatic loading indicator (subtle) */}
            {isVisible && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2 text-neutral-400 dark:text-neutral-500"
              >
                <IoEllipsisHorizontalOutline className="w-4 h-4 animate-pulse" />
                <span className="text-xs">Loading...</span>
              </motion.div>
            )}

            {/* Manual load more button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleManualLoad}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <IoChevronDownOutline className="w-4 h-4" />
              {loadMoreText}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LoadMore;
