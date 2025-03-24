// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import {
//   Users,
//   Calendar,
//   Link as LinkIcon,
//   Clock,
//   AlertCircle,
//   Save,
//   Lock,
//   User,
//   CheckCircle,
//   X,
//   Plus,
//   Trash2,
//   LogOut,
// } from "lucide-react";

// const AdminPage = () => {
//   // Admin Authentication State
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [adminCredentials, setAdminCredentials] = useState({
//     username: "admin",
//     password: "admin123",
//   });

//   // Content Management State
//   const [countdownDate, setCountdownDate] = useState("2025-02-28T00:00:00");
//   const [problemStatements, setProblemStatements] = useState([
//     {
//       id: "1",
//       title: "Frontend",
//       description: "Build innovative UI/UX solutions with modern frameworks",
//       category: "Frontend",
//       links: [
//         { title: "Problem Statement 1", url: "#" },
//         { title: "Problem Statement 2", url: "#" },
//         { title: "Problem Statement 3", url: "#" },
//       ],
//     },
//     {
//       id: "2",
//       title: "Data Analytics",
//       description: "Extract insights from complex datasets",
//       category: "Data Analytics",
//       links: [
//         { title: "Problem Statement 1", url: "#" },
//         { title: "Problem Statement 2", url: "#" },
//         { title: "Problem Statement 3", url: "#" },
//       ],
//     },
//     {
//       id: "3",
//       title: "SDET",
//       description: "Create robust testing frameworks and automation",
//       category: "SDET",
//       links: [
//         { title: "Problem Statement 1", url: "#" },
//         { title: "Problem Statement 2", url: "#" },
//         { title: "Problem Statement 3", url: "#" },
//       ],
//     },
//   ]);

//   const [socialLinks, setSocialLinks] = useState([
//     { platform: "Zoom", url: "#" },
//     { platform: "YouTube", url: "#" },
//     { platform: "Slack", url: "#" },
//     { platform: "GitHub", url: "#" },
//   ]);

//   const [timeTable, setTimeTable] = useState({
//     fri: [
//       { time: "9:00 AM", event: "Opening Ceremony" },
//       { time: "10:00 AM", event: "Team Formation" },
//       { time: "11:00 AM", event: "Workshop 1: Introduction to React" },
//       { time: "1:00 PM", event: "Lunch Break" },
//       { time: "2:00 PM", event: "Coding Session Begins" },
//       { time: "6:00 PM", event: "Progress Check-in" },
//       { time: "8:00 PM", event: "Dinner" },
//     ],
//     sat: [
//       { time: "9:00 AM", event: "Morning Stand-up" },
//       { time: "10:00 AM", event: "Workshop 2: API Integration" },
//       { time: "12:00 PM", event: "Lunch Break" },
//       { time: "1:00 PM", event: "Mentoring Sessions" },
//       { time: "4:00 PM", event: "Progress Presentations" },
//       { time: "7:00 PM", event: "Dinner & Networking" },
//     ],
//     sun: [
//       { time: "9:00 AM", event: "Final Coding Sprint" },
//       { time: "12:00 PM", event: "Lunch Break" },
//       { time: "1:00 PM", event: "Project Submission Deadline" },
//       { time: "2:00 PM", event: "Project Presentations" },
//       { time: "5:00 PM", event: "Judging" },
//       { time: "6:30 PM", event: "Awards Ceremony & Closing" },
//     ],
//   });

//   const [notification, setNotification] = useState(null);
//   const navigate = useNavigate(); // Initialize navigate

//   // Handle Logout with improved cleanup
//   const handleLogout = () => {
//     if (isAuthenticated) {
//       setIsAuthenticated(false);
//       localStorage.clear(); // Clear stored data for better cleanup
//     }
//   };

//   // Content Update Handlers
//   const handleProblemStatementUpdate = (id, field, value) => {
//     setProblemStatements((prev) =>
//       prev.map((statement) =>
//         statement.id === id ? { ...statement, [field]: value } : statement
//       )
//     );
//   };

//   const handleProblemStatementLinkUpdate = (
//     statementId,
//     linkIndex,
//     field,
//     value
//   ) => {
//     setProblemStatements((prev) =>
//       prev.map((statement) => {
//         if (statement.id === statementId) {
//           const updatedLinks = [...statement.links];
//           updatedLinks[linkIndex] = {
//             ...updatedLinks[linkIndex],
//             [field]: value,
//           };
//           return { ...statement, links: updatedLinks };
//         }
//         return statement;
//       })
//     );
//   };

//   const handleAddProblemStatementLink = (statementId) => {
//     setProblemStatements((prev) =>
//       prev.map((statement) => {
//         if (statement.id === statementId) {
//           return {
//             ...statement,
//             links: [
//               ...statement.links,
//               { title: "New Problem Statement", url: "#" },
//             ],
//           };
//         }
//         return statement;
//       })
//     );
//   };

//   const handleRemoveProblemStatementLink = (statementId, linkIndex) => {
//     setProblemStatements((prev) =>
//       prev.map((statement) => {
//         if (statement.id === statementId) {
//           const updatedLinks = [...statement.links];
//           updatedLinks.splice(linkIndex, 1);
//           return { ...statement, links: updatedLinks };
//         }
//         return statement;
//       })
//     );
//   };

//   const handleSocialLinkUpdate = (index, field, value) => {
//     setSocialLinks((prev) =>
//       prev.map((link, i) => (i === index ? { ...link, [field]: value } : link))
//     );
//   };

//   const handleTimeTableUpdate = (day, index, field, value) => {
//     setTimeTable((prev) => ({
//       ...prev,
//       [day]: prev[day].map((event, i) =>
//         i === index ? { ...event, [field]: value } : event
//       ),
//     }));
//   };

//   const handleAddTimeTableEvent = (day) => {
//     setTimeTable((prev) => ({
//       ...prev,
//       [day]: [...prev[day], { time: "", event: "" }],
//     }));
//   };

//   const handleRemoveTimeTableEvent = (day, index) => {
//     setTimeTable((prev) => ({
//       ...prev,
//       [day]: prev[day].filter((_, i) => i !== index),
//     }));
//   };

//   const handleSaveChanges = () => {
//     setNotification({
//       message: "Changes saved successfully",
//       type: "success",
//     });
//     setTimeout(() => setNotification(null), 3000);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <h1 className="text-2xl font-bold text-gray-900">
//               Admin Dashboard
//             </h1>
//             <button
//               onClick={handleLogout}
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
//             >
//               <LogOut className="h-4 w-4 mr-2" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       {notification && (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
//           <div
//             className={`rounded-lg p-4 ${
//               notification.type === "success"
//                 ? "bg-green-50 text-green-800"
//                 : "bg-red-50 text-red-800"
//             }`}
//           >
//             <p className="flex items-center">
//               {notification.type === "success" ? (
//                 <CheckCircle className="h-5 w-5 mr-2" />
//               ) : (
//                 <AlertCircle className="h-5 w-5 mr-2" />
//               )}
//               {notification.message}
//             </p>
//           </div>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 gap-8">
//           {/* Countdown Timer Section */}
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
//               <Clock className="h-5 w-5 mr-2 text-red-500" />
//               Countdown Timer
//             </h2>
//             <div className="flex items-center space-x-4">
//               <input
//                 type="datetime-local"
//                 value={countdownDate}
//                 onChange={(e) => setCountdownDate(e.target.value)}
//                 className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           {/* Problem Statements Section */}
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
//               <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
//               Problem Statements
//             </h2>
//             <div className="space-y-6">
//               {problemStatements.map((statement) => (
//                 <div key={statement.id} className="bg-gray-50 rounded-lg p-6">
//                   <div className="mb-4">
//                     <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 mb-3">
//                       {statement.category}
//                     </div>
//                     <input
//                       type="text"
//                       value={statement.title}
//                       onChange={(e) =>
//                         handleProblemStatementUpdate(
//                           statement.id,
//                           "title",
//                           e.target.value
//                         )
//                       }
//                       className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm mb-2"
//                       placeholder="Title"
//                     />
//                     <textarea
//                       value={statement.description}
//                       onChange={(e) =>
//                         handleProblemStatementUpdate(
//                           statement.id,
//                           "description",
//                           e.target.value
//                         )
//                       }
//                       className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
//                       rows={2}
//                       placeholder="Description"
//                     />
//                   </div>

//                   <div className="mt-4">
//                     <h4 className="text-sm font-medium text-gray-700 mb-3">
//                       Problem Statement Links
//                     </h4>
//                     <div className="space-y-3">
//                       {statement.links.map((link, linkIndex) => (
//                         <div
//                           key={linkIndex}
//                           className="flex items-center space-x-2"
//                         >
//                           <input
//                             type="text"
//                             value={link.title}
//                             onChange={(e) =>
//                               handleProblemStatementLinkUpdate(
//                                 statement.id,
//                                 linkIndex,
//                                 "title",
//                                 e.target.value
//                               )
//                             }
//                             className="block w-1/3 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
//                             placeholder="Link Title"
//                           />
//                           <input
//                             type="url"
//                             value={link.url}
//                             onChange={(e) =>
//                               handleProblemStatementLinkUpdate(
//                                 statement.id,
//                                 linkIndex,
//                                 "url",
//                                 e.target.value
//                               )
//                             }
//                             className="block w-2/3 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
//                             placeholder="Notion URL"
//                           />
//                           <button
//                             onClick={() =>
//                               handleRemoveProblemStatementLink(
//                                 statement.id,
//                                 linkIndex
//                               )
//                             }
//                             className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                     <button
//                       onClick={() =>
//                         handleAddProblemStatementLink(statement.id)
//                       }
//                       className="mt-3 inline-flex items-center px-3 py-1.5 border border-red-500 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
//                     >
//                       <Plus className="h-4 w-4 mr-1" />
//                       Add Link
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Social Links Section */}
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
//               <LinkIcon className="h-5 w-5 mr-2 text-red-500" />
//               Social Links
//             </h2>
//             <div className="grid gap-4">
//               {socialLinks.map((link, index) => (
//                 <div key={index} className="flex space-x-4">
//                   <input
//                     type="text"
//                     value={link.platform}
//                     onChange={(e) =>
//                       handleSocialLinkUpdate(index, "platform", e.target.value)
//                     }
//                     className="block w-1/3 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
//                     placeholder="Platform"
//                   />
//                   <input
//                     type="url"
//                     value={link.url}
//                     onChange={(e) =>
//                       handleSocialLinkUpdate(index, "url", e.target.value)
//                     }
//                     className="block w-2/3 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
//                     placeholder="URL"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Timetable Section */}
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
//               <Calendar className="h-5 w-5 mr-2 text-red-500" />
//               Event Schedule
//             </h2>

//             <div className="space-y-8">
//               {/* Friday Schedule */}
//               <div className="bg-gray-50 rounded-lg p-6">
//                 <h3 className="font-medium text-gray-900 mb-4">Friday</h3>
//                 <div className="space-y-3">
//                   {timeTable.fri.map((event, index) => (
//                     <div
//                       key={`fri-${index}`}
//                       className="flex items-center space-x-2"
//                     >
//                       <input
//                         type="text"
//                         value={event.time}
//                         onChange={(e) =>
//                           handleTimeTableUpdate(
//                             "fri",
//                             index,
//                             "time",
//                             e.target.value
//                           )
//                         }
//                         className="block w-1/4 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
//                         placeholder="Time"
//                       />
//                       <input
//                         type="text"
//                         value={event.event}
//                         onChange={(e) =>
//                           handleTimeTableUpdate(
//                             "fri",
//                             index,
//                             "event",
//                             e.target.value
//                           )
//                         }
//                         className="block w-3/4 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
//                         placeholder="Event"
//                       />
//                       <button
//                         onClick={() => handleRemoveTimeTableEvent("fri", index)}
//                         className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     onClick={() => handleAddTimeTableEvent("fri")}
//                     className="mt-2 inline-flex items-center px-3 py-1.5 border border-red-500 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
//                   >
//                     <Plus className="h-4 w-4 mr-1" />
//                     Add Event
//                   </button>
//                 </div>
//               </div>

//               {/* Saturday Schedule */}
//               <div className="bg-gray-50 rounded-lg p-6">
//                 <h3 className="font-medium text-gray-900 mb-4">Saturday</h3>
//                 <div className="space-y-3">
//                   {timeTable.sat.map((event, index) => (
//                     <div
//                       key={`sat-${index}`}
//                       className="flex items-center space-x-2"
//                     >
//                       <input
//                         type="text"
//                         value={event.time}
//                         onChange={(e) =>
//                           handleTimeTableUpdate(
//                             "sat",
//                             index,
//                             "time",
//                             e.target.value
//                           )
//                         }
//                         className="block w-1/4 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
//                         placeholder="Time"
//                       />
//                       <input
//                         type="text"
//                         value={event.event}
//                         onChange={(e) =>
//                           handleTimeTableUpdate(
//                             "sat",
//                             index,
//                             "event",
//                             e.target.value
//                           )
//                         }
//                         className="block w-3/4 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
//                         placeholder="Event"
//                       />
//                       <button
//                         onClick={() => handleRemoveTimeTableEvent("sat", index)}
//                         className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     onClick={() => handleAddTimeTableEvent("sat")}
//                     className="mt-2 inline-flex items-center px-3 py-1.5 border border-red-500 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
//                   >
//                     <Plus className="h-4 w-4 mr-1" />
//                     Add Event
//                   </button>
//                 </div>
//               </div>

//               {/* Sunday Schedule */}
//               <div className="bg-gray-50 rounded-lg p-6">
//                 <h3 className="font-medium text-gray-900 mb-4">Sunday</h3>
//                 <div className="space-y-3">
//                   {timeTable.sun.map((event, index) => (
//                     <div
//                       key={`sun-${index}`}
//                       className="flex items-center space-x-2"
//                     >
//                       <input
//                         type="text"
//                         value={event.time}
//                         onChange={(e) =>
//                           handleTimeTableUpdate(
//                             "sun",
//                             index,
//                             "time",
//                             e.target.value
//                           )
//                         }
//                         className="block w-1/4 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
//                         placeholder="Time"
//                       />
//                       <input
//                         type="text"
//                         value={event.event}
//                         onChange={(e) =>
//                           handleTimeTableUpdate(
//                             "sun",
//                             index,
//                             "event",
//                             e.target.value
//                           )
//                         }
//                         className="block w-3/4 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
//                         placeholder="Event"
//                       />
//                       <button
//                         onClick={() => handleRemoveTimeTableEvent("sun", index)}
//                         className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     onClick={() => handleAddTimeTableEvent("sun")}
//                     className="mt-2 inline-flex items-center px-3 py-1.5 border border-red-500 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
//                   >
//                     <Plus className="h-4 w-4 mr-1" />
//                     Add Event
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Save Changes Button */}
//           <div className="flex justify-end">
//             <button
//               onClick={handleSaveChanges}
//               className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
//             >
//               <Save className="h-5 w-5 mr-2" />
//               Save All Changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;


