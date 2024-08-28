import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/dropdown";
import dev_url from "../url";
import EditParties from "./editParties";

export default function Parties({ data, setData, change, setChange }) {
  const Navigate = useNavigate();
  const [selectedParty, setSelectedParty] = useState(null);
  const [TransactionSearc, setTransactionSearch] = useState("");
  const [search, setSearch] = useState(false);
  const [impPtDrp, setimpPtDrp] = useState(false);
  const [page, setPage] = useState("parties");
  const [toggleParties, setToggle] = useState(false);
  const [SearchQuerry, setSearchQuerry] = useState("");

  const [GrpPg, setGrpPg] = useState(0);
  const [GrpPgInps, setGrpPgInps] = useState("");

  // Grp Page
  const AddGrp = (grp) => {
    let newDa = data;
    newDa.groups ? newDa.groups.push(grp) : (newDa.groups = [grp]);
    setData(newDa);
    setChange(!change);
    setGrpPg(0);
  };

  const MoveToGrp = (pt) => {
    let newDa = data;
    let party = newDa.parties.find((par) => par.partyName == pt);
    if (party) {
      party.group = selectedParty;
      setData(newDa);
      setChange(!change);
    } else {
      alert("Party not found");
    }
    setGrpPg(0);
  };

  // parties part
  const handlePartySelect = (party) => {
    setSelectedParty(party);
  };
  const handlePartyRemove = (party) => {
    let newDa = data;
    newDa.parties = newDa.parties.filter(
      (ele) => ele.partyName !== party.partyName
    );
    console.log(newDa);
    setData(newDa);
    setChange(!change);
    setSelectedParty();
  };
  // parties edit
  if (toggleParties)
    return (
      <EditParties
        data={data}
        setData={setData}
        setToggle={setToggle}
        party={selectedParty}
        change={change}
        setChange={setChange}
      />
    );

  return (
    <div className="">
      <div className="topbar">
        <button
          className={page === "parties" ? "selected" : ""}
          onClick={() => {
            setPage("parties");
            setSelectedParty();
          }}
        >
          Parties
        </button>
        <button
          className={page === "groups" ? "selected" : ""}
          onClick={() => {
            setPage("groups");
            setSelectedParty();
          }}
        >
          Groups
        </button>
        <button
          className={page === "loyalty" ? "selected" : ""}
          onClick={() => {
            setPage("loyalty");
            setSelectedParty();
          }}
        >
          Loyalty points
        </button>
      </div>

      {page == "parties" ? (
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
              </div>
            ) : (
              <div className="top">
                <div className="btn">
                  <button onClick={() => Navigate("/AddParties")}>
                    Add Party +
                  </button>
                  <button
                    className="relative"
                    onClick={() => setimpPtDrp(!impPtDrp)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
                    </svg>
                    {impPtDrp && (
                      <button
                        className="absolute top-[20px] font-semibold left-0 p-2 bg-slate-200 text-black w-[180px] rounded-md shadow-md text-white no-wrap"
                        onClick={() => Navigate("/import-parties")}
                      >
                        Import Parties
                      </button>
                    )}
                  </button>
                </div>

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
                          .every((word) =>
                            e.partyName.toLowerCase().includes(word)
                          )
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
                            {party.credit
                              ? party.credit
                              : data?.sales
                                  ?.filter(
                                    (item) => item.name === party.partyName
                                  )
                                  .reduce((acc, obj) => acc + obj.pending, 0)}
                          </p>
                          {/* <Dropdown menuItems={["View/Edit", "Delete"]}> */}

                          <h2 className="hovEle">{party.partyName}</h2>
                          <Dropdown
                            menuItems={[
                              { label: "View/Edit" },
                              { label: "Delete" },
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
                          {party.credit
                            ? party.credit
                            : data?.sales
                                ?.filter(
                                  (item) => item.name === party.partyName
                                )
                                .reduce((acc, obj) => acc + obj.pending, 0)}
                        </p>
                        {/* <Dropdown menuItems={["View/Edit", "Delete"]}> */}
                        {/* <Dropdown
                      menuItems={[{ label: "View/Edit" }, { label: "Delete" }]}
                      isLabelOnly={true}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 512"
                      >
                        <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                      </svg>
                    </Dropdown> */}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          <div className="right">
            {selectedParty ? (
              <div className="rounded-md bg-green-100 mb-2 p-3">
                <h1 className="text-xl font-semibold">
                  {selectedParty.partyName}
                </h1>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col justify-between items-start">
                    <p>Phone Number: {selectedParty.phoneNo}</p>
                    <p>email: {selectedParty.email}</p>
                    <p>Credit Limit:{selectedParty.creditLimit}</p>
                  </div>
                  <div className="flex flex-col justify-start items-end">
                    <p>Address: {selectedParty.Add}</p>
                    <p>GSTIN: {selectedParty.GSTIN}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    className="text-blue-500 font-semibold hover:text-blue-700 text-lg mt-2"
                    onClick={() => setToggle(true)}
                  >
                    Edit Party Details
                  </button>
                  <button
                    className="text-red-500 font-semibold hover:text-red-600 text-lg mt-2"
                    onClick={() => handlePartyRemove(selectedParty)}
                  >
                    Remove Party
                  </button>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
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
                  <p>Payment Type</p>
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
                      <p className="grey">{sale.payment_type}</p>
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
      ) : page == "groups" ? (
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
              </div>
            ) : (
              <div className="top">
                <div className="btn">
                  <button onClick={() => setGrpPg(1)}>Add Groups +</button>
                </div>

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
              </div>
              {SearchQuerry && search
                ? data?.groups
                    ?.filter(
                      (e) =>
                        SearchQuerry.toLowerCase()
                          .split(" ")
                          .every((word) => e.toLowerCase().includes(word))
                      // e.partyName.toLowerCase().includes(SearchQuerry.toLowerCase())
                    )
                    .map((e, index) => (
                      <div
                        className={`tile relative w-full ${
                          selectedParty === e ? "selected" : ""
                        }`}
                        key={index}
                        onClick={() => handlePartySelect(party)}
                      >
                        <h1 className="">{e}</h1>
                      </div>
                    ))
                : data?.groups?.map((party, index) => (
                    <div
                      className={`tile ${
                        selectedParty === party ? "selected" : ""
                      }`}
                      key={index}
                      onClick={() => handlePartySelect(party)}
                    >
                      <h1>{party}</h1>
                    </div>
                  ))}
            </div>
          </div>
          {GrpPg === 1 && (
            <div className="fixed top-0 left-0 h-screen w-screen bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="w-[300px] h-[300px] flex justify-between flex-col items-center bg-white rounded-sm">
                <div className="flex justify-between p-3 bg-blue-200 w-full">
                  <p>Party group</p>
                  <p
                    onClick={() => setGrpPg(0)}
                    className="cursor-pointer font-semibold"
                  >
                    X
                  </p>
                </div>
                <div className="p-3">
                  <p>Enter Party Group</p>
                  <input
                    type="text"
                    className="p-1 border-b-2 border-gray-400"
                    value={GrpPgInps}
                    onChange={(e) => setGrpPgInps(e.target.value)}
                  />
                </div>
                <div className="w-full flex justify-end p-3">
                  <button
                    className="bg-blue-400 font-semibold text-lg px-3 py-1 rounded-md shadow-md text-white"
                    onClick={() => GrpPgInps?.length > 0 && AddGrp(GrpPgInps)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
          {GrpPg === 2 && (
            <div className="fixed top-0 left-0 h-screen w-screen bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="w-[300px] h-[300px] flex justify-between flex-col items-center bg-white rounded-sm">
                <div className="flex justify-between p-3 bg-blue-200 w-full">
                  <p>Parties</p>
                  <p onClick={() => setGrpPg(0)}>X</p>
                </div>
                <div className="p-3">
                  <p>Add Party to Group</p>
                  <input
                    type="text"
                    className="p-1 border-b-2 border-gray-400"
                    value={GrpPgInps.val}
                    onChange={(e) =>
                      setGrpPgInps({ st: false, val: e.target.value })
                    }
                  />
                  {data?.parties
                    ?.filter(
                      (e) =>
                        GrpPgInps?.val
                          ?.toLowerCase()
                          .split(" ")
                          .every((word) =>
                            e.partyName.toLowerCase().includes(word)
                          )
                      // e.partyName.toLowerCase().includes(SearchQuerry.toLowerCase())
                    )
                    .map((party, index) => (
                      <div
                        className={`tile ${
                          GrpPgInps.val === party.partyName ? "selected" : ""
                        }`}
                        key={index}
                        onClick={() =>
                          setGrpPgInps({ st: true, val: party.partyName })
                        }
                      >
                        <h1>{party.partyName}</h1>
                      </div>
                    ))}
                </div>

                <div className="w-full flex justify-end p-3">
                  <button
                    className="bg-blue-400 font-semibold text-lg px-3 py-1 rounded-md shadow-md text-white"
                    onClick={() => GrpPgInps.st && MoveToGrp(GrpPgInps.val)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="right">
            {selectedParty ? (
              <div className="rounded-md bg-green-100 mb-2 p-3">
                <div className="flex justify-between w-full items-center">
                  <h1 className="text-xl font-semibold">{selectedParty}</h1>
                  <button
                    className="text-blue-500 font-semibold hover:text-blue-700 text-lg mt-2"
                    onClick={() => setGrpPg(2)}
                  >
                    Move To This Group
                  </button>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
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
                  <p>PARTY NAME</p>
                  <p>AMOUNT</p>
                  <p className="side">-</p>
                </div>
                {data?.parties
                  ?.filter((item) => item.group === selectedParty)
                  .map((sale, index) => (
                    <div className="cl" key={index}>
                      <p className="grey">{sale.partyName}</p>
                      <p className="">{sale.credit}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      ) : page == "loyalty" ? (
        <div id="parties">
          <div className="right">
            <div className="p-4 rounded-lg m-2 bg-green-100 flex gap-3">
              <p className="flex-1 p-3 rounded-md text-white bg-blue-200  text-2xl">
                {0} <span>total reward points awarded</span>
              </p>
              <p className="flex-1 p-3 rounded-md text-white bg-red-200  text-2xl">
                {0}
                <span>Ammount Given as discount</span>
              </p>
              <p className="flex-1 p-3 rounded-md text-white bg-green-200  text-2xl">
                {0}
                <span>Parties with active Points</span>
              </p>
            </div>
            {/* {selectedParty ? (
              <div className="rounded-md bg-green-100 mb-2 p-3">
                <h1 className="text-xl font-semibold">
                  {selectedParty.partyName}
                </h1>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col justify-between items-start">
                    <p>Phone Number: {selectedParty.phoneNo}</p>
                    <p>email: {selectedParty.email}</p>
                    <p>Credit Limit:{selectedParty.creditLimit}</p>
                  </div>
                  <div className="flex flex-col justify-start items-end">
                    <p>Address: {selectedParty.Add}</p>
                    <p>GSTIN: {selectedParty.GSTIN}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    className="text-blue-500 font-semibold hover:text-blue-700 text-lg mt-2"
                    onClick={() => setToggle(true)}
                  >
                    Edit Party Details
                  </button>
                  <button
                    className="text-red-500 font-semibold hover:text-red-600 text-lg mt-2"
                    onClick={() => handlePartyRemove(selectedParty)}
                  >
                    Remove Party
                  </button>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
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
                  <p>Payment Type</p>
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
                      <p className="grey">{sale.payment_type}</p>
                      <p className="grey">{sale.invoice_number}</p>
                      <p className="">{sale.invoice_date}</p>
                      <p className="grey">{sale.total}</p>
                      <p className="">{sale.total - sale.paid}</p>
                    </div>
                  ))}
              </div>
            )} */}
          </div>
        </div>
      ) : (
        <h1>No page selected</h1>
      )}
    </div>
  );
}
