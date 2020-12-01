import React, { Component } from 'react';
import axios from 'axios';
import config from "../../../config/config.js"

export default class SubmitResponse extends Component {
  constructor(props) {
    super(props);

    this.onInputUser = this.onInputUser.bind(this);
    this.onInputSource = this.onInputSource.bind(this);
    this.onInputComment = this.onInputComment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      userID: '',
      source: '',
      comment: '',
    };
  }

  onInputUser(e) {
    this.setState({ userID: e.target.value });
  }

  onInputSource(e) {
    this.setState({ source: e.target.value });
  }

  onInputComment(e) {
    this.setState({ comment: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const tossResponse = {
      userID: this.state.userID,
      source: this.state.source,
      comment: this.state.comment,
    };

    //posts the user's answer to the promt to the backend
    axios
      .post(config.DOMAIN.name + 'response', tossResponse)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ userID: '', source: '', comment: '' });
  }

  render() {
    return (
      <div className="wrapper">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Add User Name</label>
            <input
              type="text"
              value={this.state.userID}
              onChange={this.onInputUser}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label> Input Comment </label>
            <input
              type="text"
              value={this.state.source}
              onChange={this.onInputSource}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label> Input Source </label>
            <input
              type="text"
              value={this.state.comment}
              onChange={this.onInputComment}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Submit"
              className="btn btn-success btn-block"
            />
          </div>
        </form>
      </div>
    );
  }
}
