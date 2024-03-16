import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

function Logo({ footer = false, size = "base" }) {
  const { isDarkMode } = useDarkMode();
  return (
    <Link to="/" className="mt-2">
      <img
        src={isDarkMode ? "/logo-dark.png" : "/logo-light.png"}
        alt="logo"
        className={`${footer && "grayscale"} ${
          size === "base" ? "w-[120px]" : size
        }`}
      />
    </Link>
  );
}

export default Logo;
