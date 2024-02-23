import React, { useState } from "react";

export default function Login() {
  const [Switch, setSwitch] = useState(true);
  const signup = () => {
    setSwitch(true);
  };
  const login = () => {
    if (false) {
    } else {
      setSwitch(false);
    }
  };
  return (
    <div id="login">
      <div className="page">
        <div className="form" action="">
          <div className="top"></div>
          {Switch ? (
            <div className="form login" action="">
              <h1>Log-In Form</h1>
              <input type="text" name="username" placeholder="Username" />
              <input type="password" name="passwd" placeholder="Password" />
              <button onClick={(e) => login}>Log In</button>
              <br />
            </div>
          ) : (
            <div className="form login" action="">
              <h1>Sign-Up Form</h1>
              <input type="text" name="username" placeholder="Username" />
              <input type="text" name="email" placeholder="email" />
              <input type="text" name="name" placeholder="Full name" />
              <input type="password" name="password" placeholder="Password" />
              <button onClick={(e) => signup}>Sign Up</button>
              <br />
            </div>
          )}
        </div>
      </div>
      <div className="footer">
        <h2>@billing baba</h2>
        <h2>all rights reserved</h2>
      </div>
    </div>
  );
}
