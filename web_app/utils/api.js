import Axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'https://gamma-gt-api.mgoddard.net';

const getConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getTopScorers = async () => {
  const scorers = await Axios.get(`${BASE_URL}/top_scorers`);
  return scorers.data;
};

export const getMostGamesPlayed = async () => {
  const players = await Axios.get(`${BASE_URL}/most_games_played`);
  return players.data;
};

export const getGamesForPlayer = async (userName) => {
  const games = await Axios.get(`${BASE_URL}/player/${userName}/games`);
  if (games.status < 300) {
    return games.data;
  }
  return [];
};

export const addGame = async (playerName, game, token) => {
  await Axios.post(`${BASE_URL}/player/${playerName}/games`, game, getConfig(token));
};

export const getUserForEmail = async (email, token) => {
  const result = await Axios.get(`${BASE_URL}/user?email=${email}`, getConfig(token));
  return result.data;
};

export const setUserForEmail = async (user, token) => {
  const response = await Axios.post(`${BASE_URL}/user`, user, getConfig(token)).catch((error) => error.response);
  return response.data;
};

export const getPlayerNames = async () => {
  const response = await Axios.get(`${BASE_URL}/players`);
  return response.data;
};

export const getConfest = async () => {
  const response = await Axios.get(`${BASE_URL}/confest-2021`);
  const playerObjects = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(response.data)) {
    playerObjects.push({
      ...value,
      playerName: key,
    });
  }
  const scorers = [...playerObjects].sort((a, b) => b.score - a.score);
  const played = [...playerObjects].sort((a, b) => b.played - a.played);
  const won = [...playerObjects].sort((a, b) => b.won - a.won);
  return { scorers, played, won };
};
