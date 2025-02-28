import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css'; // Make sure to update your CSS file

function Navbar() {
  const [time, setTime] = useState(new Date());
  const tagline = "Code, Collaborate, Conquer!";

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

          {/* Wrap buttons in Link components */}
          <div className="flex space-x-2">
            <Link to="/select-team">
              <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Select Team</button>
            </Link>
            <Link to="/register-team">
              <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Register Team</button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="bg-gray-800 text-white py-4 text-center flex items-center justify-center">
        <div className="mr-2 animate-spin-slow">⏰</div>
        <div className="text-xl font-bold">
          {time.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
