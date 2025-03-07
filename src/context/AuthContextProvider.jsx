import React, { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    if (storedUser) {
      console.log("from context api", storedUser);

      setIsAuth(true);
    }
  }, []);

  return (
    <MyContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </MyContext.Provider>
  );
};

export default AuthContextProvider;
