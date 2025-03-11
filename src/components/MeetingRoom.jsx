// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";
// import { Video, X, Loader2, ArrowLeft } from "lucide-react";

// function MeetingRoom() {
//   const [isJoined, setIsJoined] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const client = ZoomMtgEmbedded.createClient();

//   const config = {
//     authEndpoint: "https://zoom-meeting-sdk-auth-sample-b148.onrender.com",
//     sdkKey: "eFXUkNucQ5GS7vyF4wzT5Q",
//     meetingNumber: "5024406023",
//     passWord: "n3wffi",
//     role: 0,
//     userName: localStorage.getItem("userData")
//       ? JSON.parse(localStorage.getItem("userData")).name
//       : "Guest User",
//     userEmail: "",
//     registrantToken: "",
//     zakToken: "",
//   };

//   useEffect(() => {
//     const initializeSDK = async () => {
//       const meetingSDKElement = document.getElementById("meetingSDKElement");
//       const chatContainer = document.getElementById("zoomChatContainer");

//       if (meetingSDKElement && chatContainer) {
//         try {
//           await client.init({
//             zoomAppRoot: meetingSDKElement,
//             language: "en-US",
//             patchJsMedia: true,
//             leaveOnPageUnload: true,
//             customize: {
//               video: {
//                 isResizable: true,
//                 viewSizes: "auto", // Automatically fits content
//               },
//               chat: {
//                 popper: {
//                   disableDraggable: true,
//                   anchorElement: chatContainer,
//                   placement: "right",
//                 },
//               },
//               participants: {
//                 popper: {
//                   disableDraggable: true,
//                   anchorElement: chatContainer,
//                   placement: "right",
//                 },
//               },
//             },
//           });

//           client.on("leave", () => {
//             console.log("User left the meeting");
//             navigate("/"); // Redirect to dashboard
//           });

//           // Ensure toolbar icons scale properly
//           client.updateVideoSettings({
//             viewSizes: "auto",
//             aspectRatio: "16:9",
//           });
//         } catch (error) {
//           console.error("Failed to initialize Zoom SDK:", error);
//           setError("Failed to initialize Zoom. Please refresh the page.");
//         }
//       }
//     };

//     initializeSDK();

