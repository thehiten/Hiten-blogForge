import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import ComingSoon from '../components/ComingSoon';
import { 
  IoPersonOutline,
  IoMailOutline,
  IoCallOutline,
  IoSchoolOutline,
  IoBriefcaseOutline,
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoPencilOutline,
  IoShieldCheckmarkOutline,
  IoCameraOutline,
  IoBookOutline,
  IoCreateOutline,
  IoEyeOutline,
  IoHeartOutline,
  IoShareOutline,
  IoStatsChartOutline,
  IoTimeOutline,
  IoGlobeOutline,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoGithub,
  IoCloseOutline,
  IoCloudUploadOutline,
  IoTrashOutline,
  IoRefreshOutline,
  IoTrendingUpOutline,
  IoStarOutline
} from 'react-icons/io5';

function MyProfile() {
  const { profile, fetchProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileStats, setProfileStats] = useState({
    totalBlogs: 0,
    totalViews: 0,
    totalLikes: 0,
    totalShares: 0,
    recentBlogs: []
  });
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    bio: '',
    website: '',
    twitter: '',
    linkedin: '',
    github: ''
  });

  // Fetch profile statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("https://hiten-blogforge-1.onrender.com/api/blog/getMyBlog", {
          withCredentials: true,
        });
        const blogs = response.data || [];
        setProfileStats({
          totalBlogs: blogs.length,
          totalViews: 0,
          totalLikes: 0,
          totalShares: 0,
          recentBlogs: blogs.slice(0, 3)
        });
      } catch (error) {
      }
    };

    if (profile?.user) {
      fetchStats();
      setEditForm({
        name: profile.user.name || '',
        email: profile.user.email || '',
        phone: profile.user.phone || '',
        education: profile.user.education || '',
        bio: profile.user.bio || '',
        website: profile.user.website || '',
        twitter: profile.user.twitter || '',
        linkedin: profile.user.linkedin || '',
        github: profile.user.github || ''
      });
    }
  }, [profile]);

  const handleEditProfile = async () => {
    setLoading(true);
    try {
      // Here you would typically make an API call to update the profile
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      if (fetchProfile) {
        await fetchProfile();
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Profile
      </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account information and preferences</p>
        </motion.div>

        {/* Profile Content */}
      {profile && profile.user ? (
          <div className="space-y-8">
            {/* Enhanced Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-8 py-12 text-white">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Profile Picture */}
                  <div className="relative">
          {profile.user.photo && profile.user.photo.url ? (
            <img
              src={profile.user.photo.url}
                        className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
              alt={profile.user.name || "Profile"}
            />
          ) : (
                      <div className="w-32 h-32 rounded-full border-4 border-white bg-white/20 flex items-center justify-center">
                        <IoPersonOutline className="w-16 h-16 text-white" />
            </div>
          )}
                    <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-50 transition-colors">
                      <IoCameraOutline className="w-5 h-5" />
                    </button>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <IoCheckmarkCircleOutline className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold mb-2">{profile.user.name || "No Name"}</h1>
                    <p className="text-blue-100 text-lg mb-4">{profile.user.role || "No Role"}</p>
                    {profile.user.bio && (
                      <p className="text-blue-100 mb-4 max-w-md">{profile.user.bio}</p>
                    )}
                    
                    {/* Social Links */}
                    <div className="flex items-center justify-center md:justify-start gap-4">
                      {profile.user.website && (
                        <a href={profile.user.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                          <IoGlobeOutline className="w-5 h-5" />
                        </a>
                      )}
                      {profile.user.twitter && (
                        <a href={profile.user.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                          <IoLogoTwitter className="w-5 h-5" />
                        </a>
                      )}
                      {profile.user.linkedin && (
                        <a href={profile.user.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                          <IoLogoLinkedin className="w-5 h-5" />
                        </a>
                      )}
                      {profile.user.github && (
                        <a href={profile.user.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                          <IoLogoGithub className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Edit Button */}
                  <ComingSoon
                    trigger={
                      <button className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 font-medium">
                        <IoPencilOutline className="w-5 h-5" />
                        Edit Profile
                      </button>
                    }
                    title="Profile Editing"
                    message="The profile editing functionality is coming soon! You'll be able to update your personal information, bio, and social links."
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                    <IoBookOutline className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">{profileStats.totalBlogs}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Blogs</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                    <IoEyeOutline className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">{profileStats.totalViews.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Views</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl">
                    <IoHeartOutline className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-600">{profileStats.totalLikes.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Likes</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                    <IoShareOutline className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">{profileStats.totalShares.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Shares</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Personal Details */}
                <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-700 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <IoPersonOutline className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Personal Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-neutral-700/50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <IoMailOutline className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</span>
                      </div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{profile.user.email || "No Email"}</p>
                    </div>

          {profile.user.phone && (
                      <div className="p-4 bg-gray-50 dark:bg-neutral-700/50 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                          <IoCallOutline className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</span>
                        </div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">{profile.user.phone}</p>
                      </div>
                    )}

          {profile.user.education && (
                      <div className="p-4 bg-gray-50 dark:bg-neutral-700/50 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                          <IoSchoolOutline className="w-5 h-5 text-purple-600" />
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Education</span>
                        </div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">{profile.user.education}</p>
                      </div>
                    )}

                    <div className="p-4 bg-gray-50 dark:bg-neutral-700/50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <IoBriefcaseOutline className="w-5 h-5 text-orange-600" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Role</span>
                      </div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{profile.user.role || "No Role"}</p>
                    </div>
                  </div>
                </div>

                {/* Recent Blogs */}
                {profileStats.recentBlogs.length > 0 && (
                  <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-700 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <IoBookOutline className="w-6 h-6 text-green-600" />
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Recent Blogs</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {profileStats.recentBlogs.map((blog, index) => (
                        <div key={blog._id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-neutral-700/50 rounded-xl">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 dark:text-gray-200 truncate">{blog.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <IoEyeOutline className="w-3 h-3" />
                                {blog.views || 0}
                              </span>
                              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6"
              >
                {/* Account Status */}
                <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-700 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <IoShieldCheckmarkOutline className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Account Status</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <div className="flex items-center gap-3">
                        <IoCheckmarkCircleOutline className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-gray-800 dark:text-gray-200">Email Verified</span>
                      </div>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm rounded-full">
                        Verified
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <div className="flex items-center gap-3">
                        <IoCalendarOutline className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-800 dark:text-gray-200">Member Since</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-700 p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Quick Actions</h3>
                  
                  <div className="space-y-3">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      <IoCreateOutline className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-800 dark:text-gray-200">Create New Blog</span>
                    </Link>
                    
                    <Link
                      to="/blogs"
                      className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                    >
                      <IoBookOutline className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-800 dark:text-gray-200">View All Blogs</span>
                    </Link>
                    
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                    >
                      <IoPencilOutline className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-800 dark:text-gray-200">Edit Profile</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
        </div>
      ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <IoPersonOutline className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                No Profile Information
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Unable to load your profile information. Please refresh the page or log in again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Refresh Page
              </button>
            </div>
          </motion.div>
        )}

        {/* Edit Profile Modal */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-6 py-4 text-white rounded-t-3xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Edit Profile</h2>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <IoCloseOutline className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Education
                      </label>
                      <input
                        type="text"
                        value={editForm.education}
                        onChange={(e) => setEditForm({...editForm, education: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={editForm.website}
                        onChange={(e) => setEditForm({...editForm, website: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Twitter
                      </label>
                      <input
                        type="url"
                        value={editForm.twitter}
                        onChange={(e) => setEditForm({...editForm, twitter: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        value={editForm.linkedin}
                        onChange={(e) => setEditForm({...editForm, linkedin: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        GitHub
                      </label>
                      <input
                        type="url"
                        value={editForm.github}
                        onChange={(e) => setEditForm({...editForm, github: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  {/* Modal Actions */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditProfile}
                      disabled={loading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <IoCheckmarkCircleOutline className="w-5 h-5" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
        </div>
              </motion.div>
            </motion.div>
      )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MyProfile;
