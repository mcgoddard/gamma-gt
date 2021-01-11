const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({ origin: true }));
app.use(express.json());

const {
  getTopScorers,
  getMostGamesPlayed,
  getGamesForPlayer,
  addGame,
  getProfile,
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

app.post('/player/:playerName/games', async (req, res) => {
  const { playerName } = req.params;
  const game = req.body;
  game.timePlayed = new Date().toISOString();
  if (!game.players.some((player) => player.name === playerName)) {
    res.status(400);
    res.json({ error: 'Player is not in the game' });
    return;
  }
  if (game.gameTime < 0 || game.gameTime > 1440) {
    res.status(400);
    res.json({ error: 'Game time must be between 0 and 1440 minutes' });
    return;
  }
  await addGame(game);
  res.sendStatus(200);
});

if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'prod') {
  app.listen(port, () => {
    console.log(`api listening at port ${port} on ${process.env.NODE_ENV}`);
  });
}

module.exports = { app };
