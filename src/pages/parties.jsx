import React from "react";

export default function Parties() {
  return (
    <div id="parties">
      <div className="left">
        <div className="top">
          <button>Add Party +</button>
          <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
              <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
            </svg>
          </div>
        </div>
        <div className="content">
          <div className="head">
            <h2>Party</h2>
            <h2>Amount</h2>
          </div>
          <div className="tile selected">
            <h1>Rohit Bhatt</h1>
            <div className="">
              <p>₹ 2000</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
              </svg>
            </div>
          </div>
          <div className="tile">
            <h1>saloni</h1>
            <div className="">
              <p>₹ 1020</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
              </svg>
            </div>
          </div>
          <div className="tile">
            <h1>shefal</h1>
            <div className="">
              <p>₹ 18</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}
