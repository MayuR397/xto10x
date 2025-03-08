import React, { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState(null);
  let userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `https://x10x-api.iasam.dev/users/get-user/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const userData = await response.json();
        console.log("This is user data", userData);
        localStorage.setItem("userData", JSON.stringify(userData))
        setUserData(userData);
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };

    fetchUserDetails();
  }, [userId]);

  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    if (storedUser) {
      console.log("from context api", storedUser);
      setIsAuth(true);
    }
  }, []);

  return (
    <MyContext.Provider value={{ isAuth, setIsAuth, userData }}>
      {children}
    </MyContext.Provider>
  );
};

export default AuthContextProvider;
