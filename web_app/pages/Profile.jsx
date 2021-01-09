import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
      <p>This is a users profile.</p>
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
          {games.map((game) => (
            <tr>
              <td>{game.name}</td>
              <td>{game.time_played}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      {!loadedGames && (
        <p>Loading</p>
      )}
    </>
  );
};

export default Profile;
