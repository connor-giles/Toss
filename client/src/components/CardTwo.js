import React, { useState, useEffect } from 'react';
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
import config from '../config/config.js';
import { Link } from 'react-router-dom';

export default function CardTwo() {
  const classes = useStyles();
  const [phaseTwo, setPhaseTwo] = useState([]);
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //gets 4 toss categories from phase 2
  useEffect(() => {
    axios
      .get(config.DOMAIN.name + 'toss/3Phase2Tosses')
      .then((response) => setPhaseTwo(response.data.data.tosses))
      .catch((error) => console.error(error));
  }, []);

  //gets all responses from the database
  useEffect(() => {
    axios
      .get(config.DOMAIN.name + 'response')
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (

    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Phase Two
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Prompts
        </Typography>
        <Link to="/phase2" className="phase2-link">
        <div className="tosses">
          {phaseTwo.map((toss) => {
            if (toss.category.science) {
              return (
                <div className="science">
                  <Typography className={classes.tossTitle}>
                    Science and Technology
                  </Typography>
                  {toss.prompt} {toss.category.science}
                  <p>{'\n'}</p>
                </div>
              );
            } else if (toss.category.politics) {
              return (
                <div className="politics">
                  <Typography className={classes.tossTitle}>
                    Politics
                  </Typography>
                  {toss.prompt}
                  <p>{'\n'}</p>
                </div>
              );
            } else if (toss.category.environment) {
              return (
                <div className="environment">
                  <Typography className={classes.tossTitle}>
                    Environment
                  </Typography>
                  {toss.prompt}
                  <p>{'\n'}</p>
                </div>
              );
            } else if (toss.category.society) {
              return (
                <div className="society">
                  <Typography className={classes.tossTitle}>Society</Typography>
                  {toss.prompt}
                  <p>{'\n'}</p>
                </div>
              );
            }
          })}
        </div>
        </Link>
      </CardContent>
     

      {/* <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
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
          <Typography paragraph>
            {data.map((userRes) => (
              <div className="info">
                <p>
                  {userRes.userID} <br />
                  {userRes.comment}{' '}
                </p>
                <p>{'\n'}</p>
              </div>
            ))}
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  );
}

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
  tossTitle: {
    fontWeight: 'bold',
  },
});
