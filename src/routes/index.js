import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PublicRoute, ProtectedRoute } from "./ProtectedRoute";

import CreateMovie from "../components/CreateMovie";
import EditMovie from "../components/EditMovie";
import MyMovie from "../components/MyMovie";
import Login from "../pages/Login";
import ScrollToTop from "../components/ScrollToTop";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/sign-in"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/add-movie"
            element={
              <ProtectedRoute>
                <CreateMovie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-movie/:id"
            element={
              <ProtectedRoute>
                <EditMovie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <MyMovie />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
