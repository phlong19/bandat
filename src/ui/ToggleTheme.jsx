import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useDarkMode } from "../context/DarkModeContext";
import { Button } from "@chakra-ui/react";

function ToggleTheme() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <Button onClick={toggleDarkMode} variant="ghost">
      {isDarkMode ? (
        <span className="text-base">
          <BsFillMoonStarsFill />
        </span>
      ) : (
        <span className="text-base">
          <BsFillSunFill />
        </span>
      )}
    </Button>
  );
}

export default ToggleTheme;
