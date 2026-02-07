import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Added Link
import { BASE_URL } from "../config";
import { useAppSelector } from "../app/hooks"; // Added for theme
import "../styles/Auth.css";
import toast from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [, setLoading] = useState(false);

  // Use the global theme state
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // 3. SANITIZE DATA
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Basic Validation
    if (cleanPassword.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    setLoading(true);
    const toastId = toast.loading("Creating your account..."); // 4. Loading toast

    try {
      await axios.post(`${BASE_URL}/api/auth/register`, {
        email: cleanEmail,
        password: cleanPassword,
      });

      toast.success("Account created! Redirecting to login...", {
        id: toastId,
      });

      // Small delay so user can read the success toast
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      setLoading(false);
      // 5. Handle specific error messages if your backend sends them
      const message =
        error.response?.data?.message || "Registration failed. Try again.";
      toast.error(message, { id: toastId });
    }
  };

  return (
    <div className={`auth-page ${darkMode ? "dark-mode" : ""}`}>
      <div className="auth-card">
        <h2>Register</h2>
        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-auth">
            Create Account
          </button>
        </form>
        <p className="auth-footer-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
