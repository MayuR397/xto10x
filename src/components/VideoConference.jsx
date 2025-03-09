// import React, { useEffect, useState } from "react";
// import {
//   Video,
//   Users,
//   Share,
//   MessageSquare,
//   Settings,
//   Crown,
//   Timer,
//   Coffee,
// } from "lucide-react";

// const VideoConference = () => {
//   const [isJitsiLoaded, setIsJitsiLoaded] = useState(false);
//   const [participants, setParticipants] = useState([
//     { id: "1", name: "Sarah Chen", score: 150, isHelper: true },
//     { id: "2", name: "Alex Kumar", score: 120, isHelper: true },
//     { id: "3", name: "Mike Johnson", score: 90, isHelper: false },
//   ]);
//   const [roomName] = useState(
//     "HackathonCollabRoom-" + Math.random().toString(36).substring(7)
//   );

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://meet.jit.si/external_api.js";
//     script.async = true;
//     script.onload = () => setIsJitsiLoaded(true);
//     document.body.appendChild(script);

//     return () => document.body.removeChild(script);
//   }, []);

//   useEffect(() => {
//     if (isJitsiLoaded) {
//       const domain = "meet.jit.si";
//       //   const domain = "8x8.vc";
//       const options = {
//         roomName: roomName + "#config.prejoinPageEnabled=false",
//         width: "100%",
//         height: "100%",
//         parentNode: document.querySelector("#meet"),
//         lang: "en",
//         configOverwrite: {
//           startWithAudioMuted: true,
//           startWithVideoMuted: false,
//           enableClosePage: false,
//           disableDeepLinking: true,
//           enableWelcomePage: false,
//           enableNoisyMicDetection: true,
//           prejoinPageEnabled: false, // No pre-join page
//           requireDisplayName: false, // No name prompt
//           enableLobby: false, // No lobby or waiting room
//           roomPasswordNumberOfDigits: 0, // No password required
//         },
//         interfaceConfigOverwrite: {
//           TOOLBAR_BUTTONS: [
//             "microphone",
//             "camera",
//             "desktop",
//             "chat",
//             "raisehand",
//             "tileview",
//             "videoquality",
//             "settings",
//             "mute-everyone",
//           ],
//           SHOW_JITSI_WATERMARK: false,
//           SHOW_WATERMARK_FOR_GUESTS: false,
//           DEFAULT_LOCAL_DISPLAY_NAME: "Student",
//         },
//       };

//       const api = new JitsiMeetExternalAPI(domain, options);
//       api.addEventListener("videoConferenceJoined", () =>
//         console.log("Local user joined")
//       );

//       return () => api.dispose();
//     }
//   }, [isJitsiLoaded, roomName]);

//   return (
//     <div className="min-h-screen bg-gray-900">
//       <div className="max-w-[1920px] mx-auto px-4 py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           <div className="lg:col-span-3 bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
//             <div className="bg-gray-800 border-b border-gray-700 p-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <Video className="h-6 w-6 text-red-500" />
//                   <div>
//                     <h1 className="text-xl font-semibold text-white">
//                       Live Collaboration Room
//                     </h1>
//                     <p className="text-sm text-gray-400">Room ID: {roomName}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition">
//                     <Share className="h-4 w-4" />
//                     <span>Share Room</span>
//                   </button>
//                   <button className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
//                     <MessageSquare className="h-4 w-4" />
//                     <span>Get Help</span>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div
//               id="meet"
//               className="w-full"
//               style={{ height: "calc(100vh - 280px)" }}
//             />

//             <div className="bg-gray-800 border-t border-gray-700 p-4">
//               <div className="flex items-center justify-between text-gray-400 text-sm">
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center">
//                     <Users className="h-4 w-4 mr-2" />
//                     <span>{participants.length} participants</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Timer className="h-4 w-4 mr-2" />
//                     <span>Duration: 1h 23m</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <Settings className="h-4 w-4 mr-2" />
//                   <span>Room Settings</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
//             <h2 className="text-lg font-semibold text-white flex items-center">
//               <Users className="h-5 w-5 mr-2 text-red-500" />
//               Active Participants
//             </h2>

