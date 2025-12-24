import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function RecruiterApplicants() {
  const [loading, setLaoding] = useState(false)
  const [error, setError] = useState("")
  const [applications, setApplications] = useState([])
  const { token } = useAuth()

  // fetch applications

  const fetchApplications = async () => {
    try {
      setLaoding(true)
      const res = await axios.get('http://localhost:4002/api/auth/recruiter/applications', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setApplications(res.data.applications)

    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "something went wrong")
    }
    finally {
      setLaoding(false)
    }
  }

  //  update applications

  const updateApplications = async (id, newStatus) => {
    try {
      const res = await axios.put(`http://localhost:4002/api/auth/update/applications/${id}`, {
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      fetchApplications()

      alert(`application ${newStatus} successfully`)
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchApplications()
  }, [token]);


  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight"><span className='text-purple-700'>Your</span> Applicants</h1>
          <p className="text-slate-500 mt-1">Manage and track your candidate pipeline.</p>
        </div>
        {!loading && (
          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
            {applications.length} Candidates
          </span>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && applications.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-slate-900">No applications yet</h3>
          <p className="mt-1 text-sm text-slate-500">Wait for candidates to apply to your positions.</p>
        </div>
      )}

      {/* Application Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {applications.map((app) => (
          <div
            key={app._id}
            className="group relative flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
          >
            {/* Job Header */}
            <div className="p-5 border-b border-slate-100">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-bold text-slate-900 line-clamp-1" title={app.jobId?.title}>
                  {app.jobId?.title || "Unknown Position"}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                  {/* Location Icon */}
                  <svg className="mr-1.5 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {app.jobId?.location || "Remote"}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-50 text-green-700">
                  {/* Money Icon */}
                  <svg className="mr-1.5 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {app.jobId?.salaryRange || "N/A"}
                </span>
              </div>
            </div>

            {/* Candidate Info */}
            <div className="p-5 flex-grow">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                  {app.jobseekerId?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {app.jobseekerId?.name || "Anonymous Candidate"}
                  </p>
                  <p className="text-xs text-slate-500 truncate max-w-[180px]">
                    {app.jobseekerId?.email}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (app?.resume) {
                    // Agar resume ek URL ho
                    if (app.resume.startsWith("http")) {
                      window.open(app.resume, "_blank");
                      return;
                    }

                    // Agar resume ek text/string ho (cover letter type)
                    const blob = new Blob([app.resume], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    window.open(url, "_blank");
                  }
                }}
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View Resume
              </button>
            </div>

            {/* Actions Footer */}
            <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Update Status</p>
              <div className="flex gap-2">
                <button
                  onClick={() => updateApplications(app._id, "accepted")}
                  title="Accept"
                  className="flex-1 flex justify-center items-center py-2 bg-white border border-green-200 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors shadow-sm"
                >
                  <span className="text-sm font-medium">Accept</span>
                </button>

                <button
                  onClick={() => updateApplications(app._id, "shortisted")}
                  title="Shortlist"
                  className="flex-1 flex justify-center items-center py-2 bg-white border border-amber-200 text-amber-600 rounded-lg hover:bg-amber-500 hover:text-white transition-colors shadow-sm"
                >
                  <span className="text-sm font-medium">Shortlist</span>
                </button>

                <button
                  onClick={() => {
                    const configiration = window.confirm("Are you sure you want to reject this application ?");
                    if (configiration) {
                      updateApplications(app._id, "rejected")
                    }
                  }
                  }
                  title="Reject"
                  className="flex-none w-10 flex justify-center items-center py-2 bg-white border border-red-200 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
