import React from 'react';
import './App.css';
import Nav from './components/Nav.js';
import Home from './components/Home';
import Profile from './components/Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// test

function App() {
  return (
    <Router>
      <div className="App">
          <Nav/>
          <Switch>
          <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