//     const handleResize = () => {
//       const meetingSDKElement = document.getElementById("meetingSDKElement");
//       if (meetingSDKElement) {
//         meetingSDKElement.style.height = `${window.innerHeight - 64}px`;
//         meetingSDKElement.style.width = `${window.innerWidth}px`;
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const getSignature = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const req = await fetch(config.authEndpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           meetingNumber: config.meetingNumber,
//           role: config.role,
//         }),
//       });

//       if (!req.ok) throw new Error("Failed to get signature");

//       const res = await req.json();
//       await startMeeting(res.signature);
//       setIsJoined(true);
//     } catch (error) {
//       console.error("Failed to get signature:", error);
//       setError("Failed to join meeting. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const startMeeting = async (signature) => {
//     try {
//       await client.join({
//         signature: signature,
//         sdkKey: config.sdkKey,
//         meetingNumber: config.meetingNumber,
//         password: config.passWord,
//         userName: config.userName,
//         userEmail: config.userEmail,
//         tk: config.registrantToken,
//         zak: config.zakToken,
//       });
//     } catch (error) {
//       console.error("Failed to join meeting:", error);
//       throw error;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900">
//       <div className="bg-gray-800 border-b border-gray-700">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <button
//               onClick={() => navigate("/")}
//               className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Dashboard
//             </button>
//             {isJoined && (
//               <span className="flex items-center px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
//                 <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
//                 Connected
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="relative flex">
//         <div
//           id="meetingSDKElement"
//           className="flex-1"
//           style={{ height: "calc(100vh - 64px)", width: "100%" }}
//         ></div>

//         <div
//           id="zoomChatContainer"
//           className="w-80 bg-gray-800"
//           style={{ height: "calc(100vh - 64px)" }}
//         ></div>

//         {!isJoined && (
//           <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center">
//             <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-700">
//               <h2 className="text-2xl font-bold text-white text-center mb-2">
//                 Join Hackathon Session
//               </h2>
//               <p className="text-gray-400 text-center mb-8">
//                 You're about to join as {config.userName}
//               </p>

//               {error && <p className="text-sm text-red-400">{error}</p>}

//               <button
//                 onClick={getSignature}
//                 disabled={isLoading}
//                 className="w-full py-3 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
//               >
//                 {isLoading ? (
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                 ) : (
//                   <Video className="w-5 h-5" />
//                 )}
//                 <span className="ml-2">
//                   {isLoading ? "Connecting..." : "Join Meeting"}
//                 </span>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MeetingRoom;

// import React, { useEffect, useState } from "react";
// import { ZoomMtg } from "@zoom/meetingsdk";
// import "@zoom/meetingsdk/dist/css/bootstrap.css";
// import "@zoom/meetingsdk/dist/css/react-select.css";

// // ZoomMtg.setZoomJSLib("https://source.zoom.us/3.1.0/lib", "/av");
// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareWebSDK();

// function MeetingRoom() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isJoined, setIsJoined] = useState(false);

//   const config = {
//     authEndpoint: "https://zoom-meeting-sdk-auth-sample-b148.onrender.com",
//     sdkKey: "eFXUkNucQ5GS7vyF4wzT5Q",
//     meetingNumber: "5024406023",
//     passWord: "n3wffi",
//     role: 0,
//     userName: "React",
//     leaveUrl: "http://localhost:5173/",
//   };

//   const getSignature = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const req = await fetch(config.authEndpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           meetingNumber: config.meetingNumber,
//           role: config.role,
//         }),
//       });

//       if (!req.ok) throw new Error("Failed to get signature");

//       const res = await req.json();
//       await startMeeting(res.signature);
//       setIsJoined(true);
//     } catch (error) {
//       console.error("Failed to get signature:", error);
//       setError("Failed to join meeting. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const startMeeting = (signature) => {
//     document.getElementById("zmmtg-root").style.display = "block";

//     ZoomMtg.init({
//       leaveUrl: config.leaveUrl,
//       patchJsMedia: true,
//       leaveOnPageUnload: true,
//       success: () => {
//         console.log("Zoom SDK Initialized");

//         ZoomMtg.join({
//           meetingNumber: config.meetingNumber,
//           sdkKey: config.sdkKey,
//           signature: signature,
//           userName: config.userName,
//           passWord: config.passWord,
//           success: (success) => console.log("Meeting Joined:", success),
//           error: (error) => console.error("Join Error:", error),
//         });
//       },
//       error: (error) => console.error("Zoom Init Error:", error),
//     });
//   };

//   useEffect(() => {
//     document.getElementById("zmmtg-root").style.display = "none";
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white">
//       <h1 className="text-2xl font-bold mb-4">Zoom Meeting SDK Sample</h1>
//       {error && <p className="text-red-500">{error}</p>}
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <button
//           onClick={getSignature}
//           className="bg-blue-500 text-black px-4 py-2 rounded-md"
//           disabled={isJoined}
//         >
//           {isJoined ? "Meeting Joined" : "Join Meeting"}
//         </button>
//       )}
//       <div id="zmmtg-root"></div>
//     </div>
//   );
// }

// export default MeetingRoom;

import React, { useState } from "react";

function MeetingRoom() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [ZoomMtg, setZoomMtg] = useState(null);

  const config = {
    authEndpoint: "https://zoom-meeting-sdk-auth-sample-b148.onrender.com",
    sdkKey: "eFXUkNucQ5GS7vyF4wzT5Q",
    meetingNumber: "5024406023",
    passWord: "n3wffi",
    role: 0,
    userName: localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).name
      : "Guest User",
    leaveUrl: "https://xto10x.masaischool.com/",
  };

  const generateUniqueName = (name) => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `${name} #${randomNumber}`;
  };

  const getSignature = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let ZoomMtgInstance = ZoomMtg;

      if (!ZoomMtgInstance) {
        const { ZoomMtg } = await import("@zoom/meetingsdk");
        await import("@zoom/meetingsdk/dist/css/bootstrap.css");
        await import("@zoom/meetingsdk/dist/css/react-select.css");

        ZoomMtg.setZoomJSLib("https://source.zoom.us/3.11.0/lib", "/av");
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareWebSDK();

        ZoomMtgInstance = ZoomMtg;
        setZoomMtg(ZoomMtg); // For future reference
      }

      const req = await fetch(config.authEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingNumber: config.meetingNumber,
          role: config.role,
        }),
      });

      if (!req.ok) throw new Error("Failed to get signature");

      const res = await req.json();
      await startMeeting(res.signature, ZoomMtgInstance); // Pass instance directly
      setIsJoined(true);
    } catch (error) {
      console.error("Failed to get signature:", error);
      setError("Failed to join meeting. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const startMeeting = (signature, ZoomMtgInstance) => {
    if (!ZoomMtgInstance) return;

    let zoomContainer = document.getElementById("zmmtg-root");
    if (!zoomContainer) {
      zoomContainer = document.createElement("div");
      zoomContainer.id = "zmmtg-root";
      document.body.appendChild(zoomContainer);
    }

    // Key visibility fixes
    zoomContainer.style.position = "fixed";
    zoomContainer.style.top = "0";
    zoomContainer.style.left = "0";
    zoomContainer.style.width = "100%";
    zoomContainer.style.height = "100vh";
    zoomContainer.style.zIndex = "9999"; // Ensure top layer
    zoomContainer.style.display = "block"; // Force visibility

    ZoomMtgInstance.init({
      leaveUrl: config.leaveUrl,
      patchJsMedia: true,
      leaveOnPageUnload: true,
      success: () => {
        console.log("Zoom SDK Initialized");

        ZoomMtgInstance.join({
          meetingNumber: config.meetingNumber,
          sdkKey: config.sdkKey,
          signature: signature,
          userName: generateUniqueName(config.userName),
          passWord: config.passWord,
          success: (success) => console.log("Meeting Joined:", success),
          error: (error) => {
            console.error("Join Error:", error);
          },
        });
      },
      error: (error) => {
        console.error("Zoom Init Error:", error);
      },
    });

    ZoomMtgInstance.inMeetingServiceListener("onUserLeave", (data) => {
      const currentUser = ZoomMtgInstance.getCurrentUser({});

      if (data.userId === currentUser.userId) {
        const zoomContainer = document.getElementById("zmmtg-root");
        if (zoomContainer) zoomContainer.remove();
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-2xl font-bold mb-4">Zoom Meeting SDK Sample</h1>
      {error && <p className="text-red-500">{error}</p>}{" "}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button
          onClick={getSignature}
          className="bg-blue-500 text-black px-4 py-2 rounded-md"
          disabled={isJoined}
        >
          {isJoined ? "Meeting Joined" : "Join Meeting"}
        </button>
      )}
      <div id="zmmtg-root"></div>
    </div>
  );
}

export default MeetingRoom;
