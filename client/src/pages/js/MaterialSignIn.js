import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import config from '../../config/config.js';
import { Redirect } from 'react-router-dom';
import Nav from '../js/Nav';
import { useHistory } from 'react-router-dom';
import '../css/Sign.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#7C84FF',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#7C84FF',
    borderRadius: 50,
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [credentials, setCredentials] = useState('');
  const [redirect, setRedirect] = useState(false);

  const history = useHistory();

  function onSubmit(event) {
    event.preventDefault();

    const user = {
      userName: userName,
      credentials: credentials,
      email: email,
    };

    axios
      .post(config.DOMAIN.name + 'user/login', user, {
        withCredentials: true,
        credentials: 'include',
      })
      .then((res) => {
        console.log(res.data);
        checkStatus(res.data.token);
        //window.location.href = config.DOMAIN.frontendHome; //should send back to home MAY OVERWRTE TOKEN????
        //console.log('login successful')
      })
      .catch((error) => {
        console.log(error);
        console.log('login failed');
      });

    setUserName('');
    setEmail('');
    setCredentials('');

    history.replace('/loggedIn');

    setTimeout(function () {
      history.replace('/');
    }, 2000);
  }

  return (
    <div>
      <MuiThemeProvider></MuiThemeProvider>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign In to T.O.S.S
          </Typography>

          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => setEmail(event.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setCredentials(event.target.value)}
            />
            <div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </div>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    </div>
  );
}

export const checkStatus = (state) => {
  if (state !== null) {
    console.log('logged in');
  } else {
    console.log('not');
  }
};
