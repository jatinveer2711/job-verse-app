import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Only show navbar for logged-in jobseekers
  if (!user || user.role !== "user") return null;

  // Handle logout safely
  const handleLogout = () => {
    logout();
    setOpen(false);
    setMobileMenu(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Job <span className="text-[#F83002]">Portal</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <li className="hover:text-[#F83002] transition-colors duration-200">
            <Link to="/jobseeker/Dashboard">Browse</Link>
          </li>

          <li className="hover:text-[#F83002] transition-colors duration-200">
            <Link to="/myApplication">My Applications</Link>
          </li>

          {/* Login button removed logout call here */}
          <li className="cursor-pointer bg-gray-900 text-white px-5 py-2 rounded-full text-sm hover:bg-[#F83002] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            <Link  onClick={()=>{
                    const configiration = window.confirm("Are you sure you want to go login page  ?");
                    if(configiration){
                      handleLogout()
                    }
                  }}>Login</Link>
          </li>

          {/* Profile dropdown */}
          <li className="relative">
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm cursor-pointer ring-2 ring-transparent hover:ring-[#F83002] transition-all duration-200"
            />

            {open && (
              <div className="absolute right-0 mt-4 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                  <p className="text-sm font-semibold text-gray-900">My Account</p>
                </div>

                <p className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#F83002] cursor-pointer transition-colors">
                  <Link to="/viewProfile">View Profile</Link>
                </p>

                <p className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#F83002] cursor-pointer transition-colors">
                  <Link to="/">Home</Link>
                </p>

                <div className="my-1 border-t border-gray-100"></div>

                {/* Logout */}
                <p
                  onClick={()=>{
                    const configiration = window.confirm("Are you sure you want to logout ?");
                    if(configiration){
                      handleLogout()
                    }
                  }}
                  className="px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-medium cursor-pointer transition-colors"
                >
                  Logout
                </p>

                <button
                  onClick={() => setOpen(false)}
                  className="w-full text-xs text-gray-500 bg-gray-100 py-2 mt-2 rounded-lg hover:bg-gray-200"
                >
                  Close Menu
                </button>
              </div>
            )}
          </li>
        </ul>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden block text-gray-700"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-4">
          <Link
            to="/jobseeker/Dashboard"
            className="block text-gray-700 font-medium hover:text-[#F83002] transition"
            onClick={() => setMobileMenu(false)}
          >
            Browse
          </Link>

          <Link
            to="/myApplication"
            className="block text-gray-700 font-medium hover:text-[#F83002] transition"
            onClick={() => setMobileMenu(false)}
          >
            My Applications
          </Link>

          <Link
            
            className="block w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-[#F83002] transition text-center"
            onClick={()=>{
                    const configiration = window.confirm("Are you sure you want go login page ?");
                    if(configiration){
                      handleLogout()
                    }
                  }}
          >
            Login
          </Link>

          <div className="border-t pt-4">
            <Link
              to="/viewProfile"
              className="block text-gray-700 font-medium hover:text-[#F83002]"
              onClick={() => setMobileMenu(false)}
            >
              View Profile
            </Link>

            <Link
              to="/"
              className="block text-gray-700 font-medium hover:text-[#F83002]"
              onClick={() => setMobileMenu(false)}
            >
              Home
            </Link>

            <button
              onClick={()=>{
                    const configiration = window.confirm("Are you sure you want to logout ?");
                    if(configiration){
                      handleLogout()
                    }
                  }}
              className="mt-3 w-full text-red-500 py-2 hover:bg-red-50 rounded-lg font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
