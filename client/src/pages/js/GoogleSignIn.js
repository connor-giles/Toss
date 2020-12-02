// import React, { useState, useEffect } from 'react';
import React, { Component } from 'react'
import '../css/Sign.css';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import GLoginHooks from '../../components/GLoginHook.js';
import GLogoutHooks from '../../components/GLogoutHook.js';


function SignIn() {
  /*function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
*/
  return (
    <div>
      <GLoginHooks />
      <GLogoutHooks />
    </div>
  );
}

export default SignIn; 