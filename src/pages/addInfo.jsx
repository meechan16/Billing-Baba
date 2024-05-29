import React, { useState } from "react";
import CustomInput from "../components/customInput";
import { useNavigate } from "react-router-dom";
import dev_url from "../url";
import Loader from "./Loader";

export default function AddInfo({ data, setData, uid = null }) {
  const Navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [BusinessName, setBusinessName] = useState("");
  const [GSTIN, setGSTIN] = useState("");
  const [Mobile, setMobil] = useState("");

  const [Loading, setLoading] = useState(false);
  const addItemReq = async () => {
    setLoading(true);
    let dataa = {
      uid: uid ? uid : "",
      Name: name ? name : "",
      BusinessName: BusinessName ? BusinessName : "",
      email: email ? email : "",
      GSTIN: GSTIN ? GSTIN : "",
      Mobile: Mobile ? Mobile : "",
    };
    console.log(dataa);
    let url = dev_url + "addinfo";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: uid, // Modify this if necessary
      },
      body: JSON.stringify(dataa),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("addInfo: ", data);
        setLoading(false);
        alert("done");
        Navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };

  if (data.name) Navigate("/");
  if (Loading) return <Loader />;
  return (
    <div id="info">
      <h1>Add Your Busines Details info</h1>
      <CustomInput
        inputValue={BusinessName}
        setInputValue={setBusinessName}
        placeholder={"Business Name"}
      />
      <CustomInput
        inputValue={name}
        setInputValue={setName}
        placeholder={"Your Name"}
      />
      <CustomInput
        inputValue={GSTIN}
        setInputValue={setGSTIN}
        placeholder={"GSTIN"}
      />
      <CustomInput
        inputValue={Mobile}
        setInputValue={setMobil}
        placeholder={"Phone No"}
      />
      <CustomInput
        inputValue={email}
        setInputValue={setEmail}
        placeholder={"Email ID"}
      />
      <button onClick={() => addItemReq()}>Save</button>
    </div>
  );
}
