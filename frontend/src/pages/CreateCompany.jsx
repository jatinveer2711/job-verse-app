import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Building2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function CreateCompany() {
  const [formData, setFormdata] = useState({
    companyName: "",
    location: "",
    website: "",
    description: ""
  })
  const navigate = useNavigate()
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [checkingCompany, setCheckingCompany] = useState(false)

  const handleChange = async (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value })
  }

  // checking company
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get('http://localhost:4002/api/auth/getAll', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (res.data) {
          setCheckingCompany(true)
        }
      } catch (error) {
        console.log(error)
        setCheckingCompany(false)
      }
    }
    fetchCompany()
  }, [token])

  const handleSumbit = async (e) => {
    e.preventDefault();
    setError("")
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:4002/api/auth/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.status == 201) {
        alert("company create succussfully")
      }
      setFormdata({
        companyName: "",
        location: "",
        website: "",
        description: ""
      })
      navigate('/')
      
    }


    catch (error) {
      console.log(error)
      setError(error.response?.data?.message || "Something went wrong")
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

        <div className="flex items-center gap-3 mb-6">
          <Building2 className="w-10 h-10 text-indigo-600" />
          <h2 className="text-3xl font-bold text-gray-800">Create <span className='text-[#6A38C2]'>Your Company</span></h2>
        </div>

        {error && (
          <div className="mb-4 text-red-600 font-medium bg-red-100 border border-red-300 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSumbit} className="space-y-5">

          <div>
            <label className="block font-semibold mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="City, Country"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Website</label>
            <input
              type="text"
              name="website"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="https://yourcompany.com"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              rows="4"
              placeholder="Describe your company..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin h-6 w-6" /> : "Create Company"}
          </button>
          <button
            onClick={() => navigate("/Recruiter/Dashboard")}
            disabled={!checkingCompany}
            className={`mt-5 w-full py-3 rounded-xl font-semibold 
    ${checkingCompany ? "bg-green-600 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
          >
            Already Profile ?
          </button>
        </form>
      </div>
    </div>
  )
}
