import React, { Component } from 'react';
import axios from 'axios';
import '../css/Sign.css';
import config from '../../config/config.js';

let bcrypt = require('bcryptjs');

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onInputUser = this.onInputUser.bind(this);
    this.onInputCredentials = this.onInputCredentials.bind(this);
    this.onInputCredentialsConfirm = this.onInputCredentialsConfirm.bind(this);
    this.onInputEmail = this.onInputEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      userName: '',
      credentials: '',
      email: '',
      credentialsConfirm: '',
    };
  }

  onInputUser(e) {
    this.setState({ userName: e.target.value });
  }

  onInputCredentials(e) {
    this.setState({ credentials: e.target.value });
  }

  onInputCredentialsConfirm(e) {
    this.setState({ credentialsConfirm: e.target.value });
  }
  onInputEmail(e) {
    this.setState({ email: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    /*
    const hashedPW = bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(this.state.credentials, salt, function (err, hash) {
        return hash;
      });
    });
*/
    const user = {
      username: this.state.userName,
      credentials: this.state.credentials,
      email: this.state.email,
      credentialsConfirm: this.state.credentialsConfirm,
    };

    //submits user account info to backend
    axios
      .post(config.DOMAIN.name + 'user/register', user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    this.setState({
      userName: '',
      credentials: '',
      email: '',
      credentialsConfirm: '',
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="form">
          <h1 className="pageTitles">Register</h1>
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
            <div className="passwos">
              <label className="title">Enter New Password:</label>
              <input
                type="password"
                value={this.state.credentials}
                onChange={this.onInputCredentials}
                className="form-control"
              />
            </div>
            <div className="passwos">
              <label className="title">Enter Password Again:</label>
              <input
                type="password"
                value={this.state.credentialsConfirm}
                onChange={this.onInputCredentialsConfirm}
                className="form-control"
              />
            </div>
            <div className="email">
              <label className="title">Enter Email</label>
              <input
                type="text"
                value={this.state.email}
                onChange={this.onInputEmail}
                className="form-control"
              />
            </div>
            <div className="signInButton">
              <input
                type="submit"
                value="Register"
                className="btn btn-success btn-block"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
