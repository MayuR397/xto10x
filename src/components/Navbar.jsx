import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Make sure to update your CSS file
import { useNavigate } from 'react-router-dom';
// Import your clock logo (e.g., import ClockIcon from './ClockIcon.svg';)

function Navbar() {
  const [time, setTime] = useState(new Date());
  const hackathonName = "Hackathon 2025";
  const tagline = "Code, Collaborate, Conquer!";

  const navigate = useNavigate();

  const handleRegisterTeamClick = () => {
    // Navigate to the team registration page
    navigate('/register-team');
  };

  const handleSelectTeamClick = () => {
    // Navigate to the team selection page
    navigate('/select-team');
  };


  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <nav className="bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-center py-4 px-6">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-8">
              <div className="relative">
                <h1 className="text-5xl font-bold">
                  xto<span className="text-red-500">10x</span>
                </h1>
                <div className="flex justify-end">
                  <span className="text-sm text-black">by masai</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold">
                Hackathon <span className="text-red-500">Feb 2025</span>
              </h2>
              <p className="text-sm italic">{tagline}</p>
            </div>
          </div>

          <div className="flex space-x-2"> {/* Reduced space between buttons */}
            <button className="bg-red-500 text-white px-3 py-1 rounded text-sm" onClick={handleSelectTeamClick}>Select Team</button> {/* Smaller padding and font */}
            <button className="bg-red-500 text-white px-3 py-1 rounded text-sm" onClick={handleRegisterTeamClick}>Register Team</button>
          </div>
        </div>
      </nav>

      <div className="bg-gray-800 text-white py-4 text-center flex items-center justify-center">
        {/* Replace with your ClockIcon component/image */}
        {/* <ClockIcon className="mr-2 animate-spin-slow" /> */}
        <div className="mr-2 animate-spin-slow">⏰</div>
        <div className="text-xl font-bold">
          {time.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default Navbar;