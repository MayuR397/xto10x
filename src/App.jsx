import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/login";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import { RegisterTeamPage } from "./components/RegisterTeamPage";
import { SelectTeamPage } from "./components/SelectTeamPage";
// import AssistPanel from "./components/AssistPanel";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initially set to null

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedLoginStatus);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  // 🚀 Prevent rendering until `isLoggedIn` is determined
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />
          }
        />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <div>
                <Navbar />
                <MainContent onLogout={handleLogout} />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/register-team" element={isLoggedIn ? <RegisterTeamPage /> : <Navigate to="/login" />} />
        <Route path="/select-team" element={isLoggedIn ? <SelectTeamPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* <AssistPanel /> */}
    </Router>
  );
}

export default App;
