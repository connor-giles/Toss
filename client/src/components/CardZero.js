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

export default function CardZero() {
  const classes = useStyles();
  const [phaseZero, setPhaseZero] = useState([]);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //gets 4 categories for phase 0
  useEffect(() => {
    axios
      .get(config.DOMAIN.name + 'toss/3Phase0Tosses')
      .then((response) => setPhaseZero(response.data.data.tosses))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Phase Zero
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Prompts
        </Typography>
        <div className="tosses">
          {phaseZero.map((toss) => {
            if (toss.category.science) {
              return (
                <div className="science">
                  <Typography className={classes.tossTitle}>
                    Science and Technology
                  </Typography>
                  {toss.prompt}
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
      </CardContent>

      <CardActions disableSpacing>
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
            Cannot view responses; must join the Toss first.
          </Typography>
        </CardContent>
      </Collapse>
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
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
  tossTitle: {
    fontWeight: 'bold',
  },
});
