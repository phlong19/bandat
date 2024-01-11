import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

function Logo() {
  const { isDarkMode } = useDarkMode();
  return (
    <Link to="/" className="mt-2">
      <img
        src={isDarkMode ? "./logo-dark.png" : "./logo-light.png"}
        alt="logo"
        className="w-40"
      />
    </Link>
  );
}

export default Logo;
