import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { defaultTheme, darkTheme } from "../utils/theme";

type Theme = typeof defaultTheme;

type ThemeType = {
  toggleTheme: () => void;
  activeTheme: Theme;
  mode: "light" | "dark";
};

export const ThemeContext = React.createContext<ThemeType | null>(null);

export const ThemeToggleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useLocalStorage("displayMode", "dark");

  const [activeTheme, setActiveTheme] = useState(darkTheme);

  useEffect(() => {
    if (mode === "light") {
      setActiveTheme(darkTheme);
    }
    if (mode === "dark") {
      setActiveTheme(defaultTheme);
    }
  }, [mode]);

  const toggleTheme = () => {
    if (mode === "light") {
      setMode("dark");
    }
    if (mode === "dark") {
      setMode("light");
    }
  };
  return (
    <ThemeContext.Provider value={{ toggleTheme, activeTheme, mode }}>
      <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = React.useContext(ThemeContext);
  if (context) {
    return context;
  } else {
    throw new Error("This can only be used inside theme context");
  }
};
