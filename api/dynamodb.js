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
    games_played: 10,
  },
  {
    name: 'HermitCrab',
    games_played: 6,
  },
  {
    name: 'MrsHermitCrab',
    games_played: 7,
  },
  {
    name: 'Queez',
    games_played: 2,
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
    game_time: 45,
    time_played: new Date().toISOString(),
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
    game_time: 45,
    time_played: new Date().toISOString(),
  },
];

const getGamesForPlayer = async (playerName) => {
  return games;
};

const addGame = async (game) => games.push(game);

module.exports = {
  getTopScorers,
  getMostGamesPlayed,
  getGamesForPlayer,
  addGame,
};