//             <div className="space-y-4 mt-4">
//               {participants.map((participant) => (
//                 <div
//                   key={participant.id}
//                   className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600"
//                 >
//                   <div className="flex items-center space-x-3">
//                     <div className="relative">
//                       <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
//                         {participant.name.charAt(0)}
//                       </div>
//                       {participant.isHelper && (
//                         <div className="absolute -top-1 -right-1">
//                           <Crown className="h-4 w-4 text-yellow-500" />
//                         </div>
//                       )}
//                     </div>
//                     <div>
//                       <h3 className="text-white font-medium">
//                         {participant.name}
//                       </h3>
//                       <p className="text-gray-400 text-sm flex items-center">
//                         <Coffee className="h-3 w-3 mr-1" />
//                         {participant.score} points
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoConference;

// import { useEffect, useRef, useState } from "react";
// import { Video, VideoOff, Mic, MicOff, Monitor } from "lucide-react";

// export default function VideoRoom({ roomId }) {
//   const [peers, setPeers] = useState([]);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);
//   const [isScreenSharing, setIsScreenSharing] = useState(false);
//   const localVideoRef = useRef(null);
//   const drone = useRef(null);
//   const pcs = useRef({});
//   const localStream = useRef(null);
//   const screenStream = useRef(null);

//   useEffect(() => {
//     drone.current = new ScaleDrone("OVFw1lkcn48cg6Ut");
//     const roomName = `observable-${roomId}`;

//     drone.current.on("open", (error) => {
//       if (error) return console.error(error);

//       const room = drone.current.subscribe(roomName);
//       room.on("open", (error) => error && console.error(error));

//       room.on("members", (members) => {
//         console.log("MEMBERS", members);
//         const peersArray = members.filter(
//           (member) => member.id !== drone.current.clientId
//         );
//         setPeers(peersArray);
//         peersArray.forEach((member) => createPeerConnection(member.id));
//       });

//       room.on("member_join", (member) => {
//         console.log("MEMBER JOIN", member);
//         setPeers((peers) => [...peers, member]);
//         createPeerConnection(member.id);
//       });

//       room.on("member_leave", (member) => {
//         console.log("MEMBER LEAVE", member);
//         setPeers((peers) => peers.filter((peer) => peer.id !== member.id));
//         if (pcs.current[member.id]) {
//           pcs.current[member.id].close();
//           delete pcs.current[member.id];
//         }
//         const videoElement = document.getElementById(member.id);
//         if (videoElement) videoElement.remove();
//       });

//       room.on("data", (message, client) => {
//         if (!client || client.id === drone.current.clientId) return;
//         handleSignaling(message, client.id);
//       });

//       startLocalStream();
//     });

//     return () => {
//       if (localStream.current) {
//         localStream.current.getTracks().forEach((track) => track.stop());
//       }
//       if (screenStream.current) {
//         screenStream.current.getTracks().forEach((track) => track.stop());
//       }
//       Object.values(pcs.current).forEach((pc) => pc.close());
//       if (drone.current) {
//         drone.current.close();
//       }
//     };
//   }, [roomId]);

//   const startLocalStream = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       localStream.current = stream;
//       localVideoRef.current.srcObject = stream;
//     } catch (error) {
//       console.error("Error accessing media devices:", error);
//     }
//   };

//   const createPeerConnection = (clientId) => {
//     const pc = new RTCPeerConnection({
//       iceServers: [
//         { urls: "stun:stun.l.google.com:19302" },
//         { urls: "stun:stun1.l.google.com:19302" },
//       ],
//     });

//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         drone.current.publish({
//           room: `observable-${roomId}`,
//           message: { candidate: event.candidate, target: clientId },
//         });
//       }
//     };

//     pc.ontrack = (event) => {
//       addRemoteVideo(event.streams[0], clientId);
//     };

//     if (localStream.current) {
//       localStream.current
//         .getTracks()
//         .forEach((track) => pc.addTrack(track, localStream.current));
//     }

//     pc.onnegotiationneeded = async () => {
//       try {
//         const offer = await pc.createOffer();
//         await pc.setLocalDescription(offer);
//         drone.current.publish({
//           room: `observable-${roomId}`,
//           message: { sdp: pc.localDescription, target: clientId },
//         });
//       } catch (err) {
//         console.error("Error creating offer:", err);
//       }
//     };

