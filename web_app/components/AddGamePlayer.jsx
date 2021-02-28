import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const AddGamePlayer = ({
  player, changePlayerName, changePlayerWinner, removeRow, playerNames,
}) => {
  const [suggestions, setSuggestions] = useState([]);

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

  const inputProps = {
    placeholder: 'Player name',
    value: player.name,
    onChange: changePlayerName,
    readOnly: !player.editable,
  };
  return (
    // eslint-disable-next-line react/no-array-index-key
    <div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      Win?
      <input type="checkbox" value={player.winner} onChange={changePlayerWinner} />
      {player.editable && (
        <input className="button" type="submit" onClick={removeRow} value="-" />
      )}
    </div>
  );
};

export default AddGamePlayer;
