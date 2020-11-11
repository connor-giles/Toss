import React from 'react';
import './App.css';
import Nav from './pages/Nav';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import Responses from './pages/Responses';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
          <Nav/>
          <Switch>
          <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/settings" component={Settings} />
            <Route path="/signin" component={SignIn} />
            <Route path="/responses" component={Responses} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
