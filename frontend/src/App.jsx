import React from 'react'
import Navbarjobseaker from './components/NavbarJobseaker'
import NavbarRecruiter from './components/Navbarrecruiter'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import JobSeekerDashboard from './pages/JobseekerDashbaord';
import RecruiterDashboard from './pages/RecruiterDashboard';
import Myapplication from './pages/Myapplication';
import Profile from './pages/Profile';
import ViewProfile from './pages/ViewProfile';
import CreateCompany from './pages/CreateCompany';
import UpdateCompany from './pages/UpdateCompany';
import JobPost from './pages/JobPost';
import Myjobs from './pages/Myjobs';
import OpenJob from './pages/OpenJob';
import RecruiterApplicants from './pages/RecruiterApplicants';
import HomePage from './pages/HomePage';

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  // const recruiter = JSON.parse(localStorage.getItem("recruiter"));
  return (
    <Router>
      {/* ✅ Conditional Navbar outside Routes */}
      {user?.role === "user" && <Navbarjobseaker />}
      {user?.role === "recruiter" && <NavbarRecruiter />}

      {/* ✅ Routes below */}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* protected route */}
        <Route path='/' element={<ProtectedRoute><HomePage></HomePage></ProtectedRoute>}></Route>
        <Route path='/jobseeker/Dashboard' element={<ProtectedRoute allowRoles={['user']}><JobSeekerDashboard></JobSeekerDashboard></ProtectedRoute>} />
        <Route path='/myApplication' element={<ProtectedRoute allowRoles={['user']}><Myapplication></Myapplication></ProtectedRoute>} />
        <Route path='/Profile' element={<ProtectedRoute allowRoles={['user']}><Profile></Profile></ProtectedRoute>} />
        <Route path='/viewProfile' element={<ProtectedRoute allowRoles={['user']}><ViewProfile></ViewProfile></ProtectedRoute>} />
        <Route path='/Recruiter/Dashboard' element={<ProtectedRoute allowRoles={["recruiter"]}><RecruiterDashboard></RecruiterDashboard></ProtectedRoute>}></Route>
        <Route path='/createCompany' element={<ProtectedRoute allowRoles={["recruiter"]}><CreateCompany></CreateCompany></ProtectedRoute>}></Route>
        <Route path='/recruiter/edit-company' element={<ProtectedRoute allowRoles={["recruiter"]}><UpdateCompany></UpdateCompany></ProtectedRoute>}></Route>
        <Route path='/recruiter/post-job' element={<ProtectedRoute allowRoles={["recruiter"]}><JobPost></JobPost></ProtectedRoute>}></Route>
        <Route path='/recruiter/my-job' element={<ProtectedRoute allowRoles={["recruiter"]}><Myjobs></Myjobs></ProtectedRoute>}></Route>
        <Route path='/recruiter/open-job/:id' element={<ProtectedRoute allowRoles={["recruiter"]}><OpenJob></OpenJob></ProtectedRoute>}></Route>
        <Route path='/Applicants' element={<ProtectedRoute allowRoles={["recruiter"]}><RecruiterApplicants></RecruiterApplicants></ProtectedRoute>}></Route>

      </Routes>
    </Router>




  )
}
