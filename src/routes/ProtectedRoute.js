import React from "react";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("auth_token"));
  if (isAuthenticated) {
    return <Navigate to="/movies" replace={true} />;
  }
  return children;
};

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("auth_token"));
  return isAuthenticated ? children : <Navigate to="/" replace={true} />;
};
