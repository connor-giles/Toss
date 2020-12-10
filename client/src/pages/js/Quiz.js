import React, { Component } from 'react';
import axios from 'axios';
import '../css/quiz.css';
import config from '../../config/config.js';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

let bcrypt = require('bcryptjs');
//var json = require('../questions/questions.json');

var answers = new Array(32);
export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputAnswer = this.onInputAnswer.bind(this);

    this.state = {
      answers: [],
    };
  }

  onInputAnswer(e) {
    this.setState((prevState) => ({
      answers: [...prevState.answers, e.target.value],
    }));
  }

  // handleSubmit = () => {
  //   const history = useHistory();
  //   setTimeout(function () {
  //     history.replace('/');
  //   }, 2000);
  // };

  onSubmit(e) {
    e.preventDefault();
    for(let i = 0; i < 32; i++){
      if(parseInt(this.state.answers[i]) > 5){
        this.state.answers[i] = 5;
      }
      else if(isNaN(parseInt(this.state.answers[i]))){
        this.state.answers[i] = 0;
      }
      else{
        this.state.answers[i] = parseInt(this.state.answers[i]);
      }
    }
    //  MFT.care': req.body.care,
    //   MFT.fairness': req.body.fairness,
    //   MFT.ingroupLoyalty': req.body.ingroupLoyalty,
    //   MFT.authorityRespect': req.body.authorityRespect,
    //   'MFT.puritySanctity': req.body.puritySanctity,
    //   'MFT.totalScore
    let care,
      fairness,
      ingroupLoyalty,
      authorityRespect,
      puritySanctity,
      totalScore;

    const user = {
      care:
        this.state.answers[0] +
        this.state.answers[6] +
        this.state.answers[11] +
        this.state.answers[16] +
        this.state.answers[22] +
        this.state.answers[27],
      fairness:
        this.state.answers[1] +
        this.state.answers[7] +
        this.state.answers[12] +
        this.state.answers[17] +
        this.state.answers[23] +
        this.state.answers[28],
      ingroupLoyalty:
        this.state.answers[2] +
        this.state.answers[8] +
        this.state.answers[13] +
        this.state.answers[18] +
        this.state.answers[24] +
        this.state.answers[29],
      authorityRespect:
        this.state.answers[3] +
        this.state.answers[9] +
        this.state.answers[14] +
        this.state.answers[19] +
        this.state.answers[25] +
        this.state.answers[30],
      puritySanctity:
        this.state.answers[4] +
        this.state.answers[10] +
        this.state.answers[15] +
        this.state.answers[20] +
        this.state.answers[26] +
        this.state.answers[31],
    };
    //console.log(user);

    //post user's quiz answers to backend
    axios
      .patch(config.DOMAIN.name + 'user/quiz', user, {
        withCredentials: true,
        credentials: 'include',
      })
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
    const final = [];
    const questions = json.map((obj) => JSON.parse(obj));

    //quiz instruction 1
    final.push(
      <div>
        <label className="quizinstr">
          When you decide whether something is right or wrong, to what extent
          are the following considerations relevant to your thinking? Please
          rate each statement using this scale. 0 = Not at all relevant. 1 = Not
          very relevant. 2 = Slightly relevant. 3 = Somewhat relevant. 4 = Very
          relevant. 5 = Extremely relevant.
        </label>
      </div>
    );

    //first 16 questions
    for (var i = 0; i < 16; i++) {
      final.push(
        <div className="username">
          <label className="question">{questions[i].question}</label>
          <input
            type="text"
            value={this.state.answers[i]}
            onChange={this.onInputAnswer}
            className="form-control"
          />
        </div>
      );
    }

    //quiz instruction 2
    final.push(
      <div>
        <label className="quizinstr">
          Please read the following sentences and indicate your agreement or
          disagreement. 0 = Strongly disagree. 1 = Moderately disagree. 2 =
          Slightly disagree. 4 = Moderately disagree. 5 = Strongly agree.
        </label>
      </div>
    );

    //second 16 questions
    for (var i = 16; i <= 31; i++) {
      final.push(
        <div className="username">
          <label className="question">{questions[i].question}</label>
          <input
            type="text"
            value={this.state.answers[i]}
            onChange={this.onInputAnswer}
            className="form-control"
          />
        </div>
      );
    }

    return (
      //quiz headers
      <div className="quizwrapper">
        <div className="quizbox">
          <p className="quiztitle">Moral Foundations Test</p>
          <form onSubmit={this.onSubmit}>
            <div>{final}</div>

            <div className="button">
              <label className="homebutton"></label>
              <input
                type="submit"
                value={this.state.answers[i]}
                onChange={this.onInputAnswer}
                className="form-control"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

var json = [
  '{"question":"Whether or not someone suffered emotionally."}',
  '{"question" : "Whether or not some people were treated differently than others."}',
  '{"question" : "Whether or not someone\'s action showed love for his or her country."}',
  '{"question" : "Whether or not someone showed a lack of respect for authority."}',
  '{"question" : "Whether or not someone violated standards of purity and decency."}',
  '{"question" : "Whether or not someone was good at math."}',
  '{"question" : "Whether or not someone cared for someone weak or vulnerable."}',
  '{"question" : "Whether or not someone acted unfairly."}',
  '{"question" : "Whether or not someone did something to betray his or her group."}',
  '{"question" : "Whether or not someone conformed to the traditions of society."}',
  '{"question" : "Whether or not someone did something disgusting."}',
  '{"question" : "Whether or not someone was cruel."}',
  '{"question" : "Whether or not someone was denied his or her rights."}',
  '{"question" : "Whether or not someone showed a lack of loyalty."}',
  '{"question" : "Whether or not an action caused chaos or disorder."}',
  '{"question" : "Whether or not someone acted in a way that God wouldn\'t approve of."}',

  '{"question" : "Compassion for those who are suffering is the most crucial virtue."}',
  '{"question" : "When the government makes laws, the number one principle should be ensuring that everyone is treated fairly."}',
  '{"question" : "I am proud of my country\'s history."}',
  '{"question" : "Respect for authority is something all children need to learn."}',
  '{"question" : "People should not do things that are disgusting, even if no one is harmed."}',
  '{"question" : "It is better to do good than to do bad."}',
  '{"question" : "One of the worst things a person could do is hurt a defenseless animal."}',
  '{"question" : "Justice is the most important requirement for a society."}',
  '{"question" : "People should be loyal to their family members, even when they have done something wrong."}',
  '{"question" : "Men and women each have different roles to play in society."}',
  '{"question" : "I would call some acts wrong on the grounds that they are unnatural."}',
  '{"question" : "It can never be right to kill a human being."}',
  '{"question" : "I think it\'s morally wrong that rich children inherit a lot of money while poor children inherit nothing."}',
  '{"question" : "It is more important to be a team player than to express oneself."}',
  '{"question" : "If I were a soldier and disagreed with my commanding officer\'s orders, I would obey anyway because that is my duty."}',
  '{"question" : "Chastity is an important and valuable virtue."}',
];
