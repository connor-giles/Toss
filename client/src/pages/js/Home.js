import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';
import CardZero from '../../components/CardZero';
import CardOne from '../../components/CardOne';
import CardTwo from '../../components/CardTwo';

import { Grid } from '@material-ui/core';

function Home() {
  
  return (
    <div className="homePage">
      <div className="landing">
        <h1 className="welcome">Welcome to T.O.S.S</h1>
        <p className="description">
          That One Study Shows...
          <br></br>
          Making the world more educated, one study at a time{' '}
        </p>
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
