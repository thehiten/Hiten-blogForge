import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  IoArrowBackOutline,
  IoTimeOutline,
  IoEyeOutline,
  IoHeartOutline,
  IoShareSocialOutline,
  IoBookmarkOutline,
  IoPersonOutline,
  IoCalendarOutline,
  IoChatbubbleOutline,
  IoThumbsUpOutline,
  IoTrendingUpOutline,
  IoGlobeOutline,
  IoCheckmarkCircleOutline,
  IoEllipsisVerticalOutline,
  IoCopyOutline,
  IoPrintOutline,
  IoTextOutline,
  IoImageOutline,
  IoCodeSlashOutline,
  IoBookOutline
} from 'react-icons/io5';
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { blogs } = useAuth();
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [readingProgress, setReadingProgress] = useState(0);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [views, setViews] = useState(0);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const contentRef = useRef(null);

    // Fetch blog data on component mount
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`http://localhost:3000/api/blog/getSingleBlog/${id}`, {
                    withCredentials: true,
                });
                setBlog(data);
                setViews(data.views || 0);
                setLikes(Math.floor((data.views || 0) * 0.15)); // Simulate likes based on views
                
                // Find related blogs
                if (blogs && blogs.length > 0) {
                    const related = blogs
                        .filter(b => b._id !== id && (b.category === data.category || b.adminName === data.adminName))
                        .slice(0, 3);
                    setRelatedBlogs(related);
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
                setError('Failed to load blog');
                toast.error('Failed to load blog');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id, blogs]);

    // Reading progress calculation
    useEffect(() => {
        const handleScroll = () => {
            if (!contentRef.current) return;
            
            const element = contentRef.current;
            const scrollTop = window.pageYOffset;
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const windowHeight = window.innerHeight;
            
            if (scrollTop >= elementTop - windowHeight / 2) {
                const progress = Math.min(
                    (scrollTop - elementTop + windowHeight / 2) / (elementHeight - windowHeight / 2),
                    1
                );
                setReadingProgress(Math.max(0, progress));
            } else {
                setReadingProgress(0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Get relative time
    const getRelativeTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return formatDate(dateString);
    };

    // Calculate reading time
    const calculateReadingTime = (content) => {
        if (!content) return 5;
        const wordsPerMinute = 200;
        const words = content.split(' ').length;
        return Math.ceil(words / wordsPerMinute);
    };

    // Handle share
    const handleShare = async (platform) => {
        const url = window.location.href;
        const title = blog.title;
        
        switch (platform) {
            case 'copy':
                try {
                    await navigator.clipboard.writeText(url);
                    toast.success('Link copied to clipboard!');
                } catch (err) {
                    toast.error('Failed to copy link');
                }
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
                break;
            default:
                break;
        }
        setShowShareMenu(false);
    };

    // Handle bookmark
    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
    };

    // Handle like
    const handleLike = () => {
        setLikes(prev => prev + 1);
        toast.success('Thanks for the like! ❤️');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 pt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center h-64">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 pt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <IoThumbsUpOutline className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                            Blog Not Found
                        </h2>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                            The blog you're looking for doesn't exist or has been removed.
                        </p>
                        <button
                            onClick={() => navigate(-1)}
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <IoArrowBackOutline className="w-4 h-4" />
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-neutral-200 dark:bg-neutral-700 z-50">
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                    style={{ width: `${readingProgress * 100}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${readingProgress * 100}%` }}
                    transition={{ duration: 0.1 }}
                />
            </div>

            {/* Navigation Header */}
            <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-40 pt-20">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <IoArrowBackOutline className="w-5 h-5" />
                            <span className="font-medium">Back</span>
                        </button>

                        <div className="flex items-center gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleBookmark}
                                className={`p-2 rounded-lg transition-colors ${
                                    isBookmarked
                                        ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
                                        : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400 hover:bg-yellow-100 hover:text-yellow-600 dark:hover:bg-yellow-900/20 dark:hover:text-yellow-400'
                                }`}
                            >
                                <IoBookmarkOutline className="w-5 h-5" />
                            </motion.button>

                            <div className="relative">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowShareMenu(!showShareMenu)}
                                    className="p-2 bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 rounded-lg transition-colors"
                                >
                                    <IoShareSocialOutline className="w-5 h-5" />
                                </motion.button>

                                <AnimatePresence>
                                    {showShareMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                            className="absolute right-0 top-full mt-2 bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-2 min-w-[200px]"
                                        >
                                            <button
                                                onClick={() => handleShare('copy')}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                                            >
                                                <IoCopyOutline className="w-4 h-4" />
                                                <span className="text-sm">Copy Link</span>
                                            </button>
                                            <button
                                                onClick={() => handleShare('twitter')}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                                            >
                                                <IoGlobeOutline className="w-4 h-4" />
                                                <span className="text-sm">Share on Twitter</span>
                                            </button>
                                            <button
                                                onClick={() => handleShare('facebook')}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                                            >
                                                <IoGlobeOutline className="w-4 h-4" />
                                                <span className="text-sm">Share on Facebook</span>
                                            </button>
                                            <button
                                                onClick={() => handleShare('linkedin')}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                                            >
                                                <IoGlobeOutline className="w-4 h-4" />
                                                <span className="text-sm">Share on LinkedIn</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        {/* Category Badge */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <IoCheckmarkCircleOutline className="w-4 h-4" />
                            {blog.category}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 leading-tight">
                            {blog.title}
                        </h1>

                        {/* Description */}
                        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                            {blog.about}
                        </p>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
                            <div className="flex items-center gap-2">
                                <IoPersonOutline className="w-4 h-4" />
                                <span className="font-medium text-neutral-700 dark:text-neutral-300">{blog.adminName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <IoCalendarOutline className="w-4 h-4" />
                                <span>{formatDate(blog.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <IoTimeOutline className="w-4 h-4" />
                                <span>{calculateReadingTime(blog.about)} min read</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <IoEyeOutline className="w-4 h-4" />
                                <span>{views.toLocaleString()} views</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Featured Image */}
                    {blog.blogImage?.url && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-8"
                        >
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                <img
                                    src={blog.blogImage.url}
                                    alt={blog.title}
                                    className="w-full h-96 md:h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        </motion.div>
                    )}

                    {/* Author Profile */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white dark:bg-neutral-800 rounded-2xl p-6 mb-8 border border-neutral-200 dark:border-neutral-700"
                    >
                        <div className="flex items-start gap-4">
                            <div className="relative">
                                <img
                                    src={blog.adminPhoto || '/api/placeholder/80/80'}
                                    alt={blog.adminName}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-neutral-700 shadow-md"
                                />
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-neutral-800"></div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                                    {blog.adminName}
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                                    Content Creator & Blogger
                                </p>
                                <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                                    <div className="flex items-center gap-1">
                                        <IoBookOutline className="w-4 h-4" />
                                        <span>{Math.floor(Math.random() * 20) + 5} posts</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <IoTrendingUpOutline className="w-4 h-4" />
                                        <span>{Math.floor(Math.random() * 1000) + 100}k followers</span>
                                    </div>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                                Follow
                            </button>
                        </div>
                    </motion.div>

                    {/* Blog Content */}
                    <motion.div
                        ref={contentRef}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="prose prose-lg dark:prose-invert max-w-none mb-12"
                    >
                        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700">
                            <div className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
                                {blog.about}
                            </div>
                        </div>
                    </motion.div>

                    {/* Engagement Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="bg-white dark:bg-neutral-800 rounded-2xl p-6 mb-8 border border-neutral-200 dark:border-neutral-700"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLike}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-all duration-200"
                                >
                                    <IoHeartOutline className="w-5 h-5" />
                                    <span className="font-medium">{likes}</span>
                                </motion.button>
                                
                                <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg transition-all duration-200">
                                    <IoChatbubbleOutline className="w-5 h-5" />
                                    <span className="font-medium">Comment</span>
                                </button>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                                <IoEyeOutline className="w-4 h-4" />
                                <span>{views.toLocaleString()} people read this</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Related Blogs */}
                    {relatedBlogs.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mb-8"
                        >
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                                Related Articles
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedBlogs.map((relatedBlog, index) => (
                                    <motion.div
                                        key={relatedBlog._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                                    >
                                        <Link
                                            to={`/blog/${relatedBlog._id}`}
                                            className="block group"
                                        >
                                            <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-soft border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                                                <div className="relative">
                                                    <img
                                                        src={relatedBlog.blogImage?.url || '/api/placeholder/400/250'}
                                                        alt={relatedBlog.title}
                                                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    <div className="absolute top-3 left-3">
                                                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                                            {relatedBlog.category}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {relatedBlog.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                                                        <IoPersonOutline className="w-3 h-3" />
                                                        <span>{relatedBlog.adminName}</span>
                                                        <IoCalendarOutline className="w-3 h-3 ml-2" />
                                                        <span>{getRelativeTime(relatedBlog.createdAt)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Back to Top */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: readingProgress > 0.5 ? 1 : 0 }}
                        className="fixed bottom-8 right-8"
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                        >
                            <IoArrowBackOutline className="w-5 h-5 rotate-90" />
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
