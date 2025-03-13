import React, { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  X,
  Check,
  Trash2,
  LogOut,
  Shield,
  User,
  Eye,
  EyeOff,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Code,
  Video,
} from "lucide-react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";

// Initialize socket connection
const socket = io("http://localhost:5009"); // Replace with your backend URL

const SelectTeamPage = () => {
  const [teams, setTeams] = useState([]);
  const [userTeamId, setUserTeamId] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userIsCreator, setUserIsCreator] = useState(false);
  const [requestProcessing, setRequestProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleContacts, setVisibleContacts] = useState({});
  const [fullTeamDetails, setFullTeamDetails] = useState({});

  const userId = localStorage.getItem("userId");

  const fetchTeams = async () => {
    try {
      const response = await fetch("https://x10x-api.iasam.dev/team/get-teams");
      if (!response.ok) throw new Error("Failed to fetch teams");
      const data = await response.json();
      setTeams(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `https://x10x-api.iasam.dev/users/get-user/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const userData = await response.json();
        setUserTeamId(userData?.teamId || null);
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };

    fetchUserDetails();
    fetchTeams();

    // Listen for team updates
    socket.on("teamCreated", (newTeam) => {
      console.log("🔥 New team created:", newTeam);
      fetchTeams();
      // setTeams((prevTeams) => [...prevTeams, newTeam]); // Update UI
    });

    socket.on("teamDeleted", (deletedTeamId) => {
      setTeams((prevTeams) =>
        prevTeams.filter((team) => team._id !== deletedTeamId)
      );
    });

    return () => {
      socket.off("teamUpdated");
      socket.off("teamDeleted");
    };
  }, [userId]);

  useEffect(() => {
    if (!userTeamId) return;

    const fetchPendingRequests = async () => {
      try {
        const response = await fetch(
          `https://x10x-api.iasam.dev/team-request/${userTeamId}/join-requests`,
          {
            method: "GET",
          }
        );
        if (response.status === 403) {
          console.log("User is not the team creator.");
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch pending requests");
        const data = await response.json();
        setPendingRequests(data.pendingRequests);
        setUserIsCreator(true);
      } catch (err) {
        console.error("Error fetching pending requests", err);
      }
    };

    fetchPendingRequests();
  }, [userTeamId]);

  const handleJoinRequest = async (teamId) => {
    try {
      const response = await fetch(
        "https://x10x-api.iasam.dev/team-request/send-request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, teamId }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Join request sent successfully!", {
          position: "top-right",
        });
      } else {
        toast.error(`${result.message}`, {
          position: "top-right",
        });
      }
    } catch (err) {
      console.error("Error sending join request:", err);
    }
  };

  const handleAcceptRequest = async (requestId, teamId) => {
    setRequestProcessing(true);
    try {
      const response = await fetch(
        "https://x10x-api.iasam.dev/team-request/accept-request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ requestId, teamId }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        // Update UI by removing the accepted request
        setPendingRequests(
          pendingRequests.filter((req) => req._id !== requestId)
        );

        // Refresh teams to show updated member list
        const teamsResponse = await fetch(
          "https://x10x-api.iasam.dev/team/get-teams"
        );
        if (teamsResponse.ok) {
          const teamsData = await teamsResponse.json();
          setTeams(teamsData);
        }

        toast.success("User accepted to the team!", {
          position: "top-right",
        });
      } else {
        toast.error(result.message, {
          position: "top-right",
        });
      }
    } catch (err) {
      console.error("Error accepting join request:", err);
      toast.error("Failed to accept request. Please try again.", {
        position: "top-right",
      });
    } finally {
      setRequestProcessing(false);
    }
  };

  const handleDeclineRequest = async (requestId) => {
    setRequestProcessing(true);
    try {
      const response = await fetch(
        "https://x10x-api.iasam.dev/team-request/decline-request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ requestId }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        // Update UI by removing the declined request
        setPendingRequests(
          pendingRequests.filter((req) => req._id !== requestId)
        );
        toast.success("Join request declined!", {
          position: "top-right",
        });
      } else {
        toast.error(result.message, {
          position: "top-right",
        });
      }
    } catch (err) {
      console.error("Error declining join request:", err);
      toast.error("Failed to decline request. Please try again.", {
        position: "top-right",
      });
    } finally {
      setRequestProcessing(false);
    }
  };

  // Leave team
  const leaveTeam = async (userId) => {
    try {
      const response = await fetch(
        "https://x10x-api.iasam.dev/users/leave-team",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to leave the team");
      }
      toast.success("You have successfully left the team", {
        position: "top-right",
      });
      await fetchTeams(); // ✅ Refresh teams after successful deletion
    } catch (error) {
      console.error("Error:", error);
      toast.success(error.message, {
        position: "top-right",
      });
    }
  };

  const deleteTeam = async (teamId, userId) => {
    try {
      const response = await fetch(
        "https://x10x-api.iasam.dev/team/delete-team",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teamId, userId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete the team");
      }
      toast.success("You have successfully deleted the team", {
        position: "top-right",
      });
      fetchTeams(); // ✅ Refresh teams after successful deletion
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  const removeMember = async (memberId) => {
    // This function is referenced but not implemented in the original code
    alert("Remove member functionality not implemented yet");
  };

  // Function to get a color scheme based on team index
  const getColorScheme = (index) => {
    const schemes = [
      {
        primary: "from-sky-400 to-sky-500",
        accent: "bg-sky-100",
        text: "text-sky-600",
        border: "border-sky-200",
        button: "bg-sky-500 hover:bg-sky-600",
        badge: "bg-sky-100 text-sky-600",
      },
      {
        primary: "from-emerald-400 to-emerald-500",
        accent: "bg-emerald-100",
        text: "text-emerald-600",
        border: "border-emerald-200",
        button: "bg-emerald-500 hover:bg-emerald-600",
        badge: "bg-emerald-100 text-emerald-600",
      },
      {
        primary: "from-amber-400 to-amber-500",
        accent: "bg-amber-100",
        text: "text-amber-600",
        border: "border-amber-200",
        button: "bg-amber-500 hover:bg-amber-600",
        badge: "bg-amber-100 text-amber-600",
      },
      {
        primary: "from-violet-400 to-violet-500",
        accent: "bg-violet-100",
        text: "text-violet-600",
        border: "border-violet-200",
        button: "bg-violet-500 hover:bg-violet-600",
        badge: "bg-violet-100 text-violet-600",
      },
      {
        primary: "from-rose-400 to-rose-500",
        accent: "bg-rose-100",
        text: "text-rose-600",
        border: "border-rose-200",
        button: "bg-rose-500 hover:bg-rose-600",
        badge: "bg-rose-100 text-rose-600",
      },
      {
        primary: "from-teal-400 to-teal-500",
        accent: "bg-teal-100",
        text: "text-teal-600",
        border: "border-teal-200",
        button: "bg-teal-500 hover:bg-teal-600",
        badge: "bg-teal-100 text-teal-600",
      },
    ];
    return schemes[index % schemes.length];
  };

  const toggleContact = (memberId) => {
    setVisibleContacts((prev) => ({
      ...prev,
      [memberId]: !prev[memberId], // Toggle visibility for this member
    }));
  };

  function generateThreeDigitNumber() {
    return Math.floor(100 + Math.random() * 900);
  }

  useEffect(() => {
    const fetchFullMemberDetails = async () => {
      try {
        const memberIds = [
          ...new Set(
            teams.flatMap((team) => team.teamMembers.map((m) => m._id))
          ),
        ]; // Extract unique member IDs

        const memberDetails = {};

        await Promise.all(
          memberIds.map(async (id) => {
            const res = await fetch(
              `https://x10x-api.iasam.dev/users/get-user/${id}`
            );
            if (res.ok) {
              const userData = await res.json();
              memberDetails[id] = userData; // Store full details
            }
          })
        );

        setFullTeamDetails(memberDetails); // Save fetched details
      } catch (err) {
        console.error("Error fetching team members:", err);
      }
    };

    if (teams.length > 0) fetchFullMemberDetails();
  }, [teams]);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center text-red-600 p-8 bg-white rounded-xl shadow-lg border-l-4 border-red-500 max-w-md">
          <h3 className="text-xl font-bold mb-2">Error</h3>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => window.location.reload()} // 🔄 Fake state change to refresh UI
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Team Selection
                </h1>
                <p className="text-gray-600 mt-1">
                  Join an existing team or create your own for the hackathon
                </p>
              </div>

              {userTeamId && (
                <button
                  onClick={() => leaveTeam(userId)}
                  className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
                >
                  <LogOut size={18} />
                  Leave Current Team
                </button>
              )}
            </div>
          </div>

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search teams by name or member..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />

          {/* Teams Grid */}
          {teams.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <Users size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Teams Available
              </h3>
              <p className="text-gray-500 mb-6">
                There are no teams created yet for this hackathon.
              </p>
              <button className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition shadow-md">
                Create Your Team
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...teams]
                .sort((a, b) => (a.teamMembers.length === 3 ? 1 : -1))
                .filter((team) => {
                  const lowerCaseSearch = searchTerm.trim().toLowerCase();

                  return (
                    (team.teamName?.toLowerCase() || "").includes(
                      lowerCaseSearch
                    ) ||
                    (team.teamMembers || []).some((member) =>
                      (member?.name?.toLowerCase() || "").includes(
                        lowerCaseSearch
                      )
                    )
                  );
                })
                .map((team, index) => {
                  const isMember = team.teamMembers.some(
                    (member) => member._id === userId
                  );
                  const isCreator = team.createdBy?._id === userId;
                  const teamHasPendingRequests =
                    pendingRequests.length > 0 && isCreator;

                  const colorScheme = getColorScheme(index);

                  return (
                    <div
                      key={team._id}
                      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
                        isMember ? `border-2 ${colorScheme.border}` : ""
                      }`}
                    >
                      {/* Team Header */}
                      <div
                        className={`bg-gradient-to-r ${colorScheme.primary} p-4 text-white`}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-bold">{team.teamName}</h3>
                          <div className="flex gap-2">
                            {isMember && !isCreator && (
                              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                                <User size={14} className="mr-1" />
                                Member
                              </span>
                            )}
                            {isCreator && (
                              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                                <Shield size={14} className="mr-1" />
                                Creator
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-white/80 text-sm mt-1">
                          Created by {team.createdBy?.name || "Unknown"}
                        </p>
                      </div>

                      {/* Team Content */}
                      <div className="p-5">
                        {/* Team Members */}
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-lg font-medium text-gray-800 flex items-center">
                              <Users
                                size={18}
                                className={`mr-2 ${colorScheme.text}`}
                              />
                              Team Members
                            </h4>
                            <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full">
                              {team.teamMembers.length}/{team.memberLimit || 3}
                            </span>
                          </div>

                          {team.teamMembers.length === 0 ? (
                            <p className="text-gray-500 italic text-sm">
                              No members yet
                            </p>
                          ) : (
                            <ul className="space-y-3">
                              {team.teamMembers.map((member) => {
                                const memberDetails =
                                  fullTeamDetails[member._id] || {}; // Get fetched details
                                return (
                                  <li
                                    key={member._id}
                                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                                  >
                                    <div className="flex items-center">
                                      <div
                                        className={`w-9 h-9 rounded-full ${colorScheme.accent} text-gray-800 flex items-center justify-center mr-3 font-medium shadow-sm`}
                                      >
                                        {member.name.charAt(0).toUpperCase()}
                                      </div>
                                      <div>
                                        <p className="font-medium text-gray-800">
                                          {member.name}
                                        </p>
                                        {member._id === team.createdBy?._id && (
                                          <span
                                            className={`text-xs ${colorScheme.text}`}
                                          >
                                            Team Leader
                                          </span>
                                        )}

                                        {/* Display Skills */}
                                        {memberDetails.skills &&
                                          memberDetails.skills[0] && (
                                            <div className="mt-1">
                                              <span
                                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
                                                title={memberDetails.skills[0]} // ✅ Full text visible on hover
                                              >
                                                <Code className="w-3 h-3 mr-1" />
                                                {memberDetails.skills[0]
                                                  .length > 48
                                                  ? `${memberDetails.skills[0].slice(
                                                      0,
                                                      48
                                                    )}...`
                                                  : memberDetails.skills[0]}
                                              </span>
                                            </div>
                                          )}

                                        {/* Contact Details Button */}
                                        {userTeamId === team._id && (
                                          <div className="mt-2">
                                            <button
                                              onClick={() =>
                                                toggleContact(member._id)
                                              }
                                              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors 
                    bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200
                    focus:outline-none focus:ring-2 focus:ring-gray-300`}
                                              aria-expanded={
                                                visibleContacts[member._id]
                                                  ? "true"
                                                  : "false"
                                              }
                                              aria-controls={`contact-info-${member._id}`}
                                            >
                                              {visibleContacts[member._id] ? (
                                                <>
                                                  <ChevronUp
                                                    size={14}
                                                    aria-hidden="true"
                                                  />
                                                  <span>
                                                    Hide Contact Details
                                                  </span>
                                                </>
                                              ) : (
                                                <>
                                                  <ChevronDown
                                                    size={14}
                                                    aria-hidden="true"
                                                  />
                                                  <span>Contact Details</span>
                                                </>
                                              )}
                                            </button>
                                            {/* Contact Information Panel with Smooth Transition */}
                                            {visibleContacts[member._id] && (
                                              <div
                                                id={`contact-info-${member._id}`}
                                                className="mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
                                              >
                                                <div className="space-y-3">
                                                  <div className="flex items-center gap-2">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                                                      <Mail
                                                        size={14}
                                                        aria-hidden="true"
                                                      />
                                                    </div>
                                                    <div>
                                                      <p className="text-xs text-gray-500 font-medium">
                                                        Email Address
                                                      </p>
                                                      <p className="text-sm text-gray-800">
                                                        {memberDetails.email ||
                                                          "Not Available"}
                                                      </p>
                                                    </div>
                                                  </div>

                                                  <div className="flex items-center gap-2">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                                                      <Phone
                                                        size={14}
                                                        aria-hidden="true"
                                                      />
                                                    </div>
                                                    <div>
                                                      <p className="text-xs text-gray-500 font-medium">
                                                        Phone Number
                                                      </p>
                                                      <p className="text-sm text-gray-800">
                                                        {memberDetails.phoneNumber ||
                                                          "Not Available"}
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {isCreator && member._id !== userId && (
                                      <button
                                        onClick={() => removeMember(member._id)}
                                        className="p-1.5 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
                                        title="Remove member"
                                      >
                                        <X size={16} />
                                      </button>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mt-4">
                          {!userTeamId &&
                            !isMember &&
                            team.teamMembers.length < 3 && (
                              <button
                                onClick={() => handleJoinRequest(team._id)}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-medium transition-all duration-200 ${
                                  pendingRequests.some(
                                    (req) => req.teamId === team._id
                                  )
                                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                    : `${colorScheme.button} text-white shadow hover:shadow-md`
                                }`}
                                disabled={pendingRequests.some(
                                  (req) => req.teamId === team._id
                                )}
                              >
                                {pendingRequests.some(
                                  (req) => req.teamId === team._id
                                ) ? (
                                  <>
                                    <span>Request Sent</span>
                                  </>
                                ) : (
                                  <>
                                    <UserPlus size={18} />
                                    <span>Join Team</span>
                                  </>
                                )}
                              </button>
                            )}

                          {isCreator && (
                            <button
                              onClick={() =>
                                deleteTeam(team._id, team.createdBy._id)
                              }
                              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
                            >
                              <Trash2 size={18} />
                              <span>Delete Team</span>
                            </button>
                          )}

                          {isMember && !isCreator && (
                            <button
                              onClick={() => leaveTeam(userId)}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
                            >
                              <LogOut size={18} />
                              <span>Leave Team</span>
                            </button>
                          )}

                          {userTeamId === team._id && (
                            <a
                              href={`https://meet.jit.si/${team.teamName}_${generateThreeDigitNumber()}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button
                                className={`flex items-center justify-center gap-2 ${colorScheme.button} text-white px-4 py-2.5 rounded-md transition`}
                              >
                                <Video /> Team Meet
                              </button>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Pending Requests Section */}
                      {teamHasPendingRequests && (
                        <div className="border-t border-gray-200 p-5 bg-gray-50">
                          <h4 className="text-lg font-medium text-gray-800 flex items-center mb-4">
                            <UserPlus
                              size={18}
                              className={`mr-2 ${colorScheme.text}`}
                            />
                            <span>Pending Requests</span>
                            <span
                              className={`ml-2 ${colorScheme.badge} text-xs px-2 py-0.5 rounded-full`}
                            >
                              {pendingRequests.length}
                            </span>
                          </h4>

                          <ul className="space-y-3">
                            {pendingRequests.map((req) => (
                              <li
                                key={req._id}
                                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                  <div className="flex items-center">
                                    <div
                                      className={`w-10 h-10 rounded-full bg-gradient-to-r ${colorScheme.primary} text-white flex items-center justify-center mr-3 font-medium`}
                                    >
                                      {req.userId.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-800">
                                        {req.userId.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        Wants to join your team
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex gap-2">
                                    <button
                                      onClick={() =>
                                        handleAcceptRequest(req._id, team._id)
                                      }
                                      disabled={requestProcessing}
                                      className={`flex items-center gap-1 px-3 py-1.5 ${colorScheme.button} text-white rounded-md transition disabled:bg-gray-300 disabled:cursor-not-allowed`}
                                    >
                                      <Check size={16} />
                                      <span>Accept</span>
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeclineRequest(req._id)
                                      }
                                      disabled={requestProcessing}
                                      className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    >
                                      <X size={16} />
                                      <span>Decline</span>
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectTeamPage;
