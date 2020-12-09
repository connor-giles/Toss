import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/config.js';

const Nav = () => {
  let [isLoggedIn, setIsLoggedIn] = useState(0);

  let handleLogin = () => {
    axios
      .get(config.DOMAIN.name + 'user/isLoggedIn', {
        withCredentials: true,
        credentials: 'include',
      })
      .then((response) => {
        setIsLoggedIn(response.data.isLoggedIn);
        console.log(response.data.isLoggedIn);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axios
      .get(config.DOMAIN.name + 'user/isLoggedIn', {
        withCredentials: true,
        credentials: 'include',
      })
      .then((response) => {
        setIsLoggedIn(response.data.isLoggedIn);
        console.log(response.data.isLoggedIn);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <nav>
      <div className="nav-tabs">
        <Link to="/" className="nav-links" onClick={handleLogin}>
          <li>HOME</li>
        </Link>
        <Link to="/about" className="nav-links" onClick={handleLogin}>
          <li>ABOUT</li>
        </Link>
        <Link to="/profile" className="nav-links" onClick={handleLogin}>
          <li>PROFILE</li>
        </Link>

        <li> | </li>

        {/* <Link to="/signin" className="nav-links">
          <li>SIGN IN</li>
        </Link> */}

        <Link to="/register" className="nav-links" onClick={handleLogin}>
          <li>REGISTER</li>
        </Link>

        <Link to="/quiz" className="nav-links" onClick={handleLogin}>
          <li>QUIZ</li>
        </Link>

        {isLoggedIn ? (
          <li>LOGGED IN</li>
        ) : (
          <Link to="/signin" className="nav-links" onClick={handleLogin}>
            <li>SIGN IN</li>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
