import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import games from '../utils/games';

const AddGameName = ({
  gameName, changeGameName,
}) => {
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : games.filter(
      (g) => g.name.toLowerCase().slice(0, inputLength) === inputValue,
    ).slice(0, 10);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (<>{suggestion.name}</>);

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: 'Game name',
    value: gameName,
    onChange: changeGameName,
  };
  return (
    // eslint-disable-next-line react/no-array-index-key
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default AddGameName;
