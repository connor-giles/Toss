import React, { Component } from 'react';
import axios from 'axios';
import '../css/Sign.css';
import '../questions/questions.json';
let bcrypt = require('bcryptjs');
var answers = new Array(32);

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputAnswer = this.onInputAnswer.bind(this);

    this.state = {
      answers: '',
    };
  }

  onInputAnswer(e) {
    this.setState({ answers: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      answers: this.state.answers,
    };

    axios
      .post('http://localhost:3000/user/quiz', user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log('Invalid Answers');
      });

    this.setState({
      answers: '',
    });
  }
  
  render() {
    const questions = JSON.parse("answers.json");
    const final = [];

    for(var i = 0; i < 32; i++){
      final.push( <div className="username">
        <label className="title">{questions[i]}</label>
        <input
          type="text"
          value={this.state.answers[i]}
          onChange={this.onInputAnswer}
          className="form-control"/>
      </div>)
    }; 

    return (
      <div className="wrapper">
        <div className="form">
          <h1 className="pageTitles">Moral Foundations Test</h1>
          <form onSubmit={this.onSubmit}>   
            <ul>{final}</ul>     
          </form>
        </div>
      </div>
    );
  }
}
