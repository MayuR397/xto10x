import React, { useState } from 'react';
import './ProblemStatementsModal.css';

function ProblemStatementsModal({ onClose }) {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const problems = {
    'Software Development': [
      'Problem 1: Build a responsive web application.',
      'Problem 2: Design a RESTful API.',
      'Problem 3: Implement a user authentication system.',
      'Problem 4: Create a real-time chat application.',
    ],
    'Data Science': [
      'Problem 1: Analyze a dataset and build a predictive model.',
      'Problem 2: Develop a data visualization dashboard.',
      'Problem 3: Implement a recommendation system.',
      'Problem 4: Build a natural language processing model.',
    ],
    'SDET': [
      'Problem 1: Automate testing for a web application.',
      'Problem 2: Design a test plan for a mobile app.',
      'Problem 3: Implement performance testing for an API.',
      'Problem 4: Create a CI/CD pipeline for testing.',
    ],
  };

  const toggleAccordion = (title) => {
    setActiveAccordion(activeAccordion === title ? null : title);
  };

  return (
    <div className="problem-statements-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Problem Statements</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          {Object.keys(problems).map((title) => (
            <div key={title} className="accordion">
              <div
                className="accordion-header"
                onClick={() => toggleAccordion(title)}
              >
                {title}
                <span className="arrow">
                  {activeAccordion === title ? '▲' : '▼'}
                </span>
              </div>
              {activeAccordion === title && (
                <ul className="accordion-content">
                  {problems[title].map((problem, index) => (
                    <li key={index}>{problem}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProblemStatementsModal;