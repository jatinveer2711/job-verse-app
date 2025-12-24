import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate,Link } from 'react-router-dom'


export default function Login() {
    const [formdata, setFormdata] = useState({
        email: "",
        password: "",

    });
    const navigate = useNavigate()
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleChange = async (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
    const handleSumbit = async (e) => {
        e.preventDefault();
        setError("")
        setLoading(true)
        try {
            const res = await axios.post('http://localhost:4002/api/auth/login', formdata)
            

            const { token ,role,userId} = res.data
            const userData = {role,userId}
            login(userData,token)
            alert("login successfuly")
            

            if (role === "user") {
                try {
                    const res = await axios.get('http://localhost:4002/api/auth/getProfile',{
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    })
                    if(res.data && Object.keys(res.data).length > 0){
                        
                        
                        navigate('/')
                    }
                    else{
                        
                        
                        navigate('/profile')
                    }
                } catch (error) {
                   console.log(error);
                   navigate('/profile')
                   
                }
            }
            else if (role === "recruiter") {
                try {
                    const res = await axios.get('http://localhost:4002/api/auth/getAll',{
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    })
                    if(res.data && Object.keys(res.data).length > 0 ){
                        navigate('/')
                    }
                    else{
                       
                        
                        navigate('/createCompany')
                    }
                } catch (error) {
                    console.error(error);
                    navigate('/createCompany')
                }
            }
            else {
                navigate('/')
            }
        } catch (error) {
       
            setError(error.response?.data?.message || "login failed")
            
        } finally {
            setLoading(false)
        }

    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* Header Section outside the card for better spacing */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          <span className='text-purple-600'>Welcome</span> back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Login to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-100">
          
          <form className="space-y-6" onSubmit={handleSumbit}>
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formdata.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formdata.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          {/* Footer / Sign Up Link */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  New here?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
               <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                  Create an account
               </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
    )
}
