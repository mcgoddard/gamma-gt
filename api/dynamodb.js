const getTopScorers = async () => [
  {
    name: 'The High Ground',
    score: 1234,
  },
  {
    name: 'HermitCrab',
    score: 1225,
  },
  {
    name: 'MrsHermitCrab',
    score: 1100,
  },
  {
    name: 'Queez',
    score: 10,
  },
];

const getMostGamesPlayed = async () => [
  {
    name: 'The High Ground',
    gamesPlayed: 10,
  },
  {
    name: 'HermitCrab',
    gamesPlayed: 6,
  },
  {
    name: 'MrsHermitCrab',
    gamesPlayed: 7,
  },
  {
    name: 'Queez',
    gamesPlayed: 2,
  },
];

const games = [
  {
    name: 'Seven Wonders',
    players: [
      {
        name: 'TheHighGround',
        winner: true,
      },
      {
        name: 'MrsHermitCrab',
        winner: false,
      },
    ],
    gameTime: 45,
    timePlayed: new Date().toISOString(),
  },
  {
    name: 'Between Two Cities',
    players: [
      {
        name: 'TheHighGround',
        winner: true,
      },
      {
        name: 'MrsHermitCrab',
        winner: true,
      },
      {
        name: 'HermitCrab',
        winner: false,
      },
      {
        name: 'Queez',
        winner: false,
      },
    ],
    gameTime: 45,
    timePlayed: new Date().toISOString(),
  },
];

// eslint-disable-next-line no-unused-vars
const getGamesForPlayer = async (_playerName) => games;

const addGame = async (game) => games.push(game);

module.exports = {
  getTopScorers,
  getMostGamesPlayed,
  getGamesForPlayer,
  addGame,
};
