import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/AuthContextProvider";

const EligibleHackathons = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const { setCurrentHackathonId } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHackathons = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseURL}/registrations/user/${userId}`);
        const data = await response.json();
        console.log("Hackathons Data: ", data);
        if (data?.message === "No registrations found for this user") {
          setHackathons([]);
        } else {
          setHackathons(data.registrations);
        }
      } catch (error) {
        console.error("Error fetching hackathons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, [userId, baseURL]);

  const handleCardClick = (hackathonId) => {
    setCurrentHackathonId(hackathonId);
    console.log("Current Hackathon ID: ", hackathonId);
    localStorage.setItem("currentHackathon", hackathonId);
    navigate(`/hackathon`);
  };

  // Format date with options
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate status based on dates
  const getEventStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
      return { label: "Upcoming", color: "bg-blue-100 text-blue-800" };
    } else if (now > end) {
      return { label: "Completed", color: "bg-gray-100 text-gray-800" };
    } else {
      return { label: "Active", color: "bg-green-100 text-green-800" };
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Hackathons</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          Explore New Hackathons
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : hackathons.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600 text-lg mb-4">
            You haven't registered for any hackathons yet.
          </p>
          <button
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Find Hackathons to Join
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hackathons.map((registration) => {
            const status = getEventStatus(
              registration.hackathonId.startDate,
              registration.hackathonId.endDate
            );

            return (
              <div
                key={registration._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer border border-gray-100"
                onClick={() => handleCardClick(registration.hackathonId._id)}
              >
                <div className="h-3 bg-indigo-600"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-800 leading-tight">
                      {registration.hackathonId.name}
                    </h3>
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${status.color}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatDate(registration.hackathonId.startDate)} -{" "}
                      {formatDate(registration.hackathonId.endDate)}
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {registration.hackathonId.eventType}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {registration.teamId?.teamName || "No Team"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {registration.role}
                        </p>
                      </div>
                      <div className="bg-indigo-50 p-2 rounded-md">
                        <svg
                          className="w-5 h-5 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EligibleHackathons;
