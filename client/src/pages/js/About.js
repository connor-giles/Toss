import React, { useState, useEffect } from 'react';

import '../css/About.css';

function About() {
  return (
    <div className="aboutPage">
      <p className="aboutTitle">ABOUT</p>
      <div className="infoAboutToss">
      <p>T.O.S.S., or This One Study Shows, aims to address a very specific trend in society: stubbornness in beliefs. Oftentimes in an argument or debate, people will bring up a single source (academic or otherwise) that supports their point, and disregard any context or possible other points of view. 
        <br></br>
        <br></br>
        T.O.S.S. aims to change that by exposing users to unique and different viewpoints through an easy to use webapp. It does this by allowing users to respond to a number of predetermined or user-submitted controversial and/or thought-provoking topics or prompts, giving their full opinion and beliefs. It then shows a user the responses made by other users, and prioritizes showing responses from those whose values differ most radically.
        <br></br>
        <br></br>
        This is done using the MFT, or Moral Foundations Test, that every user takes when making an account. The MFT is a series of questions that asks the user how they feel about a variety of morally conflicting choices, ranking their response on a numerical scale, and then determining a score for five core values. When participating in a T.O.S.S., users are shown responses from users whose five core values differ the most from theirs. Combined with the mandatory academic source provided with each response, this allows T.O.S.S. to expose users to new and differing, as well as academically supported beliefs.
    </p>
      </div>
      
    </div>
  );
}

export default About;
