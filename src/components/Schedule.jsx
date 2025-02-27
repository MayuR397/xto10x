import React, { useState } from 'react';
import './Schedule.css';
import { FaTimes } from 'react-icons/fa'; // Import close icon

function Schedule() {
  const [activeTab, setActiveTab] = useState('Fri');

  const scheduleData = {
    Fri: [
      { time: '9:00 AM', event: 'Opening Ceremony' },
      { time: '10:00 AM', event: 'Team Formation' },
      { time: '11:00 AM', event: 'Workshop 1: Introduction to React' },
      { time: '1:00 PM', event: 'Lunch Break' },
      // ... (Add more Friday events)
    ],
    Sat: [
      { time: '10:00 AM', event: 'Coding Session' },
      { time: '1:00 PM', event: 'Lunch Break' },
      { time: '2:00 PM', event: 'Coding Session Continues' },
      { time: '6:00 PM', event: 'Dinner Break' },
      // ... (Add more Saturday events)
    ],
    Sun: [
      { time: '9:00 AM', event: 'Judging Session' },
      { time: '11:00 AM', event: 'Closing Ceremony' },
      // ... (Add more Sunday events)
    ],
  };

  return (
    <div className="schedule">
      <div className="schedule-header-container">
        <h2 className="schedule-title">Event Schedule</h2>
      </div>

      <div className="schedule-tabs">
        {['Fri', 'Sat', 'Sun'].map((day) => (
          <button
            key={day}
            className={`schedule-tab-button ${activeTab === day ? 'active' : ''}`}
            onClick={() => setActiveTab(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <table className="schedule-table">
        <thead>
          <tr>
            <th className="schedule-header">Time</th>
            <th className="schedule-header">Event</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData[activeTab].map((item, index) => (
            <tr key={index} className="schedule-row">
              <td className="schedule-cell">{item.time}</td>
              <td className="schedule-cell">{item.event}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;