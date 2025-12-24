import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { FolderMinus, PenBox } from 'lucide-react'
export default function ViewProfile() {
  const [viewProfile, setViewProfile] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showform, setShowform] = useState(false)
  const { token } = useAuth()
  const [formData, setFormdata] = useState({
    skills: "",
    experience: "",
    education: "",
    resume: "",
    portfolioLinks: ""
  })



  // update the profile
  const hadnleUpdate = async () => {
    try {
      const res = await axios.put('http://localhost:4002/api/auth/updateProfile', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      alert("updated successfully")
      profile()
      setShowform(false)

    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // fetch the profile

  const profile = async () => {
    setLoading(true)

    try {
      const res = await axios.get('http://localhost:4002/api/auth/getProfile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setViewProfile(res.data)
      console.log(res.data);
      
      setFormdata({
           skills: res.data.skills || "",
      experience: res.data.experience || "",
      education: res.data.education || "",
      resume: res.data.resume || "",
      portfolioLinks: res.data.portfolioLinks || ""
      })
      // setFormdata(res.data.update)
    } catch (error) {
      setError(error)

    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    if (token) profile()
  }, [token])




  // loading 
  if (loading) {
    return (
      <div className='text-center mt-10 text-xl font-semibold'>
        profile loading....
      </div>
    )
  }
  //   error 
  if (error) {
    return (
      <div className='text-center mt-10 text-red-600 text-xl font-semibold'>
        {error}
      </div>
    )
  }


  return (
    <div className="max-w-4xl mx-auto mt-12 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-2xl font-bold border-2 border-white/50">
            {viewProfile?.name ? viewProfile.name.charAt(0) : "U"}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">
              <span className="text-orange-400">Your</span> Profile
            </h2>
            <p className="text-indigo-100 mt-1 text-sm">
              View and manage your professional details
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Skills */}
        <div className="md:col-span-2">
          <h3 className="text-sm font-bold text-indigo-500 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="bg-indigo-100 p-1 rounded">🛠</span> Skills
          </h3>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-700 shadow-sm">
            {viewProfile?.skills || "No skills added yet."}
          </div>
        </div>

        {/* Experience */}
        <div className="group">
          <h3 className="text-sm font-bold text-indigo-500 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="bg-indigo-100 p-1 rounded">💼</span> Experience
          </h3>
          <div className="p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300">
            <p className="text-gray-700">{viewProfile?.experience || "Not added"}</p>
          </div>
        </div>

        {/* Education */}
        <div className="group">
          <h3 className="text-sm font-bold text-indigo-500 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="bg-indigo-100 p-1 rounded">🎓</span> Education
          </h3>
          <div className="p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300">
            <p className="text-gray-700">{viewProfile?.education || "Not added"}</p>
          </div>
        </div>

        {/* Portfolio */}
        <div>
          <h3 className="text-sm font-bold text-indigo-500 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="bg-indigo-100 p-1 rounded">🔗</span> Portfolio
          </h3>
          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 break-all">
            {viewProfile?.portfolioLinks ? (
              <a
                href={viewProfile.portfolioLinks}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-medium"
              >
                {viewProfile.portfolioLinks}
              </a>
            ) : (
              <span className="text-gray-500 italic">Not added</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div>
          <h3 className="text-sm font-bold text-indigo-500 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="bg-indigo-100 p-1 rounded">📄</span> Resume
          </h3>
          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200">
            <span className="text-gray-700 truncate mr-2">
              {viewProfile?.resume || "Not uploaded"}
            </span>

            {viewProfile?.resume && (
              <a
                href={viewProfile.resume}
                download
                className="text-xs bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900 transition"
              >
                Download
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Update Button */}
      <div className="p-6 flex justify-center">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full shadow-md transition flex items-center gap-2"
          onClick={() => setShowform(true)}
        >
          <PenBox size={18} /> Edit Profile
        </button>
      </div>

      {/* Update Form */}
      {showform && (
        <div className="p-8 bg-gray-50 border-t border-gray-200">
          <form className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200">

            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Update <span className="text-indigo-600">Profile</span>
            </h2>

            {/* Skills */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Add your skills..."
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Your experience..."
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
            </div>

            {/* Education */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Education</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Your education..."
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
            </div>

            {/* Portfolio */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Portfolio Link</label>
              <input
                type="text"
                name="portfolioLinks"
                value={formData.portfolioLinks}
                onChange={handleChange}
                placeholder="Portfolio URL"
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
            </div>

            {/* Resume */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Resume Link</label>
              <input
                type="text"
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                placeholder="Resume URL"
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={hadnleUpdate}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg shadow-md transition font-semibold"
              >
                Update Profile
              </button>

              <button
                type="button"
                onClick={() => setShowform(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2.5 rounded-lg shadow-md transition font-semibold"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}

    </div>



  )
}
