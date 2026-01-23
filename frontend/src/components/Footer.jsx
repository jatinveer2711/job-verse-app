import React from 'react'
import { Briefcase, User, Mail, Phone } from "lucide-react";
import { useAuth } from '../context/AuthContext';

export default function Footer() {
    const user = useAuth()
    if (!user ) return null;
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">JobVerse</h2>
          <p className="text-sm mt-3 text-gray-400">
            Connecting talent with opportunity. Find jobs or hire the best
            candidates easily.
          </p>
        </div>

        {/* Job Seekers */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <User size={18} /> Job Seekers
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Browse Jobs</li>
            <li className="hover:text-white cursor-pointer">My Applications</li>
            <li className="hover:text-white cursor-pointer">Upload Resume</li>
            <li className="hover:text-white cursor-pointer">Career Tips</li>
          </ul>
        </div>

        {/* Employers */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Briefcase size={18} /> Employers
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Post a Job</li>
            <li className="hover:text-white cursor-pointer">Manage Jobs</li>
            <li className="hover:text-white cursor-pointer">View Applicants</li>
            <li className="hover:text-white cursor-pointer">Hire Talent</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <Mail size={16} /> jatinveerchauhan@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> +91 7505398216
            </p>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} JobVerse. All rights reserved.
      </div>
    </footer>
  )
}
