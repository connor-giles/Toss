import React from 'react';
import '../css/Profile.css';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

function Profile() {
  return (

      <div className="profile">

        <div className="profile-landing">
          <div className="profile-info">
           <img style={{width:"120px", height:"120px", borderRadius:"150px"}}
              src="https://images.unsplash.com/photo-1584400412929-58a7735a0efb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1433&q=80"/>
              <Typography>Profile Name Here</Typography>
          </div>
        </div>

        <div className="info">
          <div className="stats-container">
            <h2>Stats title</h2>
            <div className="graph-api">
              <Typography>Graph API here</Typography>
            </div>
          </div>
          <div className="history-container">
             <h2>Previous tosses</h2>
             <div className="toss-data">
               <Typography>Toss data here</Typography>
             </div>
          </div>
        </div>

      </div>



  );
}

export default Profile;
