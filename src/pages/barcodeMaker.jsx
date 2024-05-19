import React from "react";

export default function BarcodeMaker({ data, setData }) {
  return (
    <div className="barcode">
      <h1>Create / Get barcodes For Your items</h1>
      <p>Select an Item...</p>
      <div className="items">
        {data?.items?.map((item, index) => (
          <div
            // className={
            //   data.Store_item_codes?.includes(item.Code) ? "cl selected" : "cl"
            // }
            className="item"
            key={index}
            // onClick={() => toggle_select(item)}
          >
            <p>{item.Code}</p>
            <p>{item.Name}</p>
            <p>{item.purchasePrice}</p>
            <p>{item.salesPrice}</p>
            <p>{item.profit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
