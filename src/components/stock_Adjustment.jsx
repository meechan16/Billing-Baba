import React, { useState } from "react";
import CustomInput from "../components/customInput";
// import { useNavigate } from "react-router-dom";

export default function StockAdjust({ setClose }) {
  //   const Navigate = useNavigate();
  var [toggle, setToggle] = useState();
  var [Name, setNane] = useState();
  var [Date, setDate] = useState();
  var [Qty, setQty] = useState();
  var [Price, setPrice] = useState();
  var [Details, setDetails] = useState();
  // var [toggle, set] = useState();

  const addItemReq = async () => {
    let data = {
      Date,
      Qty,
      Price,
      Details,
    };
    console.log(data);
  };

  //   <div id="addItem">
  return (
    <div id="stockAdjust">
      <div className="rounded-md flex flex-col bg-white gap-3">
        <div className="top">
          <div className="l">
            <h1>Stock Ajustment</h1>
            <p>Add Stock</p>
            <div
              className={toggle ? "toggle" : "toggle opp"}
              onClick={() => setToggle(!toggle)}
            >
              <div className="button"></div>
            </div>
            <p>Reduce Stock</p>
          </div>
          <div className="r">
            <button onClick={() => setClose(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-flow-row grid-cols-2 bg-white p-3 ">
          <CustomInput
            inputValue={Name}
            setInputValue={setNane}
            disab="true"
            placeholder="Item Name *"
          />
          <input type="date" onChange={(e) => setDate(e.target.value)} />
          {/* <button>Select Unit</button> */}
          {/* </div>
          <div className="p1"> */}
          <CustomInput
            inputValue={Qty}
            setInputValue={setQty}
            placeholder="TotalQty"
          />
          <CustomInput
            inputValue={Price}
            setInputValue={setPrice}
            placeholder="At Price"
          />
          {/* </div>
          <div className="p1"> */}
          <CustomInput
            inputValue={Details}
            setInputValue={setDetails}
            placeholder="Details"
          />
          {/* </div> */}
        </div>
        <div className="p-3">
          <button
            className="p-3 rounded-md border-2 border-gray-600 w-full"
            onClick={() => addItemReq()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
