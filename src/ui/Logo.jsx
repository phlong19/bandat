import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

function Logo({ footer = false }) {
  const { isDarkMode } = useDarkMode();
  return (
    <Link to="/" className="mt-2">
      <img
        src={isDarkMode ? "/logo-dark.png" : "/logo-light.png"}
        alt="logo"
        className={`${footer && "grayscale"} w-40`}
      />
    </Link>
  );
}

export default Logo;
