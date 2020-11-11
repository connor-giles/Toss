import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';

function Home() {
  const [phaseOne, setPhaseOne] = useState([]);
  const [phaseTwo, setPhaseTwo] = useState([]);
  const [phaseZero, setPhaseZero] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/toss/3Phase0Tosses')
      .then((response) => setPhaseZero(response.data.data.tosses))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3000/toss/3Phase1Tosses')
      .then((response) => setPhaseOne(response.data.data.tosses))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3000/toss/3Phase2Tosses')
      .then((response) => setPhaseTwo(response.data.data.tosses))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="homePage">
      <div className="landing">
        <h1 className="welcome">Welcome to Toss</h1>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
          non enim ut pretium. Morbi accumsan dignissim gravida.{' '}
        </p>
      </div>

      <div className="tossContainer">
        <div className="tossZero">
          <div>
            <h1 className="colTitle">Phase Zero</h1>
            <h2 className="prompts">Prompts</h2>
            {phaseZero.map((toss) => (
              <div className="info">{toss.prompt}</div>
            ))}
            <h3>Starts Tomorrow</h3>
          </div>
        </div>
        <div className="tossOne">
          <div>
            <h1 className="colTitle">Phase One</h1>
            <h2 className="prompts">Prompts</h2>
            {phaseOne.map((toss) => (
              <div className="info">{toss.prompt}</div>
            ))}
            <h3>Starts Today</h3>
          </div>
        </div>
        <div className="tossTwo">
          <div>
            <h1 className="colTitle">Phase Two</h1>
            <h2 className="prompts">Prompts</h2>
            {phaseTwo.map((toss) => (
              <div className="info">{toss.prompt}</div>
            ))}
            <h3>Started Yesterday</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
