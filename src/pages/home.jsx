import React from "react";
import Sidebar from "../components/sidebar";
import Dashboard from "./dashboard";

export default function Home({ children, part }) {
  return (
    <div id="Home">
      <Sidebar part={part} />
      <div className="body">
        <div id="nav">
          <input
            type="text"
            className="searchbar"
            placeholder="Search here..."
          />
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
        {children}
        {/* <Dashboard /> */}
      </div>
    </div>
  );
}
