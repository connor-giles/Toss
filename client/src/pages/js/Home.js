import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';
import CardZero from '../../components/CardZero';
import CardOne from '../../components/CardOne';
import CardTwo from '../../components/CardTwo';
import moment from 'moment';

import { Grid } from '@material-ui/core';
import { Update } from '@material-ui/icons';

function Home() {
  
  let time = ''
  const [ctime, setCtime] = useState(time);

  const UpdateTime = () => {
    var toDate=new Date();
    var tomorrow=new Date();
    tomorrow.setHours(17,0,0,0);
    var diffMS=tomorrow.getTime()/1000-toDate.getTime()/1000;
    var diffHr=Math.floor(diffMS/3600);
    diffMS=diffMS-diffHr*3600;
    var diffMi=Math.floor(diffMS/60);
    diffMS=diffMS-diffMi*60;
    var diffS=Math.floor(diffMS);
    var result=((diffHr<10)?"0"+diffHr:diffHr);
    result+=":"+((diffMi<10)?"0"+diffMi:diffMi);
    result+=":"+((diffS<10)?"0"+diffS:diffS);
      
    setCtime(result)
  }

  setInterval(UpdateTime, 1000)
  
  return (
    <div className="homePage">
      <div className="landing">
        <h1 className="welcome">Welcome to T.O.S.S</h1>
        <p className="description">
          That One Study Shows...
          <br></br>
          Making the world more educated, one study at a time{' '}
        </p>
        <br></br>
        <h1>Time until 5pm EST</h1>
        <h2>{ ctime }</h2>
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
