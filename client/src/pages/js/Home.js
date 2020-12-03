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
        <h1 className="welcome">Welcome to Toss</h1>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
          non enim ut pretium. Morbi accumsan dignissim gravida.{' '}
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
