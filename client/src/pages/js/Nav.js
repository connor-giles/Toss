import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <div className="nav-tabs">
        <Link to="/" className="nav-links">
          <li>HOME</li>
        </Link>
        <li>ABOUT </li>
        <Link to="/profile" className="nav-links">
          <li>PROFILE</li>
        </Link>

        <li> | </li>

        <Link to="/signin" className="nav-links">
          <li>SIGN IN</li>
        </Link>

        <Link to="/register" className="nav-links">
          <li>REGISTER</li>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
