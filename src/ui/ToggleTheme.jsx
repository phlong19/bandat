import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useDarkMode } from "../context/DarkModeContext";
import { Button } from "@chakra-ui/react";

function ToggleTheme() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <Button onClick={toggleDarkMode} variant="ghost" colorScheme="green">
      {isDarkMode ? (
        <span className="text-sm">
          <BsFillMoonStarsFill />
        </span>
      ) : (
        <span className="text-sm">
          <BsFillSunFill />
        </span>
      )}
    </Button>
  );
}

export default ToggleTheme;
