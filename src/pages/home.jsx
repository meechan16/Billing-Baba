import React from "react";
import Sidebar from "../components/sidebar";
import Dashboard from "./dashboard";

export default function Home() {
  return (
    <div id="Home">
      <Sidebar />
      <div className="body">
        <div id="nav">
          <input type="text" className="searchbar" />
          <button className="addSale">
            Add Sale<span>{"+"}</span>
          </button>
          <button className="purchase">
            Add Purchase<span>{"+"}</span>
          </button>
          <button className="addMore">
            Add More <span>{"+"}</span>
          </button>
        </div>
        <Dashboard />
      </div>
    </div>
  );
}
