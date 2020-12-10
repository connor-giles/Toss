import React, { useState, useEffect } from 'react';
import '../css/Profile.css';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { createMuiTheme } from '@material-ui/core/styles';

import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import config from '../../config/config.js';

// import { data } from './Nav';
let username,
  data,
  email,
  care,
  fairness,
  ingroupLoyalty,
  authorityRespect,
  puritySanctity,
  prevTosses,
  userID;
const tossArr = [];
//problems with this code
//#1, there is no implementation for the previous tosses. the HTML is there, the toss data needs to be added
//#2, change line 67 to the correct URL in Heroku. This allows profile picture to save persistently.

//style for table
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 300,
  },
  root: {
    width: '100%',
    maxWidth: 1230,
    backgroundColor: theme.palette.background.paper,
    fontFamily: '"Helvetica Neue"',
  },
  inline: {
    width: '50%',
    maxWidth: 200,
    backgroundColor: theme.palette.background.paper,
  },
  typography: {
    fontFamily: '"Helvetica Neue"',
  },

  paperRoot: {
    backgroundColor: '#fc8368',
  },
}));

// let data = async () => {
//   await axios
//     .get(config.DOMAIN.name + 'user/user', {
//       withCredentials: true,
//       credentials: 'include',
//     })
//     .then((response) => {
//       //console.log(response.data.data);
//       return response.data.data;
//     })
//     .catch((error) => console.error(error));
// };

//export for table
const Profile = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [email, setEmail] = useState([]);
  const [MFT, setMFT] = useState([]);
  const [username, setUsername] = useState([]);
  const [userID, setID] = useState([]);
  //for image upload
  const [image, setImage] = useState({ preview: '', raw: '' });
  //for getting toss responses
  const [prevTosses, setTosses] = useState([]);

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  useEffect(() => {
    console.log('fml');
    //axios for user data
    axios
      .get(config.DOMAIN.name + 'user/user', {
        withCredentials: true,
        credentials: 'include',
      })
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
        setEmail(response.data.data.email);
        setUsername(response.data.data.username);
        setMFT(response.data.data.MFT);
        setID(response.data.data._id);
      })
      .catch((error) => console.error(error));
    //axios for toss data
    axios
      .get(config.DOMAIN.name + 'response/userResponses', {
        withCredentials: true,
        credentials: 'include',
      })
      .then((response) => {
        console.log(response.data.data.responses);
        setTosses(response.data.data.responses);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image.raw);

    await fetch('URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
  };

  //create data for table
  function createData(name, score) {
    return { name, score };
  }

  //sets table data per row
  const rows = [
    createData('Care', MFT.care),
    createData('Fairness', MFT.fairness),
    createData('Ingroup Loyalty', MFT.ingroupLoyalty),
    createData('Respect for Authority', MFT.authorityRespect),
    createData('Purity/Sanctity', MFT.puritySanctity),
  ];
  if (prevTosses.length == 0) {
    tossArr.length = 0;
    tossArr.push(
      <div>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="center">
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                ></Typography>
                {'No Tosses'}
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                ></Typography>
                {'No previous Tosses. Please participate in a TOSS.'}
              </React.Fragment>
            }
          />
        </ListItem>
      </div>
    );
  } else {
    tossArr.length = 0;
    for (let i = 0; i < prevTosses.length; i++) {
      tossArr.push(
        <div>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="center">
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  ></Typography>
                  {/*  this next line contains the comment from the toss at the index*/}
                  {prevTosses[i].comment}
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  ></Typography>
                  {/*  this next line contains the source from the toss at the index*/}
                  {'Source: ' + prevTosses[i].source}
                </React.Fragment>
              }
            />
          </ListItem>
        </div>
      );
      console.log(prevTosses[i]);
    }
  }
  return (
    <div className="profile">
      <div className="profile-landing">
        <div className="profile-info">
          <div>
            <label htmlFor="upload-button">
              {image.preview ? (
                <img src={image.preview} alt="dummy" width="150" height="150" />
              ) : (
                <>
                  <span className="fa-stack fa-2x mt-3 mb-2">
                    <i className="fas fa-circle fa-stack-2x" />
                    <i className="fas fa-store fa-stack-1x fa-inverse" />
                  </span>
                  <h5 className="text-center">
                    {' '}
                    <font color="FFFFFF">
                      Click on this text/your current image to add a photo,
                      click upload to save
                    </font>
                  </h5>
                </>
              )}
            </label>
            <input
              type="file"
              id="upload-button"
              style={{ display: 'none' }}
              onChange={handleChange}
            />
            <br />
            <button onClick={handleUpload}>Upload</button>
            <div className={classes.root}></div>
            <br></br>
            <TableContainer
              component={Paper}
              classes={{ root: classes.paperRoot }}
            >
              <div>
                <React.Fragment className={classes.typography.fontFamily}>
                  <Typography
                    component="span"
                    className={classes.typography.fontFamily}
                    color="textPrimary"
                  ></Typography>
                  {'Username: ' + username}
                </React.Fragment>
              </div>
              <React.Fragment className={classes.typography.fontFamily}>
                <Typography
                  component="span"
                  className={classes.typography.fontFamily}
                  color="textPrimary"
                ></Typography>
                {'Email: ' + email}
              </React.Fragment>
            </TableContainer>
          </div>
        </div>
      </div>
      <div className="info">
        <div className="stats-container">
          <div className="graph-api">
            <TableContainer
              component={Paper}
              classes={{ root: classes.paperRoot }}
            >
              <Typography variant="h5" display="block" align="center">
                MFT Scores
              </Typography>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Trait</TableCell>
                    <TableCell align="right">Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="history-container">
          <TableContainer
            component={Paper}
            classes={{ root: classes.paperRoot }}
          >
            <Typography variant="h5" display="block" align="center">
              Some Previous Tosses
            </Typography>
            <div className="toss-data">
              <List className={classes.root}>
                <div>{tossArr}</div>
              </List>
            </div>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Profile;