//     pcs.current[clientId] = pc;
//   };

//   const handleSignaling = async (message, clientId) => {
//     const pc = pcs.current[clientId];
//     if (!pc) return;

//     try {
//       if (message.sdp) {
//         await pc.setRemoteDescription(new RTCSessionDescription(message.sdp));
//         if (message.sdp.type === "offer") {
//           const answer = await pc.createAnswer();
//           await pc.setLocalDescription(answer);
//           drone.current.publish({
//             room: `observable-${roomId}`,
//             message: { sdp: answer, target: clientId },
//           });
//         }
//       } else if (message.candidate) {
//         await pc.addIceCandidate(new RTCIceCandidate(message.candidate));
//       }
//     } catch (err) {
//       console.error("Error handling signaling:", err);
//     }
//   };

//   const addRemoteVideo = (stream, clientId) => {
//     const existingVideo = document.getElementById(clientId);
//     if (!existingVideo) {
//       const videoContainer = document.createElement("div");
//       videoContainer.className =
//         "relative w-full md:w-1/2 lg:w-1/3 aspect-video";
//       videoContainer.id = `container-${clientId}`;

//       const video = document.createElement("video");
//       video.srcObject = stream;
//       video.autoplay = true;
//       video.playsInline = true;
//       video.id = clientId;
//       video.className = "w-full h-full object-cover rounded-lg";

//       videoContainer.appendChild(video);
//       document.getElementById("remote-videos").appendChild(videoContainer);
//     }
//   };

//   const toggleAudio = () => {
//     if (localStream.current) {
//       const audioTrack = localStream.current.getAudioTracks()[0];
//       if (audioTrack) {
//         audioTrack.enabled = !audioTrack.enabled;
//         setIsMuted(!audioTrack.enabled);
//       }
//     }
//   };

//   const toggleVideo = () => {
//     if (localStream.current) {
//       const videoTrack = localStream.current.getVideoTracks()[0];
//       if (videoTrack) {
//         videoTrack.enabled = !videoTrack.enabled;
//         setIsVideoOff(!videoTrack.enabled);
//       }
//     }
//   };

//   const toggleScreenShare = async () => {
//     try {
//       if (!isScreenSharing) {
//         screenStream.current = await navigator.mediaDevices.getDisplayMedia({
//           video: true,
//           audio: true,
//         });

//         const videoTrack = screenStream.current.getVideoTracks()[0];

//         Object.values(pcs.current).forEach((pc) => {
//           const sender = pc.getSenders().find((s) => s.track?.kind === "video");
//           if (sender) {
//             sender.replaceTrack(videoTrack);
//           }
//         });

//         localVideoRef.current.srcObject = screenStream.current;
//         setIsScreenSharing(true);

//         videoTrack.onended = () => {
//           stopScreenSharing();
//         };
//       } else {
//         stopScreenSharing();
//       }
//     } catch (err) {
//       console.error("Error sharing screen:", err);
//     }
//   };

//   const stopScreenSharing = () => {
//     if (screenStream.current) {
//       screenStream.current.getTracks().forEach((track) => track.stop());
//       screenStream.current = null;

//       if (localStream.current) {
//         const videoTrack = localStream.current.getVideoTracks()[0];
//         Object.values(pcs.current).forEach((pc) => {
//           const sender = pc.getSenders().find((s) => s.track?.kind === "video");
//           if (sender && videoTrack) {
//             sender.replaceTrack(videoTrack);
//           }
//         });
//         localVideoRef.current.srcObject = localStream.current;
//       }
//     }
//     setIsScreenSharing(false);
//   };

//   return (
//     <div className="p-4 bg-gray-900 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-2xl font-bold mb-4 text-white">
//           Video Room: {roomId}
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//           <div className="relative aspect-video">
//             <video
//               ref={localVideoRef}
//               autoPlay
//               playsInline
//               muted
//               className="w-full h-full object-cover rounded-lg"
//             />
//             <div className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
//               You {isScreenSharing ? "(Screen)" : ""}
//             </div>
//           </div>
//           <div
//             id="remote-videos"
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
//           />
//         </div>

