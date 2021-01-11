import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGamesForPlayer } from '../utils/api';

const Profile = () => {
  const { username } = useParams();
  const [games, setGames] = useState([]);
  const [loadedGames, setLoadedGames] = useState(false);
  useEffect(() => {
    getGamesForPlayer(username).then((returnedGames) => {
      setGames(returnedGames);
      setLoadedGames(true);
    });
  }, []);

  return (
    <>
      <h1>{username}</h1>
      <h2>Games</h2>
      {loadedGames && (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Played</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={index}>
              <td>{game.name}</td>
              <td>{game.timePlayed}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      {!loadedGames && (
        <p>Loading</p>
      )}
      <Link to="/create_game" className="button">
        Add game
      </Link>
    </>
  );
};

export default Profile;
