import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router';
import Autosuggest from 'react-autosuggest';
import { addGame, getPlayerNames } from '../utils/api';
import UserContext from '../utils/UserContext';

const CreateGame = withRouter(({ history }) => {
  const [user] = useContext(UserContext);
  const [playerNames, setPlayerNames] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [players, setPlayers] = useState([{
    name: user.userName,
    winner: false,
    editable: false,
  }]);
  const [name, setName] = useState('');
  const [gameTime, setGameTime] = useState(0);
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    const populatePlayers = async () => {
      const retreivedNames = await getPlayerNames();
      setPlayerNames(retreivedNames);
    };
    populatePlayers();
  }, []);
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : playerNames.filter(
      (n) => n.toLowerCase().slice(0, inputLength) === inputValue,
    );
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (<>{suggestion}</>);

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const submit = async (event) => {
    event.preventDefault();
    const newErrors = [];
    if (players.length < 2) {
      newErrors.push('You must have at least 2 players.');
    }
    if (gameTime <= 0 || gameTime > 1440) {
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
      await addGame(user.userName, {
        gameTime,
        gameName: name,
        players,
      }, user.token);
      history.push(`/profile/${user.userName}`);
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
  const changePlayerName = (index, _event, info) => {
    const newPlayers = [...players];
    newPlayers[index].name = info.newValue;
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
      <p>
        Game time should be the play time listed on the box.
        If a range is given average those times.
        If no time is given take the average from Board Game Geek.
      </p>
      {errors && (
        errors.map((e) => (
          <p key={e}>{e}</p>
        ))
      )}
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
        {players.map((player, index) => {
          const inputProps = {
            placeholder: 'Player name',
            value: player.name,
            onChange: changePlayerName.bind(null, index),
            readOnly: !player.editable,
          };
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
              Win?
              <input type="checkbox" value={player.winner} onChange={changePlayerWinner.bind(null, index)} />
              {player.editable && (
                <input className="button" type="submit" onClick={removeRow.bind(null, index)} value="-" />
              )}
            </div>
          );
        })}
        <input className="button" type="submit" onClick={addRow} value="+" />
        <input className="button" type="submit" onClick={submit} value="Submit" />
      </form>
    </>
  );
});

export default CreateGame;
