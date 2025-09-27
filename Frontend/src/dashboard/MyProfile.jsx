import React from 'react';
import { useAuth } from '../context/AuthProvider'; // Ensure this path is correct
import { Link } from 'react-router-dom';

function MyProfile() {
  const { profile } = useAuth(); // Access the profile from useAuth

  return (
    <div className="mx-auto  px-4 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-blue-400 mb-6">
        <span className="text-purple-400">My</span> Profile
      </h1>

      {/* Check if the profile exists and display user info */}
      {profile && profile.user ? (
        <div className="bg-blue-100 shadow-lg rounded-lg p-6 flex flex-col items-center w-full max-w-md">
          {profile.user.photo && profile.user.photo.url ? (
            <img
              src={profile.user.photo.url}
              className="h-32 w-32 rounded-full border-4 p-4 border-purple-500 mb-4"
              alt={profile.user.name || "Profile"}
            />
          ) : (
            <div className="h-32 w-32 rounded-full border-4 p-4 border-purple-500 mb-4 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 text-2xl">👤</span>
            </div>
          )}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{profile.user.name || "No Name"}</h2>
          <p className="text-lg text-gray-600 mb-2">{profile.user.role || "No Role"}</p>
          <p className="text-sm text-gray-500">{profile.user.email || "No Email"}</p>
          {profile.user.phone && (
            <p className="text-sm text-gray-500 mt-1">{profile.user.phone}</p>
          )}
          {profile.user.education && (
            <p className="text-sm text-gray-500 mt-1">{profile.user.education}</p>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-700">
          <p>No profile information available.</p>
          <p className="text-sm mt-2">Please refresh the page or log in again.</p>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
