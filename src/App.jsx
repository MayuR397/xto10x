import React, { useState, useEffect, useContext } from "react";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import InteractiveElement from "./components/InteractiveElement";
import Footer from "./components/Footer";
import CountDownTimer from "./components/CountDownTimer";
import { Routes, Route } from "react-router-dom";
import SelectTeamPage from "./components/SelectTeamPage";
import { RegisterTeamPage } from "./components/RegisterTeamPage";
import { MyContext } from "./context/AuthContextProvider";
import Login from "./components/login";
import { ToastContainer } from "react-toastify";
import AdminPage from "./components/AdminPage";

function App() {
  const { isAuth } = useContext(MyContext);
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        {isAuth && <CountDownTimer />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={isAuth ? <MainContent /> : <Login />} />
          <Route path="/select-team" element={<SelectTeamPage />} />
          <Route path="/register-team" element={<RegisterTeamPage />} />
          <Route path="/admin-page" element={<AdminPage/>}/>
        </Routes>
        <InteractiveElement />
        <Footer />
      </div>
    </>
  );
}

export default App;
