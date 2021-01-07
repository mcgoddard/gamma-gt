const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'prod') {
  app.listen(port, () => {
    console.log(`api listening at port ${port} on ${process.env.NODE_ENV}`);
  });
}

module.exports = { app };
