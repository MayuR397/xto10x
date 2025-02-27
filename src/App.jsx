// File: App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <MainContent />
    </div>
  );
}

export default App;



