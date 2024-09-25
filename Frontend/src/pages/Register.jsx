import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import toast from "react-hot-toast";
import {useAuth} from "../context/AuthProvider";


function Register() {


  const navigateTo = useNavigate();



  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  
  const {isAuthenticated, setIsAuthenticated, setProfile} =useAuth();

  // Create a ref to access the file input
  const fileInputRef = useRef(null);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);

    try {
      const response = await axios.post(
        "https://hiten-blogforge.onrender.com/api/user/register",
        formData,{
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      localStorage.setItem("jwt", response.data.token);

      toast.success(response.message|| "User register successfully");
      setProfile(response.data);
      setIsAuthenticated(true);

      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto(null);
      setPhotoPreview(""); // Clear photo preview
      
      navigateTo("/");

      // Clear file input using ref
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // This clears the file input
      }
    } catch (error) {
      console.error(error);
      console.error("Error message:", error.message);
      console.error("Error response:", error.response);
      console.error("Error stack:", error.stack);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="font-semibold text-xl text-center text-blue-400">
            <span className="text-purple-400">Hit</span>-Blogs
          </div>
          <h1 className="text-xl font-semibold text-center">Register</h1>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Role</option>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
          />

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
          />

          <input
            type="number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-md"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
          />

          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Your Education</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
            <option value="BE">BE</option>
          </select>

          <div className="flex items-center space-x-4">
            <div className="w-20 h-20">
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef} // Attach ref to file input
              onChange={changePhotoHandler}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="text-center">
            <p>
              Already Registered?{" "}
              <Link to="/login" className="text-blue-400">
                Login Now
              </Link>
            </p>
          </div>

          <button
            type="submit"
            className="w-full p-2 text-white bg-purple-400 rounded-md hover:bg-purple-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
