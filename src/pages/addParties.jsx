import React, { useState } from "react";
import CustomInput from "../components/customInput";
import { useNavigate } from "react-router-dom";
import dev_url from "../url";
import Loader from "./Loader";
import TextField from "@mui/material/TextField";

export default function AddParties({ data, setData, change, setChange }) {
  const Navigate = useNavigate();
  // var [toggle, setToggle] = useState(true);
  var [page, setPage] = useState("GST");
  var [partyName, setPartyName] = useState("");
  var [GSTIN, setGSTIN] = useState("");
  var [phoneNo, setPhoneNo] = useState("");
  var [GstType, setGstType] = useState("");
  var [state, setState] = useState("");
  var [Email, setEmail] = useState("");
  var [Add, setAdd] = useState("");
  var [OpeningBalance, setOpeningBalance] = useState("");
  var [creditLimit, setcreditLimit] = useState(0);
  var [asDate, setAsDate] = useState("");
  var [AddF1, setAddF1] = useState("");
  var [AddF2, setAddF2] = useState("");
  var [AddF3, setAddF3] = useState("");
  var [loading, setLoading] = useState(false);
  // var [toggle, set] = useState();
  let uid = data.uid;
  const addPartiesReq = async () => {
    let newData = {
      partyName: partyName ? partyName : "",
      GSTIN: GSTIN ? GSTIN : "",
      phoneNo: phoneNo ? phoneNo : "",
      GstType: GstType ? GstType : "",
      state: state ? state : "",
      Email: Email ? Email : "",
      Add: Add ? Add : "",
      OpeningBalance: OpeningBalance ? OpeningBalance : "",
      asDate: asDate ? asDate : "",
      AddF1: AddF1 ? AddF1 : "",
      AddF2: AddF2 ? AddF2 : "",
      AddF3: AddF3 ? AddF3 : "",
      creditLimit: creditLimit,
      transactions: [],
      ammount: 0,
      balance: 0,
    };

    let newDa = data;
    newDa.parties ? newDa.parties.push(newData) : (newDa.parties = [newData]);
    console.log(newDa);
    setData(newDa);
    setChange(!change);
    Navigate("/parties");
  };

  if (loading) return <Loader />;
  return (
    <div id="addItem">
      <div className="container">
        <div className="top">
          <div className="l">
            <h1>Add Party</h1>
            {/* <p>Product</p>
            <div
              className={toggle ? "toggle" : "toggle opp"}
              onClick={() => setToggle(!toggle)}
            >
              <div className="button"></div>
            </div>
            <p>service</p> */}
          </div>
          <div className="r">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000"
                viewBox="0 0 512 512"
              >
                <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
              </svg>
            </button>
            <button onClick={() => Navigate("/parties")}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="c1">
          <div className="p1">
            <CustomInput
              inputValue={partyName}
              setInputValue={setPartyName}
              placeholder={"Party Name *"}
            />
            <CustomInput
              inputValue={GSTIN}
              setInputValue={setGSTIN}
              placeholder={"GSTIN"}
            />
            <CustomInput
              inputValue={phoneNo}
              setInputValue={setPhoneNo}
              placeholder={"Phone Number"}
            />
            {/* <button>Select Unit</button> */}
          </div>
          {/* <div className="p1">
            <select className="box">
              <option selected disabled value="">
                category
              </option>
              <option value="">+ add category</option>
            </select>
            <CustomInput placeholder={"Item Code"} />
          </div> */}
        </div>
        <div className="c2">
          <div className="top t">
            <button
              className={page == "GST" && "active"}
              onClick={() => setPage("GST")}
            >
              GST & Address
            </button>
            <button
              className={page == "Credit" && "active"}
              onClick={() => setPage("Credit")}
            >
              Credit & balance
            </button>
            <button
              className={page == "AddF" && "active"}
              onClick={() => setPage("AddF")}
            >
              Additional Fields
            </button>
          </div>
          {page == "GST" && (
            <div className="p-4">
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <select
                    onChange={(e) => setGstType}
                    name=""
                    id=""
                    className="w-full p-2 border-1 border-gray-800"
                  >
                    <option disabled selected value="">
                      {" "}
                      GST Type
                    </option>
                    <option value="Unregistere/Counsumer">
                      {" "}
                      Unregistere/Counsumer
                    </option>
                    <option value="Registered Business - Regular">
                      {" "}
                      Registered Business - Regular
                    </option>
                    <option value="Registered Business - Consumer">
                      {" "}
                      Registered Business - Consumer
                    </option>
                  </select>
                  {/* <CustomInput
                    inputValue={state}
                    setInputValue={setState}
                    placeholder={"State"}
                  /> */}
                  <TextField
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    id="outlined-basic"
                    label="State"
                    variant="outlined"
                  />
                  <TextField
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                  />
                  {/* <CustomInput
                    inputValue={Email}
                    setInputValue={setEmail}
                    placeholder={"Email Id"}
                  /> */}
                </div>
                <TextField
                  value={Add}
                  onAbort={(e) => setAdd(e.target.value)}
                  id="outlined-multiline-static"
                  label="Billing Address"
                  multiline
                  rows={4}
                  defaultValue=""
                />
              </div>
              {/* <div className="b">
                <CustomInput placeholder={"Purchase Price"} />
                <CustomInput placeholder={"Taxes"} />
              </div> */}
            </div>
          )}
          {page == "Credit" && (
            <div className="flex flex-col">
            <div className="div s">
              <CustomInput
                inputValue={OpeningBalance}
                setInputValue={setOpeningBalance}
                placeholder={"Opening balance"}
              />
              <input
                type="date"
                onChange={(e) => setAsDate(e.target.value)}
                id="birthday"
                name="birthday"
              ></input>
            </div>
            <div className="div">
              <div className="flex flex-col">
              <h1 className="text-lg font-semibold">Set Credit Limit</h1>

              <CustomInput
                inputValue={creditLimit}
                setInputValue={setcreditLimit}
                placeholder={"Set Credit Limit"}
              />
              </div>
            </div>
            </div>
          )}
          {page == "AddF" && (
            <div className="div s">
              <CustomInput
                inputValue={AddF1}
                setInputValue={setAddF1}
                placeholder={"Additional Field 1"}
              />
              <CustomInput
                inputValue={AddF2}
                setInputValue={setAddF2}
                placeholder={"Additional Field 2"}
              />
              <CustomInput
                inputValue={AddF3}
                setInputValue={setAddF3}
                placeholder={"Additional Field 3"}
              />
            </div>
          )}
        </div>
        <div className="c3">
          <button onClick={() => addPartiesReq()}>Save & New</button>
          <button onClick={() => addPartiesReq()}>Save</button>
        </div>
      </div>
    </div>
  );
}
