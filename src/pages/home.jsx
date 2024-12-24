import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/sidebar";
import Dashboard from "./dashboard";
import { getUidFromLocalStorage } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Home({ children, part, subpart, data, setData }) {
  const [toggle, setToggle] = useState(false);
  const [help, sethelp] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const Navigate = useNavigate();
  useEffect(() => {
    let uid = getUidFromLocalStorage();
    // alert(uid);
    if (!uid) {
      Navigate("/landing");
    }
  }, []);
  const pages = [
    { name: "Home", to: "/" },
    { name: "Parties", to: "/" },
    { name: "Items", to: "/" },
    { name: "Quick Billing", to: "/" },
    { name: "Add Purchase", to: "/" },
    { name: "Add Purchase Order", to: "/" },
    { name: "Payment Out", to: "/" },
    { name: "Purchase Bill", to: "/" },
    { name: "Purchase Order", to: "/" },
    { name: "Purchase Return", to: "/" },
    { name: "Add Estimations", to: "/" },
    { name: "Add Payments", to: "/" },
    { name: "Add Sales", to: "/" },
    { name: "Add Sales Order", to: "/" },
    { name: "Delievery Chalan", to: "/" },
    { name: "Estimated Quortation", to: "/" },
    { name: "Payments In", to: "/" },
    { name: "Sales Invoice", to: "/" },
    { name: "Sales Order", to: "/" },
    { name: "Sales return", to: "/" },
    { name: "Add Expense", to: "/" },
    { name: "Add Items", to: "/" },
    { name: "Add Parties", to: "/" },
    { name: "Cash and Bank", to: "/" },
    { name: "Subscription Plan", to: "/" },
    { name: "Dashboard", to: "/" },
    { name: "E-way Bill", to: "/" },
    { name: "Expense", to: "/" },
    { name: "Settings", to: "/" },
    { name: "utils", to: "/" },
  ];
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        sethelp(false);
      }
    };

    if (help) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [help]);

  return (
    <div id="Home">
      <Sidebar data={data} part={part} subpart={subpart} />
      <div className="body">
        <div id="nav">
          <div className="inp">
            <input
              type="text"
              className="searchbar"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
            {searchTerm && (
              <ul>
                {pages
                  .filter((item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item) => (
                    <li
                      key={item.itemCode}
                      onClick={() => {
                        Navigate(item.to);
                        setSearchTerm("");
                      }}
                    >
                      {item.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div className="relative" ref={dropdownRef}>

          <button onClick={()=>sethelp(!help)} className="text-nowrap font-semibold px-2 text-blue-600 hover:underline">Need Help?</button>
          {help && (
            <div className="absolute bg-white top-10 flex flex-col shadow-md -translate-x-[10%]">
              <span className="p-2 border border-gray-200 text-nowrap text-center hover:bg-gray-200">Schedule meeting</span>
              <span className="p-2 border border-gray-200 text-nowrap text-center hover:bg-gray-200">Send Email</span>
              <span className="p-2 border border-gray-200 text-nowrap text-center hover:bg-gray-200">Whatsapp</span>
              <span className="p-2 border border-gray-200 text-nowrap text-center hover:bg-gray-200">Live chat</span>
              <span className="p-2 border border-gray-200 text-nowrap text-center hover:bg-gray-200">Report Missing feature</span>
            </div>
          )}
          </div>

          {/* <button className="addSale" onClick={() => Navigate("/addsales")}>
            Add Sale <span>{"+"}</span>
          </button>
          <button className="purchase" onClick={() => Navigate("/addPurchase")}>
            Add Purchase <span>{"+"}</span>
          </button> */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="m-3 h-6 w-6 hover:fill-gray-500 hover:shadow-lg"><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/></svg>
          <div className="flex items-center justify-center">
      {/* Sale Button */}

      <button className="px-4 py-2 bg-white pr-8  font-semibold rounded-l-full hover:bg-gray-200 border border-red-400" onClick={() => Navigate("/addsales")}>
        SALE
      </button>

      {/* Middle Blank Button */}
      <div className="relative">
      <button className="p-3 fill-white -translate-x-1/2 -translate-y-1/2  rounded-full bg-red-500 absolute" aria-label="Middle button" onClick={() => setToggle(!toggle)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 448 512"><path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z"/></svg>
      </button>
      {toggle && (
      <div className="absolute p-3 rounded-lg grid grid-cols-2 top-7 shadow-lg -translate-x-1/2 bg-white lg:w-[300px]">
        <button className="block p-3 hover:border-b border-blue-500" onClick={() => Navigate("/addsales")}>Add Sales</button>
        <button className="block p-3 hover:border-b border-blue-500" onClick={() => Navigate("/addpurchase")}>Add Purchase</button>
        <button className="block p-3 hover:border-b border-blue-500" onClick={() => Navigate("/AddParties")}>Add Parties</button>
        <button className="block p-3 hover:border-b border-blue-500" onClick={() => Navigate("/add-items")}>Add Items</button>
        <button className="block p-3 hover:border-b border-blue-500" onClick={() => Navigate("/add-sales-order")}>Add Sales Orders</button>
        <button className="block p-3 hover:border-b border-blue-500" onClick={() => Navigate("/add-purchase-order")}>Add Purchase Orders</button>
        <button className="block p-3 hover:border-b border-blue-500" onClick={() => Navigate("/quick-billing")}>Quick Billing</button>
      </div>
      )}
      </div>


      {/* Purchase Button */}
      <button className="px-4 py-2 bg-white pl-8 text-black border border-red-400 font-semibold rounded-r-full hover:bg-gray-200" onClick={() => Navigate("/addPurchase")}>
        PURCHASE
      </button>
    </div>
          {/* <button className="addMore" onClick={() => setToggle(!toggle)}>
            Add More <span>{"+"}</span>
            <div className={toggle ? "drop active" : "drop"}>
              <button onClick={() => Navigate("/addsales")}>Add Sales</button>
              <button onClick={() => Navigate("/addpurchase")}>
                Add Purchase
              </button>
              <button onClick={() => Navigate("/AddParties")}>
                Add Parties
              </button>
              <button onClick={() => Navigate("/add-items")}>Add Items</button>
              <button onClick={() => Navigate("/add-sales-order")}>
                Add Sales Orders
              </button>
              <button onClick={() => Navigate("/add-purchase-order")}>
                Add Purchase Orders
              </button>
              <button onClick={() => Navigate("/quick-billing")}>
                Quick Billing
              </button>
              {/* <div className="l">

              </div>
              <div className="r">
                <button>-</button>
                <button>-</button>
              </div>
            </div>
          </button> */}
        </div>
        {children}
        {/* <Dashboard /> */}
      </div>
    </div>
  );
}
