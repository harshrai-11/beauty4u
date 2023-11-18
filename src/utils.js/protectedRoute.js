import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./helper";

const ProtectedRoute = () => {
  const isLoggedIn = isAuthenticated();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
