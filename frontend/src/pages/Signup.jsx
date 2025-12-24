import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import { User, Mail, Lock, Briefcase, Loader2, ArrowRight } from 'lucide-react';



export default function Signup() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    })
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }



    const handleSumbit = async (e) => {
        e.preventDefault();
        setError("")
        setLoading(true)
        try {
            const res = await axios.post('http://localhost:4002/api/auth/signup', data)
            alert("signup is succesfull")
            navigate('/login')
        } catch (error) {
            setError(error.response?.data?.message || "Signup failed");
        }
        finally {
            setLoading(false)
        }
    }
    return (
       <div className='flex justify-center items-center min-h-screen bg-gray-50'>
    {/* Card Container - Changed background gradient to solid light gray for professionalism */}
    <div className='bg-white shadow-xl rounded-xl p-10 w-[95%] max-w-lg border border-gray-200 transition-shadow duration-300 hover:shadow-2xl'>
        
        {/* Header Section */}
        <div className="text-center mb-10">
            {/* Title - Deeper color, slightly larger and more weight */}
            <h2 className='text-4xl font-bold text-gray-800'>
                Create Your <span className='text-blue-600'>Professional</span> Account
            </h2>
            {/* Subtitle - More formal text */}
            <p className="text-gray-500 text-base mt-2">Access premium features by signing up.</p>
        </div>

        <form onSubmit={handleSumbit} className="space-y-6">
            
            {/* Name Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Full Name</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {/* Icon color adjusted */}
                        <User className="h-5 w-5 text-gray-400" /> 
                    </div>
                    <input 
                        type='text'
                        name='name'
                        value={data.name}
                        onChange={handleChange}
                        placeholder='John Doe'
                        // {/* Focus/Ring color changed to a deeper blue */}
                        className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/50 transition-all outline-none text-gray-800 placeholder-gray-400'
                        required
                    />
                </div>
            </div>

            {/* Email Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                        type='email'
                        name='email'
                        value={data.email}
                        onChange={handleChange}
                        placeholder='you@example.com'
                        className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/50 transition-all outline-none text-gray-800 placeholder-gray-400'
                        required
                    />
                </div>
            </div>

            {/* Password Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                        type='password'
                        name='password'
                        value={data.password}
                        onChange={handleChange}
                        placeholder='••••••••'
                        className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/50 transition-all outline-none text-gray-800 placeholder-gray-400'
                        required
                    />
                </div>
            </div>

            {/* Role Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">I am signing up as</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <select 
                        name='role'
                        value={data.role}
                        onChange={handleChange}
                        // {/* Focus/Ring color changed to a deeper blue */}
                        className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/50 transition-all outline-none text-gray-800 bg-white appearance-none cursor-pointer'
                    >
                        <option value="user">Job Seeker</option>
                        <option value="recruiter">Recruiter</option>
                    </select>
                    {/* Custom Chevron for select */}
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Submit Button - Changed color to a deep blue */}
            <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-md text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform duration-150 active:scale-[0.99] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                        Creating Account...
                    </>
                ) : (
                    <>
                        Sign Up <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                )}
            </button>

            {/* Footer / Login Link - Changed color to deep blue */}
            <p className="text-sm text-center text-gray-600 mt-6">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                    Log in
                </Link>
            </p>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg border border-red-200 text-center font-medium mt-4">
                    {error}
                </div>
            )}
        </form>
    </div>
</div>
    )
}
