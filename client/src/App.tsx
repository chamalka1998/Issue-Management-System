import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import type { RootState } from "./app/store";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddIssue from "./pages/AddIssue";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import "./styles/Toast.css"; // Import global styles
import { useEffect } from "react";

const App = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const darkMode = useAppSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark-mode");
      root.classList.remove("light-mode");
    } else {
      root.classList.add("light-mode");
      root.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    /* 1. Use the class name that matches your Dashboard.css (dark-mode) */
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      {/* 2. THE TOASTER: Placed inside the themed div */}
      <Toaster
        position="bottom-center"
        toastOptions={{
          // Apply the base class to every toast
          className: "custom-toast",

          // Apply specific classes based on type
          success: {
            className: "custom-toast custom-toast-success",
          },
          error: {
            className: "custom-toast custom-toast-error",
          },
        }}
      />

      <Router>
        {/* Main wrapper to handle footer positioning */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar />

          {/* This container will grow to fill space, pushing footer down */}
          <div className="container" style={{ flex: "1" }}>
            <Routes>
              {/* Public Routes */}
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/dashboard" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/dashboard" />}
              />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add" element={<AddIssue />} />
              </Route>

              {/* Default Redirect */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