//         <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
//           <div className="max-w-7xl mx-auto flex justify-center space-x-4">
//             <button
//               onClick={toggleAudio}
//               className={`p-4 rounded-full ${
//                 isMuted ? "bg-red-500" : "bg-gray-600"
//               }`}
//             >
//               {isMuted ? (
//                 <MicOff className="h-6 w-6 text-white" />
//               ) : (
//                 <Mic className="h-6 w-6 text-white" />
//               )}
//             </button>

//             <button
//               onClick={toggleVideo}
//               className={`p-4 rounded-full ${
//                 isVideoOff ? "bg-red-500" : "bg-gray-600"
//               }`}
//             >
//               {isVideoOff ? (
//                 <VideoOff className="h-6 w-6 text-white" />
//               ) : (
//                 <Video className="h-6 w-6 text-white" />
//               )}
//             </button>

//             <button
//               onClick={toggleScreenShare}
//               className={`p-4 rounded-full ${
//                 isScreenSharing ? "bg-green-500" : "bg-gray-600"
//               }`}
//             >
//               <Monitor className="h-6 w-6 text-white" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { Video, VideoOff, Mic, MicOff, Monitor, PhoneOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VideoRoom({ roomId }) {
  const [peers, setPeers] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const localVideoRef = useRef(null);
  const drone = useRef(null);
  const pcs = useRef({});
  const localStream = useRef(null);
  const screenStream = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    drone.current = new ScaleDrone("OVFw1lkcn48cg6Ut");
    const roomName = `observable-${roomId}`;

    drone.current.on("open", (error) => {
      if (error) return console.error(error);

      const room = drone.current.subscribe(roomName);
      room.on("open", (error) => error && console.error(error));

      room.on("members", (members) => {
        console.log("MEMBERS", members);
        const peersArray = members.filter(
          (member) => member.id !== drone.current.clientId
        );
        setPeers(peersArray);
        peersArray.forEach((member) => createPeerConnection(member.id));
      });

      room.on("member_join", (member) => {
        console.log("MEMBER JOIN", member);
        setPeers((peers) => [...peers, member]);
        createPeerConnection(member.id);
        // Initiate connection from the new member to existing peers
        if (localStream.current) {
          const pc = pcs.current[member.id];
          if (pc) {
            localStream.current.getTracks().forEach((track) => {
              pc.addTrack(track, localStream.current);
            });
          }
        }
      });

      room.on("member_leave", (member) => {
        console.log("MEMBER LEAVE", member);
        setPeers((peers) => peers.filter((peer) => peer.id !== member.id));
        if (pcs.current[member.id]) {
          pcs.current[member.id].close();
          delete pcs.current[member.id];
        }
        const container = document.getElementById(`container-${member.id}`);
        if (container) container.remove();
      });

      room.on("data", (message, client) => {
        if (!client || client.id === drone.current.clientId) return;
        handleSignaling(message, client.id);
      });

      startLocalStream();
    });

    return () => {
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => track.stop());
      }
      if (screenStream.current) {
        screenStream.current.getTracks().forEach((track) => track.stop());
      }
      Object.values(pcs.current).forEach((pc) => pc.close());
      if (drone.current) {
        drone.current.close();
      }
    };
  }, [roomId]);

  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStream.current = stream;
      localVideoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const createPeerConnection = (clientId) => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        drone.current.publish({
          room: `observable-${roomId}`,
          message: { candidate: event.candidate, target: clientId },
        });
      }
    };

    pc.ontrack = (event) => {
      addRemoteVideo(event.streams[0], clientId);
    };

    if (localStream.current) {
      localStream.current
        .getTracks()
        .forEach((track) => pc.addTrack(track, localStream.current));
    }

    pc.onnegotiationneeded = async () => {
      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        drone.current.publish({
          room: `observable-${roomId}`,
          message: { sdp: pc.localDescription, target: clientId },
        });
      } catch (err) {
        console.error("Error creating offer:", err);
      }
    };

    pcs.current[clientId] = pc;
  };

  const handleSignaling = async (message, clientId) => {
    const pc = pcs.current[clientId];
    if (!pc) return;

    try {
      if (message.sdp) {
        await pc.setRemoteDescription(new RTCSessionDescription(message.sdp));
        if (message.sdp.type === "offer") {
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          drone.current.publish({
            room: `observable-${roomId}`,
            message: { sdp: answer, target: clientId },
          });
        }
      } else if (message.candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(message.candidate));
      }
    } catch (err) {
      console.error("Error handling signaling:", err);
    }
  };

  const addRemoteVideo = (stream, clientId) => {
    const existingVideo = document.getElementById(clientId);
    if (!existingVideo) {
      const videoContainer = document.createElement("div");
      videoContainer.className =
        "relative w-full md:w-1/2 lg:w-1/3 aspect-video";
      videoContainer.id = `container-${clientId}`;

      const video = document.createElement("video");
      video.srcObject = stream;
      video.autoplay = true;
      video.playsInline = true;
      video.id = clientId;
      video.className = "w-full h-full object-cover rounded-lg";

      const label = document.createElement("div");
      label.className =
        "absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded";
      label.textContent = "Peer";

      videoContainer.appendChild(video);
      videoContainer.appendChild(label);
      document.getElementById("remote-videos").appendChild(videoContainer);
    }
  };

  const toggleAudio = () => {
    if (localStream.current) {
      const audioTrack = localStream.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStream.current) {
      const videoTrack = localStream.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        screenStream.current = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });

        const videoTrack = screenStream.current.getVideoTracks()[0];

        Object.values(pcs.current).forEach((pc) => {
          const sender = pc.getSenders().find((s) => s.track?.kind === "video");
          if (sender) {
            sender.replaceTrack(videoTrack);
          }
        });

        localVideoRef.current.srcObject = screenStream.current;
        setIsScreenSharing(true);

        videoTrack.onended = () => {
          stopScreenSharing();
        };
      } else {
        stopScreenSharing();
      }
    } catch (err) {
      console.error("Error sharing screen:", err);
    }
  };

  const stopScreenSharing = () => {
    if (screenStream.current) {
      screenStream.current.getTracks().forEach((track) => track.stop());
      screenStream.current = null;

      if (localStream.current) {
        const videoTrack = localStream.current.getVideoTracks()[0];
        Object.values(pcs.current).forEach((pc) => {
          const sender = pc.getSenders().find((s) => s.track?.kind === "video");
          if (sender && videoTrack) {
            sender.replaceTrack(videoTrack);
          }
        });
        localVideoRef.current.srcObject = localStream.current;
      }
    }
    setIsScreenSharing(false);
  };

  const endCall = () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
    }
    if (screenStream.current) {
      screenStream.current.getTracks().forEach((track) => track.stop());
    }
    Object.values(pcs.current).forEach((pc) => pc.close());
    if (drone.current) {
      drone.current.close();
    }
    navigate("/");
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">
            Video Room: {roomId}
          </h1>
          <button
            onClick={endCall}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <PhoneOff className="h-5 w-5" />
            End Call
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          <div className="relative aspect-video">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
              You {isScreenSharing ? "(Screen)" : ""}
            </div>
          </div>
          <div
            id="remote-videos"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          />
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
          <div className="max-w-7xl mx-auto flex justify-center space-x-4">
            <button
              onClick={toggleAudio}
              className={`p-4 rounded-full ${
                isMuted ? "bg-red-500" : "bg-gray-600"
              } hover:opacity-80 transition-opacity`}
            >
              {isMuted ? (
                <MicOff className="h-6 w-6 text-white" />
              ) : (
                <Mic className="h-6 w-6 text-white" />
              )}
            </button>

            <button
              onClick={toggleVideo}
              className={`p-4 rounded-full ${
                isVideoOff ? "bg-red-500" : "bg-gray-600"
              } hover:opacity-80 transition-opacity`}
            >
              {isVideoOff ? (
                <VideoOff className="h-6 w-6 text-white" />
              ) : (
                <Video className="h-6 w-6 text-white" />
              )}
            </button>

            <button
              onClick={toggleScreenShare}
              className={`p-4 rounded-full ${
                isScreenSharing ? "bg-green-500" : "bg-gray-600"
              } hover:opacity-80 transition-opacity`}
            >
              <Monitor className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
