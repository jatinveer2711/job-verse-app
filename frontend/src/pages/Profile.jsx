import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'
import { useEffect } from 'react';




export default function Profile() {
    const [formData, setFormdata] = useState({
    skills : "",
    experience : "",
    education : "",
    resume:"",
    portfolioLinks:"",
})
const [checkprofile,setCheckprofile] = useState(false)

const navigate = useNavigate()
const {token,user} = useAuth()

const [error,setError] = useState(false);
const [loading,setLoading] = useState(false)

const handleChange = async(e)=>{
    setFormdata({...formData,[e.target.name]:e.target.value})
}

// check user profile before create 
useEffect(()=>{
  const checkProfile = async()=>{
  try {
    const res = await axios.get('http://localhost:4002/api/auth/getProfile',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    if(res.data){
      setCheckprofile(true)
    }
  } catch (error) {
    console.log(error);
    setCheckprofile(false)
    
  }
 
}
 checkProfile()
},[token])


// create profile
const handleSumbit = async(e)=>{
     e.preventDefault();
     setError("")
     setLoading(true)
    try {
        const res = await axios.post('http://localhost:4002/api/auth/createUser',formData,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    if(res.status===200){
        alert("Profile created successfully")
    }
    console.log(res.data);
    
    setFormdata({
      skills : "",
    experience : "",
    education : "",
    resume:"",
    portfolioLinks:"",
    })
    navigate('/')
    
    } catch (error) {
        setError(error.response?.data?.message || "Something went wrong")
    } finally{
        setLoading(false)
    }
}
  return (
   <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl">
  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
    Create <span className='text-[#6A38C2]'>Your profile</span>
  </h2>

  <form onSubmit={handleSumbit} className="space-y-6">
    {/* Skills Input */}
    <div>
      <label
        htmlFor="skills"
        className="block text-sm font-medium text-gray-700"
      >
        Skills
      </label>
      <input
        type="text"
        id="skills"
        name="skills"
        placeholder="e.g. React, Node.js, Tailwind CSS"
        value={formData.skills}
        onChange={handleChange}
        className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        required
      />
    </div>

    {/* Experience Input */}
    <div>
      <label
        htmlFor="experience"
        className="block text-sm font-medium text-gray-700"
      >
        Experience
      </label>
      <input
        type="text"
        id="experience"
        name="experience"
        placeholder="e.g. 2 years in Web Development"
        value={formData.experience}
        onChange={handleChange}
        className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>

    {/* Education Input */}
    <div>
      <label
        htmlFor="education"
        className="block text-sm font-medium text-gray-700"
      >
        Education
      </label>
      <input
        type="text"
        id="education"
        name="education"
        placeholder="e.g. B.Tech in Computer Science"
        value={formData.education}
        onChange={handleChange}
        className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>

    {/* Portfolio Links Input */}
    <div>
      <label
        htmlFor="portfolioLinks"
        className="block text-sm font-medium text-gray-700"
      >
        Portfolio Links
      </label>
      <input
        type="text"
        id="portfolioLinks"
        name="portfolioLinks"
        placeholder="GitHub, Dribbble, Personal Website..."
        value={formData.portfolioLinks}
        onChange={handleChange}
        className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>

    {/* Resume Link Input */}
    <div>
      <label
        htmlFor="resume"
        className="block text-sm font-medium text-gray-700"
      >
        Resume Link
      </label>
      <input
        type="text"
        id="resume"
        name="resume"
        placeholder="Paste Google Drive / Dropbox link"
        value={formData.resume}
        onChange={handleChange}
        className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>

    {/* Error Message */}
    {error && <p className="text-red-600 text-sm text-center">{error}</p>}

    {/* Submit Button */}
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? "Saving..." : "Create Profile"}
    </button>
    <button
  onClick={() => navigate("/")}
  disabled={!checkprofile}
  className={`mt-5 w-full py-3 rounded-xl font-semibold 
    ${checkprofile ? "bg-green-600 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
>
  Already Profile ?
</button>

  </form>
</div>
  )
}

