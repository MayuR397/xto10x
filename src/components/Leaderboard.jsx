import React from 'react';
import './Leaderboard.css';
import AssistPanel from './AssistPanel';

function Leaderboard() {
  const generateLeaderboardData = () => {
    const data = [];
    for (let i = 1; i <= 10; i++) {
      data.push({
        id: i,
        team: `Team ${i}`,
        streak: Math.floor(Math.random() * 20),
        rank: i,
      });
    }
    return data
      .sort((a, b) => b.streak - a.streak)
      .map((item, index) => ({ ...item, rank: index + 1 }));
  };

  const leaderboardData = generateLeaderboardData();

  return (
    <div>
      <div className="leaderboard">
      <h2 className="leaderboard-title"> Leaderboard </h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th className="leaderboard-header">🏆 Rank</th>
            <th className="leaderboard-header">👥 Team</th>
            <th className="leaderboard-header">🔥 Streak</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((team) => (
            <tr key={team.id} className="leaderboard-row">
              <td className="leaderboard-cell">{team.rank}</td>
              <td className="leaderboard-cell">{team.team}</td>
              <td className="leaderboard-cell">{team.streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{marginTop:"80px"}}>
    <AssistPanel/>
    </div>
    </div>
    
  );
}

export default Leaderboard;