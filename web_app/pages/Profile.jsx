import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGamesForPlayer } from '../utils/api';

const Profile = () => {
  const { userName } = useParams();
  const [games, setGames] = useState([]);
  const [loadedGames, setLoadedGames] = useState(false);
  useEffect(() => {
    getGamesForPlayer(userName).then((returnedGames) => {
      setGames(returnedGames);
      setLoadedGames(true);
    });
  }, []);

  return (
    <>
      <h1>{userName}</h1>
      <h2>Games</h2>
      <Link to="/create_game" className="button">
        Add game
      </Link>
      {loadedGames && (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Game time</th>
            <th>Winner(s)</th>
            <th>Other players</th>
            <th>Played</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={index}>
              <td>{game.gameName}</td>
              <td>{game.gameTime}</td>
              <td>{game.players.filter((p) => p.winner).map((p) => p.name).join(', ')}</td>
              <td>{game.players.filter((p) => !p.winner).map((p) => p.name).join(', ')}</td>
              <td>{game.timePlayed}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      {!loadedGames && (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Profile;
