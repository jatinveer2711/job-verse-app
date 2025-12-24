import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { DeleteIcon } from 'lucide-react'
export default function MyApplication() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { token } = useAuth();

  //  delete applications 

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4002/api/auth/delete/applications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert("application deleted successfully")
      fetchApplications()
    } catch (error) {
      console.log(error);

    }
  }


  const fetchApplications = async () => {
    try {
      // const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:4002/api/auth/getApplication`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );



      setApplications(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApplications()
  }, [token]);


  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;

  return (

    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 tracking-wide">
        My <span className="text-[#6A38C2]">Applications</span>
      </h1>

      {applications.length === 0 ? (
        <div className="p-6 bg-white rounded-xl shadow-sm border text-center text-gray-600">
          No applications found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {applications.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Job Title */}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.jobId.title}
              </h2>

              {/* Job Description */}
              <p className="text-gray-600 leading-relaxed mb-3">
                {item.jobId.description}
              </p>

              {/* Job Info Grid */}
              <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium text-gray-800">📍 Location:</span>{" "}
                  {item.jobId.location}
                </p>

                <p>
                  <span className="font-medium text-gray-800">💰 Salary:</span>{" "}
                  {item.jobId.salaryRange}
                </p>
                <p>
                  <span className="font-medium text-gray-800">💰 status:</span>{" "}
                  {item.status}
                </p>

                <p>
                  <span className="font-medium text-gray-800">🛠 Skills:</span>{" "}
                  {item.jobId.skillsRequired}
                </p>
                <DeleteIcon
                  className="h-5 w-5 text-gray-600 hover:text-gray-800 cursor-pointer transition-colors duration-200"
                  onClick={() => {
                    const confirmDelete = window.confirm("Are you sure you want to delete this application?");
                    if (confirmDelete) {
                      deleteApplication(item._id);
                    }
                  }}
                />
              </div>

              {/* Footer */}
              <p className="mt-4 text-xs text-gray-500 border-t pt-3">
                Applied on:{" "}
                <span className="font-medium">
                  {new Date(item.appliedAt).toLocaleDateString()}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );


}
