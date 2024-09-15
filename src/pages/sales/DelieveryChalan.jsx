import React from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/dropdown";

export default function DelieveryChalan({ data, setData }) {
  const Navigate = useNavigate();
  return (
    <div id="sale-Order">
      <div className="topbar">
        <button className="selected">Delievery chalan</button>
      </div>
      {data?.Transactions?.filter((ele) => ele.type === "Delivery chalan") ? (
        <div id="saleInvoice">
          {data && (
            <div className="content">
              <div className="t">
                <h1>TRANSACTIONS</h1>
                <div className="">
                  <div className="search">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                    <input type="" />
                  </div>
                  <button onClick={() => Navigate("/add-delivery-chalan")}>
                    + Add Delivery Chalan
                  </button>
                </div>
              </div>
              <div className="cl">
                <p>Date</p>
                <p>Party Name</p>
                <p>Chalan No</p>
                <p>Due Date</p>
                <p>Total Ammount</p>
                <p>Status</p>
                <p>Action</p>
                <p className="side">-</p>
              </div>
              {data?.Transactions?.filter(
                (ele) => ele.type === "Delivery chalan"
              ).map((sale, index) => (
                <div className="cl" key={index}>
                  <p className="">{sale.invoice_date}</p>
                  <p className="grey">{sale.name}</p>
                  <p className="grey">{sale.invoice_number}</p>
                  <p className="grey">{sale.due_date}</p>
                  <p className="grey">{sale.total}</p>
                  <p className="grey">Open</p>
                  <p className="grey">
                    <button className=" py-1 px-3 bg-gray-200 shadow-md text-blue-600">
                      Convert to sale
                    </button>
                  </p>
                  <p className="side">
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
          )}
        </div>
      ) : (
        <div className="service">
          <img src="./assets/delivery.jpg" alt="" />
          <p>
            Make & share delivery challan with your customers & convert it to
            sale whenever you want.
          </p>
          {/* <button onClick={() => Navigate("/add-items")}>Create Store</button> */}
          <button onClick={() => Navigate("/add-delivery-chalan")}>
            Add your first delivery chalan
          </button>
        </div>
      )}
    </div>
  );
}
