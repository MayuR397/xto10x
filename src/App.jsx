// import React, { useState, useEffect, useContext } from "react";
// import Navbar from "./components/Navbar";
// import MainContent from "./components/MainContent";
// import InteractiveElement from "./components/InteractiveElement";
// import Footer from "./components/Footer";
// import CountDownTimer from "./components/CountDownTimer";
// import { Routes, Route } from "react-router-dom";
// import SelectTeamPage from "./components/SelectTeamPage";
// import { RegisterTeamPage } from "./components/RegisterTeamPage";
// import { MyContext } from "./context/AuthContextProvider";
// import Login from "./components/login";
// import { ToastContainer } from "react-toastify";
// import AdminPage from "./components/AdminPage";
// import ProfilePage from "./components/ProfilePage";
// import ChatbotButton from "./components/chatbot/ChatbotButton";
// import ChatWindow from "./components/chatbot/ChatWindow";
// import ResourceHub from "./components/ResourceHub";
// import VideoConference from "./components/VideoConference";
// import MeetingRoom from "./components/MeetingRoom";

// function App() {
//   const { isAuth } = useContext(MyContext);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   return (
//     <>
//       <ToastContainer />
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         {isAuth && <CountDownTimer />}
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={isAuth ? <MainContent /> : <Login />} />
//           <Route
//             path="/select-team"
//             element={isAuth ? <SelectTeamPage /> : <Login />}
//           />
//           <Route
//             path="/register-team"
//             element={isAuth ? <RegisterTeamPage /> : <Login />}
//           />
//           <Route path="/admin-page" element={<AdminPage />} />
//           <Route
//             path="/profile"
//             element={isAuth ? <ProfilePage /> : <Login />}
//           />
//           <Route path="/resource-hub" element={<ResourceHub />} />
//           <Route path="/meeting-room" element={<MeetingRoom />} />
//         </Routes>
//         <VideoConference />
//         <InteractiveElement />
//         <Footer />
//         {isAuth && (
//           <ChatbotButton
//             isOpen={isChatOpen}
//             onClick={() => setIsChatOpen(!isChatOpen)}
//           />
//         )}
//         {isAuth && (
//           <ChatWindow
//             isOpen={isChatOpen}
//             onClose={() => setIsChatOpen(false)}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// export default App;

import React, { useState, useEffect, useContext } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import InteractiveElement from "./components/InteractiveElement";
import Footer from "./components/Footer";
import CountDownTimer from "./components/CountDownTimer";
import SelectTeamPage from "./components/SelectTeamPage";
import { RegisterTeamPage } from "./components/RegisterTeamPage";
import { MyContext } from "./context/AuthContextProvider";
import Login from "./components/login";
import { ToastContainer } from "react-toastify";
import AdminPage from "./components/AdminPage";
import ProfilePage from "./components/ProfilePage";
import ChatbotButton from "./components/chatbot/ChatbotButton";
import ChatWindow from "./components/chatbot/ChatWindow";
import ResourceHub from "./components/ResourceHub";
import VideoConference from "./components/VideoConference";
import MeetingRoom from "./components/MeetingRoom";

function App() {
  const { isAuth } = useContext(MyContext);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();

  const isMeetingRoom = location.pathname === "/meeting-room";
  const isDashboard = location.pathname === "/"

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-50">
        {!isMeetingRoom && <Navbar />}
        {isAuth && !isMeetingRoom && <CountDownTimer />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={isAuth ? <MainContent /> : <Login />} />
          <Route
            path="/select-team"
            element={isAuth ? <SelectTeamPage /> : <Login />}
          />
          <Route
            path="/register-team"
            element={isAuth ? <RegisterTeamPage /> : <Login />}
          />
          <Route path="/admin-page" element={<AdminPage />} />
          <Route
            path="/profile"
            element={isAuth ? <ProfilePage /> : <Login />}
          />
          <Route path="/resource-hub" element={<ResourceHub />} />
          <Route path="/meeting-room" element={<MeetingRoom />} />
        </Routes>
        {!isMeetingRoom && isDashboard && <VideoConference />}
        {!isMeetingRoom && isDashboard && <InteractiveElement />}
        {!isMeetingRoom && <Footer />}
        {isAuth && !isMeetingRoom && (
          <ChatbotButton
            isOpen={isChatOpen}
            onClick={() => setIsChatOpen(!isChatOpen)}
          />
        )}
        {isAuth && !isMeetingRoom && (
          <ChatWindow
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
          />
        )}
      </div>
    </>
  );
}

export default App;
