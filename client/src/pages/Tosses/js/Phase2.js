import React, { Component } from 'react';
import '../css/Phase2.css';
import axios from 'axios';
import config from '../../../config/config.js';
import Typography from '@material-ui/core/Typography';

export default class SubmitResponse extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="page">
        <form className="wrapper" onSubmit={this.onSubmit}>
          <div className="form-group">
            <div className="prompt-wrapper">
              <p className="prompt">Testing</p>
            </div>
            <label className="label"> Input Comment </label>
            <textarea
              className="comment-input"
              type="text"
              maxLength="500"
            />
          
          </div>
          <div className="form-group">
            <label className="label"> Input Source </label>
            <input
              className="source-input"
              type="text"
            />
          </div>
          <div className="form-group">
            <input className="button" type="submit" value="fresh" />
            <input className="button" type="submit" value="controversial" />
            <input className="button" type="submit" value="objectivity" />
            <input className="button" type="submit" value="credible" />
            <input className="button" type="submit" value="constructive" />
            <input className="button" type="submit" value="emotive" />
          </div>
        </form>
        <form className="wrapper" onSubmit={this.onSubmit}>
          <div className="form-group">
            <div className="prompt-wrapper">
              <p className="prompt">Testing</p>
            </div>
            <label className="label"> Input Comment </label>
            <textarea
              className="comment-input"
              type="text"
              maxLength="500"
            />
          
          </div>
          <div className="form-group">
            <label className="label"> Input Source </label>
            <input
              className="source-input"
              type="text"
            />
          </div>
          <div className="form-group">
            <input className="button" type="submit" value="fresh" />
            <input className="button" type="submit" value="controversial" />
            <input className="button" type="submit" value="objectivity" />
            <input className="button" type="submit" value="credible" />
            <input className="button" type="submit" value="constructive" />
            <input className="button" type="submit" value="emotive" />
          </div>
        </form>
        <form className="wrapper" onSubmit={this.onSubmit}>
          <div className="form-group">
            <div className="prompt-wrapper">
              <p className="prompt">Testing</p>
            </div>
            <label className="label"> Input Comment </label>
            <textarea
              className="comment-input"
              type="text"
              maxLength="500"
            />
          
          </div>
          <div className="form-group">
            <label className="label"> Input Source </label>
            <input
              className="source-input"
              type="text"
            />
          </div>
          <div className="form-group">
            <input className="button" type="submit" value="fresh" />
            <input className="button" type="submit" value="controversial" />
            <input className="button" type="submit" value="objectivity" />
            <input className="button" type="submit" value="credible" />
            <input className="button" type="submit" value="constructive" />
            <input className="button" type="submit" value="emotive" />
          </div>
        </form>
      </div>
    );
  }
}
