import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SaleOrder() {
  var [page, setPage] = useState("saleOrder");
  const Navigate = useNavigate();
  return (
    <div id="sale-Order">
      <div className="topbar">
        <button
          className={page === "saleOrder" ? "selected" : ""}
          onClick={() => setPage("saleOrder")}
        >
          Sale Order
        </button>
        <button
          className={page === "OnlineOrder" ? "selected" : ""}
          onClick={() => setPage("OnlineOrder")}
        >
          Online Order
        </button>
      </div>
      {page === "saleOrder" && (
        <div className="service">
          <img src="./assets/bill.jpg" alt="" />
          <p>
            Make & share sale orders & convert them to sale invoice instantly.
          </p>
          <button onClick={() => Navigate("/add-items")}>
            Add Your First Sale Order
          </button>
        </div>
      )}
      {page === "OnlineOrder" && (
        <div className="service">
          <img src="./assets/bill.jpg" alt="" />
          <h1>No Online Orders</h1>
          <p>Create your online store to get orders online</p>
          <button onClick={() => Navigate("/add-items")}>Create Store</button>
        </div>
      )}
    </div>
  );
}
