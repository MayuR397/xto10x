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
import ProfilePage from "./components/ProfilePage";

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
          <Route path="/select-team" element={isAuth ? <SelectTeamPage /> : <Login/>} />
          <Route path="/register-team" element={isAuth ? <RegisterTeamPage /> : <Login/>} />
          <Route path="/admin-page" element={<AdminPage/>}/>
          <Route path="/profile" element={isAuth ? <ProfilePage/> :  <Login/>}/>
        </Routes>
        <InteractiveElement />
        <Footer />
      </div>
    </>
  );
}

export default App;
