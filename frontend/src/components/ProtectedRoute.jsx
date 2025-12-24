import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowRoles = [] }) {
  const { user } = useAuth();

  // ✅ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Role restricted access
  const userRole = user?.role;
  if (allowRoles.length > 0 && !allowRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized
  return children;
}
