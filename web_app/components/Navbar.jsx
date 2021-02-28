import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import SignOut from './SignOut';

const Navbar = () => {
  const user = useContext(UserContext)[0];
  return (
    <div className="navbar">
      <Link to="/">
        Leaderboard
      </Link>
      <Link to={`/profile/${user.userName}`}>
        My Profile
      </Link>
      <SignOut />
    </div>
  );
};

export default Navbar;
