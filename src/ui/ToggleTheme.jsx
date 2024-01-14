import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useDarkMode } from "../context/DarkModeContext";
import Button from "./Button";

function ToggleTheme() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <Button onClick={toggleDarkMode} variant="other">
      {isDarkMode ? (
        <span className="text-xl">
          <BsFillMoonStarsFill />
        </span>
      ) : (
        <span className="text-xl">
          <BsFillSunFill />
        </span>
      )}
    </Button>
  );
}

export default ToggleTheme;
