import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorage";
import {useMantineColorScheme} from '@mantine/core'

const DarkContext = createContext();

function DarkMode({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      setColorScheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setColorScheme("light");
    }
  }, [isDarkMode,setColorScheme]);

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
