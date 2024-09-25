import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Update from "./dashboard/Update";
import Login from "./pages/Login";
import Detail from "./pages/Detail";

import { useAuth } from "./context/AuthProvider";
import Creators from "./pages/Creators"; // Correct capitalization
import toast, { Toaster } from 'react-hot-toast';
import NotFound from "./pages/notFound";


function App() {
  const { blogs, isAuthenticated } = useAuth();
  console.log(blogs);
  const location = useLocation(); // Get the current route (URL path)

  // Only hide Navbar and Footer on these specific paths
  const hideNavbarFooter =
    location.pathname === "/dashboard" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="">
      {/* Conditionally show Navbar based on route */}
      {!hideNavbarFooter && <Navbar />}

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={isAuthenticated==true?<Home />:<Navigate to = {"/login"}/>} />
        <Route path="/about" element={isAuthenticated==true?<About />:<Navigate to = {"/login"}/>} />
        <Route path="/blogs" element={isAuthenticated==true?<Blogs />:<Navigate to = {"/login"}/>} />
        <Route path="/creators" element={isAuthenticated==true?<Creators />:<Navigate to = {"/login"}/>} /> {/* Corrected creators to Creators */}
        <Route path="/contact" element={isAuthenticated==true?<Contact />:<Navigate to = {"/login"}/>} />
        <Route path="/dashboard" element={isAuthenticated==true?<Dashboard />:<Navigate to = {"/login"}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* this is for detail */}
        <Route path="/blog/:id" element={<Detail/>} />
        {/* this is for update */}
        <Route path="/blog/update/:id" element={<Update />} />
        {/* this is for universal route */}
        <Route path="*" element={<NotFound/>}  />

      </Routes>
      <Toaster />

      {/* Conditionally show Footer based on route */}
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
