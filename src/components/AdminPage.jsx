import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Users,
  Calendar,
  Link as LinkIcon,
  Clock,
  AlertCircle,
  Save,
  Lock,
  User,
  CheckCircle,
  X,
  Plus,
  Trash2,
  LogOut,
} from "lucide-react";

const AdminPage = () => {
  // Admin Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    username: "admin",
    password: "admin123",
  });

  // Content Management State
  const [countdownDate, setCountdownDate] = useState("2025-02-28T00:00:00");
  const [problemStatements, setProblemStatements] = useState([
    {
      id: "1",
      title: "Frontend",
      description: "Build innovative UI/UX solutions with modern frameworks",
      category: "Frontend",
      links: [
        { title: "Problem Statement 1", url: "#" },
        { title: "Problem Statement 2", url: "#" },
        { title: "Problem Statement 3", url: "#" },
      ],
    },
    {
      id: "2",
      title: "Data Analytics",
      description: "Extract insights from complex datasets",
      category: "Data Analytics",
      links: [
        { title: "Problem Statement 1", url: "#" },
        { title: "Problem Statement 2", url: "#" },
        { title: "Problem Statement 3", url: "#" },
      ],
    },
    {
      id: "3",
      title: "SDET",
      description: "Create robust testing frameworks and automation",
      category: "SDET",
      links: [
        { title: "Problem Statement 1", url: "#" },
        { title: "Problem Statement 2", url: "#" },
        { title: "Problem Statement 3", url: "#" },
      ],
    },
  ]);

  const [socialLinks, setSocialLinks] = useState([
    { platform: "Zoom", url: "#" },
    { platform: "YouTube", url: "#" },
    { platform: "Slack", url: "#" },
    { platform: "GitHub", url: "#" },
  ]);

  const [timeTable, setTimeTable] = useState({
    fri: [
      { time: "9:00 AM", event: "Opening Ceremony" },
      { time: "10:00 AM", event: "Team Formation" },
      { time: "11:00 AM", event: "Workshop 1: Introduction to React" },
      { time: "1:00 PM", event: "Lunch Break" },
      { time: "2:00 PM", event: "Coding Session Begins" },
      { time: "6:00 PM", event: "Progress Check-in" },
      { time: "8:00 PM", event: "Dinner" },
    ],
    sat: [
      { time: "9:00 AM", event: "Morning Stand-up" },
      { time: "10:00 AM", event: "Workshop 2: API Integration" },
      { time: "12:00 PM", event: "Lunch Break" },
      { time: "1:00 PM", event: "Mentoring Sessions" },
      { time: "4:00 PM", event: "Progress Presentations" },
      { time: "7:00 PM", event: "Dinner & Networking" },
    ],
    sun: [
      { time: "9:00 AM", event: "Final Coding Sprint" },
      { time: "12:00 PM", event: "Lunch Break" },
      { time: "1:00 PM", event: "Project Submission Deadline" },
      { time: "2:00 PM", event: "Project Presentations" },
      { time: "5:00 PM", event: "Judging" },
      { time: "6:30 PM", event: "Awards Ceremony & Closing" },
    ],
  });

  const [notification, setNotification] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

//   // Cleanup logic for notifications
//   useEffect(() => {
//     let timeout;

//     if (notification) {
//       timeout = setTimeout(() => {
//         setNotification(null);
//       }, 3000);
//     }

//     return () => clearTimeout(timeout); // Cleanup timeout on unmount
//   }, [notification]);

//   // Prevent navigation loops on logout
//   useEffect(() => {
//     let isMounted = true;

//     if (!isAuthenticated) {
//       setTimeout(() => {
//         if (isMounted) navigate("/login", { replace: true });
//       }, 100);
//     }

//     return () => (isMounted = false); // Cleanup to prevent updates on unmounted component
//   }, [isAuthenticated]);

  // Handle Logout with improved cleanup
  const handleLogout = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
      localStorage.clear(); // Clear stored data for better cleanup
    }
  };

