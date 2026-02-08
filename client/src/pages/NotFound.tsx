import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const NotFound = () => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`page-container ${darkMode ? "dark-mode" : ""}`}
      style={{ textAlign: "center", paddingTop: "100px" }}
    >
      <h1 style={{ fontSize: "5rem" }}>404</h1>
      <h2>Oops! Page not found.</h2>
      <p>The link might be broken or the page has been moved.</p>
      <Link
        to="/dashboard"
        className="create-btn"
        style={{
          textDecoration: "none",
          display: "inline-block",
          marginTop: "20px",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
