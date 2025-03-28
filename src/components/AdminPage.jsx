import React, { useState, useEffect } from "react";
import {
  Calendar,
  AlertCircle,
  Save,
  LogOut,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const userId = localStorage.getItem("userId");
  const [eventData, setEventData] = useState({
    name: "Test Hackathon 1",
    version: "1.0",
    description:
      "A two-week interactive coding hackathon for real world grooming",
    startDate: "2025-03-24T10:00:00+05:30",
    endDate: "2025-04-06T23:59:59+05:30",
    allowedEmails: [
      "ritickraj35@gmail.com",
      "abhishekkumarverma0811@gmail.com",
      "gmgurjar1221@gmail.com",
      "gautamji4966@gmail.com",
      "vikashkumarbharti035@gmail.com",
      "punitnaagvanshi@gamil.com",
      "ashishdadhiich@gmail.com",
      "rahulchandeshware66@gmail.com",
      "mrrajak1296@gmail.com",
      "kartikgautam1106@gmail.com",
      "rohyadav18@gmail.com",
      "goswamik1221@gmail.com",
      "rohitchouhankgn11@gmail.com",
      "vikrantsheoran4@gmail.com",
      "khushipatel59946@gmail.com",
    ],
    minTeamSize: 2,
    maxTeamSize: 4,
    problemStatements: [
      {
        track: "ML",
        description: "Sample ML Problem Statement",
        difficulty: "Hard",
      },
      {
        track: "DA",
        description: "Analyze large datasets for insights.",
        difficulty: "Medium",
      },
    ],
    schedule: [
      {
        date: "2025-03-24T10:00:00+05:30",
        activity: "Hackathon Kick-off",
      },
      {
        date: "2025-04-17T17:00:00+05:30",
        activity: "Winner Announcement",
      },
    ],
    eventPlan: [
      {
        week: 1,
        phase: "Interaction",
        description: "Full week of Interaction",
      },
      {
        week: 2,
        phase: "Hackathon",
        description: "Full week of Interaction",
      },
    ],
    submissionStart: "2025-04-05T08:00:00+05:30",
    submissionEnd: "2025-04-06T23:59:59+05:30",
    status: "Upcoming",
    eventType: "Interactive Hackathon",
    prizeDetails: [
      {
        position: 1,
        amount: 5000,
        description: "Winner",
      },
      {
        position: 2,
        amount: 3000,
        description: "Runner-up",
      },
    ],

    createdBy: userId,
  });
  const [notification, setNotification] = useState(null);
  const [hackathons, setHackathons] = useState([]);
  const [selectedHackathon, setSelectedHackathon] = useState(null);

  // Fetch Hackathon List
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch(`${baseURL}/hackathons`);
        if (!response.ok) throw new Error("Failed to fetch hackathons");
        const data = await response.json();
        setHackathons(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchHackathons();
  }, []);

  // Handle Selection and Fetch Hackathon Data by ID
  const handleSelectChange = async (e) => {
    const hackathonId = e.target.value;
    setSelectedHackathon(hackathonId);

    if (hackathonId) {
      try {
        const response = await fetch(`${baseURL}/hackathons/${hackathonId}`);
        if (!response.ok) throw new Error("Failed to fetch hackathon details");
        const data = await response.json();
        console.log("Selected Hackathon ID", data);
        // Remove _id before setting state
        // const { _id, ...cleanData } = data;
        // Convert startDate, endDate, and schedule dates to IST
        const {
          _id,
          startDate,
          endDate,
          submissionStart,
          submissionEnd,
          schedule = [],
          ...rest
        } = data;
        const cleanData = {
          ...rest,
          startDate: convertUtcToIst(startDate),
          endDate: convertUtcToIst(endDate),
          submissionStart: convertUtcToIst(submissionStart),
          submissionEnd: convertUtcToIst(submissionEnd),
          schedule: schedule.map((item) => ({
            ...item,
            date: convertUtcToIst(item.date),
          })),
        };
        setEventData(cleanData);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleLogout = () => {
    // Implement logout logic here
  };

  const handleInputChange = (field, value) => {
    setEventData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProblemStatementChange = (index, field, value) => {
    setEventData((prev) => ({
      ...prev,
      problemStatements: prev.problemStatements.map((statement, i) =>
        i === index ? { ...statement, [field]: value } : statement
      ),
    }));
  };

  const handleAddProblemStatement = () => {
    setEventData((prev) => ({
      ...prev,
      problemStatements: [
        ...prev.problemStatements,
        { track: "", description: "", difficulty: "Medium" },
      ],
    }));
  };

  const handleRemoveProblemStatement = (index) => {
    setEventData((prev) => ({
      ...prev,
      problemStatements: prev.problemStatements.filter((_, i) => i !== index),
    }));
  };

  const handleScheduleChange = (index, field, value) => {
    setEventData((prev) => ({
      ...prev,
      schedule: prev.schedule.map((event, i) =>
        i === index ? { ...event, [field]: value } : event
      ),
    }));
  };

  const handleAddScheduleEvent = () => {
    setEventData((prev) => ({
      ...prev,
      schedule: [
        ...prev.schedule,
        { date: new Date().toISOString(), activity: "" },
      ],
    }));
  };

  const handleRemoveScheduleEvent = (index) => {
    setEventData((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index),
    }));
  };

  const handlePrizeDetailsChange = (index, field, value) => {
    setEventData((prev) => ({
      ...prev,
      prizeDetails: prev.prizeDetails.map((prize, i) =>
        i === index ? { ...prize, [field]: value } : prize
      ),
    }));
  };

  const handleSubmit = async () => {
    console.log(eventData);
    try {
      const response = await fetch(`${baseURL}/hackathons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      if (response.ok) {
        toast.success("Hackathon Created Sucessfully", {
          position: "top-right",
        });
      } else {
        throw new Error("Failed to create event");
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  const handleVersionChange = (newVersion) => {
    setEventData((prev) => ({
      ...prev,
      version: newVersion,
    }));
  };

  const handleAllowedEmailsChange = (input) => {
    // Split by comma, space, or both, and remove any extra spaces
    const emails = input.split(/[\s,]+/).filter((email) => email.trim() !== ""); // Remove empty values

    setEventData((prev) => ({
      ...prev,
      allowedEmails: emails,
    }));
  };

  const handleMinTeamSizeChange = (min) => {
    if (min > eventData.maxTeamSize) {
      alert("Minimum team size cannot be greater than maximum team size.");
      return;
    }

    setEventData((prev) => ({
      ...prev,
      minTeamSize: min,
    }));
  };

  const handleMaxTeamSizeChange = (max) => {
    if (max < eventData.minTeamSize) {
      alert("Maximum team size cannot be less than minimum team size.");
      return;
    }

    setEventData((prev) => ({
      ...prev,
      maxTeamSize: max,
    }));
  };

  // Handle changes in a specific event plan
  const handleEventPlanChange = (index, field, value) => {
    setEventData((prev) => ({
      ...prev,
      eventPlan: prev.eventPlan.map((plan, i) =>
        i === index ? { ...plan, [field]: value } : plan
      ),
    }));
  };

  // Add a new event plan
  const handleAddEventPlan = () => {
    setEventData((prev) => ({
      ...prev,
      eventPlan: [
        ...prev.eventPlan,
        { week: prev.eventPlan.length + 1, phase: "", description: "" },
      ],
    }));
  };

  // Remove an event plan
  const handleRemoveEventPlan = (index) => {
    setEventData((prev) => ({
      ...prev,
      eventPlan: prev.eventPlan.filter((_, i) => i !== index),
    }));
  };

  function toIst(isoDateString) {
    const date = new Date(isoDateString);

    // Get the year, month, day, hour, and minutes in IST
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  function convertUtcToIst(utcDateString) {
    // Convert UTC string to Date object
    const date = new Date(utcDateString);

    // Convert to IST using toLocaleString
    const istDate = date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    return istDate;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Create Hackathon Event
            </h1>
            {/* <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button> */}
          </div>
        </div>
      </div>

      {notification && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div
            className={`rounded-lg p-4 ${
              notification.type === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            <p className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {notification.message}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div>
              <h1 className="text-lg font-semibold mb-2">Select a Hackathon</h1>
              <select
                onChange={handleSelectChange}
                className="mt-1 block w-full rounded-lg p-2 border border-gray-200 sm:text-sm"
              >
                <option value="">Select Hackathon</option>
                {hackathons.map((hackathon) => (
                  <option key={hackathon._id} value={hackathon._id}>
                    {hackathon.name}
                  </option>
                ))}
              </select>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mt-4 mb-4">
              Basic Information
            </h2>
            <div className="space-y-4">
              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Type
                </label>
                <select
                  value={eventData.eventType}
                  onChange={(e) =>
                    handleInputChange("eventType", e.target.value)
                  }
                  className="mt-1 block w-full rounded-lg p-2 border border-gray-200 sm:text-sm"
                >
                  <option value="Interactive Hackathon">
                    Interactive Hackathon
                  </option>
                  <option value="Regular Hackathon">Regular Hackathon</option>
                </select>
              </div>
              {/* Event Tilte */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Name
                </label>
                <input
                  type="text"
                  value={eventData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-1 block w-full rounded-lg focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border border-gray-200"
                />
              </div>
              {/* Event Version */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Version
                </label>
                <input
                  type="text"
                  value={eventData.version}
                  onChange={(e) => handleVersionChange(e.target.value)}
                  className="mt-1 block w-full rounded-lg focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border border-gray-200"
                />
              </div>
              {/* Event Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={eventData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={3}
                  className="mt-1 block w-full rounded-lg p-2 border border-gray-200 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>
              {/* Event Start and End Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="datetime-local"
                    value={toIst(eventData.startDate)}
                    onChange={(e) =>
                      handleInputChange(
                        "startDate",
                        new Date(e.target.value).toISOString()
                      )
                    }
                    className="mt-1 block w-full rounded-lg p-2 border border-gray-200 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    value={toIst(eventData.endDate)}
                    onChange={(e) =>
                      handleInputChange(
                        "endDate",
                        new Date(e.target.value).toISOString()
                      )
                    }
                    className="mt-1 block w-full rounded-lg p-2 border border-gray-200 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Event Team Size */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Minimum Team Size
                  </label>
                  <input
                    type="number"
                    value={eventData.minTeamSize}
                    onChange={(e) => handleMinTeamSizeChange(e.target.value)}
                    className="mt-1 block w-full rounded-lg focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Maximum Team Size
                  </label>
                  <input
                    type="number"
                    value={eventData.maxTeamSize}
                    onChange={(e) => handleMaxTeamSizeChange(e.target.value)}
                    className="mt-1 block w-full rounded-lg focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border border-gray-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allowed Emails
                </label>
                <textarea
                  value={eventData.allowedEmails}
                  onChange={(e) => handleAllowedEmailsChange(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-lg p-2 border border-gray-200 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>

              {/* Submission Start and End Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Submission Start Date
                  </label>
                  <input
                    type="datetime-local"
                    value={toIst(eventData.submissionStart)}
                    onChange={(e) =>
                      handleInputChange(
                        "submissionStart",
                        new Date(e.target.value).toISOString()
                      )
                    }
                    className="mt-1 block w-full rounded-lg p-2 border border-gray-200 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Submission End Date
                  </label>
                  <input
                    type="datetime-local"
                    value={toIst(eventData.submissionEnd)}
                    onChange={(e) =>
                      handleInputChange(
                        "submissionEnd",
                        new Date(e.target.value).toISOString()
                      )
                    }
                    className="mt-1 block w-full rounded-lg p-2 border border-gray-200 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Problem Statements */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
              <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
              Problem Statements
            </h2>
            <div className="space-y-4">
              {eventData.problemStatements.map((statement, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Track
                      </label>
                      <input
                        type="text"
                        value={statement.track}
                        onChange={(e) =>
                          handleProblemStatementChange(
                            index,
                            "track",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-lg p-2 border border-gray-200 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Difficulty
                      </label>
                      <select
                        value={statement.difficulty}
                        onChange={(e) =>
                          handleProblemStatementChange(
                            index,
                            "difficulty",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-lg p-2 border border-gray-200 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={statement.description}
                      onChange={(e) =>
                        handleProblemStatementChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      rows={2}
                      className="mt-1 block w-full rounded-lg p-2 border border-gray-200 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveProblemStatement(index)}
                    className="mt-2 inline-flex items-center px-3 py-1.5 border border-red-500 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddProblemStatement}
                className="inline-flex items-center px-4 py-2 border border-red-500 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Problem Statement
              </button>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
              <Calendar className="h-5 w-5 mr-2 text-red-500" />
              Schedule
            </h2>
            <div className="space-y-4">
              {eventData.schedule.map((event, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <input
                    type="datetime-local"
                    value={toIst(event.date)}
                    onChange={(e) =>
                      handleScheduleChange(
                        index,
                        "date",
                        new Date(e.target.value).toISOString()
                      )
                    }
                    className="block w-1/3 rounded-lg p-2 border border-gray-200 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                  <input
                    type="text"
                    value={event.activity}
                    onChange={(e) =>
                      handleScheduleChange(index, "activity", e.target.value)
                    }
                    className="block w-2/3 rounded-lg p-2 border border-gray-200 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    placeholder="Activity"
                  />
                  <button
                    onClick={() => handleRemoveScheduleEvent(index)}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddScheduleEvent}
                className="inline-flex items-center px-4 py-2 border border-red-500 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Schedule Event
              </button>
            </div>
          </div>

          {/* Event Plan */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
              <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
              Event Plan
            </h2>
            <div className="space-y-4">
              {eventData.eventPlan.map((plan, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Week
                      </label>
                      <input
                        type="number"
                        value={plan.week}
                        onChange={(e) =>
                          handleEventPlanChange(
                            index,
                            "week",
                            Number(e.target.value)
                          )
                        }
                        className="mt-1 block w-full rounded-lg p-2 border border-gray-200 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phase
                      </label>
                      <input
                        type="text"
                        value={plan.phase}
                        onChange={(e) =>
                          handleEventPlanChange(index, "phase", e.target.value)
                        }
                        className="mt-1 block w-full rounded-lg p-2 border border-gray-200 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        value={plan.description}
                        onChange={(e) =>
                          handleEventPlanChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows={2}
                        className="mt-1 block w-full rounded-lg p-2 border border-gray-200 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveEventPlan(index)}
                    className="mt-2 inline-flex items-center px-3 py-1.5 border border-red-500 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddEventPlan}
                className="inline-flex items-center px-4 py-2 border border-red-500 rounded-lg text-sm text-red-600 hover:bg-blue-50 transition-colors duration-200"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Event Plan
              </button>
            </div>
          </div>

          {/* Prize Details */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Prize Details
            </h2>
            <div className="space-y-4">
              {eventData.prizeDetails.map((prize, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 items-center"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Position
                    </label>
                    <input
                      type="number"
                      value={prize.position}
                      onChange={(e) =>
                        handlePrizeDetailsChange(
                          index,
                          "position",
                          parseInt(e.target.value)
                        )
                      }
                      className="mt-1 block w-full rounded-lg p-2 border border-gray-200 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Amount
                    </label>
                    <input
                      type="number"
                      value={prize.amount}
                      onChange={(e) =>
                        handlePrizeDetailsChange(
                          index,
                          "amount",
                          parseInt(e.target.value)
                        )
                      }
                      className="mt-1 block w-full rounded-lg p-2 border border-gray-200 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <input
                      type="text"
                      value={prize.description}
                      onChange={(e) =>
                        handlePrizeDetailsChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full rounded-lg p-2 border border-gray-200 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              <Save className="h-5 w-5 mr-2" />
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
