import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function JobPost() {
    const {token} = useAuth()
    const [jobData, setJobData] = useState({
        title: "",
        description: "",
        salaryRange: "",
        location: "",
        skillsRequired: "",
       
    })
    
    const[loading,setLoading] = useState(false)
    const[error,setError] = useState("")
    const[companyId,setCompanyId] = useState("")
    const[success,setSuccess] = useState("")
    useEffect(()=>{
        const id = localStorage.getItem("companyId")
        setCompanyId(id)
       },[])
    const postJob = async(e)=>{
       e.preventDefault()
       setLoading(true)
        setError("")
        if(!companyId){
            alert("company not found")
            setLoading(false)
            return
        }

       try {
        const res = await axios.post('http://localhost:4002/api/auth/post-job',{
            ...jobData,
            companyId,
             
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
         setSuccess("job created successfully")
        setJobData(
            {title: "",
        description: "",
        salaryRange: "",
        location: "",
        skillsRequired: "",
        }
        )
       } catch (error) {
         console.log(error);
         setError(error.response?.data?.message || "Something went wrong")
         
       }
       finally{
        setLoading(false)
       }
    }
    return (
         <div className="max-w-3xl  mx-auto mt-12 p-4 bg-gradient-to-br  from-purple-100 via-pink-100 to-blue-100 min-h-screen rounded-2xl">

  {/* Card Container */}
  <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl overflow-hidden border border-white/30">

    {/* Form Header */}
    <div className="bg-gradient-to-r from-indigo-600  via-purple-600 to-pink-600 px-10 py-7 border-b border-white/20 text-white">
      <h2 className="text-2xl font-bold tracking-wide">✨ Post a New Job</h2>
      <p className="text-sm opacity-90 mt-1">Fill in the details to attract top talent.</p>
    </div>

    <div className="p-10">

      {/* Alerts */}
      {error && (
        <div className="mb-6 flex items-center gap-3 bg-red-100/80 text-red-800 px-5 py-3 rounded-xl border border-red-300 shadow">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 flex items-center gap-3 bg-green-100/80 text-green-800 px-5 py-3 rounded-xl border border-green-300 shadow">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
          </svg>
          <p className="text-sm font-semibold">{success}</p>
        </div>
      )}

      <form onSubmit={postJob} className="space-y-7">

        {/* Job Title */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title</label>
          <input
            type="text"
            placeholder="e.g. Senior React Developer"
            value={jobData.title}
            onChange={e => setJobData({ ...jobData, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white shadow-sm 
              focus:ring-4 focus:ring-purple-300/60 focus:border-purple-600 
              transition-all duration-300 outline-none text-slate-800 placeholder:text-slate-400"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Job Description</label>
          <textarea
            placeholder="Describe the role, responsibilities, and requirements..."
            value={jobData.description}
            onChange={e => setJobData({ ...jobData, description: e.target.value })}
            rows="6"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white shadow-sm 
              focus:ring-4 focus:ring-blue-300/60 focus:border-blue-600 
              transition-all duration-300 outline-none text-slate-800 placeholder:text-slate-400 resize-y"
            required
          ></textarea>
        </div>

        {/* Two Column Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {/* Salary */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Salary Range</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">$</span>
              <input
                type="text"
                placeholder="e.g. 80k - 100k"
                value={jobData.salaryRange}
                onChange={e => setJobData({ ...jobData, salaryRange: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white shadow-sm 
                  focus:ring-4 focus:ring-green-300/60 focus:border-green-600 
                  transition-all duration-300 outline-none text-slate-800"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
            <div className="relative">
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <input
                type="text"
                placeholder="e.g. Remote / New York"
                value={jobData.location}
                onChange={e => setJobData({ ...jobData, location: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 bg-white shadow-sm 
                  focus:ring-4 focus:ring-pink-300/60 focus:border-pink-600 
                  transition-all duration-300 outline-none text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Skills Required</label>
          <input
            type="text"
            placeholder="e.g. React, Node.js, Tailwind CSS (comma separated)"
            value={jobData.skillsRequired}
            onChange={e => setJobData({ ...jobData, skillsRequired: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white shadow-sm 
              focus:ring-4 focus:ring-orange-300/60 focus:border-orange-600 
              transition-all duration-300 outline-none text-slate-800"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl text-white font-semibold shadow-xl 
              flex justify-center items-center gap-3 text-lg transition-all duration-300
              ${loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:scale-[1.03] hover:shadow-2xl"
              }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                <span>Publishing...</span>
              </>
            ) : (
              "🚀 Post Job"
            )}
          </button>
        </div>

      </form>
    </div>
  </div>
</div>

    )
}
