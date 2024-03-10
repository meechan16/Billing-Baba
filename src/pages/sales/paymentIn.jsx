import React, { useState, useEffect } from "react";

import { dev_url } from "../../url";
import Dropdown from "../../components/dropdown";

export default function PaymentIn() {
  // filter result by paid payments

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(dev_url + "/get_user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "nulll",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetch:", data.data.sales);
        setData(data.data || []);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div id="saleInvoice">
      <div className="title">
        <div className="t">
          <div className="l"></div>
        </div>
        <h1>
          {/* {data ? selectedParty.partyName : "No Party Selected"} */}
          <div className="b">
            <h1>Paid -</h1>
            <h1>unpaid -</h1>
            <h1>total {data.total_sales}</h1>
          </div>
        </h1>
      </div>
      {data && (
        <div className="content">
          <div className="t">
            <h1>TRANSACTIONS</h1>
            <div className="search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
              <input type="" />
            </div>
          </div>
          <div className="cl">
            <p className="side">#</p>
            <p>DATE</p>
            <p>REF NO</p>
            <p>PARTY NAME</p>
            <p>CATEGORY NAME</p>
            <p>TYPE</p>
            <p>TOTAL</p>
            <p>RECIEVED/PAID</p>
            <p>BALANCE</p>
            <p className="side">-</p>
          </div>
          {data?.sales?.map((sale, index) => (
            <div className="cl" key={index}>
              <p className="side">{index + 1}</p>
              <p className="">{sale.invoice_date}</p>
              <p className="">{sale.ref_number}</p>
              <p className="">{sale.name}</p>
              <p className="">{sale.categoryName}</p>
              <p className="">{sale.type}</p>
              <p className="">{sale.total}</p>
              <p className="">{sale.status}</p>
              <p className="">{sale.balance}</p>
              <p className="side">
                <Dropdown
                  menuItems={[
                    "print",
                    "forward",
                    "generate Invoice",
                    "recieve payment",
                    "View/Edit",
                    "cancel",
                    "Delete",
                    "Duplicate",
                    "Print",
                  ]}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                  </svg>
                </Dropdown>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