import React, { useState } from "react";
import {
  Calendar,
  AlertCircle,
  Save,
  LogOut,
  Plus,
  Trash2,
} from "lucide-react";

const AdminPage = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const userId = localStorage.getItem("userId");
  const [eventData, setEventData] = useState({
    name: "Interactive CodeMaster 2025",
    version: "1.0",
    description: "An interactive learning week followed by a challenging hackathon.",
    startDate: "2025-05-01T09:00:00Z",
    endDate: "2025-05-14T18:00:00Z",
    allowedEmails: [userId],
    minTeamSize: 2,
    maxTeamSize: 3,
    problemStatements: [
      { track: "Web Development", description: "Build a responsive e-commerce website.", difficulty: "Medium" },
      { track: "Machine Learning", description: "Create a model to predict customer churn.", difficulty: "Hard" }
    ],
    schedule: [
      { date: "2025-05-01T10:00:00Z", activity: "Welcome Session" },
      { date: "2025-05-02T12:00:00Z", activity: "Tech Talk - AI Trends" },
      { date: "2025-05-08T14:00:00Z", activity: "Hackathon Kick-off" },
      { date: "2025-05-14T16:00:00Z", activity: "Winner Announcement" }
    ],
    eventPlan: [
      { week: 1, phase: "Interactive", description: "Workshops and tech talks." },
      { week: 2, phase: "Hackathon", description: "Full-fledged coding competition." }
    ],
    submissionStart: "2025-05-08T11:00:00Z",
    submissionEnd: "2025-05-14T15:00:00Z",
    status: "Upcoming",
    eventType: "Interactive Hackathon",
    prizeDetails: [
      { position: 1, amount: 7000, description: "Champion" },
      { position: 2, amount: 4000, description: "Runner-up" },
      { position: 3, amount: 3000, description: "Runner-up" }
    ],
    createdBy: userId
  });

  const [notification, setNotification] = useState(null);

  const handleLogout = () => {
    // Implement logout logic here
  };

  const handleInputChange = (field, value) => {
    setEventData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProblemStatementChange = (index, field, value) => {
    setEventData(prev => ({
      ...prev,
      problemStatements: prev.problemStatements.map((statement, i) =>
        i === index ? { ...statement, [field]: value } : statement
      )
    }));
  };

  const handleAddProblemStatement = () => {
    setEventData(prev => ({
      ...prev,
      problemStatements: [
        ...prev.problemStatements,
        { track: "", description: "", difficulty: "Medium" }
      ]
    }));
  };

  const handleRemoveProblemStatement = (index) => {
    setEventData(prev => ({
      ...prev,
      problemStatements: prev.problemStatements.filter((_, i) => i !== index)
    }));
  };

  const handleScheduleChange = (index, field, value) => {
    setEventData(prev => ({
      ...prev,
      schedule: prev.schedule.map((event, i) =>
        i === index ? { ...event, [field]: value } : event
      )
    }));
  };

  const handleAddScheduleEvent = () => {
    setEventData(prev => ({
      ...prev,
      schedule: [
        ...prev.schedule,
        { date: new Date().toISOString(), activity: "" }
      ]
    }));
  };

  const handleRemoveScheduleEvent = (index) => {
    setEventData(prev => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index)
    }));
  };

  const handlePrizeDetailsChange = (index, field, value) => {
    setEventData(prev => ({
      ...prev,
      prizeDetails: prev.prizeDetails.map((prize, i) =>
        i === index ? { ...prize, [field]: value } : prize
      )
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${baseURL}/hackathons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData)
      });

      if (response.ok) {
        setNotification({
          message: "Event created successfully",
          type: "success"
        });
      } else {
        throw new Error('Failed to create event');
      }
    } catch (error) {
      setNotification({
        message: "Failed to create event. Please try again.",
        type: "error"
      });
    }

    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Create Hackathon Event
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Event Name</label>
                <input
                  type="text"
                  value={eventData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={eventData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="datetime-local"
                    value={eventData.startDate.slice(0, 16)}
                    onChange={(e) => handleInputChange("startDate", new Date(e.target.value).toISOString())}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="datetime-local"
                    value={eventData.endDate.slice(0, 16)}
                    onChange={(e) => handleInputChange("endDate", new Date(e.target.value).toISOString())}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
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
                      <label className="block text-sm font-medium text-gray-700">Track</label>
                      <input
                        type="text"
                        value={statement.track}
                        onChange={(e) => handleProblemStatementChange(index, "track", e.target.value)}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                      <select
                        value={statement.difficulty}
                        onChange={(e) => handleProblemStatementChange(index, "difficulty", e.target.value)}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={statement.description}
                      onChange={(e) => handleProblemStatementChange(index, "description", e.target.value)}
                      rows={2}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
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
                    value={event.date.slice(0, 16)}
                    onChange={(e) => handleScheduleChange(index, "date", new Date(e.target.value).toISOString())}
                    className="block w-1/3 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                  <input
                    type="text"
                    value={event.activity}
                    onChange={(e) => handleScheduleChange(index, "activity", e.target.value)}
                    className="block w-2/3 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
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

          {/* Prize Details */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Prize Details</h2>
            <div className="space-y-4">
              {eventData.prizeDetails.map((prize, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 items-center">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Position</label>
                    <input
                      type="number"
                      value={prize.position}
                      onChange={(e) => handlePrizeDetailsChange(index, "position", parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                      type="number"
                      value={prize.amount}
                      onChange={(e) => handlePrizeDetailsChange(index, "amount", parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                      type="text"
                      value={prize.description}
                      onChange={(e) => handlePrizeDetailsChange(index, "description", e.target.value)}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
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