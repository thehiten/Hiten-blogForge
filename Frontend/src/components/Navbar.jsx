import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();

  const handleClick = () => {
    setShow(!show);
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout", { withCredentials: true });
      setIsAuthenticated(false);
      toast.success("Logged out successfully.");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  const renderLinks = (isMobile) => (
    <>
      <Link to="/" className="hover:text-purple-400" onClick={isMobile ? () => setShow(false) : undefined}>
        Home
      </Link>
      <Link to="/blogs" className="hover:text-purple-400" onClick={isMobile ? () => setShow(false) : undefined}>
        BLOGS
      </Link>
      <Link to="/creators" className="hover:text-purple-400" onClick={isMobile ? () => setShow(false) : undefined}>
        CREATORS
      </Link>
      <Link to="/about" className="hover:text-blue-400" onClick={isMobile ? () => setShow(false) : undefined}>
        ABOUT
      </Link>
      <Link to="/contact" className="hover:text-blue-400" onClick={isMobile ? () => setShow(false) : undefined}>
        CONTACT
      </Link>
      {isAuthenticated && profile?.user?.role === "admin" && (
        <Link to="/dashboard" className="hover:text-blue-400" onClick={isMobile ? () => setShow(false) : undefined}>
          DASHBOARD
        </Link>
      )}
    </>
  );

  return (
    <>
      <nav className="shadow-lg px-10 py-5">
        <div className="flex justify-between">
          <div className="font-semibold text-xl text-blue-400">
            <span className="text-purple-400">Hit</span>-Blogs
          </div>
          <div className="hidden md:flex">
            <ul className="flex space-x-10">
              {renderLinks(false)}
            </ul>
          </div>
          <div className="cursor-pointer md:hidden" onClick={handleClick} aria-expanded={show} aria-controls="mobile-menu">
            {show ? <IoCloseSharp /> : <AiOutlineMenu />}
          </div>

          <div className="hidden md:flex flex gap-5">
            {!isAuthenticated ? (
              <Link to="/login" className="text-white bg-blue-400 px-4 rounded-md hover:bg-blue-800">
                Login
              </Link>
            ) : (
              <button className="text-white bg-red-400 px-4 rounded-md hover:bg-red-800" onClick={handleLogout}>
                LOGOUT
              </button>
            )}
            <Link to="/register" className="text-white bg-blue-400 px-4 rounded-md hover:bg-blue-800">
              Signup
            </Link>
          </div>
        </div>
      </nav>
      {show && (
        <div>
          <ul id="mobile-menu" className="flex flex-col h-screen justify-center items-center space-y-3 md:hidden">
            {renderLinks(true)}
            <div className="flex flex-col gap-5">
              {!isAuthenticated ? (
                <Link to="/login" className="text-white bg-blue-400 px-4 rounded-md hover:bg-blue-800">
                  Login
                </Link>
              ) : (
                <button className="text-white bg-red-400 px-4 rounded-md hover:bg-red-800" onClick={handleLogout}>
                  LOGOUT
                </button>
              )}
              <Link to="/register" className="text-white bg-blue-400 px-4 rounded-md hover:bg-blue-800">
                Signup
              </Link>
            </div>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
