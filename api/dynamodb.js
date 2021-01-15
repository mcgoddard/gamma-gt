// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: 'eu-west-2' });

// Create DynamoDB document client
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const getTopScorers = async () => {
  const params = {
    ExpressionAttributeValues: {
      ':s': 'PLAYER',
    },
    KeyConditionExpression: 'sortKey = :s',
    TableName: 'gamma-gt',
    IndexName: 'HighScores',
    ScanIndexForward: false,
    Limit: 10,
  };

  const result = await docClient.query(params).promise();
  return result.Items;
};

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
    gameTime: 45,
    timePlayed: new Date().toISOString(),
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
  }],

};

const getProfile = async (_playerName) => profile;

const addGame = async (game) => games.push(game);

module.exports = {
  getTopScorers,
  getMostGamesPlayed,
  getGamesForPlayer,
  addGame,
  getProfile,
};
