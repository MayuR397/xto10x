import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventSchedule = () => {
  const [activeTab, setActiveTab] = useState("fri");
  const scheduleData = {
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
  };
  return (
    <>
      {/* Event Schedule */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Event Schedule
        </h2>
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 ${
              activeTab === "fri"
                ? "border-b-2 border-red-500 text-red-500 font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("fri")}
          >
            Fri
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "sat"
                ? "border-b-2 border-red-500 text-red-500 font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("sat")}
          >
            Sat
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "sun"
                ? "border-b-2 border-red-500 text-red-500 font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("sun")}
          >
            Sun
          </button>
        </div>
        <div className="space-y-3">
          {scheduleData[activeTab].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-100 pb-2"
            >
              <div className="text-gray-700 font-medium">{item.time}</div>
              <div className="text-gray-900">{item.event}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventSchedule;
