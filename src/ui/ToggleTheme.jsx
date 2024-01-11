import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useDarkMode } from "../context/DarkModeContext";
import Button from "./Button";

function ToggleTheme() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <Button onClick={toggleDarkMode}>
      {isDarkMode ? (
        <span className="text-lg">
          <BsFillMoonStarsFill />
        </span>
      ) : (
        <span className="text-lg">
          <BsFillSunFill />
        </span>
      )}
    </Button>
  );
}

export default ToggleTheme;
