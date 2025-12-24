import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react'
import { useAuth } from '../context/AuthContext';
import axios from 'axios';


export default function JobseekerDashbaord() {

  const { token } = useAuth()

  const [jobs, setJobs] = useState([])
  const [searchText, setSearchText] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [selectedJObs, setSelectedJobs] = useState(null)
  const [applyJobs, setApplyJobs] = useState({
    coverLetter: "",
    resume: ""
  });


  // apply for jobs 

  const handleApply = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post('http://localhost:4002/api/auth/apply', {
        jobId: selectedJObs._id,
        coverLetter: applyJobs.coverLetter,
        resume: applyJobs.resume

      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert("Application submitted successfully")


      setApplyJobs({
        coverLetter: "",
        resume: ""
      })
      setShowForm(false)


    } catch (error) {
      console.log(error);
      alert("aplication failed ")

    }
  }


  // search jobs

  const hanldeSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:4002/api/auth/searchJob?keyword=${searchText}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setJobs(res.data)


    } catch (error) {
      console.log(error)
    }
  }




  return (
    <div className='mt-6 text-center'>
      <div className='flex flex-col gap-5'>


        <span className='px-4 mx-auto py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
          No.1 Job connect Website
        </span>


        <h1 className='text-4xl md:text-5xl font-bold'>
          Searh, Apply & <br /> Get your <span className='text-[#6A38C2]'>Dreams Jobs</span>
        </h1>


        <p className='text-lg text-gray-700 max-w-2xl mx-auto'>
          Find opportunities that match your skills, passion, and career goals — start your journey to the perfect job today.
        </p>
      </div>


      <div className="flex mt-6 w-full max-w-lg mx-auto items-center gap-3 bg-white 
   border border-gray-300 rounded-full px-4 py-2 shadow-sm 
   focus-within:ring-2 focus-within:ring-[#6A38C2] focus-within:ring-offset-2 
   transition-all duration-300">


        <input
          type="text"
          placeholder="Find your dream job"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full bg-transparent border-0 outline-none focus:ring-0 text-gray-700 placeholder:text-gray-400"
        />


        <button
          className="p-2 rounded-full bg-[#6A38C2] hover:bg-[#582fa3] transition-colors"
          onClick={hanldeSearch}
        >
          <Search className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Category Section */}
      <div className="mt-16">


        <h2 className="text-2xl font-semibold mb-6 text-left">
          Popular Job <span className='text-[#6A38C2]'>catogaries</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">


          {/* Card 1 */}
          <div className="p-6 bg-white shadow-md rounded-2xl border hover:shadow-lg transition cursor-pointer text-left">
            <p className="text-lg font-semibold text-[#6A38C2]">Frontend Developer</p>
            <p className="text-sm text-gray-500 mt-1">120+ Jobs</p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white shadow-md rounded-2xl border hover:shadow-lg transition cursor-pointer text-left">
            <p className="text-lg font-semibold text-[#6A38C2]">Backend Developer</p>
            <p className="text-sm text-gray-500 mt-1">98+ Jobs</p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white shadow-md rounded-2xl border hover:shadow-lg transition cursor-pointer text-left">
            <p className="text-lg font-semibold text-[#6A38C2]">Full Stack Developer</p>
            <p className="text-sm text-gray-500 mt-1">150+ Jobs</p>
          </div>

          {/* Card 4  */}
          <div className="p-6 bg-white shadow-md rounded-2xl border hover:shadow-lg transition cursor-pointer text-left">
            <p className="text-lg text-[#6A38C2]  font-semibold">Data Analytics</p>
            <p className="text-sm text-gray-500 mt-1">80+ Jobs</p>
          </div>
        </div>
      </div>

      {/* RECOMMENDED JOBS SECTION */}
      <div className="mt-16"> {/* Increased margin-top for spacing */}


        <h2 className="text-4xl font-bold mb-6 text-left">
          Recommended Jobs <span className='text-[#6A38C2]'> Based on your profile</span>
        </h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}

              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 text-left hover:shadow-lg transition-all duration-300"
            >

              <h3 className="text-lg font-bold text-gray-800">
                {job.title}
              </h3>


              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <MapPin size={16} className="text-[#4cf87f]" />
                <span>{job.companyId?.location || "india"}</span>
              </div>


              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {job.description}
              </p>


              <p className="text-lg font-semibold text-[#6A38C2] mt-4">Salary-
                {job.salaryRange || "45 LPA"}
              </p>
              <button className='text-green-950 mt-3' onClick={() => {
                setSelectedJobs(job);
                setShowForm(true)
              }} >Apply job</button>
            </div>
          ))}
        </div>
      </div>

      {/* apply job form */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity p-4">
          {/* Modal Container */}
          <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all ring-1 ring-gray-900/5">

            {/* Header Section */}
            <div className="border-b border-gray-100 px-6 py-5 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-xl font-semibold text-gray-800">
                Apply for <span className="text-purple-600">{selectedJObs?.title}</span>
              </h2>

              {/* X Close Button (UX Improvement) */}
              <button
                onClick={() => setShowForm(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Section */}
            <div className="p-6">
              <form onSubmit={handleApply} className="space-y-5">

                {/* Cover Letter Input */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Cover Letter
                  </label>
                  <textarea
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 placeholder-gray-400 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 min-h-[120px] resize-none"
                    value={applyJobs.coverLetter}
                    onChange={(e) =>
                      setApplyJobs({ ...applyJobs, coverLetter: e.target.value })
                    }
                    placeholder="Why are you a good fit for this role?"
                    required
                  />
                </div>

                {/* Resume Input */}


                <div className="space-y-1.5 mt-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Resume (Link or Text)
                  </label>

                  <textarea
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 placeholder-gray-400 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 min-h-[100px] resize-none"
                    value={applyJobs.resume}
                    onChange={(e) =>
                      setApplyJobs({ ...applyJobs, resume: e.target.value })
                    }
                    placeholder="Paste your resume link or write your resume summary..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full px-4 py-3 bg-purple-600 text-white font-semibold rounded-xl
             shadow-md hover:bg-purple-700 active:scale-[0.98]
             transition-all duration-200 focus:ring-4 focus:ring-purple-500/30"
                >
                  Submit Application
                </button>

              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