//   // Authentication Handler
//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (
//       adminCredentials.username === "admin" &&
//       adminCredentials.password === "admin123"
//     ) {
//       setIsAuthenticated(true);
//       setNotification({ message: "Successfully logged in", type: "success" });
//     } else {
//       setNotification({ message: "Invalid credentials", type: "error" });
//     }
//   };

  // Content Update Handlers
  const handleProblemStatementUpdate = (id, field, value) => {
    setProblemStatements((prev) =>
      prev.map((statement) =>
        statement.id === id ? { ...statement, [field]: value } : statement
      )
    );
  };

  const handleProblemStatementLinkUpdate = (
    statementId,
    linkIndex,
    field,
    value
  ) => {
    setProblemStatements((prev) =>
      prev.map((statement) => {
        if (statement.id === statementId) {
          const updatedLinks = [...statement.links];
          updatedLinks[linkIndex] = {
            ...updatedLinks[linkIndex],
            [field]: value,
          };
          return { ...statement, links: updatedLinks };
        }
        return statement;
      })
    );
  };

  const handleAddProblemStatementLink = (statementId) => {
    setProblemStatements((prev) =>
      prev.map((statement) => {
        if (statement.id === statementId) {
          return {
            ...statement,
            links: [
              ...statement.links,
              { title: "New Problem Statement", url: "#" },
            ],
          };
        }
        return statement;
      })
    );
  };

  const handleRemoveProblemStatementLink = (statementId, linkIndex) => {
    setProblemStatements((prev) =>
      prev.map((statement) => {
        if (statement.id === statementId) {
          const updatedLinks = [...statement.links];
          updatedLinks.splice(linkIndex, 1);
          return { ...statement, links: updatedLinks };
        }
        return statement;
      })
    );
  };

  const handleSocialLinkUpdate = (index, field, value) => {
    setSocialLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, [field]: value } : link))
    );
  };

  const handleTimeTableUpdate = (day, index, field, value) => {
    setTimeTable((prev) => ({
      ...prev,
      [day]: prev[day].map((event, i) =>
        i === index ? { ...event, [field]: value } : event
      ),
    }));
  };

  const handleAddTimeTableEvent = (day) => {
    setTimeTable((prev) => ({
      ...prev,
      [day]: [...prev[day], { time: "", event: "" }],
    }));
  };

  const handleRemoveTimeTableEvent = (day, index) => {
    setTimeTable((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  const handleSaveChanges = () => {
    setNotification({
      message: "Changes saved successfully",
      type: "success",
    });
    setTimeout(() => setNotification(null), 3000);
  };

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full">
//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <div className="text-center mb-8">
//               <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                 <Lock className="h-8 w-8 text-red-600" />
//               </div>
//               <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
//               <p className="mt-2 text-sm text-gray-600">
//                 Enter your credentials to access the dashboard
//               </p>
//             </div>

//             {notification && (
//               <div
//                 className={`mb-6 rounded-lg p-4 ${
//                   notification.type === "success"
//                     ? "bg-green-50 text-green-800"
//                     : "bg-red-50 text-red-800"
//                 }`}
//               >
//                 <p className="flex items-center text-sm">
//                   {notification.type === "success" ? (
//                     <CheckCircle className="h-4 w-4 mr-2" />
//                   ) : (
//                     <AlertCircle className="h-4 w-4 mr-2" />
//                   )}
//                   {notification.message}
//                 </p>
//               </div>
//             )}

//             <form onSubmit={handleLogin} className="space-y-6">
//               <div>
//                 <label
//                   htmlFor="username"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Username
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="username"
//                     name="username"
//                     type="text"
//                     required
//                     className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                     placeholder="Enter your username"
//                     value={adminCredentials.username}
//                     onChange={(e) =>
//                       setAdminCredentials((prev) => ({
//                         ...prev,
//                         username: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     required
//                     className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                     placeholder="Enter your password"
//                     value={adminCredentials.password}
//                     onChange={(e) =>
//                       setAdminCredentials((prev) => ({
//                         ...prev,
//                         password: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
//               >
//                 Sign in
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
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
              {notification.type === "success" ? (
                <CheckCircle className="h-5 w-5 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2" />
              )}
              {notification.message}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Countdown Timer Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
              <Clock className="h-5 w-5 mr-2 text-red-500" />
              Countdown Timer
            </h2>
            <div className="flex items-center space-x-4">
              <input
                type="datetime-local"
                value={countdownDate}
                onChange={(e) => setCountdownDate(e.target.value)}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Problem Statements Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
              <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
              Problem Statements
            </h2>
            <div className="space-y-6">
              {problemStatements.map((statement) => (
                <div key={statement.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="mb-4">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 mb-3">
                      {statement.category}
                    </div>
                    <input
                      type="text"
                      value={statement.title}
                      onChange={(e) =>
                        handleProblemStatementUpdate(
                          statement.id,
                          "title",
                          e.target.value
                        )
                      }
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm mb-2"
                      placeholder="Title"
                    />
                    <textarea
                      value={statement.description}
                      onChange={(e) =>
                        handleProblemStatementUpdate(
                          statement.id,
                          "description",
                          e.target.value
                        )
                      }
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      rows={2}
                      placeholder="Description"
                    />
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Problem Statement Links
                    </h4>
                    <div className="space-y-3">
                      {statement.links.map((link, linkIndex) => (
                        <div
                          key={linkIndex}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="text"
                            value={link.title}
                            onChange={(e) =>
                              handleProblemStatementLinkUpdate(
                                statement.id,
                                linkIndex,
                                "title",
                                e.target.value
                              )
                            }
                            className="block w-1/3 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                            placeholder="Link Title"
                          />
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) =>
                              handleProblemStatementLinkUpdate(
                                statement.id,
                                linkIndex,
                                "url",
                                e.target.value
                              )
                            }
                            className="block w-2/3 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                            placeholder="Notion URL"
                          />
                          <button
                            onClick={() =>
                              handleRemoveProblemStatementLink(
                                statement.id,
                                linkIndex
                              )
                            }
                            className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        handleAddProblemStatementLink(statement.id)
                      }
                      className="mt-3 inline-flex items-center px-3 py-1.5 border border-red-500 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Link
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
              <LinkIcon className="h-5 w-5 mr-2 text-red-500" />
              Social Links
            </h2>
            <div className="grid gap-4">
              {socialLinks.map((link, index) => (
                <div key={index} className="flex space-x-4">
                  <input
                    type="text"
                    value={link.platform}
                    onChange={(e) =>
                      handleSocialLinkUpdate(index, "platform", e.target.value)
                    }
                    className="block w-1/3 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    placeholder="Platform"
                  />
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) =>
                      handleSocialLinkUpdate(index, "url", e.target.value)
                    }
                    className="block w-2/3 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    placeholder="URL"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Timetable Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
              <Calendar className="h-5 w-5 mr-2 text-red-500" />
              Event Schedule
            </h2>

            <div className="space-y-8">
              {/* Friday Schedule */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-4">Friday</h3>
                <div className="space-y-3">
                  {timeTable.fri.map((event, index) => (
                    <div
                      key={`fri-${index}`}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="text"
                        value={event.time}
                        onChange={(e) =>
                          handleTimeTableUpdate(
                            "fri",
                            index,
                            "time",
                            e.target.value
                          )
                        }
                        className="block w-1/4 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                        placeholder="Time"
                      />
                      <input
                        type="text"
                        value={event.event}
                        onChange={(e) =>
                          handleTimeTableUpdate(
                            "fri",
                            index,
                            "event",
                            e.target.value
                          )
                        }
                        className="block w-3/4 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                        placeholder="Event"
                      />
                      <button
                        onClick={() => handleRemoveTimeTableEvent("fri", index)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddTimeTableEvent("fri")}
                    className="mt-2 inline-flex items-center px-3 py-1.5 border border-red-500 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Event
                  </button>
                </div>
              </div>

              {/* Saturday Schedule */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-4">Saturday</h3>
                <div className="space-y-3">
                  {timeTable.sat.map((event, index) => (
                    <div
                      key={`sat-${index}`}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="text"
                        value={event.time}
                        onChange={(e) =>
                          handleTimeTableUpdate(
                            "sat",
                            index,
                            "time",
                            e.target.value
                          )
                        }
                        className="block w-1/4 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                        placeholder="Time"
                      />
                      <input
                        type="text"
                        value={event.event}
                        onChange={(e) =>
                          handleTimeTableUpdate(
                            "sat",
                            index,
                            "event",
                            e.target.value
                          )
                        }
                        className="block w-3/4 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                        placeholder="Event"
                      />
                      <button
                        onClick={() => handleRemoveTimeTableEvent("sat", index)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddTimeTableEvent("sat")}
                    className="mt-2 inline-flex items-center px-3 py-1.5 border border-red-500 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Event
                  </button>
                </div>
              </div>

              {/* Sunday Schedule */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-4">Sunday</h3>
                <div className="space-y-3">
                  {timeTable.sun.map((event, index) => (
                    <div
                      key={`sun-${index}`}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="text"
                        value={event.time}
                        onChange={(e) =>
                          handleTimeTableUpdate(
                            "sun",
                            index,
                            "time",
                            e.target.value
                          )
                        }
                        className="block w-1/4 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                        placeholder="Time"
                      />
                      <input
                        type="text"
                        value={event.event}
                        onChange={(e) =>
                          handleTimeTableUpdate(
                            "sun",
                            index,
                            "event",
                            e.target.value
                          )
                        }
                        className="block w-3/4 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                        placeholder="Event"
                      />
                      <button
                        onClick={() => handleRemoveTimeTableEvent("sun", index)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddTimeTableEvent("sun")}
                    className="mt-2 inline-flex items-center px-3 py-1.5 border border-red-500 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Event
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveChanges}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              <Save className="h-5 w-5 mr-2" />
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
