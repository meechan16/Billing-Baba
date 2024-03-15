import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  saveUidToLocalStorage,
  signInWithGoogle,
} from "../firebase";
import CustomInput from "../components/customInput";

export default function LogIn() {
  const [Switch, setSwitch] = useState(true);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const signup = () => {
    let res = registerWithEmailAndPassword(email, password, name);
    console.log(res);
    alert(res);
    saveUidToLocalStorage(res);
    setSwitch("login");
    history("/");
  };

  const history = useNavigate();
  const login = () => {
    let res = logInWithEmailAndPassword(email, password);
    console.log(res);
    alert(res);
    saveUidToLocalStorage(res.data);
    history("/");
    setSwitch("signup");
  };
  return (
    <div id="login">
      <div className="content">
        <div className="left">
          <h1>Welcome back</h1>
          <p>
            Sign-In to your account to access full range of features and
            capabilities of our software
          </p>
          <img src="./assets/login/login_img.png" alt="" />
        </div>

        <div className="right" action="">
          <div className="top"></div>
          {Switch === "login" && (
            <div className="form login" action="">
              <h1>Log-In Form</h1>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                placeholder="Enter your email"
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                placeholder="Enter your password"
              />
              <button onClick={(e) => login()}>Log In</button>
              <button
                onClick={async (e) => {
                  let res = await signInWithGoogle();
                  saveUidToLocalStorage(res.data.uid);
                  // alert(res.data.uid);
                  history("/");
                }}
                className="google"
              >
                <img src="./assets/google_icon.png" alt="" />
                Log In with Google
              </button>
              <div className="line"></div>
              <p>If you dont have an account, please Sign Up</p>
              <button onClick={() => setSwitch(false)}>Sign Up</button>
            </div>
          )}
          {Switch === "signup" && (
            <div className="form signup" action="">
              <h1>Sign-Up Form</h1>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="email"
                placeholder="email"
              />
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="name"
                placeholder="Full name"
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                placeholder="Password"
              />
              <button onClick={(e) => signup()}>Sign Up</button>
              <button
                onClick={async (e) => {
                  let res = await signInWithGoogle();
                  saveUidToLocalStorage(res.data.uid);
                  history("/");
                }}
                className="google"
              >
                <img src="./assets/google_icon.png" alt="" />
                Log In with Google
              </button>
              <div className="line"></div>
              <p>If you aready have an account, please login</p>
              <button onClick={() => setSwitch(true)}>Log-In</button>
            </div>
          )}
          {Switch === "addInfo" && (
            <div className="info">
              <div className="t">
                <h1>Edit Frim</h1>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                </button>
              </div>
              <CustomInput placeholder={"Business Name"} />
              <CustomInput placeholder={"GSTIN"} />
              <CustomInput placeholder={"Phone No"} />
              <CustomInput placeholder={"Email ID"} />
              <button>Save</button>
            </div>
          )}
        </div>
        {/* <div className="right">
          <h1>Get started</h1>
          <p>
            Already have an account?<a href=""> Log In</a>
          </p>
          <p>Enter 10 digit mobile number</p>

          <div className="inp">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.95 18C14.8667 18 12.8083 17.5458 10.775 16.6375C8.74167 15.7292 6.89167 14.4417 5.225 12.775C3.55833 11.1083 2.27083 9.25833 1.3625 7.225C0.454167 5.19167 0 3.13333 0 1.05C0 0.75 0.1 0.5 0.3 0.3C0.5 0.1 0.75 0 1.05 0H5.1C5.33333 0 5.54167 0.0791667 5.725 0.2375C5.90833 0.395833 6.01667 0.583333 6.05 0.8L6.7 4.3C6.73333 4.56667 6.725 4.79167 6.675 4.975C6.625 5.15833 6.53333 5.31667 6.4 5.45L3.975 7.9C4.30833 8.51667 4.70417 9.1125 5.1625 9.6875C5.62083 10.2625 6.125 10.8167 6.675 11.35C7.19167 11.8667 7.73333 12.3458 8.3 12.7875C8.86667 13.2292 9.46667 13.6333 10.1 14L12.45 11.65C12.6 11.5 12.7958 11.3875 13.0375 11.3125C13.2792 11.2375 13.5167 11.2167 13.75 11.25L17.2 11.95C17.4333 12.0167 17.625 12.1375 17.775 12.3125C17.925 12.4875 18 12.6833 18 12.9V16.95C18 17.25 17.9 17.5 17.7 17.7C17.5 17.9 17.25 18 16.95 18Z"
                fill="#00AEFF"
              />
            </svg>
            <span>+91</span>
            <input type="text" name="" id="" />
          </div>
          <div className="check">
            <input type="checkbox" name="" id="" />
            <span>I have read and agreed to Terms and Conditions.</span>
          </div>
          <button>Create My Account</button>
          <a href="">Help and Support</a>

          <span>
            @ 2022 NextSpeed Technologies Private Limited. All rights reserved
          </span>
        </div> */}
      </div>
    </div>
  );
}
