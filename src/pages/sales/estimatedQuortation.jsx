import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/dropdown";

export default function EstimatedQuortation({ data, setData }) {
  const Navigate = useNavigate();
  const [dataList, setDataList] = useState();
  const [convert, toggleConvert] = useState(false);
  useEffect(() => {
    console.log(data.Transactions);
    let list = data.Transactions?.filter(
      (ele, index) => ele.transactionType === "Sale Estimation"
    );
    if (list) setDataList(list);
  }, [data]);
  return (
    <div>
      {dataList ? (
        <div id="saleInvoice">
          <div className="title">
            <div className="t">
              <div className="l">
                <select name="" id="">
                  <option selected value="">
                    All Estimations
                  </option>
                  <option value="">This Month</option>
                  <option value="">This Quater</option>
                  <option value="">This Year</option>
                </select>
              </div>
              {/* <div className="r">
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
          </div> */}
            </div>
            {/* {data ? selectedParty.partyName : "No Party Selected"} */}
            {/* <div className="b">
          <h1>
            Paid - <span>₹ {data.sale_paid}</span>
          </h1>
          <h1>
            Unpaid - <span>₹ {data.sale_pending}</span>{" "}
          </h1>
          <h1>
            Total - <span>₹ {data.total_sales}</span>
          </h1>
        </div> */}
          </div>
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
                <button onClick={() => Navigate("/add-estimation")}>
                  + Add estimation
                </button>
              </div>
            </div>
            <div className="cl">
              <p>date</p>
              <p>Refrence No</p>
              <p>Name</p>
              <p>Total Amount</p>
              <p>Balance</p>
              <p>Status</p>
              <p>Action</p>
              <p className="side">-</p>
            </div>
            {dataList.map((est, index) => (
              <div className="cl" key={index}>
                <p className="">{est.invoice_date}</p>
                <p className="grey">{est.invoice_number}</p>
                <p className="grey">{est.name}</p>
                <p className="grey">{est.total}</p>
                <p className="grey">{est.total}</p>
                <p className="grey text-orange-400">Quortation Open</p>
                <p className="grey relative">
                  <button
                    onClick={() => toggleConvert(!convert)}
                    className="px-2 py-1 shadow-md text-blue-400 bg-white font-semibold"
                  >
                    Convert
                  </button>
                  {convert && (
                    <div className="absolute top-8 bg-white right-0 shadow-md rounded-md">
                      <button className="px-2 w-full py-1 hover:bg-gray-100 text-blue-400 font-semibold">
                        Covert to Sale
                      </button>
                      <button className="px-2 w-full py-1 hover:bg-gray-100 text-blue-400 font-semibold">
                        Covert to Sale Order
                      </button>
                    </div>
                  )}
                </p>
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
                  <Dropdown
                    menuItems={[
                      { label: "print" },
                      { label: "forward" },
                      { label: "generate Invoice" },
                      { label: "recieve payment" },
                      { label: "View/Edit" },
                      { label: "cancel" },
                      { label: "Delete" },
                      { label: "Duplicate" },
                      { label: "Print" },
                    ]}
                    isLabelOnly={true}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 128 512"
                    >
                      <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                    </svg>
                  </Dropdown>
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
