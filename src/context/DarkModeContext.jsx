import { createContext, useContext, useEffect, useRef } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorage";
import { useColorMode } from "@chakra-ui/react";

const DarkContext = createContext();

function DarkMode({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");
  const { setColorMode } = useColorMode();
  const ref = useRef(document.getElementById("favicon"));

  useEffect(() => {
    if (isDarkMode) {
      ref.current.href = "./icon-dark.png";
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      setColorMode("dark");
    } else {
      ref.current.href = "./icon.png";
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setColorMode("light");
    }
  }, [isDarkMode, setColorMode]);

  function toggleDarkMode() {
    setIsDarkMode((mode) => !mode);
  }

  return (
    <DarkContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkContext);
  if (context === undefined) {
    throw new Error("context has been using outside provider");
  }
  return context;
}

export { DarkMode, useDarkMode };
