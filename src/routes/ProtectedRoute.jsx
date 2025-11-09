// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const roleID = Number(localStorage.getItem("roleID")); // hoặc lấy từ decode JWT

  // Nếu chưa đăng nhập → chuyển sang login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có danh sách allowedRoles mà role không nằm trong đó → chặn
  if (allowedRoles && !allowedRoles.includes(roleID)) {
    // Nếu role là 2 → cho về order_page
    if (roleID === 2) return <Navigate to="/order_page" replace />;
    if (roleID === 3) return <Navigate to="/bartender_page" replace />;
    return <Navigate to="/login" replace />;
  }

  // Nếu hợp lệ → render children
  return children;
}
