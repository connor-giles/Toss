import React, { useState, useEffect } from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';




const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CardOne() {
  const classes = useStyles();
  const [phaseOne, setPhaseOne] = useState([]);
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = React.useState(false);


  useEffect(() => {
    axios.get('http://localhost:3000/toss/3Phase1Tosses')
    .then((response) => setPhaseOne(response.data.data.tosses))
    .catch((error) => console.error(error))
}, []);

useEffect(() => {
  axios.get('http://localhost:3000/response/')
  .then((response) => setData(response.data))
  .catch((error) => console.error(error))
}, []);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
         Phase Two
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Prompts
        </Typography>
        <Typography variant="body2" component="p">
          {phaseOne.map(toss => 
              <div className="info">{toss.prompt}<p>{"\n"}</p></div>)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Button size="small">View Responses</Button>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Responses:</Typography>
          <Typography paragraph>
          {data.map(userRes => 
              <div className="info">
                <p>user: </p>
                <p>{userRes.userID}  <br />{userRes.comment} </p>
                <p>{"\n"}</p>
              </div>)}
          </Typography>
        </CardContent>
      </Collapse>
     


    </Card>
  );
}
