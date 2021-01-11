import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { addGame } from '../utils/api';

const CreateGame = withRouter(({ history }) => {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [gameTime, setGameTime] = useState(0);
  const [errors, setErrors] = useState([]);
  const submit = async (event) => {
    event.preventDefault();
    const newErrors = [];
    if (players.length < 2) {
      newErrors.push('You must have at least 2 players.');
    }
    if (gameTime <= 0 || gameTime > 1440) {
      newErrors.push('Game time must be between.');
    }
    if (name === '') {
      newErrors.push('You must provide a game name.');
    }
    if (players.some((player) => player.name === '')) {
      newErrors.push('All players must have a name.');
    }
    if (newErrors.length > 0) {
      setErrors(newErrors);
    } else {
      await addGame('TheHighGround', {
        gameTime,
        name,
        players,
      });
      history.push('/profile/TheHighGround');
    }
  };
  const changeGameTime = (event) => {
    setGameTime(event.target.value);
  };
  const changeGameName = (event) => {
    setName(event.target.value);
  };
  const addRow = (event) => {
    event.preventDefault();
    const newPlayers = [...players, {
      name: '',
      winner: false,
    }];
    setPlayers(newPlayers);
  };
  const removeRow = (index, event) => {
    event.preventDefault();
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
  };
  const changePlayerName = (index, event) => {
    const newPlayers = [...players];
    newPlayers[index].name = event.target.value;
    setPlayers(newPlayers);
  };
  const changePlayerWinner = (index, event) => {
    const newPlayers = [...players];
    newPlayers[index].winner = event.target.value;
    setPlayers(newPlayers);
  };
  return (
    <>
      <h1>Create a game</h1>
      <p>Fill out the form to add a game to the tracker.</p>
      <form action="#">
        <div>
          <label htmlFor="name">
            <span>Game name: </span>
            <input type="text" name="name" id="name" value={name} onChange={changeGameName} />
          </label>
        </div>
        <div>
          <label htmlFor="gameTime">
            <span>Game time: </span>
            <input type="number" value={gameTime} onChange={changeGameTime} min="0" max="1440" />
          </label>
        </div>
        {players.map((player, index) => (
          <div>
            <input type="text" value={player.name} onChange={changePlayerName.bind(null, index)} />
            <input type="checkbox" value={player.winner} onChange={changePlayerWinner.bind(null, index)} />
            <input className="button" type="submit" onClick={removeRow.bind(null, index)} value="-" />
          </div>
        ))}
        <input className="button" type="submit" onClick={addRow} value="+" />
        <input className="button" type="submit" onClick={submit} value="Submit" />
      </form>
    </>
  );
});

export default CreateGame;
