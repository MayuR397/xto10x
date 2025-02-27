import React, { useState } from 'react';
import Leaderboard from './Leaderboard';
import AssistPanel from './AssistPanel';
import Schedule from './Schedule';
import './MainContent.css';

function MainContent() {
  const [showSchedule, setShowSchedule] = useState(false);

  return (
    <div className="main-content">
      <div className={`content-container ${showSchedule ? 'with-schedule' : 'full-width'}`}>
        <div className="scrollable-content">
          <Leaderboard />
        </div>


            <Schedule />
         
      </div>
    </div>
  );
}

export default MainContent;