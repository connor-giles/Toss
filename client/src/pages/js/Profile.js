import React from 'react';
import '../css/Profile.css';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    // <div className="profile">
    //   <h1 className="pageTitles">Profile</h1>
      // <Link to="/settings" className="settings-link">
      //   <li>Profile Settings</li>
      // </Link>
    // </div>

    <div>
      <div style={{
        display:"flex",
        justifyContent:"space-around",
        margin:"50px 0px"
      }}>
        <div>
          <img style={{width:"300px", height:"300px", borderRadius:"150px"}}
          src="https://images.unsplash.com/photo-1584400412929-58a7735a0efb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1433&q=80"
          />
        </div>
        <div>
          <h4>Profile Name Here</h4>
        </div>
      </div>
    </div>




  );
}

export default Profile;
