import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks"; // Added useAppSelector
import { login } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css"; // Import the styles
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Connect to darkMode to ensure the container class updates
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className={`auth-page ${darkMode ? "dark-mode" : ""}`}>
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-auth">
            Sign In
          </button>
        </form>
        <p className="auth-footer-text">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
