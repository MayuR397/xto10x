// File: App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import './App.css';
import { RegisterTeamPage } from './components/RegisterTeamPage';

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<MainContent />} />
          <Route path="/register-team" element={<RegisterTeamPage/>} />
          {/* <Route path="/select-team" element={<SelectTeamPage/>} /> */}
        </Routes>
    </Router>
      
    </div>
  );
}

export default App;



