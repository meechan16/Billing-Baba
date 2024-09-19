import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import ImageUploader from "../../components/ImgUpload";
import dev_url from "../../url";

export default function AddSales({ data, setData, change, setChange }) {
  const Navigate = useNavigate();
  const [toggle, setToggle] = useState(true);
  const [rows, setRows] = useState([
    {
      index: 1,
      item: "",
      qty: 1,
      unit: "None",
      price_per_unit: 0,
      discount: 0,
      discountPercentage: 0,
      profit: 0,
      amount: 0,
      tax: 0,
      taxPercentage: 0,
    },
  ]);

  const [indexCount, setIndexCount] = useState();
  const addRow = () => {
    setRows([
      ...rows,
      {
        index: indexCount,
        item: "",
        qty: 1,
        unit: "None",
        price_per_unit: 0,
        discount: 0,
        discountPercentage: 0,
        profit: 0,
        amount: 0,
        tax: 0,
        taxPercentage: 0,
      },
    ]);
    setIndexCount(indexCount + 1);
  };

  // const [totalAmount, setTotalAmount] = useState(0);
  // const [profit, setProfit] = useState(0);
  const [totalTax, setTotalTax] = useState(0);

  const handleInputChange = async (index, column, value) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      if (
        column === "qty" ||
        column === "price_per_unit" ||
        column === "profit" ||
        column === "discount" ||
        column === "discountPercentage" ||
        column === "tax" ||
        column === "taxPercentage"
      ) {
        const qty = parseInt(newRows[index]["qty"]);
        const pricePerUnit = parseInt(newRows[index]["price_per_unit"]);
        let discount = parseInt(newRows[index]["discount"]);
        if (newRows[index]["discountPercentage"]) {
          let disPer = parseInt(newRows[index]["discountPercentage"]) / 100;
          discount = pricePerUnit * disPer;
        }

        let tax = 0;
        if (newRows[index]["taxPercentage"]) {
          const taxPercentage = parseInt(newRows[index]["taxPercentage"]);
          tax = (pricePerUnit - discount) * (taxPercentage / 100);
        } else if (newRows[index]["tax"]) {
          tax = parseInt(newRows[index]["tax"]);
        }

        const amount = qty * (pricePerUnit - discount + tax);

        // const amount = qty * (pricePerUnit - discount);

        newRows[index]["tax"] = tax;
        newRows[index]["amount"] = amount;
        newRows[index]["profit"] = newRows[index]["profit_per_item"]
          ? newRows[index]["profit_per_item"] * qty
          : 0;
      }
      newRows[index][column] = value;
      return newRows;
    });
  };

  function generateUniqueInvoiceNumber(data) {
    const existing = new Set(data.map((item) => item.invoice_number));
    let invoice;
    do {
      invoice = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    } while (existing.has(invoice));
    return invoice;
  }
  const [invoice_number, setInvoice_number] = useState(
    generateUniqueInvoiceNumber(data.Transactions)
  );

  const [Party, setParty] = useState(); // Initial index count
  const [Name, setName] = useState(); // Initial index count
  const [phone_no, setPhone_no] = useState(); // Initial index count
  const [ShippingAdd, setShippingAdd] = useState(""); // Initial index count
  const [BillingAdd, setBillingAdd] = useState(""); // Initial index count
  const [invoice_date, setInvoice_date] = useState(""); // Initial index count
  const [state_of_supply, setState_of_supply] = useState({
    state: "",
    isDone: false,
  }); // Initial index count
  const [round_off, setRound_off] = useState(); // Initial index count
  const [paymentType, setpaymentType] = useState("credit"); // Initial index count
  const [Description, setDescription] = useState(); // Initial index count
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [paid, setPaid] = useState(0);

  const [Search, setSearch] = useState(); // Initial index count

  let uid = data.uid;
  let sendData = () => {
    const totalAmount = rows.reduce(
      (total, row) => total + (parseInt(row.amount) || 0),
      0
    );
    const profit = rows.reduce(
      (total, row) => total + (parseInt(row.profit) || 0),
      0
    );
    const totalTax = rows.reduce(
      (total, row) => total + (parseInt(row.amount) ? tax : 0),
      0
    );

    let pending = totalAmount - paid;
    if (Party) {
      if (pending < Party.creditLimit) {
        alert(
          "Customer's Credit Limit Exceeded, Do you wish to continue transaction?"
        );
      }
    }

    const newData = {
      name: Name ? Name : "",
      phone_no: phone_no ? phone_no : "",
      BillingAdd,
      ShippingAdd,
      invoice_number: invoice_number ? invoice_number : "",
      invoice_date: invoice_date ? invoice_date : "",
      state_of_supply: state_of_supply.state ? state_of_supply.state : "",
      payment_type: paymentType ? paymentType : "",
      transactionType: "Sale",
      items: rows ? rows : "",
      round_off: round_off ? round_off : "",
      amount: rows.reduce((total, row) => total + (row.amount || 0), 0),
      profit: profit ? profit : "",
      tax: totalTax,
      description: Description ? Description : "",
      pending: rows.reduce((total, row) => total + (row.amount || 0), 0) - paid,
      paid: paid,
      type: "sale",
      image: ImageList ? ImageList[0].url : "",
    };

    let newDa = data;

    // UPDATING ITEM's Stock
    newData.items.map((ele) => {
      const foundItem = newDa.items.find((ele1) => ele1.Name === ele.item);
      if (foundItem) {
        foundItem.stock = foundItem.stock
          ? parseInt(foundItem.stock) - parseInt(ele.qty)
          : -parseInt(ele.qty);
      }
    });

    // UPDATING DATA
    newDa.Transactions
      ? newDa.Transactions.push(newData)
      : (newDa.Transactions = [newData]);
    newDa.sales ? newDa.sales.push(newData) : (newDa.sales = [newData]);

    // change everywehre this is used to the sum of sales where payment type is credit
    if (newData.payment_type == "credit") {
      newDa.sale_pending
        ? (newDa.sale_pending += parseFloat(newData.total))
        : (newDa.sale_pending = parseFloat(newData.total));
      newDa.to_collect
        ? (newDa.to_collect += parseFloat(newData.pending))
        : (newDa.to_collect = parseFloat(newData.pending));

      let party = newDa.parties.find(
        (ele, index) => ele.partyName === Name || ele.name === Name
      );

      party?.credit
        ? (newDa.parties.find(
            (ele, index) => ele.partyName === Name || ele.name === Name
          ).credit += parseFloat(newData.pending))
        : (newDa.parties.find(
            (ele, index) => ele.partyName === Name || ele.name === Name
          ).credit = parseFloat(newData.pending));
    } else {
      console.log("CASH IN HAND INCREASED");
      newDa.cash_in_hands
        ? (newDa.cash_in_hands += parseFloat(newData.total))
        : (newDa.cash_in_hands = parseFloat(newData.total));
      console.log(newDa);
    }
    newDa.total_sales
      ? (newDa.total_sales += parseFloat(newData.total))
      : (newDa.total_sales = parseFloat(newData.total));
    console.log(newDa);
    // setData(newDa);
    // setChange(!change);
    // Navigate("/sale-invoice");
  };

  let sendData_and_get_pdf = async () => {
    const newData = {
      name: Name ? Name : "",
      phone_no: phone_no ? phone_no : "",
      BillingAdd,
      ShippingAdd,
      invoice_number: invoice_number ? invoice_number : "",
      invoice_date: invoice_date ? invoice_date : "",
      state_of_supply: state_of_supply.state ? state_of_supply.state : "",
      payment_type: paymentType ? paymentType : "",
      transactionType: "Sale",
      items: rows ? rows : "",
      round_off: round_off ? round_off : "",
      amount: rows.reduce((total, row) => total + (row.amount || 0), 0),
      profit: profit ? profit : "",
      tax: totalTax,
      description: Description ? Description : "",
      pending: rows.reduce((total, row) => total + (row.amount || 0), 0) - paid,
      paid: paid,
      type: "sale",
      image: ImageList ? ImageList[0].url : "",
    };

    try {
      let url1 = dev_url + "get-sales-invoice-pdf";
      const response = await fetch(url1, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: uid,
        },
        body: JSON.stringify(newData),
      });
      console.log(response);
      const url = await response.json();
      if (url.link) {
        newData.invoice_link = url.link;
        console.log(url);
        window.open(url.link, "_blank");
        window.location.href = "/";
      } else {
        alert("unable to generate PDF");
        console.error(url);
        return;
      }
      // const blob = await response.blob();
      // const url = URL.createObjectURL(blob);
    } catch (error) {
      alert("unable to generate PDF");
      console.error("Error generating PDF:", error);
      return;
    }

    let newDa = data;
    newDa.Transactions
      ? newDa.Transactions.push(newData)
      : (newDa.Transactions = [newData]);
    newDa.sales ? newDa.sales.push(newData) : (newDa.sales = [newData]);

    // change everywehre this is used to the sum of sales where payment type is credit
    if (newData.payment_type == "credit") {
      newDa.sale_pending
        ? (newDa.sale_pending += parseFloat(newData.total))
        : (newDa.sale_pending = parseFloat(newData.total));
      newDa.to_collect
        ? (newDa.to_collect += parseFloat(newData.pending))
        : (newDa.to_collect = parseFloat(newData.pending));

      newDa.parties.find((index, ele) => ele.name === Name).credit
        ? (newDa.parties.find((index, ele) => ele.name === Name).credit +=
            parseFloat(newData.pending))
        : (newDa.parties.find((index, ele) => ele.name === Name).credit =
            +parseFloat(newData.pending));
    } else {
      newDa.cash_in_hands
        ? (newDa.cash_in_hands += parseFloat(newData.total))
        : (newDa.cash_in_hands = parseFloat(newData.total));
    }
    console.log(newDa);
    setData(newDa);
    setChange(!change);
    Navigate("/sale-invoice");
  };

  let tax = [
    { value: 0, name: "IGST@0%" },
    { value: 0, name: "GST@0%" },
    { value: 0.5, name: "IGST@0.25%" },
    { value: 0.5, name: "GST@0.25%" },
    { value: 3, name: "IGST@3%" },
    { value: 3, name: "GST@3%" },
    { value: 5, name: "IGST@5%" },
    { value: 5, name: "GST@5%" },
    { value: 12, name: "IGST@12%" },
    { value: 18, name: "IGST@18%" },
    { value: 18, name: "GST@18%" },
    { value: 28, name: "IGST@28%" },
    { value: 28, name: "GST @28%" },
  ];
  if (!data.tax) setData({ ...data, tax: tax });

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    const today = new Date();
    setInvoice_date(formatDate(today));
  }, []);

  var [ImageList, setImageList] = useState();

  const [showPopup, setShowPopup] = useState(false);

  const handleUpload = (url) => {
    if (ImageList) setImageList([...ImageList, url]);
    else setImageList([url]);
  };

  const removeImage = (index) => {
    const newImages = [...ImageList];
    newImages.splice(index, 1);
    setImageList(newImages);
  };

  return (
    <div id="addsales" className="text-xs">
      <div className="top">
        <div className="">
          <button onClick={() => Navigate("/")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </button>
          <h1>Sale</h1>
        </div>
        <div className="">
          <p>Credit</p>
          <div
            className={toggle ? "toggle" : "toggle opp"}
            onClick={() => {
              // setpaymentType(toggle ? "Cash" : "Credit");
              setpaymentType(toggle ? "cash" : "credit");
              setToggle(!toggle);
            }}
          >
            <div className="button"></div>
          </div>
          <p>Cash</p>
        </div>
      </div>
      <div className="body text-xs">
        <div className="">
          <div className="ai1">
            <div className="flex flex-col gap-2">
              {/* <div className="l"> */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                </svg> */}
              <div className="flex gap-4">
                <div className="flex gap-1 items-center relative pr-3  border border-gray-300 rounded-md">
                  <input
                    type="text"
                    name="name"
                    value={Name ? Name : Search?.party ? Search?.party : ""}
                    onChange={(e) => setSearch({ party: e.target.value })}
                    placeholder="Search by Name/Phone"
                    className="p-1 bg-white w-[300px] h-[30px] "
                    id=""
                  />
                  {Search?.party && (
                    <ul className="absolute top-6 left-0 w-[400px] z-10 rounded-md shadow-md ">
                      {data.parties
                        .filter((customer) =>
                          customer.partyName
                            .toLowerCase()
                            .includes(Search.party.toLowerCase())
                        )
                        .map((customer) => (
                          <li
                            className="p-1 hover:bg-gray-200  bg-white flex justify-between w-full"
                            key={customer.phone_no}
                            onClick={() => {
                              // i should probably add more than a name to improve future search filter
                              setName(customer.partyName);
                              setPhone_no(customer.phoneNo);
                              setSearch();
                            }}
                          >
                            <h1 className="font-semibold">
                              {customer.partyName}
                            </h1>
                            <p className="text-red-500">{customer.credit}</p>
                          </li>
                        ))}
                      <li
                        className="p-1 hover:bg-gray-200 bg-white flex justify-between w-full text-blue-500"
                        onClick={() => Navigate("/addParties")}
                      >
                        Add Party +
                      </li>
                    </ul>
                  )}
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
                  </svg>
                </div>
                <div className="flex gap-1 items-center border pr-3 border-gray-300 rounded-md">
                  <input
                    type="text"
                    value={phone_no}
                    onChange={(e) => setPhone_no(e.target.value)}
                    name="phNo"
                    placeholder="Phone Number"
                    className="p-1 bg-white w-[300px] h-[30px]  rounded-md"
                    id=""
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                  </svg>
                </div>
              </div>
              <div className="flex gap-4">
                <textarea
                  name=""
                  id=""
                  placeholder="Billing Address"
                  value={BillingAdd}
                  onChange={(e) => setBillingAdd(e.target.value)}
                  cols="35"
                  rows="3"
                  className="p-1 bg-white border border-gray-300 rounded-md"
                ></textarea>
                <textarea
                  name=""
                  value={ShippingAdd}
                  onChange={(e) => setShippingAdd(e.target.value)}
                  id=""
                  placeholder="Shipping Address"
                  cols="35"
                  rows="3"
                  className="p-1 bg-white border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="r">
              <div className="relative group flex items-center">
                <span>Invoice Number</span>
                <input
                  type="number"
                  value={invoice_number}
                  onChange={(e) => setInvoice_number(e.target.value)}
                  name="InvNo"
                  placeholder="input..."
                  className="px-1"
                />
              </div>
              <div className="">
                <span>Invoice Date</span>
                <input
                  type="date"
                  value={invoice_date}
                  onChange={(e) => setInvoice_date(e.target.value)}
                  id="birthday"
                  name="birthday"
                ></input>
              </div>
              <div className="">
                <span>State of supply</span>
                <input
                  type="text"
                  value={state_of_supply.state}
                  onChange={(e) =>
                    setState_of_supply({ state: e.target.value, isDone: false })
                  }
                  name="State"
                  placeholder="input..."
                  id=""
                />
              </div>
              <div className="ne">
                {state_of_supply.state && !state_of_supply.isDone && (
                  <div className="dropdown">
                    {statesAndUnionTerritoriesOfIndia
                      .filter((e) =>
                        e
                          .toLocaleLowerCase()
                          .includes(state_of_supply.state.toLocaleLowerCase())
                      )
                      .map((e, index) => (
                        <p
                          key={index}
                          onClick={() =>
                            setState_of_supply({ state: e, isDone: true })
                          }
                        >
                          {e}
                        </p>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <div className="ai2">
            <div className="rounded-sm flex justify-between gap-1 md-2 items-stretch">
              <p className="w-full h-full py-2  text-center bg-emerald-100 rounded-sm">
                item
              </p>
              <p className="w-full h-full py-2  text-center bg-emerald-100 rounded-sm">
                QTY
              </p>
              <p className="w-full h-max py-2  text-center bg-emerald-100 rounded-sm">
                UNIT
              </p>
              <p className="w-full h-full py-2  text-center bg-emerald-100 rounded-sm">
                PRICE/UNIT
              </p>
              <p className="w-full h-full py-2  text-center bg-emerald-100 rounded-sm">
                <div className="">
                  <span>DESCOUNT</span>
                  <div className="flex justify-evenly gap-2">
                    <span className="w-full  flex-1">Percent</span>
                    <span className="w-full  flex-1">Amount</span>
                  </div>
                </div>
              </p>
              <p className="w-full py-2 text-center bg-emerald-100 rounded-sm">
                <div className="">
                  <span>TAX</span>
                  <div className="flex justify-evenly gap-2">
                    <span className="w-full  flex-1">Percent</span>
                    <span className="w-full  flex-1">Amount</span>
                  </div>
                </div>
              </p>
              <p className="w-full py-2 h-full text-center bg-emerald-100 rounded-sm">
                AMOUNT
              </p>
              <p className="w-[100px] py-2 px-3 h-full text-center bg-emerald-100 rounded-sm">
                -
              </p>
            </div>
            {rows.map((row, rowIndex) => (
              <div
                className="rounded-sm flex justify-between my-1 gap-1 items-center"
                key={rowIndex}
              >
                <div className="w-full relative">
                  <input
                    className="w-full  py-2  text-center bg-gray-100 rounded-sm"
                    value={
                      rows[rowIndex].item
                        ? rows[rowIndex].item
                        : Search
                        ? Search[rowIndex]?.item
                        : ""
                    }
                    onChange={(e) =>
                      setSearch({ rowIndex: { item: e.target.value } })
                    }
                  />
                  {Search?.rowIndex?.item && (
                    <ul className="absolute bg-white w-full">
                      {data.items
                        .filter((item) =>
                          item.Name.toLowerCase().includes(
                            rows[rowIndex].item.toLowerCase()
                          )
                        )
                        .map((item) => (
                          <li
                            key={item.code}
                            onClick={() => {
                              handleInputChange(rowIndex, "item", item.Name);
                              handleInputChange(rowIndex, "item_details", item);
                              // handleInputChange(rowIndex, "tax", item.tax);
                              handleInputChange(
                                rowIndex,
                                "discount",
                                item.discount
                              );
                              handleInputChange(
                                rowIndex,
                                "price_per_unit",
                                item.salesPrice
                              );
                              handleInputChange(
                                rowIndex,
                                "profit",
                                item.profit
                              );
                              handleInputChange(
                                rowIndex,
                                "profit_per_item",
                                item.profit
                              );
                              item.unit
                                ? handleInputChange(rowIndex, "unit", item.unit)
                                : handleInputChange(
                                    rowIndex,
                                    "unit",
                                    "Not Available"
                                  );
                              setSearch({});
                            }}
                            className="p-2 border-b border-gray-300 hover:bg-gray-200 cursor-pointer"
                          >
                            {item.Name}
                          </li>
                        ))}
                      <li
                        className="p-2 text-blue-500 font-semibold hover:bg-gray-200 cursor-pointer"
                        onClick={() => Navigate("/addParties")}
                      >
                        Add Party +
                      </li>
                    </ul>
                  )}
                </div>
                <input
                  type="number"
                  className="w-full  py-2  text-center bg-gray-100 rounded-sm"
                  value={rows[rowIndex].qty}
                  onChange={(e) =>
                    handleInputChange(rowIndex, "qty", e.target.value)
                  }
                />
                <div className="w-full">
                  <input
                    className="w-full  py-2  text-center bg-gray-100 rounded-sm"
                    value={
                      rows[rowIndex].unit
                        ? rows[rowIndex].unit
                        : Search
                        ? Search[rowIndex]?.unit
                        : ""
                    }
                    onChange={(e) =>
                      setSearch({ rowIndex: { unit: e.target.value } })
                    }
                  />
                  {Search?.rowIndex?.unit && (
                    <ul>
                      <li
                        className="add"
                        onClick={() => Navigate("/items?data=addUnit")}
                      >
                        Add Units +
                      </li>
                      {data.units
                        .filter((unit) =>
                          unit.name
                            .toLowerCase()
                            .includes(
                              rows[rowIndex].unit
                                ? rows[rowIndex].unit.toLowerCase()
                                : ""
                            )
                        )
                        .map((unit) => (
                          <li
                            key={unit.name}
                            onClick={() => {
                              // i should probably add more than a name to improve future search filter
                              handleInputChange(rowIndex, "unit", unit.name);
                              setSearch({});
                            }}
                          >
                            {unit.name}
                          </li>
                        ))}
                      <li
                        className="extra"
                        onClick={() => {
                          handleInputChange(rowIndex, "unit", "-");
                          setSearch({});
                        }}
                      >
                        --- none ---
                      </li>
                    </ul>
                  )}
                </div>
                <input
                  className="w-full  py-2  text-center bg-gray-100 rounded-sm"
                  type="number"
                  value={rows[rowIndex].price_per_unit}
                  onChange={(e) =>
                    handleInputChange(
                      rowIndex,
                      "price_per_unit",
                      e.target.value
                    )
                  }
                />
                <div className="w-full flex gap-1">
                  <input
                    className="w-full border border-gray-300 py-2 text-center bg-gray-100 rounded-sm"
                    type="number"
                    value={rows[rowIndex].discountPercentage}
                    onChange={(e) =>
                      handleInputChange(
                        rowIndex,
                        "discountPercentage",
                        e.target.value
                      )
                    }
                  />
                  <input
                    className="w-full py-2 border border-gray-300 text-center bg-gray-100 rounded-sm"
                    type="number"
                    value={rows[rowIndex].discount}
                    onChange={(e) =>
                      handleInputChange(rowIndex, "discount", e.target.value)
                    }
                  />
                </div>
                <div className="w-full flex gap-1">
                  {/* <input
                    className="w-full border border-gray-300 py-2 text-center bg-gray-100 rounded-sm"
                    type="number"
                    value={rows[rowIndex].taxPercentage}
                    onChange={(e) =>
                      handleInputChange(
                        rowIndex,
                        "taxPercentage",
                        e.target.value
                        )
                      }
                      />//
                  <select
                    name=""
                    id=""
                    className="w-full border border-gray-300 py-2 text-center bg-gray-100 rounded-sm"
                    value={rows[rowIndex].taxPercentage}
                    onChange={(e) =>
                      handleInputChange(
                        rowIndex,
                        "taxPercentage",
                        e.target.value
                      )
                    }
                  >
                    {data.tax?.map((unit) => (
                      <option key={unit.name} value={unit.value}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                  <input
                    className="w-full py-2 border border-gray-300 text-center bg-gray-100 rounded-sm"
                    type="number"
                    value={rows[rowIndex].tax}
                    onChange={(e) =>
                      handleInputChange(rowIndex, "tax", e.target.value)
                    }
                  />
                </div>
                <input
                  className="w-full  py-2  text-center bg-gray-100 rounded-sm"
                  type="number"
                  value={rows[rowIndex].amount}
                  onChange={(e) =>
                    handleInputChange(rowIndex, "amount", e.target.value)
                  }
                />
                <button
                  className="w-[100px] py-2 px-3 text-center border border-red-500 hover:bg-red-500 hover:text-white text-red-500 rounded-sm"
                  onClick={() => setRows(rows.filter((r, i) => i !== rowIndex))}
                >
                  X
                </button>
              </div>
            ))}
          </div> */}
          <div className="overflow-x-auto ">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-green-100">
                  <th className="px-1 py-1 border border-gray-300 border-b-0"></th>
                  <th className="px-1 py-1 border border-gray-300 border-b-0">
                    CATEGORY
                  </th>
                  <th className="px-1 py-1 border border-gray-300 border-b-0 w-1/6">
                    ITEM
                  </th>
                  <th className="px-1 py-1 border border-gray-300 border-b-0">
                    DESCRIPTION
                  </th>
                  <th className="px-1 py-1 border border-gray-300 border-b-0">
                    BATCH NO.
                  </th>
                  <th className="px-1 py-1 border border-gray-300 border-b-0">
                    MODEL NO.
                  </th>
                  <th className="px-1 py-1 border border-gray-300 border-b-0">
                    EXP. DATE
                  </th>
                  <th className="px-1 py-1 border border-gray-300 border-b-0">
                    MFG. DATE
                  </th>
                  <th className="px-1 py-1 border border-gray-300 border-b-0">
                    SIZE
                  </th>
                  <th className="px-1 py-1 border border-gray-300 border-b-0">
                    QTY
                  </th>
                  <th className="px-1 py-1 border border-gray-300 border-b-0">
                    UNIT
                  </th>
                  <th className="px-1 py-1 border border-gray-300 border-b-0">
                    PRICE / UNIT
                  </th>
                  {/* Combined Discount Header */}
                  <th
                    colSpan="2"
                    className="px-1 py-1   border border-gray-300"
                  >
                    DISCOUNT
                  </th>
                  {/* Combined Tax Header */}
                  <th
                    colSpan="2"
                    className="px-1 py-1   border border-gray-300"
                  >
                    TAX
                  </th>
                  <th className="px-1 py-1   border border-gray-300 border-b-0">
                    AMOUNT
                  </th>
                  <th className="px-1 py-1   border border-gray-300 border-b-0"></th>
                </tr>
                <tr className="bg-green-100">
                  {/* Empty headers for the first part */}
                  <th className="px-1 py-1  border border-gray-300 border-t-0"></th>
                  <th className="px-1 py-1  border border-gray-300 border-t-0"></th>
                  <th className="px-1 py-1  border border-gray-300 border-t-0"></th>
                  <th className="px-1 py-1  border border-gray-300 border-t-0"></th>
                  <th className="px-1 py-1  border border-gray-300 border-t-0"></th>
                  <th className="px-1 py-1  border border-gray-300 border-t-0"></th>
                  <th className="px-1 py-1  border border-gray-300 border-t-0"></th>
                  <th className="px-1 py-1  border border-gray-300 border-t-0"></th>
                  <th className="px-1 py-1  border border-gray-300 border-t-0"></th>
                  <th className="px-1 py-1  border border-gray-300 border-t-0"></th>
                  <th className="px-1 py-1  border border-gray-300 border-t-0"></th>
                  <th className="px-1 py-1  border border-gray-300 border-t-0"></th>
                  <th className="px-1 py-1  border border-gray-300">%</th>
                  <th className="px-1 py-1  border border-gray-300">AMOUNT</th>
                  <th className="px-1 py-1  border border-gray-300">%</th>
                  <th className="px-1 py-1  border border-gray-300">AMOUNT</th>
                  <th className="px-1 py-1  border border-gray-300 border-t-0"></th>
                  <th className="px-1 py-1  border border-gray-300 border-t-0"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="text-center">
                    <td className="px-1 py-1   border border-gray-300">
                      {rowIndex}
                    </td>
                    <td className="px-1 py-1   border border-gray-300">
                      {/* {row.category} */}
                      <select
                        name=""
                        id=""
                        className="w-full px-1 py-1 text-center"
                      >
                        {data.options?.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className=" w-1/6 border border-gray-300">
                      <input
                        className="w-full px-1 py-1 text-center"
                        value={
                          rows[rowIndex].item
                            ? rows[rowIndex].item
                            : Search
                            ? Search[rowIndex]?.item
                            : ""
                        }
                        onChange={(e) =>
                          setSearch({ rowIndex: { item: e.target.value } })
                        }
                      />
                      {Search?.rowIndex?.item && (
                        <ul className="absolute w-[500px] bg-white">
                          {data.items
                            .filter((item) =>
                              item.Name.toLowerCase().includes(
                                rows[rowIndex].item.toLowerCase()
                              )
                            )
                            .map((item) => (
                              <li
                                key={item.code}
                                onClick={() => {
                                  handleInputChange(
                                    rowIndex,
                                    "item",
                                    item.Name
                                  );
                                  handleInputChange(
                                    rowIndex,
                                    "item_details",
                                    item
                                  );
                                  // handleInputChange(rowIndex, "tax", item.tax);
                                  handleInputChange(
                                    rowIndex,
                                    "discount",
                                    item.discount
                                  );
                                  handleInputChange(
                                    rowIndex,
                                    "price_per_unit",
                                    item.salesPrice
                                  );
                                  handleInputChange(
                                    rowIndex,
                                    "profit",
                                    item.profit
                                  );
                                  handleInputChange(
                                    rowIndex,
                                    "profit_per_item",
                                    item.profit
                                  );
                                  item.unit
                                    ? handleInputChange(
                                        rowIndex,
                                        "unit",
                                        item.unit
                                      )
                                    : handleInputChange(
                                        rowIndex,
                                        "unit",
                                        "Not Available"
                                      );
                                  setSearch({});
                                }}
                                className="p-2 border-b border-gray-300 hover:bg-gray-200 cursor-pointer flex justify-between"
                              >
                                <h1>{item.Name}</h1>
                                <h1
                                  className={
                                    item.stock < item.minToMaintain
                                      ? "text-red-500"
                                      : "text-green-500"
                                  }
                                >
                                  {item.stock}
                                </h1>
                              </li>
                            ))}
                          <li
                            className="p-2 text-blue-500 font-semibold hover:bg-gray-200 cursor-pointer"
                            onClick={() => Navigate("/addParties")}
                          >
                            Add Item +
                          </li>
                        </ul>
                      )}
                    </td>
                    <td className="px-1 py-1   border border-gray-300">
                      {/* {row.description} */}
                      <input
                        className="w-full px-1 py-1 text-center"
                        // value={
                        //   rows[rowIndex].item
                        //     ? rows[rowIndex].item
                        //     : Search
                        //     ? Search[rowIndex]?.item
                        //     : ""
                        // }
                        // onChange={(e) =>
                        //   setSearch({ rowIndex: { item: e.target.value } })
                        // }
                      />
                    </td>
                    <td className="px-1 py-1   border border-gray-300">
                      {/* {row.batchNo} */}
                      <input
                        className="w-full px-1 py-1 text-center"
                        // value={
                        //   rows[rowIndex].item
                        //     ? rows[rowIndex].item
                        //     : Search
                        //     ? Search[rowIndex]?.item
                        //     : ""
                        // }
                        // onChange={(e) =>
                        //   setSearch({ rowIndex: { item: e.target.value } })
                        // }
                      />
                    </td>
                    <td className="px-1 py-1   border border-gray-300">
                      {/* {row.modelNo} */}
                      <input
                        className="w-full px-1 py-1 text-center"
                        // value={
                        //   rows[rowIndex].item
                        //     ? rows[rowIndex].item
                        //     : Search
                        //     ? Search[rowIndex]?.item
                        //     : ""
                        // }
                        // onChange={(e) =>
                        //   setSearch({ rowIndex: { item: e.target.value } })
                        // }
                      />
                    </td>
                    <td className="px-1 py-1   border border-gray-300">
                      {/* {row.expDate} */}
                      <input
                        className="w-full px-1 py-1 text-center"
                        // value={
                        //   rows[rowIndex].item
                        //     ? rows[rowIndex].item
                        //     : Search
                        //     ? Search[rowIndex]?.item
                        //     : ""
                        // }
                        // onChange={(e) =>
                        //   setSearch({ rowIndex: { item: e.target.value } })
                        // }
                      />
                    </td>
                    <td className="px-1 py-1   border border-gray-300">
                      {/* {row.mfgDate} */}
                      <input
                        className="w-full px-1 py-1 text-center"
                        // value={
                        //   rows[rowIndex].item
                        //     ? rows[rowIndex].item
                        //     : Search
                        //     ? Search[rowIndex]?.item
                        //     : ""
                        // }
                        // onChange={(e) =>
                        //   setSearch({ rowIndex: { item: e.target.value } })
                        // }
                      />
                    </td>
                    <td className="px-1 py-1   border border-gray-300">
                      {/* {row.size} */}
                      <input
                        className="w-full px-1 py-1 text-center"
                        // value={
                        //   rows[rowIndex].item
                        //     ? rows[rowIndex].item
                        //     : Search
                        //     ? Search[rowIndex]?.item
                        //     : ""
                        // }
                        // onChange={(e) =>
                        //   setSearch({ rowIndex: { item: e.target.value } })
                        // }
                      />
                    </td>
                    <td className="  border border-gray-300">
                      <input
                        type="number"
                        className="w-full px-1 py-1 text-center"
                        value={rows[rowIndex].qty}
                        onChange={(e) =>
                          handleInputChange(rowIndex, "qty", e.target.value)
                        }
                      />
                    </td>
                    <td className="  border border-gray-300 relative">
                      <input
                        className="w-full  px-1 py-1 text-center bg-gray-100 rounded-sm"
                        value={
                          rows[rowIndex].unit
                            ? rows[rowIndex].unit
                            : Search
                            ? Search[rowIndex]?.unit
                            : ""
                        }
                        onChange={(e) =>
                          setSearch({ rowIndex: { unit: e.target.value } })
                        }
                      />
                      {Search?.rowIndex?.unit && (
                        <ul className="absolute top-6 left-0">
                          <li
                            className="add"
                            onClick={() => Navigate("/items?data=addUnit")}
                          >
                            Add Units +
                          </li>
                          {data.units
                            .filter((unit) =>
                              unit.name
                                .toLowerCase()
                                .includes(
                                  rows[rowIndex].unit
                                    ? rows[rowIndex].unit.toLowerCase()
                                    : ""
                                )
                            )
                            .map((unit) => (
                              <li
                                key={unit.name}
                                onClick={() => {
                                  // i should probably add more than a name to improve future search filter
                                  handleInputChange(
                                    rowIndex,
                                    "unit",
                                    unit.name
                                  );
                                  setSearch({});
                                }}
                              >
                                {unit.name}
                              </li>
                            ))}
                          <li
                            className="extra"
                            onClick={() => {
                              handleInputChange(rowIndex, "unit", "-");
                              setSearch({});
                            }}
                          >
                            --- none ---
                          </li>
                        </ul>
                      )}
                    </td>
                    <td className="  border border-gray-300">
                      <input
                        className="w-full px-1 py-1 text-center bg-gray-100 rounded-sm"
                        type="number"
                        value={rows[rowIndex].price_per_unit}
                        onChange={(e) =>
                          handleInputChange(
                            rowIndex,
                            "price_per_unit",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="  border border-gray-300">
                      <input
                        className="w-full px-1 py-1 text-center"
                        type="number"
                        value={rows[rowIndex].discountPercentage}
                        onChange={(e) =>
                          handleInputChange(
                            rowIndex,
                            "discountPercentage",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="  border border-gray-300">
                      <input
                        className="w-full  px-1 py-1 text-center "
                        type="number"
                        value={rows[rowIndex].discount}
                        onChange={(e) =>
                          handleInputChange(
                            rowIndex,
                            "discount",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="   border border-gray-300">
                      <select
                        name=""
                        id=""
                        className="w-full px-1 py-1 text-center"
                        value={rows[rowIndex].taxPercentage}
                        onChange={(e) =>
                          handleInputChange(
                            rowIndex,
                            "taxPercentage",
                            e.target.value
                          )
                        }
                      >
                        {data.tax?.map((unit) => (
                          <option key={unit.name} value={unit.value}>
                            {unit.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="   border border-gray-300">
                      <input
                        className="w-full px-1 py-1 text-center"
                        type="number"
                        value={rows[rowIndex].tax}
                        onChange={(e) =>
                          handleInputChange(rowIndex, "tax", e.target.value)
                        }
                      />
                    </td>
                    <td className="   border border-gray-300">
                      <input
                        className="w-full px-1 py-1"
                        type="number"
                        value={rows[rowIndex].amount}
                        onChange={(e) =>
                          handleInputChange(rowIndex, "amount", e.target.value)
                        }
                      />
                    </td>
                    <td className=" border border-gray-300">
                      <button
                        className="py-1 px-1 h-full w-full text-center fill-black hover:fill-red-500 rounded-sm"
                        onClick={() =>
                          setRows(rows.filter((r, i) => i !== rowIndex))
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="px-1 py-1  text-end border-x-0 border border-gray-300"></td>
                  <td className="px-1 py-1  text-end border-x-0 border border-gray-300"></td>
                  <td className="px-1 py-1  border-x-0 flex justify-between items-center font-semibold border border-gray-300">
                    <button
                      onClick={addRow}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      ADD ROW
                    </button>
                    <span>Total</span>
                  </td>
                  <td className="px-1 py-1  text-end border border-gray-300 border-x-0"></td>
                  <td className="px-1 py-1  text-end border border-gray-300 border-x-0"></td>
                  <td className="px-1 py-1  text-end border border-gray-300 border-x-0"></td>
                  <td className="px-1 py-1  text-end border border-gray-300 border-x-0"></td>
                  <td className="px-1 py-1  text-end border border-gray-300 border-x-0"></td>
                  <td className="px-1 py-1  text-end border border-gray-300 border-x-0"></td>
                  <td className="px-1 py-1  text-end border border-gray-300 font-semibold border-x-0">
                    {rows.reduce(
                      (total, row) => total + (parseInt(row.qty) || 0),
                      0
                    )}
                  </td>
                  <td className="px-1 py-1  text-end border border-gray-300 border-x-0"></td>
                  <td className="px-1 py-1  text-end border border-gray-300 border-x-0"></td>
                  <td className="px-1 py-1  text-end border border-gray-300 border-x-0"></td>
                  <td className="px-1 py-1  text-end border border-gray-300 font-semibold border-x-0">
                    {rows.reduce(
                      (total, row) => total + (parseInt(row.discount) || 0),
                      0
                    )}
                  </td>
                  <td className="px-1 py-1  text-end border border-gray-300 border-x-0"></td>
                  <td className="px-1 py-1  text-end border border-gray-300 font-semibold border-x-0">
                    {rows.reduce(
                      (total, row) => total + (parseInt(row.tax) || 0),
                      0
                    )}
                  </td>
                  <td className="px-1 py-1  text-end border border-gray-300 font-semibold border-x-0">
                    {rows.reduce(
                      (total, row) => total + (parseInt(row.amount) || 0),
                      0
                    )}
                  </td>
                  <td className="px-1 py-1  text-end border border-gray-300 font-semibold border-x-0"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="">
          <div className="px-4 flex justify-between items-start my-10">
            <div className="flex flex-col gap-1 ">
              <select className="p-2 border w-full border-gray-300 rounded-md">
                <option disabled selected value="">
                  PAYMENT TYPE
                </option>
                <option value="">CASH</option>
                <option value="">CHECK</option>
              </select>
              <textarea
                name=""
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                id=""
                placeholder="Description"
                cols="35"
                rows="3"
                className="p-1 bg-white border border-gray-300 rounded-md"
              />

              {ImageList?.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {ImageList.map((url, index) => (
                    <div
                      key={index}
                      className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden relative my-2"
                    >
                      <img
                        src={url}
                        alt="Product Image"
                        className="w-full h-full object-cover"
                      />
                      <button
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="w-4 h-4"
                        >
                          <path
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160 85.9l11.1-11.6c9.4-10.5 9.4-27.7 0-39.2L
                    135.2 17.7zM32 128H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32S14.3 32 32 32z"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <button
                  onClick={() => setShowPopup(true)}
                  className="p-1 px-3 bg-white border border-gray-500 rounded-md"
                >
                  Add Image
                </button>
              )}
              {showPopup && (
                <ImageUploader
                  onClose={() => setShowPopup(false)}
                  onUpload={handleUpload}
                />
              )}
            </div>
            <div className="flex flex-col gap-1 justify-end">
              <div className="flex items-center gap-2 justify-end">
                <h1>Round Off</h1>
                <input
                  type="number"
                  className="p-2 border w-[100px] text-end bg-white border-gray-300 rounded-md"
                />
                <span>Total</span>
                <p className="p-2 border w-[200px] bg-gray-100 text-end border-gray-300 rounded-md">
                  {rows.reduce((total, row) => total + (row.amount || 0), 0)}
                </p>
              </div>
              <div className="flex gap-2 items-center justify-end">
                <div className=" flex flex-col">
                  <h1>Loyalty points Used</h1>
                  <h1 className="text-xs">Redeemable points: 2000</h1>
                </div>
                <input
                  type="number"
                  className="p-2 w-[200px] bg-white text-end border border-gray-300 rounded-md"
                  // value={paid}
                  // onChange={(e) => setPaid(e.target.value)}
                />{" "}
                ={" "}
                <p className="p-2 w-[200px] text-end bg-gray-100 border border-gray-300 rounded-md">
                  {200}
                </p>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span>Remaining</span>
                <p className="p-2 border  w-[200px] bg-gray-100 text-end border-gray-300 rounded-md">
                  {rows.reduce((total, row) => total + (row.amount || 0), 0) -
                    0}
                </p>
              </div>
              {toggle && (
                <>
                  <div className="flex items-center gap-2 justify-end">
                    <h1>Recieved Amount</h1>
                    <input
                      type="number"
                      className="p-2 border w-[200px]  text-end border-gray-300 rounded-md"
                      value={paid}
                      onChange={(e) => setPaid(e.target.value)}
                    />
                  </div>

                  <div className="">
                    {/* <input
                value={
                  rows[rowIndex]?.tax
                    ? rows[rowIndex].tax
                    : Search
                    ? Search[rowIndex]?.tax
                    : ""
                }
                onChange={(e) =>
                  setSearch({ rowIndex: { tax: e.target.value } })
                }
              /> */}
                    {/* <select
                  name=""
                  id=""
                  onChange={(e) => {
                    // alert(e.target.value);
                    setTotalTax(
                      (e.target.value / 100).toFixed(2) * totalAmount
                    );
                  }}
                >
                  {data.tax?.map((unit) => (
                    <option key={unit.name} value={unit.value}>
                      {unit.name}
                    </option>
                  ))}
                </select> */}
                    {/* <p className="r">{totalTax}</p> */}
                    {/* {Search?.rowIndex?.tax && (
                <ul> */}
                    {/* <li className="add" onClick={() => Navigate("/addParties")}>
                      Add Ta +
                    </li> */}
                    {/* </ul>
              )} */}
                  </div>
                  {/* <div className="r">
                <span>Tax</span>
                <p className="sub">{totalTax}</p>
              </div> */}
                  <div className="flex items-center gap-2 justify-end">
                    <span>Balance</span>
                    <p className="p-2 border w-[200px] bg-gray-100 text-end border-gray-300 rounded-md">
                      {rows.reduce(
                        (total, row) => total + (row.amount || 0),
                        0
                      ) - paid}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="ai5">
            {/* <label>
            Paid
            <input
              type="radio"
              value="paid"
              checked={paymentStatus === "paid"}
              onChange={(e) => setPaymentStatus(e.target.value)}
            />
          </label>
          <br />
          <label>
            Pending
            <input
              type="radio"
              value="pending"
              checked={paymentStatus === "pending"}
              onChange={(e) => setPaymentStatus(e.target.value)}
            />
          </label> */}
            <button className="save1" onClick={() => sendData_and_get_pdf()}>
              Save & Generate Invoice
            </button>
            <button className="save" onClick={() => sendData()}>
              Save
            </button>
            <button className="share">
              Share{" "}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const statesAndUnionTerritoriesOfIndia = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
  "Ladakh",
  "Jammu and Kashmir",
];
