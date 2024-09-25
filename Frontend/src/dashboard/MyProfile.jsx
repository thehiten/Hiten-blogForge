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
      {profile ? (
        <div className="bg-blue-100 shadow-lg rounded-lg p-6 flex flex-col items-center w-full max-w-md h-scre">
          <img
            src={profile.user.photo.url} // Adjust based on your profile structure
            className="h-32 w-32 rounded-full border-4 p-4 border-purple-500 mb-4"
            alt={profile.user.name}
          />
          <h2 className="text-xl font-semi-bold text-gray-800">{profile.user.name}</h2>
          <p className="text-xl text-gray-500">{profile.user.role}</p>
          
        </div>
      ) : (
        <div className="text-center text-gray-700">No profile information available.</div>
      )}
    </div>
  );
}

export default MyProfile;
