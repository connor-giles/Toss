import React, { Component } from 'react';
import '../css/Phase1.css'
import axios from 'axios';

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
    var totalCount = e.target.value;
    this.setState({ count: totalCount.length})
  }

  onSubmit(e) {
    e.preventDefault();

    const tossResponse = {
      userID: this.state.userID,
      source: this.state.source,
      comment: this.state.comment,
    };

    axios
      .post('http://localhost:3000/response', tossResponse)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ userID: '', source: '', comment: ''});
  }

  render() {
    return (
      <div className="page">
        <form className="wrapper"
          onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="label">Add User Name</label>
            <input className="user-input"
              type="text"
              value={this.state.userID}
              onChange={this.onInputUser}
            />
          </div>
          <div className="form-group">
            <label className="label"> Input Comment </label>
            <textarea className="comment-input"
              type="text"
              value={this.state.source}
              onChange={this.onInputSource}
            />
            <p>{this.state.count}</p>
          </div>
          <div className="form-group">
            <label className="label"> Input Source </label>
            <input className="source-input"
              type="text"
              value={this.state.comment}
              onChange={this.onInputComment}
            />
          </div>
          <div className="form-group">
            <input className="button"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    );
  }
}
