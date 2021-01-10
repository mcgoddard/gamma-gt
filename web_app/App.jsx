import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import CreateGame from './pages/CreateGame';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

const App = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route path="/profile/:username">
        <Profile />
      </Route>
      <Route path="/create_game">
        <CreateGame />
      </Route>
      <Route path="/">
        <Leaderboard />
      </Route>
    </Switch>
  </Router>
);

export default App;
