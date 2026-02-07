import { useState } from "react"; // Added useState
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { toggleTheme } from "../features/theme/themeSlice";
import "../styles/Navbar.css";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  interface User {
    email: string;
  }

  const { user } = useAppSelector((state) => state.auth) as {
    user: User | null;
  };
  const { darkMode } = useAppSelector((state) => state.theme);

  const onLogout = () => {
    setIsOpen(false); // Close the mobile menu/dropdown immediately

    toast(
      (t) => (
        <div className="toast-confirm">
          <span>Are you sure you want to log out?</span>
          <div className="toast-actions">
            <button
              className="toast-btn-yes"
              onClick={() => {
                toast.dismiss(t.id);
                dispatch(logout());
                navigate("/login");
                toast.success("Logged out successfully");
              }}
            >
              Logout
            </button>
            <button
              className="toast-btn-no"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        duration: 5000,
      },
    );
  };

  return (
    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
      <div className="nav-brand">
        <Link to="/dashboard" onClick={() => setIsOpen(false)}>
          ISSUE TRACKER
        </Link>
      </div>

      {/* Hamburger Menu Icon */}
      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
      </button>

      {/* Nav Links - Toggled by isOpen on mobile */}
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <button onClick={() => dispatch(toggleTheme())} className="btn-theme">
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {user ? (
          <>
            <Link to="/dashboard" onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
            <Link to="/add" onClick={() => setIsOpen(false)}>
              Add Issue
            </Link>
            <span className="user-email">{user.email}</span>
            <button onClick={onLogout} className="btn-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsOpen(false)}>
              Login
            </Link>
            <Link to="/register" onClick={() => setIsOpen(false)}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
