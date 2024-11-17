import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  saveUidToLocalStorage,
  signInWithGoogle,
} from "../firebase";

export default function LogIn({ sw = false }) {
  const [Switch, setSwitch] = useState(sw ? "add-info" : "login");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [BusinessName, setBusinessName] = useState("");
  const [GSTIN, setGSTIN] = useState("");
  const [Mobile, setMobil] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();
  const signup = () => {
    let res = registerWithEmailAndPassword(email, password, name);
    console.log(res);
    alert(res);
    saveUidToLocalStorage(res);
    setSwitch("login");
    history("/");
  };

  const login = () => {
    let res = logInWithEmailAndPassword(email, password);
    console.log(res);
    alert(res);
    saveUidToLocalStorage(res.data);
    // history("/");
    window.location.href = "/";
    setSwitch("signup");
  };
  return (
    <div className="w-screen h-screen py-3 flex justify-center bg-gray-100 items-center">
        <div className="w-1/3 bg-white rounded-lg shadow-lg flex flex-col justify-between items-center p-3">
          <img src="./assets/BillingBabaLogo.png" className="w-16 h-16" alt="logo" />
          <span className="font-semibold">

          Ab Business Karo Tenstion Free.
          </span>
          
          {Switch === "login" && (
            <>
            <div className="flex w-full">

              <h1 className="font-semibold mt-4 text-xl p-4 flex-1 hover:border-b-2 text-center border-b-2 border-gray-300">Email</h1>
              <h1 className="font-semibold mt-4 text-xl p-4 flex-1 hover:border-b-2 text-center border-gray-200">Mobile No.</h1>
            </div>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                className="p-2 rounded-md shadow-sm hover:shadow-md w-full text-lg mt-2"
                placeholder="Enter your email"
                />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="p-2 rounded-md shadow-sm hover:shadow-md w-full text-lg mt-2"
                name="password"
                placeholder="Enter your password"
              />
              <button onClick={(e) => login()}
                className="flex bg-blue-100 w-full my-4 font-semibold  py-2 px-4 justify-center items-center gap-4 rounded-md shadow-md hover:shadow-lg"
                >Log In</button>
              <button
                onClick={async (e) => {
                  let res = await signInWithGoogle();
                  saveUidToLocalStorage(res.data.uid);
                  // alert(res.data.uid);
                  window.location.href = "/";
                  history("/");
                }}
                className="flex bg-blue-600 w-full my-4 text-white  py-2 px-4 justify-center items-center gap-4 rounded-md shadow-md hover:shadow-lg"
              >
                <img src="./assets/google_icon.png" alt="google logo" className=" w-4 h-" />
                Log In with Google
              </button>
              <div className="line"></div>
              <p>If you dont have an account, please Sign Up</p>
              <button onClick={() => setSwitch("signup")}>Sign Up</button>
            </>
          )}
          {Switch === "signup" && (
            <>
              <h1>Sign-Up Form</h1>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="email"
                placeholder="Email"
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
                  
                  window.location.href = "/";
                  // history("/");
                }}
                className="google"
              >
                <img src="./assets/google_icon.png" alt="" />
                Log In with Google
              </button>
              <div className="line"></div>
              <p>If you aready have an account, please login</p>
              <button onClick={() => setSwitch("login")}>Log-In</button>
            </>
          )}
        </div>
    </div>
  );
}
