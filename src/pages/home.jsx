import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Dashboard from "./dashboard";
import { getUidFromLocalStorage } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Home({ children, part }) {
  const [toggle, setToggle] = useState(false);
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
          <button className="addSale" onClick={() => Navigate("/addsales")}>
            Add Sale <span>{"+"}</span>
          </button>
          <button className="purchase" onClick={() => Navigate("/addPurchase")}>
            Add Purchase <span>{"+"}</span>
          </button>
          <button className="addMore" onClick={() => setToggle(!toggle)}>
            Add More <span>{"+"}</span>
            <div className={toggle ? "drop active" : "drop"}>
              <div className="l">
                <p>Sales</p>
                <button onClick={() => Navigate("/addsales")}>Add Sales</button>
                <button>-</button>
                <button>-</button>
              </div>
              <div className="r">
                <p>purchase</p>
                <button onClick={() => Navigate("/addpurchase")}>
                  Add Purchase
                </button>
                <button>-</button>
                <button>-</button>
              </div>
            </div>
          </button>
        </div>
        {children}
        {/* <Dashboard /> */}
      </div>
    </div>
  );
}
