import React from "react";
import { useNavigate } from "react-router-dom";

export default function EstimatedQuortation({ data, setData }) {
  const Navigate = useNavigate();
  return (
    <div>
      <div id="sale-Order">
        <div className="topbar">
          <button className="selected">ESTIMATE / QUOTATION</button>
        </div>
        <div className="service">
          <img src="./assets/bill.jpg" alt="" />
          <p>
            Make Estimates/Quotations/Proforma Invoices and share with your
            parties by WhatsApp, Email or Printed copies. You can convert them
            to Sale invoices later by just click of a button
          </p>
          <button onClick={() => Navigate("/add-estimation")}>
            Add Your First Estimate
          </button>
        </div>
      </div>
      );
    </div>
  );
}
