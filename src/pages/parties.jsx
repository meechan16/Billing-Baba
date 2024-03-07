import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/dropdown";
import { dev_url } from "../url";

export default function Parties() {
  const Navigate = useNavigate();
  const [selectedParty, setSelectedParty] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(dev_url + "/get_user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "nulll", // Modify this if necessary
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetch:", data);
        setData(data.data.parties || []); // Ensure data is always an array
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlePartySelect = (party) => {
    setSelectedParty(party);
  };

  return (
    <div id="parties">
      <div className="left">
        <div className="top">
          <button onClick={() => Navigate("/AddParties")}>Add Party +</button>
          <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </div>
        </div>
        <div className="content">
          <div className="head">
            <h2>Name</h2>
            <h2>Amount</h2>
          </div>
          {data.map((party, index) => (
            <div
              className={`tile ${selectedParty === party ? "selected" : ""}`}
              key={index}
              onClick={() => handlePartySelect(party)}
            >
              <h1>{party.partyName}</h1>
              <div className="">
                <p>₹ {party.ammount}</p>
                <Dropdown menuItems={["View/Edit", "Delete"]}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                  </svg>
                </Dropdown>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="right">
        <div className="title">
          <h1>
            {selectedParty ? selectedParty.partyName : "No Party Selected"}
          </h1>
        </div>
        {selectedParty && (
          <div className="content">
            <div className="t">
              <h1>TRANSACTIONS</h1>
              <div className="search">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
                <input type="" />
              </div>
            </div>
            <div className="cl">
              <p className="side">-</p>
              <p>Type</p>
              <p>Number</p>
              <p>Date</p>
              <p>Total</p>
              <p>Balance</p>
              <p className="side">-</p>
            </div>
            {selectedParty.transactions?.map((transaction, index) => (
              <div className="cl" key={index}>
                <p className="side">-</p>
                <p className="grey">Sale</p>
                <p className="grey">1</p>
                <p className="grey">03/02/24</p>
                <p className="grey">{transaction.total}</p>
                <p className="grey">{transaction.balance}</p>
                <p className="side">
                  <Dropdown
                    menuItems={[
                      "View/Edit",
                      "cancel",
                      "Delete",
                      "Duplicate",
                      "Print",
                    ]}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 128 512"
                    >
                      <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                    </svg>
                  </Dropdown>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
