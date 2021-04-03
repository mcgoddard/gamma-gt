import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getConfest } from '../utils/api';

const Confest = () => {
  const [topScorers, setTopScorers] = useState([]);
  const [mostPlayed, setMostPlayed] = useState([]);
  const [mostWon, setMostWon] = useState([]);
  useEffect(() => {
    getConfest().then(({ scorers, played, won }) => {
      setTopScorers(scorers);
      setMostPlayed(played);
      setMostWon(won);
    });
  }, []);
  return (
    <>
      <h1>Confest 2021</h1>
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
      <h2>Most games won</h2>
      {(mostWon.length > 0) && (
      <table>
        <thead>
          <tr>
            <th>Player name</th>
            <th>Games won</th>
          </tr>
        </thead>
        <tbody>
          {mostWon.map((player) => (
            <tr key={player.playerName}>
              <td>
                <Link to={`/profile/${player.playerName}`}>{player.playerName}</Link>
              </td>
              <td>{player.won}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      {(mostWon.length === 0) && (
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
              <td>{player.played}</td>
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

export default Confest;
