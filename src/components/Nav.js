import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <u1 className= "nav-tabs">
                <Link to ='/' className="nav-links">
                    <li>HOME</li>
                </Link>
                <li>ABOUT </li>
                <Link to ='/profile' className="nav-links">
                    <li>PROFILE</li>
                </Link>
            </u1>
        </nav>
    )
}

export default Nav;