import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function UpdateCompany() {

    const { token } = useAuth()

    // FORM DATA 

    const [updateData, setUpdataData] = useState({
        companyName: "",
        location: "",
        website: "",
        description: ""
    });

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    //    fetch company data 

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const res = await axios.get('http://localhost:4002/api/auth/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                 setUpdataData(
                    res.data

                );

            } catch (error) {
                console.log(error);
                setError("Error in fetching");
            }
        };

        fetchCompany();
    }, [token]);

    //   hanlde change

    const handleChange = (e) => {
        setUpdataData({
            ...updateData,
            [e.target.name]: e.target.value
        })
    };

    // update company data

    const updateCompany = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(
                'http://localhost:4002/api/auth/updateCompany',
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Updated Successfully");
            setLoading(false);
            setError("");

        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "Something went wrong");
            setLoading(false);
        }
    };


    return (
        <div className="flex items-center  justify-center w-full p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">

                {/* Optional Header Section */}
                <div className="px-8 py-6 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-800">
                        <span className='text-purple-600'>Edit Company</span> Details
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Update the information below.
                    </p>
                </div>

                <div className="p-8">
                    <form onSubmit={updateCompany} className="space-y-5">

                        {/* Company Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Company Name
                            </label>
                            <input
                                name="companyName"
                                value={updateData.companyName}
                                onChange={handleChange}
                                placeholder="e.g. Acme Corp"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 placeholder-gray-400"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <input
                                name="location"
                                value={updateData.location}
                                onChange={handleChange}
                                placeholder="e.g. New York, NY"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 placeholder-gray-400"
                            />
                        </div>

                        {/* Website */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Website
                            </label>
                            <input
                                name="website"
                                value={updateData.website}
                                onChange={handleChange}
                                placeholder="https://example.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 placeholder-gray-400"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={updateData.description}
                                onChange={handleChange}
                                placeholder="Briefly describe the company..."
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 placeholder-gray-400 resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${loading ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </span>
                            ) : (
                                "Update Company"
                            )}
                        </button>

                        {/* Error Message */}
                        {error && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
