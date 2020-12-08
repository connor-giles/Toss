import React, { Component } from 'react';
import axios from 'axios';
import '../css/Sign.css';
import GLoginHooks from '../../components/GLoginHook.js';
import GLogoutHooks from '../../components/GLogoutHook.js';
import config from '../../config/config.js';

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

    //submits user account info to backend for sign in
    axios
      .post(config.DOMAIN.name + 'user/login', user)
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
              <label className="title">Enter Email:</label>
              <input
                type="text"
                value={this.state.email}
                onChange={this.onInputEmail}
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

          </form>

        </div>
      </div>
    );
  }
}
