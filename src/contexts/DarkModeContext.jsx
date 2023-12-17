import { useState, createContext, useEffect } from "react";

export const DarkModeContext = createContext();

export const DarkModeProvider = (props) => {
  const storedTheme = localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(storedTheme === "dark");

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    const appElement = document.documentElement;
    appElement.classList.toggle("dark");
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {props.children}
    </DarkModeContext.Provider>
  );
};
