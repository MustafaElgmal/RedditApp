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
const cardThemes={
  light:{
    background: "#FFFFFF",
    color: "#434343",
  },
  dark:{
    background:"#FFCA2C",
    color:'#434343'
  }
}

const navThemes={
  light:{
    background: "#FFFFFF",
    color: "#434343",
  },
  dark:{
    background:"#000000",
    color:'#434343'
  }

}

const buttonThemes={
  light:'btn btn-danger',
  dark:'btn btn-warning'

}




export const ThemeContext = createContext();
export const ThemeSwitcher = ({ children }) => {
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme'))|| themes.light);
  const [cardTheme,setCardTheme]=useState(JSON.parse(localStorage.getItem('cardTheme'))||cardThemes.light)
  const [currentTheme, setCurrentTheme] = useState(JSON.parse(localStorage.getItem('currentTheme'))||"light");
  const [navTheme,setNavTheme]=useState(JSON.parse(localStorage.getItem('navTheme'))||navThemes.light)
  const [buttonTheme,setButtonTheme]=useState(JSON.parse(localStorage.getItem('buttonTheme'))||buttonThemes.light)
  useEffect(()=>{
    localStorage.setItem('theme',JSON.stringify(theme))
    localStorage.setItem('currentTheme',JSON.stringify(currentTheme))
    localStorage.setItem('cardTheme',JSON.stringify(cardTheme))
    localStorage.setItem('navTheme',JSON.stringify(navTheme))
    localStorage.setItem('buttonTheme',JSON.stringify(buttonTheme))
  },[theme])

  const themeToggle = () => {
    if (theme === themes.light) {
      setTheme(themes.dark);
      setCardTheme(cardThemes.dark)
      setNavTheme(navThemes.dark)
      setButtonTheme("btn btn-warning")
      setCurrentTheme("dark");
    } else {
      setTheme(themes.light);
      setCardTheme(cardThemes.light)
      setNavTheme(navThemes.light)
      setButtonTheme("btn btn-danger")
      setCurrentTheme("light");
    }

  };
 
  return (
    <ThemeContext.Provider value={{ theme,cardTheme,navTheme,buttonTheme,currentTheme, themeToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};