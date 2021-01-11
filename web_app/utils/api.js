import Axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const getTopScorers = async () => {
  const scorers = await Axios.get(`${BASE_URL}/top_scorers`);
  return scorers.data;
};

export const getMostGamesPlayed = async () => {
  const players = await Axios.get(`${BASE_URL}/most_games_played`);
  return players.data;
};

export const getGamesForPlayer = async (username) => {
  const games = await Axios.get(`${BASE_URL}/player/${username}/games`);
  if (games.status < 300) {
    return games.data;
  }
  return [];
};

export const addGame = async (playerName, game) => {
  await Axios.post(`${BASE_URL}/player/${playerName}/games`, game);
};
