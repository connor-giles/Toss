import React, { useState } from "react";
import '../css/Profile.css';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { data } from './Nav';
var username, email, care, fairness, ingroupLoyalty, authorityRespect, puritySanctity;
//problems with this code 
//#1, user data is not imported correctly from nav.
//either that or I can't log in to the app correctly for whatever reason
//#2, there is no implementation for the previous tosses. the HTML is there, the toss data needs to be added
//#3, change line 67 to the correct URL in Heroku. This allows profile picture to save persistently.

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
  typography:{
    fontFamily: '"Helvetica Neue"',
  }
}));

//export for table
export default function DenseTable() {
  const classes = useStyles();

//for image upload
const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });
  };

//create data for table
function createData(name, score) {
  return { name, score };
}

//sets data for profile
if(data == 0){
  username = "Not Logged In";
  email = "Not Logged In";
  care = 0;
  fairness = 0;
  ingroupLoyalty = 0;
  authorityRespect = 0;
  puritySanctity = 0;
}
else{
  username = data.username;
  email = data.email;
  care = data.care;
  fairness = data.fairness;
  ingroupLoyalty = data.ingroupLoyalty;
  authorityRespect = data.authorityRespect;
  puritySanctity = data.puritySanctity;
}

//sets table data per row
const rows = [
  createData('Care', care),
  createData('Fairness', fairness),
  createData('Ingroup Loyalty', ingroupLoyalty),
  createData('Respect for Authority', authorityRespect),
  createData('Purity/Sanctity', puritySanctity),
];

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
            <h5 className="text-center"> <font color = "FFFFFF">Click on this text/your current image to add a photo, click upload to save</font></h5>
          </>
        )}
      </label>
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <br />
      <button onClick={handleUpload}>Upload</button>
      <div className={classes.root}>
    </div>
                                    <br></br>        
                                              <TableContainer component={Paper}><div>
                                                <React.Fragment className={classes.typography.fontFamily}>
                                                  <Typography
                                                    component="span"
                                                    className={classes.typography.fontFamily}
                                                    color="textPrimary"
                                                  >
                                                  </Typography>
                                                  {"Username: " + username}
                                                </React.Fragment>
                                                </div>
                                                <React.Fragment className={classes.typography.fontFamily}>
                                                  <Typography
                                                    component="span"
                                                    className={classes.typography.fontFamily}
                                                    color="textPrimary"
                                                  >
                                                  </Typography>
                                                  {"Email: " + email}
                                                </React.Fragment>
                                                </TableContainer>
                                              
    </div>
         </div>
        </div>
        <div className="info">
          <div className="stats-container">
            <div className="graph-api">
                                            <TableContainer component={Paper}>
                                            <Typography variant="h5" display="block" align="center">
                                            MFT Scores
                                            </Typography>
                                      <Table className={classes.table} size="small" aria-label="a dense table">
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
          <TableContainer component={Paper}>
          <Typography variant="h5" display="block" align="center">
          Some Previous Tosses
          </Typography>
             <div className="toss-data">
                                                <List className={classes.root}>
                                          <ListItem alignItems="center">
                                            <ListItemText
                                              primary="TOSS Title Here"
                                              secondary={
                                                <React.Fragment>
                                                  <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                  >
                                                  </Typography>
                                                  {"Toss Content here"}
                                                </React.Fragment>
                                              }
                                            />
                                          </ListItem>
                                          <Divider variant="inset" component="li" />
                                          <ListItem alignItems="center">
                                            <ListItemText
                                              primary="TOSS Title Here"
                                              secondary={
                                                <React.Fragment>
                                                  <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                  >
                                                  </Typography>
                                                  {"Toss Content here"}
                                                </React.Fragment>
                                              }
                                            />
                                          </ListItem>
                                          <Divider variant="inset" component="li" />
                                          <ListItem alignItems="center">
                                            <ListItemText
                                              primary="TOSS Title Here"
                                              secondary={
                                                <React.Fragment>
                                                  <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                  >
                                                  </Typography>
                                                  {'Toss Content here'}
                                                </React.Fragment>
                                              }
                                            />
                                          </ListItem>
                                        </List>
                                       
             </div>
             </TableContainer>
          </div>
        </div>

      </div>



  );
}
