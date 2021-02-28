import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMostGamesPlayed, getTopScorers } from '../utils/api';

const Leaderboard = () => {
  const [topScorers, setTopScorers] = useState([]);
  const [mostPlayed, setMostPlayed] = useState([]);
  useEffect(() => {
    getTopScorers().then((scorers) => {
      setTopScorers(scorers);
    });
  }, []);
  useEffect(() => {
    getMostGamesPlayed().then((players) => {
      setMostPlayed(players);
    });
  }, []);
  return (
    <>
      <h1>Leaderboard</h1>
      <p>See some stats about the games that have been played!</p>
      <h2>Top Scorers</h2>
      {(topScorers.length > 0) && (
      <table>
        <thead>
          <tr>
            <th>Player name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {topScorers.map((scorer) => (
            <tr key={scorer.playerName}>
              <td>
                <Link to={`/profile/${scorer.playerName}`}>{scorer.playerName}</Link>
              </td>
              <td>{scorer.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      {(topScorers.length === 0) && (
        <p>Loading...</p>
      )}
      <h2>Most games played</h2>
      {(mostPlayed.length > 0) && (
      <table>
        <thead>
          <tr>
            <th>Player name</th>
            <th>Games played</th>
          </tr>
        </thead>
        <tbody>
          {mostPlayed.map((player) => (
            <tr key={player.playerName}>
              <td>
                <Link to={`/profile/${player.playerName}`}>{player.playerName}</Link>
              </td>
              <td>{player.gamesPlayed}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      {(mostPlayed.length === 0) && (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Leaderboard;
