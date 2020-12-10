import React, { Component } from 'react';
import '../css/Phase1.css';
import axios from 'axios';
import config from '../../../config/config.js';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

export default class SubmitResponse extends Component {
  constructor(props) {
    super(props);

    this.onInputSource = this.onInputSource.bind(this);
    this.onInputComment = this.onInputComment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      userID: '',
      source: '',
      comment: '',
      prompt: '',
      category: [],
    };
  }

  onInputSource(e) {
    this.setState({ source: e.target.value });
  }

  onInputComment(e) {
    this.setState({ comment: e.target.value });
    var totalCount = e.target.value;
    this.setState({ count: totalCount.length });
  }

  onSubmit(e) {
    e.preventDefault();

    const tossResponse = {
      source: this.state.source,
      comment: this.state.comment,
    };

    //posts the user's answer to the promt to the backend
    axios
      .patch(config.DOMAIN.name + 'toss/newResponse', tossResponse, {
        withCredentials: true,
        credentials: 'include',
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ userID: '', source: '', comment: '' });
  }

  componentDidMount() {
    axios
      .get(config.DOMAIN.name + 'toss/getTossed', {
        withCredentials: true,
        credentials: 'include',
      })
      .then((res) => {
        this.setState({ prompt: res.data.data.prompt });
        this.setState({ category: res.data.data.category });
        console.log(this.state.category);
      });
  }

  render() {
    return (
      <div className="page">
        <form className="wrapper" onSubmit={this.onSubmit}>
          <div className="form-group">
            <div className="prompt-wrapper">
              <p className="prompt">{this.state.prompt}</p>
            </div>

            {/* <div className="category">
            {Object.keys(this.state.category).map((keyName, i) => (
              <li className="categoryMapping" key={i}>
                  <span className="specific-category">category: {this.state.category[keyName].science}</span>
              </li>
            ))}
           </div> */}
            <label className="label"> Input Comment </label>
            <textarea
              className="comment-input"
              type="text"
              maxLength="500"
              value={this.state.comment}
              onChange={this.onInputComment}
            />
            <div>
              {this.state.count == null ? (
                <p className="count">0/500</p>
              ) : (
                <p className="count">{this.state.count}/500</p>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="label"> Input Source </label>
            <input
              className="source-input"
              type="text"
              value={this.state.source}
              onChange={this.onInputSource}
            />
          </div>
          <div className="form-group">
            <input className="button" type="submit" value="Submit" />
          </div>
        </form>

      </div>
    );
  }
}
