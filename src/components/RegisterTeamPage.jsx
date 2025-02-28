import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const RegisterTeamPage = () => {
  const navigate = useNavigate();
  const [teamData, setTeamData] = useState({
    teamName: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setTeamData({
      ...teamData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {

      const userId = localStorage.getItem('userId');
      
      const teamPayload = {
        teamName: teamData.teamName,
        createdBy: userId
      };
      
      const response = await fetch(`http://localhost:5009/team/create-team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamPayload)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create team');
      }
      
      const result = await response.json();
      alert('Team created successfully!');
      navigate(-1); // Navigate to dashboard or wherever appropriate
      
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register New Team</h2>
      
      {error && (
        <div className="bg-red-500 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="teamName" className="block text-gray-700 text-sm font-bold mb-2">
            Team Name
          </label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            value={teamData.teamName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Team'}
          </button>
        </div>
      </form>
    </div>
  );
};

export {RegisterTeamPage };