import React from "react";
import { logout, saveUidToLocalStorage } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const Navigate = useNavigate();
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
    </div>
  );
}
