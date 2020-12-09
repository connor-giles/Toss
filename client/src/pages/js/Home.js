import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';
import CardZero from '../../components/CardZero';
import CardOne from '../../components/CardOne';
import CardTwo from '../../components/CardTwo';
import { Link } from 'react-router-dom';


import { Grid } from '@material-ui/core';

function Home() {
  return (
    <div className="homePage">
      <div className="landing">
        <h1 className="welcome">WELCOME TO T.O.S.S</h1>
        <p className="description">
          This One Study Shows...
          <br></br>
          Making the world more educated, one toss at a time.{' '}
        </p>
        <Link to="/response">
          <button className="tossButton"><p className="tossButton-text">Get Toss'd</p></button>
        </Link>
        
      </div>

      <Grid container>
        <Grid item xs={4}>
          <CardZero />
        </Grid>
        <Grid item xs={4}>
          <CardOne />
        </Grid>
        <Grid item xs={4}>
          <CardTwo />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
