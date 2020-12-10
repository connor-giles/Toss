import React, { Component } from 'react';
import '../css/Phase2.css';
import axios from 'axios';
import config from '../../../config/config.js';
import Typography from '@material-ui/core/Typography';

export default class SubmitResponse extends Component {
  constructor(props) {
    super(props);

    this.onTagFresh = this.onTagFresh.bind(this);
    this.onTagControversial = this.onTagControversial.bind(this);
    this.onTagObjectivity = this.onTagObjectivity.bind(this);
    this.onTagCredible = this.onTagCredible.bind(this);
    this.onTagConstructive = this.onTagConstructive.bind(this);
    this.onTagEmotive = this.onTagEmotive.bind(this);

    this.state = {
      num: [1, ,2 , 3],
      freshButtonColor: '#7C84FF',
      controversialButtonColor: '#7C84FF',
      objectivityButtonColor: '#7C84FF',
      credibleButtonColor: '#7C84FF',
      constructiveButtonColor: '#7C84FF',
      emotiveButtonColor: '#7C84FF'
    };

  }

  onTagFresh() {
    this.setState({ freshButtonColor: 'grey' });
  }

  onTagControversial() {
    this.setState({ controversialButtonColor: 'grey' });
  }

  onTagObjectivity() {
    this.setState({ objectivityButtonColor: 'grey' });
  }

  onTagCredible() {
    this.setState({ credibleButtonColor: 'grey' });
  }

  onTagConstructive() {
    this.setState({ constructiveButtonColor: 'grey' });
  }

  onTagEmotive() {
    this.setState({ emotiveButtonColor: 'grey' });
  }
  

  render() {
   
    const a = [];

    for (let i = 0; i < 10; i++) {
      a.push(
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
        <input className="button" value="fresh" onClick={this.onTagFresh} style={{backgroundColor: this.state.freshButtonColor}}/>
        <input className="button" value="controversial" onClick={this.onTagControversial} style={{backgroundColor: this.state.controversialButtonColor}}/>
        <input className="button" value="objectivity" onClick={this.onTagObjectivity} style={{backgroundColor: this.state.objectivityButtonColor}}/>
        <input className="button" value="credible" onClick={this.onTagCredible} style={{backgroundColor: this.state.credibleButtonColor}}/>
        <input className="button" value="constructive" onClick={this.onTagConstructive} style={{backgroundColor: this.state.constructiveButtonColor}}/>
        <input className="button" value="emotive" onClick={this.onTagEmotive} style={{backgroundColor: this.state.emotiveButtonColor}}/>
        {/* <input className="button" type="submit" value="emotive" /> */}
      </div>
    </form>
      )
   }
   
    return (
      <div className="page">
       {a}
      </div>
    );
  }
}
