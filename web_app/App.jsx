import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import CreateGame from './pages/CreateGame';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import UserContext from './utils/UserContext';

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={user}>
      {!user && (
        <Login setUser={setUser} />
      )}
      {user && (
        <Router>
          <Navbar />
          <Switch>
            <Route path="/profile/:userName">
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
      )}
    </UserContext.Provider>
  );
};

export default App;
