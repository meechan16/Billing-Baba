import React, { useEffect } from "react";
import Sidebar from "../components/sidebar";
import Dashboard from "./dashboard";
import { getUidFromLocalStorage } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Home({ children, part }) {
  const Navigate = useNavigate();
  useEffect(() => {
    let uid = getUidFromLocalStorage();
    // alert(uid);
    if (!uid) {
      Navigate("/landing");
    }
  }, []);

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
          <button className="addSale" onClick={() => Navigate("/additems")}>
            Add Sale <span>{"+"}</span>
          </button>
          <button className="purchase">
            Add Purchase <span>{"+"}</span>
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
