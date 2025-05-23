import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const MyContext = createContext();

const AuthContextProvider = ({ children }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [currentHackathonId, setCurrentHackathonId] = useState("");
  const currentHackathon = localStorage.getItem("currentHackathon");
  let userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const [hackathon, setHackathon] = useState([]);
  useEffect(() => {
    const fetchHackathons = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${baseURL}/hackathons/${currentHackathon}`
        );
        const data = await response.json();
        // console.log("current id", currentHackathon);
        // console.log("Current hack data", data);
        setHackathon(data);
      } catch (error) {
        console.error("Error fetching hackathons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, [userId, baseURL, currentHackathon]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!userId) {
          setLoading(false); // No userId, stop loading
          return;
        }

        const response = await fetch(`${baseURL}/users/get-user/${userId}`);
        const contentType = response.headers.get("Content-Type");
        // console.log("Content-Type:", contentType);

        if (!response.ok) throw new Error("Failed to fetch user data");

        const userData = await response.json();
        // console.log("Data after login", userData);
        localStorage.setItem("userData", JSON.stringify(userData));
        setUserData(userData);
        setRole(userData.userType.toLowerCase());
        setIsAuth(true);
      } catch (err) {
        console.error("Error fetching user data", err);
      } finally {
        setLoading(false); // Stop loading in any case
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <MyContext.Provider
      value={{
        isAuth,
        setIsAuth,
        userData,
        loading,
        currentHackathonId,
        setCurrentHackathonId,
        hackathon,
        setUserData,
        role,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default AuthContextProvider;
