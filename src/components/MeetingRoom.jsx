import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";
import { Video, X, Loader2, ArrowLeft } from "lucide-react";

function MeetingRoom() {
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const client = ZoomMtgEmbedded.createClient();

  const config = {
    authEndpoint: "https://zoom-meeting-sdk-auth-sample-b148.onrender.com",
    sdkKey: "eFXUkNucQ5GS7vyF4wzT5Q",
    meetingNumber: "5024406023",
    passWord: "n3wffi",
    role: 0,
    userName: localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).name
      : "Guest User",
    userEmail: "",
    registrantToken: "",
    zakToken: "",
  };

  useEffect(() => {
    const initializeSDK = async () => {
      const meetingSDKElement = document.getElementById("meetingSDKElement");
      const chatContainer = document.getElementById("zoomChatContainer");

      if (meetingSDKElement && chatContainer) {
        try {
          await client.init({
            zoomAppRoot: meetingSDKElement,
            language: "en-US",
            patchJsMedia: true,
            leaveOnPageUnload: true,
            customize: {
              video: {
                isResizable: true,
                viewSizes: {
                  default: {
                    width: window.innerWidth,
                    height: window.innerHeight - 80,
                  },
                },
              },
              chat: {
                popper: {
                  disableDraggable: true,
                  anchorElement: chatContainer,
                  placement: "right",
                },
              },
              participants: {
                popper: {
                  disableDraggable: true,
                  anchorElement: chatContainer,
                  placement: "right",
                },
              },
            },
          });

          // Detect user leaving the meeting
          client.on("leave", () => {
            console.log("User left the meeting");
            navigate("/"); // Redirect to dashboard
          });
        } catch (error) {
          console.error("Failed to initialize Zoom SDK:", error);
          setError("Failed to initialize Zoom. Please refresh the page.");
        }
      }
    };

    initializeSDK();

    const handleResize = () => {
      const meetingSDKElement = document.getElementById("meetingSDKElement");
      if (meetingSDKElement) {
        meetingSDKElement.style.height = `${window.innerHeight - 64}px`;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSignature = async () => {
    setIsLoading(true);
    setError(null);

    try {
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
      await startMeeting(res.signature);
      setIsJoined(true);
    } catch (error) {
      console.error("Failed to get signature:", error);
      setError("Failed to join meeting. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const startMeeting = async (signature) => {
    try {
      await client.join({
        signature: signature,
        sdkKey: config.sdkKey,
        meetingNumber: config.meetingNumber,
        password: config.passWord,
        userName: config.userName,
        userEmail: config.userEmail,
        tk: config.registrantToken,
        zak: config.zakToken,
      });
    } catch (error) {
      console.error("Failed to join meeting:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate("/")}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </button>
            {isJoined && (
              <span className="flex items-center px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Connected
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="relative flex">
        <div
          id="meetingSDKElement"
          className="flex-1"
          style={{ height: "calc(100vh - 64px)" }}
        ></div>

        <div
          id="zoomChatContainer"
          className="w-80 bg-gray-800"
          style={{ height: "calc(100vh - 64px)" }}
        ></div>

        {!isJoined && (
          <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-700">
              <h2 className="text-2xl font-bold text-white text-center mb-2">
                Join Hackathon Session
              </h2>
              <p className="text-gray-400 text-center mb-8">
                You're about to join as {config.userName}
              </p>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button
                onClick={getSignature}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Video className="w-5 h-5" />
                )}
                <span className="ml-2">
                  {isLoading ? "Connecting..." : "Join Meeting"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MeetingRoom;
