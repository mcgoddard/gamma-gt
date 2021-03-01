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
  return result.Items.map((p) => {
    const player = { ...p };
    delete player.sortKey;
    return player;
  });
};

const getMostGamesPlayed = async () => {
  const params = {
    ExpressionAttributeValues: {
      ':s': 'PLAYER',
    },
    KeyConditionExpression: 'sortKey = :s',
    TableName: 'gamma-gt',
    IndexName: 'MostPlayed',
    ScanIndexForward: false,
    Limit: 10,
  };

  const result = await docClient.query(params).promise();
  return result.Items.map((p) => {
    const player = { ...p };
    delete player.sortKey;
    return player;
  });
};

const getGamesForPlayer = async (playerName) => {
  const params = {
    ExpressionAttributeValues: {
      ':p': playerName,
      ':sk': 'PLAYER',
    },
    KeyConditionExpression: 'playerName = :p and sortKey < :sk',
    TableName: 'gamma-gt',
    ScanIndexForward: false,
  };

  const result = await docClient.query(params).promise();
  return result.Items.map((g) => {
    const game = { ...g };
    game.timePlayed = game.sortKey;
    delete game.sortKey;
    return game;
  });
};

const getProfile = async (playerName) => {
  const params = {
    ExpressionAttributeValues: {
      ':p': playerName,
    },
    KeyConditionExpression: 'playerName = :p and sortKey = \'PLAYER\'',
    TableName: 'gamma-gt',
    ScanIndexForward: false,
  };

  const result = await docClient.query(params).promise();
  return result.Items.map((p) => {
    const player = { ...p };
    delete player.sortKey;
    return player;
  });
};

const getPlayerNames = async () => {
  const params = {
    ExpressionAttributeValues: {
      ':s': 'PLAYER',
    },
    KeyConditionExpression: 'sortKey = :s',
    TableName: 'gamma-gt',
    IndexName: 'MostPlayed',
    ScanIndexForward: false,
  };

  const result = await docClient.query(params).promise();
  return result.Items.map((p) => p.playerName);
};

const addGame = async ({
  gameName, gameTime, timePlayed, players,
}) => {
  if (players.length > 12) {
    throw new Error('Maximum number of players in the game is 12');
  }
  const game = {
    gameName, gameTime, players, sortKey: timePlayed,
  };
  const params = {
    TransactItems: [
      ...players.map((p) => ({
        Put: {
          TableName: 'gamma-gt',
          Item: { playerName: p.name, ...game },
        },
      })),
      ...players.map((p) => {
        const updateScore = p.winner ? ', score = score + :gameTime, wins = wins + :one' : '';
        const expressionAttributeValues = {
          ':one': 1,
        };
        if (p.winner) {
          expressionAttributeValues[':gameTime'] = gameTime;
        }
        return {
          Update: {
            TableName: 'gamma-gt',
            Key: {
              playerName: p.name,
              sortKey: 'PLAYER',
            },
            UpdateExpression: `SET gamesPlayed = gamesPlayed + :one${updateScore}`,
            ExpressionAttributeValues: expressionAttributeValues,
          },
        };
      }),
    ],
  };
  await docClient.transactWrite(params).promise();
};

const getUserForEmail = async (email) => {
  const params = {
    ExpressionAttributeValues: {
      ':p': email,
    },
    KeyConditionExpression: 'playerName = :p',
    TableName: 'gamma-gt',
    ScanIndexForward: false,
  };

  const result = await docClient.query(params).promise();
  if (result.Items && result.Items.length === 1) {
    return result.Items.map((p) => {
      const player = { ...p, userName: p.sortKey };
      delete player.sortKey;
      return player;
    })[0];
  }
  return null;
};

const setUserForEmail = async ({ userName, email }) => {
  await docClient.transactWrite({
    TransactItems: [
      {
        Put: {
          TableName: 'gamma-gt',
          Item: {
            playerName: email,
            sortKey: userName,
            allowListed: false,
          },
          ConditionExpression: 'attribute_not_exists(playerName)',
        },
      },
      {
        Put: {
          TableName: 'gamma-gt',
          Item: {
            playerName: userName,
            sortKey: 'PLAYER',
            gamesPlayed: 0,
            joinedAt: new Date().toISOString(),
            score: 0,
            wins: 0,
          },
          ConditionExpression: 'attribute_not_exists(playerName)',
        },
      },
    ],
  }).promise();
};

module.exports = {
  getTopScorers,
  getMostGamesPlayed,
  getGamesForPlayer,
  getProfile,
  addGame,
  getUserForEmail,
  setUserForEmail,
  getPlayerNames,
};
