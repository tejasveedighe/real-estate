import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  if (!Cookies.get("userToken")) {
    alert("Login to continue");
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default ProtectedRoutes;
