import React from 'react';
import './App.css';
import Nav from './pages/js/Nav';
import Home from './pages/js/Home';
import Profile from './pages/js/Profile';
import Settings from './pages/js/Settings';
import SignIn2 from './pages/js/SignIn2';
import MaterialSignIn from './pages/js/MaterialSignIn.js';
import GoogleBtn from './pages/js/GoogleSignIn';
import SubmitResponse from './pages/Tosses/js/Phase1';
import Register from './pages/js/Register';
import Quiz from './pages/js/Quiz';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Responses from './pages/js/Responses';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/settings" component={Settings} />
          <Route path="/signin" component={SignIn2} />
          <Route path="/response" component={SubmitResponse} />
          <Route path="/register" component={Register} />
          <Route path="/responses" component={Responses} />
          <Route path="/quiz" component={Quiz} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
//  <Route path="/register" component={} />
