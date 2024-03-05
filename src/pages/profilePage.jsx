import React from "react";
import { logout, saveUidToLocalStorage } from "../firebase";
import { useNavigate } from "react-router-dom";
import { dev_url } from "../url";

export default function Profile() {
  const Navigate = useNavigate();
  let fetchData = () => {
    fetch(dev_url + "/reset_acc", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "nulll", // Modify this if necessary
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
