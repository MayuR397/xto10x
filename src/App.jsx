import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import InteractiveElement from "./components/InteractiveElement";
import Footer from "./components/Footer";
import CountDownTimer from "./components/CountDownTimer";
import { Routes, Route } from "react-router-dom";
import SelectTeamPage from "./components/SelectTeamPage";


function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CountDownTimer/>
      <Routes>
        <Route path="/" element={<MainContent />}/>
        <Route path="/select-team" element={<SelectTeamPage/>}/>
      </Routes>
      <InteractiveElement />
      <Footer />
    </div>
  );
}

export default App;
