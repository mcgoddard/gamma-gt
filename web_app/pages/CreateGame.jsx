/* eslint-disable react/jsx-no-bind */
import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router';
import AddGameName from '../components/AddGameName';
import AddGamePlayer from '../components/AddGamePlayer';
import { addGame, getPlayerNames } from '../utils/api';
import UserContext from '../utils/UserContext';

const numeric = /^[0-9.]+$/;

const CreateGame = withRouter(({ history }) => {
  const [user] = useContext(UserContext);
  const [playerNames, setPlayerNames] = useState([]);
  const [players, setPlayers] = useState([{
    name: user.userName,
    winner: false,
    editable: false,
  }]);
  const [name, setName] = useState('');
  const [gameTime, setGameTime] = useState(0);
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    const populatePlayers = async () => {
      const retreivedNames = await getPlayerNames();
      setPlayerNames(retreivedNames);
    };
    populatePlayers();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    const newErrors = [];
    if (players.length < 2) {
      newErrors.push('You must have at least 2 players.');
    }
    if (gameTime < 1 || gameTime > 1440) {
      newErrors.push('Game time must be between 1 and 1440 minutes.');
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
      setSubmitting(true);
      addGame(user.userName, {
        gameTime,
        gameName: name,
        players,
      }, user.token).then(() => {
        history.push(`/profile/${user.userName}`);
      }).catch((error) => {
        const messages = [];
        if (error?.response?.data?.error) {
          messages.push(error.response.data.error);
        } else {
          messages.push('Something went wrong!');
        }
        setErrors(messages);
        setSubmitting(false);
      });
    }
  };
  const changeGameTime = (event) => {
    if (event.target.value.match(numeric)) {
      setGameTime(event.target.value);
    }
  };
  const changeGameName = (_event, { newValue }) => {
    if (typeof newValue === 'string') {
      setName(newValue);
    } else {
      setName(newValue.name);
      const minPlaytime = parseInt(newValue.minplaytime, 10);
      const maxPlaytime = parseInt(newValue.maxplaytime, 10);
      const averageGameTime = (minPlaytime + maxPlaytime) / 2.0;
      setGameTime(averageGameTime);
    }
  };
  const addRow = (event) => {
    event.preventDefault();
    const newPlayers = [...players, {
      name: '',
      winner: false,
      editable: true,
    }];
    setPlayers(newPlayers);
  };
  const removeRow = (index, event) => {
    event.preventDefault();
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
  };
  const changePlayerName = (index, _event, { newValue }) => {
    const newPlayers = [...players];
    newPlayers[index].name = newValue;
    setPlayers(newPlayers);
  };
  const changePlayerWinner = (index, event) => {
    const newPlayers = [...players];
    newPlayers[index].winner = event.target.value;
    setPlayers(newPlayers);
  };
  if (submitting) {
    return (<p>Loading...</p>);
  }
  return (
    <>
      <h1>Create a game</h1>
      <p>Fill out the form to add a game to the tracker.</p>
      <p>You can add any game that you&apos;ve played with at least one other user of this site.</p>
      <p>
        &quot;Game time&quot; should be the play time listed on the box (in minutes).
        If a range is given average those times.
        If no time is given take the average from Board Game Geek.
      </p>
      {errors && (
        errors.map((e) => (
          <p key={e} className="error">{e}</p>
        ))
      )}
      <form action="#">
        <div>
          <label htmlFor="name">
            <p>Game name:</p>
            <AddGameName
              gameName={name}
              changeGameName={changeGameName}
            />
          </label>
        </div>
        <div>
          <label htmlFor="gameTime">
            <p>Game time:</p>
            <input type="number" value={gameTime} onChange={changeGameTime} min="0" max="1440" step="any" />
          </label>
        </div>
        <p>Players</p>
        {players.map((player, index) => (
          <AddGamePlayer
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            player={player}
            changePlayerName={changePlayerName.bind(null, index)}
            changePlayerWinner={changePlayerWinner.bind(null, index)}
            removeRow={removeRow.bind(null, index)}
            playerNames={playerNames}
          />
        ))}
        <input className="button" type="submit" onClick={addRow} value="+" />
        <input className="button" type="submit" onClick={submit} value="Submit" />
      </form>
    </>
  );
});

export default CreateGame;
