import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../utils/UserContext';

const Navbar = () => {
  const user = useContext(UserContext);
  return (
    <div className="navbar">
      <Link to="/">
        Leaderboard
      </Link>
      <Link to={`/profile/${user.userName}`}>
        My Profile
      </Link>
    </div>
  );
};

export default Navbar;
