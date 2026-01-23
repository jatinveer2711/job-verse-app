import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const {token} = useAuth();
    const navigate = useNavigate()
    const handleJobSeekerNavigate = (e) => {
    // Agar token hai aur user ka role jobseeker hai → stop normal link navigation
    if (token && user?.role === "jobseeker") {
      e.preventDefault()
      navigate("/jobseeker/dashboard")  // apna route yaha lagana
    }
    else if (token && user?.role === "recruiter"){
        e.preventDefault()
        navigate("/Recruiter/Dashboard")
    }
    else {
        navigate("/login")
    }
    
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col">
      

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="max-w-5xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4"
          >
            Welcome to <span className="text-purple-600">JobVerse</span>
          </motion.h2>
          
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
            A professional job platform designed for both Recruiters and Jobseekers. Easy hiring, smart applications, and seamless connections — all in one place.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
            onClick={handleJobSeekerNavigate}
              href="/Recruiter/Dashboard"
              className="px-6 py-3 bg-purple-600 text-white rounded-xl text-lg font-medium shadow hover:bg-blue-700 transition"
            >
              Recruiter Portal
            </a>
            <a
              href="/jobseeker/Dashboard"
              onClick={handleJobSeekerNavigate}
              className="px-6 py-3 bg-white text-purple-600 border border-purple-600 rounded-xl text-lg font-medium shadow hover:bg-blue-50 transition"
            >
              Jobseeker Portal
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-10">
            Powerful <span className="text-purple-600">Features</span>
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold text-purple-600 mb-2">Smart Job Search</h4>
              <p className="text-gray-600">Jobseekers can find relevant jobs with filters and personalized suggestions.</p>
            </div>

            <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold text-purple-600 mb-2">Easy Recruitment</h4>
              <p className="text-gray-600">Recruiters can post jobs, manage applications, and shortlist candidates instantly.</p>
            </div>

            <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold text-purple-600 mb-2">Real‑Time Updates</h4>
              <p className="text-gray-600">Stay updated with instant status notifications for applications and job updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-10">
            Built For <span className="text-purple-600">Everyone </span>
          </h3>

          <div className="grid sm:grid-cols-2 gap-10">
            {/* Recruiter Card */}
            <div className="p-8 bg-white rounded-2xl shadow hover:shadow-xl transition">
              <h4 className="text-2xl font-bold text-purple-600 mb-3">Recruiters</h4>
              <p className="text-gray-600 mb-4">
                Post jobs, review applications, shortlist candidates, and manage your hiring pipeline effortlessly.
              </p>
            </div>

            {/* Jobseekers Card */}
            <div className="p-8 bg-white rounded-2xl shadow hover:shadow-xl transition">
              <h4 className="text-2xl font-bold text-purple-600 mb-3">Jobseekers</h4>
              <p className="text-gray-600 mb-4">
                Create your profile, upload resumes, apply for jobs, track application status, and get hired faster.
              </p>
            </div>
          </div>
        </div>
      </section>

    {/* Sign Up CTA Section */}
<section className="py-20 bg-white border-t">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
      Ready to start your journey?
    </h3>

    <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
      Join JobVerse today and connect with recruiters or discover your next
      opportunity — all in one platform.
    </p>

    <button
      onClick={() => navigate("/signup")}
      className="px-10 py-4 bg-white text-purple-600 border border-purple-600 rounded-2xl text-lg font-semibold shadow-sm hover:bg-purple-50 transition"
    >
      Sign Up for Free
    </button>
  </div>
</section>

    </div>
  );
}
