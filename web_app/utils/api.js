import Axios from 'axios';

export const getTopScorers = async () => {
  const scorers = await Axios.get('http://localhost:3000/top_scorers');
  return scorers.data;
};

export const getMostGamesPlayed = async () => {
  const players = await Axios.get('http://localhost:3000/most_games_played');
  return players.data;
};

export const getGamesForPlayer = async (username) => {
  const games = await Axios.get(`http://localhost:3000/player/${username}/games`);
  if (games.status < 300) {
    return games.data;
  }
  return [];
};

export const addGame = async (game) => {};
