import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import VisualSearch from "./pages/VisualSearch";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload"; // <- create this page
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <VisualSearch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Upload />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

