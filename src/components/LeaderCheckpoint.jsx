import React, { useState, useEffect } from "react";
import axios from "axios";

const CheckpointApp = () => {
    const [searchQuery, setSearchQuery] = useState(""); // State to store search input
    const [teams, setTeams] = useState([]); // Fetched team data
    const [teamName, setTeamName] = useState(""); // Form input for team name
    const [members, setMembers] = useState(["", "", "", ""]); // Form input for team members
    const [message, setMessage] = useState(""); // Feedback message
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
    const [currentCheckpoint, setCurrentCheckpoint] = useState(null); // Active checkpoint window
    const filteredTeams = teams.filter((team) =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Predefined checkpoint windows
    const checkpointWindows = [
        { start: "2025-01-18T00:23", end: "2025-01-18T00:28" },
        { start: "2025-01-18T09:10", end: "2025-01-18T09:15" },
        { start: "2025-01-18T10:25", end: "2025-01-18T10:30" },
        { start: "2025-01-18T12:15", end: "2025-01-18T12:20" },
        { start: "2025-01-18T13:25", end: "2025-01-18T13:30" },
        { start: "2025-01-18T15:37", end: "2025-01-18T15:42" },
        { start: "2025-01-18T20:56", end: "2025-01-18T21:01" },
        { start: "2025-01-18T23:00", end: "2025-01-18T23:05" },
        { start: "2025-01-19T00:36", end: "2025-01-19T00:41" },
        { start: "2025-01-19T03:53", end: "2025-01-19T03:58" },
        { start: "2025-01-19T04:15", end: "2025-01-19T04:20" },
        { start: "2025-01-19T04:43", end: "2025-01-19T04:48" },
        { start: "2025-01-19T06:10", end: "2025-01-19T06:15" },
        { start: "2025-01-19T09:25", end: "2025-01-19T09:30" },
        { start: "2025-01-19T12:30", end: "2025-01-19T12:35" },
        { start: "2025-01-19T14:04", end: "2025-01-19T14:09" },
        { start: "2025-01-19T15:08", end: "2025-01-19T15:13" }
        // Add more windows as needed
    ];

    // Determine the current active checkpoint window
    const calculateCurrentCheckpoint = () => {
        const now = new Date();
        const utcTime = now.getTime();
        const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
        const istTime = new Date(utcTime + istOffset);
        const currentTime = istTime.toISOString().slice(0, 16); // Format: "YYYY-MM-DDTHH:mm"
        const activeCheckpoint = checkpointWindows.find(
            (window) => currentTime >= window.start && currentTime < window.end
        );

        setCurrentCheckpoint(activeCheckpoint || null);
    };
    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString("en-IN", {
            weekday: "short", // e.g., Fri
            day: "2-digit",   // e.g., 17
            month: "short",   // e.g., Jan
            year: "numeric",  // e.g., 2025
            hour: "2-digit",  // e.g., 10
            minute: "2-digit", // e.g., 22
            hour12: true,      // e.g., 10:22 PM
        });
    };
    
    useEffect(() => {
        calculateCurrentCheckpoint();
        const interval = setInterval(() => {
            calculateCurrentCheckpoint();
        }, 1000); // Update every second
        return () => clearInterval(interval);
    }, []);

    // Fetch existing teams
    const fetchTeams = async () => {
        try {
            const response = await axios.get("https://hackathonback-af0y.onrender.com/tm/getteams");
            const sortedTeams = response?.data?.sort((a, b) => {
                const passedCountA = a.checkpoints.filter(cp => cp.status === "Passed").length;
                const passedCountB = b.checkpoints.filter(cp => cp.status === "Passed").length;
                return passedCountB - passedCountA; // Descending order
            });
            setTeams(sortedTeams); // Update teams with fetched data

        } catch (error) {
            console.error("Error fetching teams:", error);
            setMessage("Error fetching teams");
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    // Add a new team
    const addTeam = async () => {
        if (!teamName.trim() || members.some((member) => !member.trim())) {
            setMessage("All fields are required");
            return;
        }

        try {
            await axios.post("https://hackathonback-af0y.onrender.com/tm/teams", {
                name: teamName,
                members,
            });
            setTeamName("");
            setMembers(["", "", "", ""]);
            setIsModalOpen(false);
            setMessage("Team added successfully");

            // Refetch teams after adding
            fetchTeams();
        } catch (error) {
            console.error("Error adding team:", error);
            setMessage("Error adding team");
        }
    };

    // Mark checkpoint for a team
    const markCheckpoint = async (teamId) => {
        if (!currentCheckpoint) {
            alert("No active checkpoint window");
            return;
        }

        try {
            const response = await axios.post("https://hackathonback-af0y.onrender.com/ch/checkpoints", {
                teamId,
                time: currentCheckpoint.start, // Use the start time of the active checkpoint
            });
            setMessage(response.data.message);
            alert(response.data.message);
            fetchTeams(); // Refresh teams after marking the checkpoint
        } catch (error) {
            console.error("Error marking checkpoint:", error);
            alert(error.response?.data?.message || "Error marking checkpoint");
            setMessage("Error marking checkpoint");
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif,", maxWidth:"1200px",margin:"auto"}}>
            {/* <button
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    display: "block",
                    margin: "0 auto",
                }}
                onClick={() => setIsModalOpen(true)}
            >
                Add Team
            </button> */}

            {/* Modal for Adding a Team */}
            {isModalOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            background: "white",
                            padding: "20px",
                            borderRadius: "8px",
                            width: "400px",
                            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <h2 style={{ marginBottom: "20px" }}>Add Team</h2>
                        <label>Team Name:</label>
                        <input
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            style={{
                                width: "100%",
                                marginBottom: "10px",
                                padding: "8px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                            }}
                        />
                        {members.map((member, index) => (
                            <div key={index} style={{ marginBottom: "10px" }}>
                                <label>Member {index + 1}:</label>
                                <input
                                    type="text"
                                    value={member}
                                    onChange={(e) => {
                                        const updatedMembers = [...members];
                                        updatedMembers[index] = e.target.value;
                                        setMembers(updatedMembers);
                                    }}
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        borderRadius: "4px",
                                        border: "1px solid #ccc",
                                    }}
                                />
                            </div>
                        ))}
                        <div style={{ textAlign: "right" }}>
                            <button
                                style={{
                                    padding: "10px 20px",
                                    marginRight: "10px",
                                    backgroundColor: "#28a745",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                                onClick={addTeam}
                            >
                                Submit
                            </button>
                            <button
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#dc3545",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Leaderboard */}
            <h2
                style={{
                    marginTop: "30px",
                    textAlign: "center",
                    color: "white",
                    fontFamily: "'Poppins', sans-serif", // Modern, clean font
                    fontWeight: "bold",
                    fontSize: "2.5rem",
                    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)", // Subtle shadow for depth
                    background: "linear-gradient(to right, #007bff, #00c6ff)", // Gradient color
                    WebkitBackgroundClip: "text", // Clip gradient to text
                    WebkitTextFillColor: "transparent", // Makes the gradient visible
                }}
            >
               🏆 Checkpoint Leaderboard
            </h2>

            {/* Display Current Checkpoint Status */}
            <div style={{ textAlign: "center", marginTop: "20px", fontWeight: "bold", fontSize: "18px" }}>
                {currentCheckpoint ? (
                   <span style={{ color: "#28a745" }}>
                     Checkpoint Open: <br/>
                     Start - {formatDateTime(currentCheckpoint.start)}<br/>
                     Ends- {formatDateTime(currentCheckpoint.end)}
                    </span>
                ) : (
                    <span style={{ color: "#dc3545" }}>No active checkpoint</span>
                )}
            </div>
            <br />
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
                <input
                    type="text"
                    placeholder="Search teams by name,keycode..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "300px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                />
            </div>

            <div style={{
                maxWidth: "100%",
                overflowX: "auto",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f9f9f9",
                padding: "10px",
                maxHeight:"600px",
                overflowY:"scroll",
                marginBottom:"50px"
            }}>
                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    borderRadius: "10px",
                    overflow: "hidden",
                }}>
                    <thead >
                        <tr style={{ backgroundColor: "#007bff", color: "white", fontWeight: "bold" }}>
                            <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Team Name</th>
                            <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Members</th>
                            <th style={{ padding: "12px", textAlign: "center", borderBottom: "2px solid #ddd" }}>Passed</th>
                            <th style={{ padding: "12px", textAlign: "center", borderBottom: "2px solid #ddd" }}>Missed</th>
                            <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Checkpoint Status</th>
                            <th style={{ padding: "12px", textAlign: "center", borderBottom: "2px solid #ddd" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeams.map((team) => {
                            const passedCount = team.checkpoints.filter((cp) => cp.status === "Passed").length;
                            const missedCount = team.checkpoints.filter((cp) => cp.status === "Missed").length;

                            return (
                                <tr key={team._id} style={{ backgroundColor: "#fff", borderBottom: "1px solid #ddd" }}>
                                    <td style={{ padding: "10px" }}>{team.name}</td>
                                    <td style={{ padding: "10px" }}>{team.members.join(", ").length > 40 ? (
                                        <span title={team.members.join(", ")}>
                                            {team.members.join(", ").slice(0, 37)}...
                                        </span>
                                    ) : (
                                        team.members.join(", ")
                                    )}</td>
                                    <td style={{ padding: "10px", textAlign: "center", color: "#28a745" }}>{passedCount}</td>
                                    <td style={{ padding: "10px", textAlign: "center", color: "#dc3545" }}>{missedCount}</td>
                                    <td style={{ padding: "10px" }}>
                                        {team.checkpoints.map((checkpoint, index) => (
                                            <div key={index}>
                                                {checkpoint.time}: {checkpoint.status}
                                            </div>
                                        ))}
                                    </td>
                                    <td style={{ padding: "10px", textAlign: "center" }}>
                                        {!currentCheckpoint ? "No Active Checkpoint" :
                                            <button
                                                style={{
                                                    padding: "8px 16px",
                                                    backgroundColor: "#007bff",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => markCheckpoint(team._id)}

                                            >
                                                Pass Checkpoint
                                            </button>}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Display Message */}
            {message && (
                <p style={{ marginTop: "20px", textAlign: "center", color: "green", fontWeight: "bold" }}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default CheckpointApp;
