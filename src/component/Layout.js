import React, { useEffect } from "react";
import Header from "./Header";

const Layout = ({children,protectedRoute=false }) => {
    useEffect(()=>{
        console.log({protectedRoute})

    },[])
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
