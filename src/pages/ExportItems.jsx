import React from "react";

export default function ExportItems({ data, setData }) {
  return (
    <div id="sale-Order" className="onlineStore">
      <div className="service">
        <img src="./assets/building.jpg" alt="" />
        <h1>Click button below to download item export</h1>
        <p>Items will be exported in excel spreadsheet format</p>
        {/* <button onClick={() => Navigate("/add-purchase-order")}> */}
        <button>Export Items</button>
      </div>
    </div>
  );
}
