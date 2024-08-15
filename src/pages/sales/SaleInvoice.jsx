import React, { useEffect, useState } from "react";
import dev_url from "../../url";
import Dropdown from "../../components/dropdown";
import { useNavigate } from "react-router-dom";

export default function SaleInvoice({ data, setData }) {
  const Navigate = useNavigate();
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = () => {
  //   fetch(dev_url + "/get_user", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "nulll", // Modify this if necessary
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Data fetch:", data.data.sales);
  //       setData(data.data || []); // Ensure data is always an array
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };
  return (
    <div id="saleInvoice">
      <div className="title">
        <div className="t">
          <div className="l">
            <select name="" id="">
              <option selected value="">
                All Sales Invoice
              </option>
              <option value="">This Month</option>
              <option value="">This Quater</option>
              <option value="">This Year</option>
            </select>
          </div>
          <div className="r">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z" />
              </svg>
              Graphs
            </button>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
              </svg>
              Print
            </button>
          </div>
        </div>
        {/* {data ? selectedParty.partyName : "No Party Selected"} */}
        <div className="b">
          <h1>
            Paid - <span>₹ {data.sale_paid}</span>
          </h1>
          <h1>
            Unpaid - <span>₹ {data.sale_pending}</span>{" "}
          </h1>
          <h1>
            Total - <span>₹ {data.total_sales}</span>
          </h1>
        </div>
      </div>

      {data && (
        <div className="content">
          <div className="t">
            <h1>TRANSACTIONS</h1>
            <div className="">
              <div className="search">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
                <input type="" />
              </div>
              <button onClick={() => Navigate("/addsales")}>+ Add Sale</button>
            </div>
          </div>
          <div className="cl">
            <p>date</p>
            <p>invoiceNo</p>
            <p>PartyName</p>
            <p>Transaction Type</p>
            <p>Payment Type</p>
            <p>Ammount</p>
            <p>Balance Due</p>
            <p className="side">-</p>
          </div>
          {data?.sales?.map((sale, index) => (
            <div className="cl" key={index}>
              <p className="">{sale.invoice_date}</p>
              <p className="grey">{sale.invoice_number}</p>
              <p className="grey">{sale.name}</p>
              <p className="grey">{sale.tramsactionType}</p>
              <p className="grey">{sale.payment_type}</p>
              <p className="grey">{sale.total}</p>
              <p className="">{sale.total - sale.paid}</p>
              <p className="side">
                {/* <Dropdown
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
                > */}
                                  <Dropdown menuItems={[
                                { label: "print"},
                                { label: "forward"},
                                { label: "generate Invoice"},
                                { label: "recieve payment"},
                                { label: "View/Edit"},
                                { label: "cancel"},
                                { label: "Delete"},
                                { label: "Duplicate"},
                                { label: "Print"}
                              ]} isLabelOnly={true}>
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
