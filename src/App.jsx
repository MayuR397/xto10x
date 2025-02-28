import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login'; // Updated import path
import MainContent from './components/MainContent'; // Updated import path
import './App.css';
import Navbar from "./components/Navbar"
import { RegisterTeamPage } from './components/RegisterTeamPage';
import { SelectTeamPage } from './components/SelectTeamPage';
import AssistPanel from './components/AssistPanel';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <div>
            <Navbar/>
            <MainContent onLogout={handleLogout} />
            </div> : 
            <Navigate to="/login" />}
        />
        <Route path="/register-team" element={<RegisterTeamPage/>} />
        <Route path="/select-team" element={<SelectTeamPage/>} />
      </Routes>
      <AssistPanel/>
    </Router>  );
}

export default App;