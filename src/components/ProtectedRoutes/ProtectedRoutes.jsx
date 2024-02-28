import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserData } from "../../utils/auth";

function ProtectedRoutes() {
  try {
    const { userRole: role } = getUserData();
    if (!role) {
      alert("Login to continue");
      return <Navigate to="/" />;
    }
    const isAdmin = role === "Admin";
    if (!isAdmin) {
      alert("Only Admin can add properties");
      return <Navigate to="/" />;
    }
  } catch (error) {
    alert(`Unable to authroize: ${error.message}`);
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default ProtectedRoutes;
