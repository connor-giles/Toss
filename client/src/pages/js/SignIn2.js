import React, { Component } from 'react';
import axios from 'axios';
import '../css/Sign.css';
import GLoginHooks from '../../components/GLoginHook.js';
import GLogoutHooks from '../../components/GLogoutHook.js';

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.onInputUser = this.onInputUser.bind(this);
    this.onInputCredentials = this.onInputCredentials.bind(this);
    this.onInputEmail = this.onInputEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      userName: '',
      credentials: '',
      email: '',
    };
  }

  onInputUser(e) {
    this.setState({ userName: e.target.value });
  }

  onInputCredentials(e) {
    this.setState({ credentials: e.target.value });
  }

  onInputEmail(e) {
    this.setState({ email: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      userName: this.state.userName,
      credentials: this.state.credentials,
      email: this.state.email,
    };

    axios
      .get('http://localhost:3000/user', user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ userName: '', credentials: '', email: '' });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="form">
          <h1 className="pageTitles">Sign In</h1>
          <form onSubmit={this.onSubmit}>
            <div className="username">
              <label className="title">Enter Username:</label>
              <input
                type="text"
                value={this.state.userName}
                onChange={this.onInputUser}
                className="form-control"
              />
            </div>
            <div className="pw">
              <label className="title">Enter Password:</label>
              <input
                type="password"
                value={this.state.credentials}
                onChange={this.onInputCredentials}
                className="form-control"
              />
            </div>
            <div className="signInButton">
              <input
                type="submit"
                value="Sign In"
                className="btn btn-success btn-block"
              />
            </div>
            {/* <GLoginHooks /> */}
            {/* <GLogoutHooks /> */}
          </form>
        </div>
      </div>
    );
  }
}
