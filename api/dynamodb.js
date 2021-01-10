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

const profile = {
  user: {
    handle: 'The High Ground',
    name: 'Matt Raymond',
    joinDate: '2021-01-09',
  },
  games: [{
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
    name: 'Seven Wonders',
    players: [
      {
        name: 'TheHighGround',
        winner: false,
      },
      {
        name: 'HermitCrab',
        winner: false,
      },
      {
        name: 'Queez',
        winner: true,
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
  }],

};

const getProfile = async (playerName) => {
  console.log(playerName);
  return profile;
};

const addGame = async (game) => games.push(game);

module.exports = {
  getTopScorers,
  getMostGamesPlayed,
  getGamesForPlayer,
  addGame,
  getProfile,
};
