import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/config.js';

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(0);

  useEffect(() => {
    axios
      .get(config.DOMAIN.name + 'user/isLoggedIn')
      .then((response) => {
          setIsLoggedIn(response.data);
          console.log(isLoggedIn);
        })
      .catch((error) => console.error(error));
  }, []);

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

        {/* <Link to="/signin" className="nav-links">
          <li>SIGN IN</li>
        </Link> */}

        <Link to="/register" className="nav-links">
          <li>REGISTER</li>
        </Link>

        <Link to="/quiz" className="nav-links">
          <li>QUIZ</li>
        </Link>

        { isLoggedIn
        ? <li>SIGN OUT</li>
        : <Link to="/signin" className="nav-links">
           <li>SIGN IN</li>
          </Link> 
        }


      </div>
    </nav>
  );
}

export default Nav;
