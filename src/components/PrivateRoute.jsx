// src/components/PrivateRoute.jsx
import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
 const isAuthenticated = true;  
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
