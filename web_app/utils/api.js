import Axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'https://gamma-gt-api.mgoddard.net';

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

export const addGame = async (playerName, game) => {
  await Axios.post(`${BASE_URL}/player/${playerName}/games`, game);
};

export const getUserForEmail = async (email) => {
  const result = await Axios.get(`${BASE_URL}/user?email=${email}`);
  return result.data;
};

export const setUserForEmail = async (user) => (await Axios.post(`${BASE_URL}/user`, user).catch((error) => error.response)).data;
