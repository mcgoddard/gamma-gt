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
import SignIn from './pages/SignIn';
import Confest from './pages/Confest';
import Navbar from './components/Navbar';
import UserContext from './utils/UserContext';

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <UserContext.Provider value={[user, setUser]}>
        <Navbar />
        {!user && (
          <SignIn />
        )}
        {user && !user.userName && (
          <Login />
        )}
        {user && user.userName && (
          <Switch>
            <Route path="/profile/:userName">
              <Profile />
            </Route>
            <Route path="/create_game">
              <CreateGame />
            </Route>
            <Route path="/confest-2021">
              <Confest />
            </Route>
            <Route path="/">
              <Leaderboard />
            </Route>
          </Switch>
        )}
      </UserContext.Provider>
    </Router>
  );
};

export default App;
