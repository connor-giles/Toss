import React from 'react';
import './Sign.css'



function SignIn() {

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
            
            </div>
        </div>
    )
}

export default SignIn;