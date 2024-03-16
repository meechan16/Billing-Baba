import React from "react";
import { logout, saveUidToLocalStorage } from "../firebase";
import { useNavigate } from "react-router-dom";
import { dev_url } from "../url";

export default function Profile({ data, setData }) {
  const Navigate = useNavigate();
  let uid = data.uid;
  let fetchData = () => {
    fetch(dev_url + "/reset_acc", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: uid, // Modify this if necessary
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("reset:", data);
        alert("account data reset successfull");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div id="profile">
      <h1>
        Name: <span>{data.name}</span>
      </h1>
      <h1>
        Business Name: <span>{data.BusinessName}</span>
      </h1>
      <h1>
        Email: <span>{data.email}</span>
      </h1>
      <h1>
        GSTIN: <span>{data.GSTIN}</span>
      </h1>
      <h1>
        Mobile: <span>{data.mobile}</span>
      </h1>
      <button
        onClick={() => {
          logout();
          saveUidToLocalStorage("");
          Navigate("/login");
        }}
      >
        Log Out
      </button>
      <button onClick={() => fetchData()}>reset data</button>
    </div>
  );
}
