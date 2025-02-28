import React, { useEffect, useState } from "react";

const SelectTeamPage = () => {
  const [teams, setTeams] = useState([]);
  const [userTeamId, setUserTeamId] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userIsCreator, setUserIsCreator] = useState(false);
  const [requestProcessing, setRequestProcessing] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5009/users/get-user/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const userData = await response.json();
        setUserTeamId(userData?.teamId || null);
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await fetch("http://localhost:5009/team/get-teams");
        if (!response.ok) throw new Error("Failed to fetch teams");
        const data = await response.json();
        setTeams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
    fetchTeams();
  }, [userId]);

  useEffect(() => {
    if (!userTeamId) return;

    const fetchPendingRequests = async () => {
      try {
        const response = await fetch(
          `http://localhost:5009/team-request/${userTeamId}/join-requests`,
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
        "http://localhost:5009/team-request/send-request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, teamId }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Join request sent successfully!");
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error("Error sending join request:", err);
    }
  };

  const handleAcceptRequest = async (requestId, teamId) => {
    setRequestProcessing(true);
    try {
      const response = await fetch(
        "http://localhost:5009/team-request/accept-request",
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
          "http://localhost:5009/team/get-teams"
        );
        if (teamsResponse.ok) {
          const teamsData = await teamsResponse.json();
          setTeams(teamsData);
        }

        alert("User accepted to the team!");
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error("Error accepting join request:", err);
      alert("Failed to accept request. Please try again.");
    } finally {
      setRequestProcessing(false);
    }
  };

  const handleDeclineRequest = async (requestId) => {
    setRequestProcessing(true);
    try {
      const response = await fetch(
        "http://localhost:5009/team-request/decline-request",
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
        alert("Join request declined!");
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error("Error declining join request:", err);
      alert("Failed to decline request. Please try again.");
    } finally {
      setRequestProcessing(false);
    }
  };

  // Leave team

  const leaveTeam = async (userId) => {
    try {
      const response = await fetch("http://localhost:5009/users/leave-team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to leave the team");
      }

      alert("You have successfully left the team");
      window.location.reload(); // Refresh to update UI
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const deleteTeam = async (teamId, userId) => {
    try {
      const response = await fetch("http://localhost:5009/team/delete-team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamId, userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete the team");
      }

      alert("You have successfully deleted the team");
      window.location.reload(); // Refresh to update UI
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
        <p className="font-medium">{error}</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-red-800 border-b-2 border-red-300 pb-2">
        Team Selection
      </h2>

      {teams.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 text-lg">
            No teams available at this time.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teams.map((team) => {
            const isMember = team.teamMembers.some(
              (member) => member._id === userId
            );
            const isCreator = team.createdBy?._id === userId;
            const teamHasPendingRequests =
              pendingRequests.length > 0 && isCreator;

            return (
              <div
                key={team._id}
                className="bg-white p-5 rounded-lg shadow-md border-l-4 border-red-600 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-800">
                    {team.teamName}
                  </h3>
                  {isMember && (
                    <span className="bg-red-500 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Member
                    </span>
                  )}
                  {isCreator && (
                    <span className="bg-red-700 text-white text-xs font-medium px-2.5 py-0.5 rounded">
                      Creator
                    </span>
                  )}
                </div>

                <p className="text-gray-700 mt-2">
                  <span className="font-medium">Created By:</span>{" "}
                  {team.createdBy?.name || "Unknown"}
                </p>

                <div className="mt-4">
                  <h4 className="text-lg font-medium text-gray-700 flex items-center">
                    <span>Team Members</span>
                    <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                      {team.teamMembers.length}/{team.memberLimit || 3}
                    </span>
                  </h4>

                  {team.teamMembers.length === 0 ? (
                    <p className="text-gray-500 mt-1 italic">No members yet.</p>
                  ) : (
                    <ul className="mt-2 space-y-1">
                      {team.teamMembers.map((member) => (
                        <li key={member._id} className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-red-500 text-red-800 flex items-center justify-center mr-2 font-medium">
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-gray-700">{member.name}</span>
                          {member._id === team.createdBy?._id && (
                            <span className="ml-2 text-xs text-red-700">
                              (Creator)
                            </span>
                          )}
                          {userId === team.createdBy?._id &&
                            member._id !== team.createdBy?._id && (
                              <button
                                onClick={() => removeMember(member._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                              >
                                Remove
                              </button>
                            )}
                        </li>
                      ))}
                    </ul>
                  )}
                  {team.createdBy?._id === userId && (
                    <button
                      onClick={() => deleteTeam(team._id, team.createdBy._id)}
                      className="mt-4 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 transition-colors duration-200"
                    >
                      Delete Team
                    </button>
                  )}
                </div>

                {!userTeamId && !isMember && (
                  <button
                    onClick={() => handleJoinRequest(team._id)}
                    className={`mt-4 w-full px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                      pendingRequests.some((req) => req.teamId === team._id)
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-red-600 text-white hover:bg-red-700 shadow hover:shadow-md"
                    }`}
                    disabled={pendingRequests.some(
                      (req) => req.teamId === team._id
                    )}
                  >
                    {pendingRequests.some((req) => req.teamId === team._id)
                      ? "Request Sent"
                      : "Join Team"}
                  </button>
                )}

                {/* Show Pending Requests ONLY to the team creator */}
                {teamHasPendingRequests && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-lg font-medium text-red-800 flex items-center">
                      <span>Pending Requests</span>
                      <span className="ml-2 bg-red-500 text-red-800 text-xs px-2 py-0.5 rounded-full">
                        {pendingRequests.length}
                      </span>
                    </h4>

                    <ul className="mt-3 space-y-3">
                      {pendingRequests.map((req) => (
                        <li
                          key={req._id}
                          className="bg-red-50 p-3 rounded-md border border-red-500"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-red-200 text-red-800 flex items-center justify-center mr-3 font-medium">
                                {req.userId.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">
                                  {req.userId.name}
                                </p>
                              </div>
                            </div>

                            <div className="flex space-x-2 mt-3 sm:mt-0">
                              <button
                                onClick={() =>
                                  handleAcceptRequest(req._id, team._id)
                                }
                                disabled={requestProcessing}
                                className="px-4 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleDeclineRequest(req._id)}
                                disabled={requestProcessing}
                                className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                              >
                                Decline
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
  );
};

export { SelectTeamPage };
