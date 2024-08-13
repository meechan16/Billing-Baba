import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/dropdown";
import dev_url from "../url";

export default function Parties({ data, setData }) {
  const Navigate = useNavigate();
  const [selectedParty, setSelectedParty] = useState(null);
  const [TransactionSearc, setTransactionSearch] = useState("");
  const [search, setSearch] = useState(false);
  const [SearchQuerry, setSearchQuerry] = useState("");
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
  //       console.log("Data fetch:", data);
  //       setData(data.data.parties || []); // Ensure data is always an array
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  const handlePartySelect = (party) => {
    setSelectedParty(party);
  };

  return (
    <div id="parties">
      <div className="left">
        {search ? (
          <div className="flex p-2 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-[20px]  mx-2"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            <input
              type="text"
              name=""
              id=""
              value={SearchQuerry}
              onChange={(e) => setSearchQuerry(e.target.value)}
              className="w-full bg-transparent border-b-2 border-gray-700"
            />
            <button onClick={() => setSearch(!search)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="w-[20px] mx-2"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
            {/* {SearchQuerry && search && (
              <div className="absolute mt-7 min-w-[200px]">
                {data?.parties
                  ?.filter((e) =>
                    e.partyName
                      .toLowerCase()
                      .includes(SearchQuerry.toLowerCase())
                  )
                  .map((party, index) => (
                    <div
                      className="flex justify-between gap-3 p-2 rounded-md shadow-md shadow-gray-700 bg-white"
                      key={index}
                      onClick={() => handlePartySelect(party)}
                    >
                      <h1>{party.partyName}</h1>
                      <div className="">
                        <p>
                          ₹{" "}
                          {data?.sales
                            ?.filter((item) => item.name === party.partyName)
                            .reduce((acc, obj) => acc + obj.pending, 0)}
                        </p>
                        <Dropdown menuItems={["View/Edit", "Delete"]}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 512"
                          >
                            <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                          </svg>
                        </Dropdown>
                      </div>
                    </div>
                  ))}
              </div>
            )} */}
          </div>
        ) : (
          <div className="top">
            <button onClick={() => Navigate("/AddParties")}>Add Party +</button>
            <div
              onClick={() => setSearch(!search)}
              // className="bg-transparent p-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-[20px]  mx-2"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </div>
          </div>
        )}
        <div className="content">
          <div className="head">
            <h2>Name</h2>
            <h2>Amount</h2>
          </div>
          {SearchQuerry && search
            ? data?.parties
                ?.filter(
                  (e) =>
                    SearchQuerry.toLowerCase()
                      .split(" ")
                      .every((word) => e.partyName.toLowerCase().includes(word))
                  // e.partyName.toLowerCase().includes(SearchQuerry.toLowerCase())
                )
                .map((party, index) => (
                  <div
                    className={`tile relative w-full ${
                      selectedParty === party ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => handlePartySelect(party)}
                  >
                    <h1 className="">{party.partyName}</h1>
                    <div className="">
                      <p>
                        ₹{" "}
                        {data?.sales
                          ?.filter((item) => item.name === party.partyName)
                          .reduce((acc, obj) => acc + obj.pending, 0)}
                      </p>
                      <Dropdown menuItems={["View/Edit", "Delete"]}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 128 512"
                        >
                          <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                        </svg>
                      </Dropdown>
                    </div>
                  </div>
                ))
            : data?.parties?.map((party, index) => (
                <div
                  className={`tile ${
                    selectedParty === party ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handlePartySelect(party)}
                >
                  <h1>{party.partyName}</h1>
                  {/* <h1>{party.partyName}</h1> */}
                  <h2 className="hovEle">{party.partyName}</h2>
                  <div className="">
                    <p>
                      ₹{" "}
                      {data?.sales
                        ?.filter((item) => item.name === party.partyName)
                        .reduce((acc, obj) => acc + obj.pending, 0)}
                    </p>
                    <Dropdown menuItems={["View/Edit", "Delete"]}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 512"
                      >
                        <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                      </svg>
                    </Dropdown>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <div className="right">
        {selectedParty ? (
          <div className="rounded-md bg-green-100 mb-2 p-3">
            <h1 className="text-xl font-semibold">{selectedParty.partyName}</h1>
            <div className="flex justify-between w-full">
              <div className="flex flex-col justify-between items-start">
                <p>Phone Number: {selectedParty.partyName}</p>
                <p>email: {selectedParty.partyName}</p>
                {selectedParty.creditLimit?(selectedParty.creditLimit):(
                  <p>
                    No Credit limit set{" "}
                    <span className=" text-blue-500">Set Credit Limit</span>
                  </p>    
                )
                }
              </div>
              <div className="flex flex-col justify-start items-end">
                <h1>share</h1>
                <p>Address: {selectedParty.partyName}</p>
                <p>GSTIN: {selectedParty.partyName}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex rounded-md bg-green-100 mb-2 p-3 justify-between">
            <h1>No Party Selected</h1>
          </div>
        )}
        {selectedParty && (
          <div className="content">
            <div className="t">
              <h1>TRANSACTIONS</h1>
              <div className="search">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
                <input
                  type=""
                  value={TransactionSearc}
                  onChange={(e) => setTransactionSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="cl">
              {/* <p className="side">-</p> */}
              <p>Type</p>
              <p>Number</p>
              <p>Date</p>
              <p>Total</p>
              <p>Balance</p>
              <p className="side">-</p>
            </div>
            {data?.sales
              ?.filter(
                (item) =>
                  item.name === selectedParty.partyName &&
                  item.payment_type
                    .toLowerCase()
                    .includes(TransactionSearc.toLowerCase())
              )
              .map((sale, index) => (
                <div className="cl" key={index}>
                  <p className="grey">Sales</p>
                  <p className="grey">{sale.invoice_number}</p>
                  {/* <p className="grey">{sale.name}</p> */}
                  <p className="">{sale.invoice_date}</p>
                  {/* <p className="grey">{sale.items?.length}</p> */}
                  <p className="grey">{sale.total}</p>
                  <p className="">{sale.total - sale.paid}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
