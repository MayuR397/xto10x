import React, { useState } from 'react';
import FAQModal from './FAQModal';
import ProblemStatementsModal from './ProblemStatementsModal';
import './AssistPanel.css';
import { FaSlack, FaVideo, FaQuestionCircle, FaListAlt } from 'react-icons/fa';

function AssistPanel() {
  const [showFAQ, setShowFAQ] = useState(false);
  const [showProblems, setShowProblems] = useState(false);

  return (
    <div className="assist-panel">
      <div className="panel-links">
        <a href="https://slack.com" target="_blank" rel="noopener noreferrer">
          <FaSlack className="button-logo" />
          Slack
        </a>
        <a href="https://zoom.us" target="_blank" rel="noopener noreferrer">
          <FaVideo className="button-logo" />
          Zoom
        </a>
        <button className="faq-button" onClick={() => setShowFAQ(true)}>
          <FaQuestionCircle className="button-logo" />
          FAQ
        </button>
        <button className="problems-button" onClick={() => setShowProblems(true)}>
          <FaListAlt className="button-logo" />
          Problems
        </button>
      </div>
      {showFAQ && <FAQModal onClose={() => setShowFAQ(false)} />}
      {showProblems && <ProblemStatementsModal onClose={() => setShowProblems(false)} />}
    </div>
  );
}

export default AssistPanel;