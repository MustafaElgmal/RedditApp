import { createContext, useState,useEffect } from "react";

const themes = {
  light: {
    background: "#f3f4f6",
    color: "#434343",
  },
  dark: {
    background: "#434343",
    color: "#fff",
  },
};

export const ThemeContext = createContext();
export const ThemeSwitcher = ({ children }) => {
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('themes'))|| themes.light);
  const [currentTheme, setCurrentTheme] = useState(JSON.parse(localStorage.getItem('currentTheme'))||"light");
  useEffect(()=>{
    localStorage.setItem('themes',JSON.stringify(theme))
    localStorage.setItem('currentTheme',JSON.stringify(currentTheme))
  },[theme])

  const themeToggle = () => {
    if (theme === themes.light) {
      setTheme(themes.dark);
      setCurrentTheme("dark");
    } else {
      setTheme(themes.light);
      setCurrentTheme("light");
    }

  };
 


  return (
    <ThemeContext.Provider value={{ theme, currentTheme, themeToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};