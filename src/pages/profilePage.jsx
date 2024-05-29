import React from "react";
import { logout, saveUidToLocalStorage } from "../firebase";
import { useNavigate } from "react-router-dom";
import dev_url from "../url";

export default function Profile({ data, setData }) {
  const Navigate = useNavigate();
  // let uid = data.uid;
  // let resetData = () => {
  //   fetch(dev_url + "/reset_acc", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: uid, // Modify this if necessary
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("reset:", data);
  //       alert("account data reset successfull");
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  return (
    <div id="profile">
      <div className="profileD">
        <div>
          <h1>Name:</h1>
          <span>{data.name}</span>
        </div>
        <div className="">
          <h1>Business Name:</h1>
          <span>{data.BusinessName}</span>
        </div>
        <div className="">
          <h1>Email:</h1>
          <span>{data.email}</span>
        </div>
        <div className="">
          <h1>GSTIN:</h1>
          <span>{data.GSTIN}</span>
        </div>
        <div className="">
          <h1>Mobile:</h1>
          <span>{data.mobile}</span>
        </div>
        <button
          onClick={() => {
            logout();
            saveUidToLocalStorage("");
            Navigate("/login");
          }}
        >
          Log Out
        </button>
        {/* <button onClick={() => resetData()}>reset data</button> */}
      </div>
    </div>
  );
}
