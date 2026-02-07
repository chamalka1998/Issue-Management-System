import { useAppSelector } from "../app/hooks";
import "../styles/Footer.css";

const Footer = () => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  return (
    <footer className={`simple-footer ${darkMode ? "dark-mode" : ""}`}>
      <p>
        © {new Date().getFullYear()} | <strong>Chamalka Deshan</strong>
      </p>
      <small>Designed for Newnop Assignment</small>
    </footer>
  );
};

export default Footer;
