import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import SignOut from './SignOut';

const Navbar = () => {
  const user = useContext(UserContext)[0];
  return (
    <div id="navbar">
      <div id="navbar-title">
        <h1>Gamma Game-Tracker</h1>
      </div>
      { user && (
        <div id="navbar-buttons">
          <Link to="/confest-2021">
            Confest!
          </Link>
          <Link to="/">
            Leaderboard
          </Link>
          <Link to={`/profile/${user.userName}`}>
            My Profile
          </Link>
          <SignOut />
        </div>
      )}
    </div>
  );
};

export default Navbar;
