import React, { useState, useEffect } from 'react';
import './Sign.css'
import { GoogleLogin } from 'react-google-login';

const clientId = 'YOUR_CLIENT_ID.apps.googleusercontent.com';

function SignIn() {
    
    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      }


    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="pageTitles">Sign In</h1>
                <div className="username">
                    <label className="title">Enter Username:</label>
                    <input className="input"
                        type="text"
                        placeholder="username"
                    ></input>
                </div>

                <div className="password">
                    <label className="title">Enter Password:</label>
                    <input className="input"
                        type="text"
                        placeholder="password"
                    ></input>
                </div>

                <button className="signInButton">Sign In</button>

                <div>
                    <GoogleLogin
                        clientId="118478485284-2ging11n4fo1c8drq6976espjd1140rq.apps.googleusercontent.com"
                        buttonText="Login"
                        // onSuccess={resGoogle}
                        // onFailure={resGoogle}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    ></GoogleLogin>

                </div>
            
            </div>
        </div>
    )
}

export default SignIn;