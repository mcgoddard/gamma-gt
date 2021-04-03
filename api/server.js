/* eslint-disable guard-for-in */
const express = require('express');
const cors = require('cors');
const { verifyEmail, googleAuth } = require('./auth');

const app = express();
const port = 3000;

const alphanumeric = /^[0-9a-zA-Z]+$/;

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
}));
app.use(express.json());

const {
  getTopScorers,
  getMostGamesPlayed,
  getGamesForPlayer,
  addGame,
  getProfile,
  getUserForEmail,
  setUserForEmail,
  getPlayerNames,
} = require('./dynamodb');

app.get('/top_scorers', async (req, res) => {
  const scorers = await getTopScorers();
  res.json(scorers);
});

app.get('/most_games_played', async (req, res) => {
  const gamesPlayed = await getMostGamesPlayed();
  res.json(gamesPlayed);
});

app.get('/player/:playerName/games', async (req, res) => {
  const { playerName } = req.params;
  const games = await getGamesForPlayer(playerName);
  res.json(games);
});

app.get('/player/:playerName/profile', async (req, res) => {
  const { playerName } = req.params;
  const profile = await getProfile(playerName);
  res.json(profile);
});

app.get('/players', async (req, res) => {
  const playerNames = await getPlayerNames();
  res.json(playerNames);
});

app.post('/player/:playerName/games', async (req, res) => {
  const token = (req.headers.authorization || '').replace(/^(Bearer )/, '');
  let tokenEmail = '';
  try {
    tokenEmail = await googleAuth(token);
  } catch (error) {
    console.log(error);
    res.status(403);
    res.json({ error: 'Invalid token for request' });
    return;
  }
  const user = await getUserForEmail(tokenEmail);
  const { playerName } = req.params;
  if (user.userName !== playerName) {
    res.status(403);
    res.json({ error: 'Invalid token for request' });
    return;
  }
  if (!user.allowListed) {
    res.status(403);
    res.json({ error: 'Your account is not currently approved, please message Mike to be verified' });
    return;
  }
  const game = req.body;
  game.timePlayed = new Date().toISOString();
  if (!game.players.some((player) => player.name === playerName)) {
    res.status(400);
    res.json({ error: 'Player is not in the game' });
    return;
  }
  const parsedTime = Number.parseFloat(game.gameTime, 10);
  if (Number.isNaN(parsedTime)) {
    res.status(400);
    res.json({ error: 'Game time must be a valid integer' });
  }
  if (parsedTime < 0 || parsedTime > 1440) {
    res.status(400);
    res.json({ error: 'Game time must be between 0 and 1440 minutes' });
    return;
  }
  game.gameTime = parsedTime;
  await addGame(game);
  res.sendStatus(200);
});

app.get('/confest-2021', async (req, res) => {
  const playerNames = await getPlayerNames();
  const gamePromises = playerNames.map((player) => getGamesForPlayer(player));
  const games = (await Promise.all(gamePromises)).reduce((acc, cur) => {
    acc.push(...cur);
    return acc;
  }, []);
  const filtered = games.filter((game) => game.timePlayed.startsWith('2021-04-03') || game.timePlayed.startsWith('2021-04-04'));
  const deduped = filtered.reduce((acc, cur) => {
    if (!(cur.timePlayed in acc)) {
      acc[cur.timePlayed] = cur;
    }
    return acc;
  }, {});
  const scoreboard = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const item in deduped) {
    const cur = deduped[item];
    // eslint-disable-next-line no-restricted-syntax
    cur.players.forEach((player) => {
      if (player.name in scoreboard) {
        scoreboard[player.name].played += 1;
        if (player.winner) {
          scoreboard[player.name].won += 1;
          scoreboard[player.name].score += cur.gameTime;
        }
      } else {
        scoreboard[player.name] = {
          played: 1,
          won: player.winner ? 1 : 0,
          score: player.winner ? cur.gameTime : 0,
        };
      }
    });
  }
  res.json(scoreboard);
});

app.get('/user', async (req, res) => {
  const email = req.query.email || null;
  const token = (req.headers.authorization || '').replace(/^(Bearer )/, '');
  const emailVerified = await verifyEmail(email, token);
  if (!emailVerified) {
    res.status(403);
    res.json({ error: 'Invalid token for request' });
    return;
  }
  if (!email) {
    res.status(400);
    res.json({ error: 'You must provide an email' });
    return;
  }
  const userName = await getUserForEmail(email);
  res.json(userName);
});

app.post('/user', async (req, res) => {
  const user = req.body;
  const token = (req.headers.authorization || '').replace(/^(Bearer )/, '');
  const emailVerified = await verifyEmail(user.email, token);
  if (!emailVerified) {
    res.status(403);
    res.json({ error: 'Invalid token for request' });
    return;
  }
  if (!user.userName || !user.userName.match(alphanumeric)) {
    res.status(400);
    res.json({ error: 'You must provide a valid username' });
    return;
  }
  if (!user.email) {
    res.status(400);
    res.json({ error: 'You must provide an email adress' });
    return;
  }
  try {
    await setUserForEmail(user);
    res.sendStatus(200);
  } catch (err) {
    res.status(400);
    res.json({ error: 'Username is already taken' });
  }
});

if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'prod') {
  app.listen(port, () => {
    console.log(`api listening at port ${port} on ${process.env.NODE_ENV}`);
  });
}

module.exports = { app };
