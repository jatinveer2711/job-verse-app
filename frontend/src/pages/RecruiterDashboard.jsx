import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';


export default function RecruiterDashboard() {

  const [info, setInfo] = useState([])

  const [loading, setLoading] = useState(true)
  const { token } = useAuth()
  useEffect(()=>{
    fetchCompany()
  },[])
   const fetchCompany = async () => {

    try {
      const res = await axios.get('http://localhost:4002/api/auth/getAll', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
     
      setInfo(res.data)

      
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  
  if(loading) return <p className="text-center mt-10">Loading...</p>;
  if(!info){
     <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">No Company Found</h2>
        <p className="text-gray-600">Please create a company first.</p>
      </div>
  }
  return (
<div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

  {/* Card Container */}
  <div className="bg-white shadow-2xl shadow-purple-900/5 rounded-[2rem] overflow-hidden border border-purple-100/50">

    {/* Vibrant Header */}
    <div className="px-8 py-8 bg-gradient-to-r from-purple-700 to-indigo-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex items-center gap-4 relative z-10">
        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl border border-white/10 shadow-inner">
          <span className="text-2xl">🏢</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Company Overview</h2>
          <p className="text-purple-100 text-sm font-medium opacity-90">Recruiter Dashboard</p>
        </div>
      </div>

      <button
        onClick={() => window.location.href = "/recruiter/edit-company"}
        className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg"
      >
        <span>Edit</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
      </button>
    </div>

    {/* Body */}
    <div className="p-8 bg-gray-100 sm:p-10">
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        
        <div className="col-span-1">
          <dt className="text-xs font-bold text-purple-900/40 uppercase tracking-widest mb-2">Company Name</dt>
          <dd className="text-xl font-bold text-gray-900 flex items-center gap-2">
            {info.companyName}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Verified
            </span>
          </dd>
        </div>

        <div className="col-span-1">
          <dt className="text-xs font-bold text-purple-900/40 uppercase tracking-widest mb-2">Location</dt>
          <dd className="text-xl font-medium text-gray-700">{info.location}</dd>
        </div>

        <div className="col-span-1 md:col-span-2">
          <dt className="text-xs font-bold text-purple-900/40 uppercase tracking-widest mb-2">Website</dt>
          <dd>
            <a href={info.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lg font-medium text-purple-600 hover:text-purple-700 transition-colors">
              {info.website}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          </dd>
        </div>

        <div className="col-span-1 md:col-span-2">
          <dt className="text-xs font-bold text-purple-900/40 uppercase tracking-widest mb-3">About</dt>
          <dd className="text-base leading-relaxed text-gray-600 border-l-4 border-purple-100 pl-4">
            {info.description}
          </dd>
        </div>
      </dl>

       {/* Mobile-only Edit Button */}
       <div className="mt-10 sm:hidden">
         <button
           onClick={() => window.location.href = "/recruiter/edit-company"}
           className="w-full py-3 rounded-xl border-2 border-purple-100 text-purple-700 font-bold text-sm uppercase tracking-wide hover:bg-purple-50 transition-colors"
         >
           Edit Profile
         </button>
       </div>
    </div>
  </div>

  {/* Floating Action Button Style */}
  <div className="mt-8 flex justify-end">
    <button
      onClick={() => window.location.href = "/recruiter/post-job"}
      className="group flex items-center gap-3 bg-gray-900 hover:bg-black text-white px-7 py-4 rounded-2xl shadow-xl shadow-purple-900/20 hover:shadow-2xl hover:shadow-purple-900/30 transform hover:-translate-y-1 transition-all duration-300"
    >
      <span className="flex items-center justify-center w-8 h-8 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-lg text-white shadow-lg group-hover:rotate-90 transition-transform duration-300">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
      </span>
      <span className="text-lg font-bold tracking-wide">Post New Job</span>
    </button>
  </div>
</div>

  )
}

