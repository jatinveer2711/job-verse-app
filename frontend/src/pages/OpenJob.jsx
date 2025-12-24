import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function OpenJob() {
  const {token} = useAuth()
  const {id} = useParams()
  const[formData,setFormData] = useState(null)
  const[loading,setLoading] = useState(true)
  const[error,setError] = useState("")

  const navigate = useNavigate()

  const fetchJobs = async()=>{
     try {
      const res = await axios.get(`http://localhost:4002/api/auth/get-Job/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
     });
     setFormData(res.data)
     } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong")
      
     }
     finally{
      setLoading(false)
     }

  }

  useEffect(()=>{
    fetchJobs()
  },[])

  if(loading) return <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin"></div>
        <p className="mt-4 text-gray-500 font-medium text-sm animate-pulse">Loading data...</p>
      </div>
    </div>
  if(error) return <p className='text-red-500'>{error}</p>

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6">
  
  {/* Optional Back Button for UX */}
  <button className="mb-6 flex items-center text-sm text-gray-500 hover:text-gray-800 transition-colors" onClick={()=>navigate('/recruiter/my-job')}>
    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg> 
    Back to Jobs
  </button>

  <div className="bg-white shadow-xl shadow-gray-200/60 rounded-2xl overflow-hidden border border-gray-100">
    
    {/* Header Section */}
    <div className="p-8 border-b border-gray-100 bg-gray-50/30">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-purple-600 tracking-tight mb-2">
            {formData.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {/* Company Name */}
            <div className="flex items-center gap-1.5">
              <div className="p-1.5 bg-white rounded-md shadow-sm border border-gray-200 text-gray-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="font-medium">{formData.companyId?.companyName || "Company Name"}</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Company location -{formData.companyId?.location || "Remote"}</span>
            </div>

            {/* Salary Badge */}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {formData.salaryRange || "Competitive Salary"}
            </span>
          </div>
        </div>
        
        
        
      </div>
    </div>

    {/* Content Body */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
      
      
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className='text-purple-600'>About the </span> Job
          </h3>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
            {formData.description || "No description provided for this role."}
          </div>
        </div>
      </div>

      {/* Right Column: Sidebar Details (Takes up 1/3 space) */}
      <div className="space-y-6">
        
        {/* Salary Card */}
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
            Salary Range
          </label>
          <div className="flex items-center gap-3 text-gray-800 font-bold text-lg">
             <span className="p-2 bg-white rounded-full shadow-sm text-green-600">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </span>
             {formData.salaryRange || "Not Disclosed"}
          </div>
        </div>

        {/* Skills Card */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
            Skills Required
          </label>
          
          {/* Checks if skills exist, then tries to map them if it's an array, or displays text */}
          <div className="flex flex-wrap gap-2">
             {formData.skillsRequired ? (
               formData.skillsRequired.toString().split(',').map((skill, index) => (
                 <span 
                   key={index} 
                   className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-100"
                 >
                   {skill.trim()}
                 </span>
               ))
             ) : (
               <p className="text-sm text-gray-400 italic">No specific skills listed.</p>
             )}
          </div>
        </div>

        {/* Company Mini-Info */}
        <div className="border-t border-gray-100 pt-6">
           <p className="text-sm text-gray-500">
             Posted by <span className="font-semibold text-gray-900">{formData.companyId?.companyName}</span>
           </p>
        </div>

      </div>
    </div>
  </div>
</div>
  )
}
