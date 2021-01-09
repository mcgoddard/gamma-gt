import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <div className="navbar">
    <Link to="/">
      Leaderboard
    </Link>
    <Link to="/profile/The High Ground">
      My Profile
    </Link>
  </div>
);

export default Navbar;
