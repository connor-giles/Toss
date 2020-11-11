import React from 'react';
import '../css/Profile.css';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div className="profile">
      <h1 className="pageTitles">Profile</h1>
      <Link to="/settings" className="settings-link">
        <li>Profile Settings</li>
      </Link>
    </div>
  );
}

export default Profile;
