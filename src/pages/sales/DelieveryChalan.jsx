import React from "react";
import { useNavigate } from "react-router-dom";

export default function DelieveryChalan() {
  const Navigate = useNavigate();
  return (
    <div id="sale-Order">
      <div className="topbar">
        <button className="selected">Delievery chalan</button>
      </div>
      <div className="service">
        <img src="./assets/delievery.jpg" alt="" />
        <h1>No Online Orders</h1>
        <p>Create your online store to get orders online</p>
        <button onClick={() => Navigate("/add-items")}>Create Store</button>
      </div>
    </div>
  );
}
