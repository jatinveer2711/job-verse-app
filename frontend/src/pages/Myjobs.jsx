import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Myjobs() {
  const { token } = useAuth()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [updateForm, setUpdateForm] = useState(false)
  const [updateId, setUpdateId] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salaryRange: "",
    location: "",
    skillsRequired: "",
  })
  const navigate = useNavigate()

  // update job

  const updateJob = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await axios.put(`http://localhost:4002/api/auth/update-job/${updateId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      fetchJobs()
      setUpdateForm(false)
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong")

    }
    finally {
      setLoading(false)
    }
  }

  // handleclick function 

  const handleEditClick = (job) => {
    setUpdateId(job._id)


    setFormData({
      title: job.title,
      description: job.description,
      salaryRange: job.salaryRange,
      location: job.location,
      skillsRequired: job.skillsRequired,
    });
    setUpdateForm(true);
  };

  // delete jobs

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4002/api/auth/delete-job/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // console.log("JOB ID:", job._id);
      if (res.data) alert('job deleted successfully')
      fetchJobs()
    } catch (error) {
      console.log(error);
      alert(error)

    }
  }

  // fetchjobs

  const fetchJobs = async (e) => {
    e?.preventDefault()
    setLoading(true)
    setError("")
    try {

      const res = await axios.get('http://localhost:4002/api/auth/get-job', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })


      setJobs(res.data);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong")

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [token])


  if (loading)
    return (
     <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin"></div>
        <p className="mt-4 text-gray-500 font-medium text-sm animate-pulse">Loading data...</p>
      </div>
    </div>
    );


  <div className="flex justify-center items-center h-64">
    <div className="bg-red-50 p-4 rounded-lg border border-red-200 shadow-sm w-full max-w-sm flex items-start space-x-3">
        {/* Error Icon (e.g., an 'X' in a circle, assuming a library icon like 'XCircle' is imported) */}
        <svg className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        {/* Error Text */}
        <p className="text-red-700 text-base font-medium">
            An error occurred: **{error}**
        </p>
    </div>
</div>

  return (
    <div className="mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          My <span className='text-purple-700'>Jobs</span>
        </h2>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium w-fit">
          {jobs.length} Active Posts
        </span>
      </div>

      {/* Empty State */}
      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 bg-white rounded-2xl border border-dashed border-gray-300">
          <div className="text-gray-400 mb-4">
            <svg className="w-14 h-14 sm:w-16 sm:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="text-base sm:text-lg text-gray-500 font-medium">No jobs posted yet.</p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Create a new listing to get started.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Table Wrapper For Mobile Scroll */}
          <div className="overflow-x-auto">

            {/* Header Row */}
            <div className="min-w-[700px] grid grid-cols-5 gap-4 p-4 sm:p-5 bg-gray-50 border-b border-gray-200 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <span className="pl-2">Job Title</span>
              <span>Location</span>
              <span>Salary</span>
              <span>Status</span>
              <span className="text-right pr-2">Actions</span>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-100 min-w-[700px]">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="grid grid-cols-5 gap-4 p-4 sm:p-5 items-center hover:bg-blue-50/30 transition-colors duration-200 group"
                >

                  {/* Job Title */}
                  <div className="flex flex-col pl-2">
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      {job.title}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-400 mt-0.5 line-clamp-1">
                      {job.companyId?.companyName || "Company Name"}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                    <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location || "Remote / India"}
                  </div>

                  {/* Salary */}
                  <span className="text-gray-700 font-medium text-xs sm:text-sm bg-gray-100 px-3 py-1 rounded-md w-fit">
                    {job.salaryRange || "Not Disclosed"}
                  </span>

                  {/* Status */}
                  <div>
                    <button
                      onClick={() => navigate(`/recruiter/open-job/${job._id}`)}
                      className="px-4 py-2text-sm sm:text-basefont-medium text-blue-900 bg-blue-600rounded-xlshadow-md hover:bg-blue-700hover:shadow-lg
                          active:scale-95
                          transition-all
                          duration-200"
                    >
                      Open
                    </button>

                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 sm:gap-3 justify-end pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      className="p-1.5 sm:p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      onClick={() => {
                        handleEditClick(job);
                        setUpdateForm(true);
                      }}
                      title="Edit"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>

                    <button
                      className="p-1.5 sm:p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      onClick={() => {
                        handleDelete(job._id)
                      }}
                      title="Delete"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* UPDATE FORM */}
      {updateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => setUpdateForm(false)}
          ></div>

          <form
            onSubmit={updateJob}


            className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-xl max-h-[90vh] flex flex-col overflow-hidden"
          >

            {/* Header */}
            <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-base sm:text-lg font-bold text-gray-800">
                Update <span className='text-purple-700'>Job Details</span>
              </h3>
              <button
                type="button"
                onClick={() => setUpdateForm(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5">

              {/* Title & Salary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Job Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Salary Range</label>
                  <input
                    type="text"
                    value={formData.salaryRange}
                    onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Location</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.location }
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="City, Country or Remote"
                  />
                  <span className="absolute left-4 top-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                />
              </div>

              {/* Skills */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Skills Required</label>
                <input
                  type="text"
                  value={formData.skillsRequired}
                  onChange={(e) => setFormData({ ...formData, skillsRequired: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setUpdateForm(false)}
                className="px-4 sm:px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
              
                type="submit"
                className="px-4 sm:px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>

          </form>
        </div>
      )}
    </div>


  )
}
