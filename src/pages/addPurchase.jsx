import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddPurchase() {
  const Navigate = useNavigate();
  const [toggle, setToggle] = useState(true);
  const [rows, setRows] = useState([
    {
      index: 1,
      item: "",
      qty: "",
      unit: "",
      price_per_unit: "",
      discount: "",
      tax: "",
      amount: "",
    },
  ]);

  const [indexCount, setIndexCount] = useState(2);
  const addRow = () => {
    setRows([
      ...rows,
      {
        index: indexCount,
        item: "",
        qty: "",
        unit: "",
        price_per_unit: "",
        discount: "",
        tax: "",
        amount: "",
      },
    ]);
    setIndexCount(indexCount + 1);
  };

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalTax, setTotalTax] = useState(0);

  const handleInputChange = async (index, column, value) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      if (
        column === "qty" ||
        column === "price_per_unit" ||
        column === "discount" ||
        column === "tax"
      ) {
        const qty = parseInt(newRows[index]["qty"]);
        const pricePerUnit = parseInt(newRows[index]["price_per_unit"]);
        const discount = parseInt(newRows[index]["discount"]);
        const taxPercentage = parseInt(newRows[index]["tax"]);

        console.log(qty);
        console.log(pricePerUnit);
        console.log(discount);
        const tax = (pricePerUnit - discount) * (taxPercentage / 100);
        console.log(tax);
        // Calculate amount
        const amount = qty * (pricePerUnit - discount + tax);
        newRows[index]["amount"] = amount;

        // Update total amount
        const newTotalAmount = newRows.reduce(
          (total, row) => total + (row.amount || 0),
          0
        );
        setTotalAmount(newTotalAmount);

        // Update total tax
        const newTotalTax = newRows.reduce(
          (total, row) => total + (row.amount ? tax : 0),
          0
        );
        setTotalTax(newTotalTax);
      }
      newRows[index][column] = value;
      return newRows;
    });
  };

  const [phone_no, setPhone_no] = useState(2); // Initial index count
  const [invoice_number, setInvoice_number] = useState(2); // Initial index count
  const [invoice_date, setInvoice_date] = useState(2); // Initial index count
  const [state_of_supply, setState_of_supply] = useState(2); // Initial index count
  const [round_off, setRound_off] = useState(2); // Initial index count
  // const [total, setTotal] = useState(2); // Initial index count

  let sendData = () => {
    const data = {
      phone_no: phone_no,
      invoice_number: invoice_number,
      invoice_date: invoice_date,
      state_of_supply: state_of_supply,
      items: rows,
      round_off: round_off,
      total: totalAmount,
      total_tax: totalTax,
    };

    fetch("http://127.0.0.1:9000/addItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "nulll", // Modify this if necessary
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  let fetchData = () => {
    fetch("http://127.0.0.1:9000/addItems", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "nulll", // Modify this if necessary
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {}, []);
  return (
    <div id="addsales">
      <div className="top">
        <div className="">
          <button onClick={() => Navigate("/")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </button>
          <h1>Purchase</h1>
        </div>
        <div className="">
          <p>Credit</p>
          <div
            className={toggle ? "toggle" : "toggle opp"}
            onClick={() => setToggle(!toggle)}
          >
            <div className="button"></div>
          </div>
          <p>Cash</p>
        </div>
      </div>
      <div className="body">
        <div className="ai1">
          <div className="l">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
            <input
              type="text"
              name="name"
              placeholder="Search by Name/Phone"
              id=""
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </div>

          <div className="r">
            <div className="">
              <span>Phone No</span>
              <input
                type="text"
                value={phone_no}
                onChange={(e) => setPhone_no(e.target.value)}
                name="phNo"
                placeholder="input..."
                id=""
              />
            </div>
            <div className="">
              <span>Invoice Number</span>
              <input
                type="text"
                value={invoice_number}
                onChange={(e) => setInvoice_number(e.target.value)}
                name="InvNo"
                placeholder="input..."
                id=""
              />
            </div>
            <div className="">
              <span>Invoice Date</span>
              {/* <DatePicker
                  selected={invoice_date}
                  onChange={handleChange}
                  dateFormat="dd/MM/yyyy"
                /> */}
              <input
                type="date"
                onChange={(e) => setInvoice_date(e.target.value)}
                id="birthday"
                name="birthday"
              ></input>
              {/* <input
                  type="text"
                  value={invoice_date}
                  onChange={(e) => setInvoice_date(e.target.value)}
                  name="InvDate"
                  placeholder="input..."
                  id=""
                /> */}
            </div>
            <div className="">
              <span>State of supply</span>
              <input
                type="text"
                value={state_of_supply}
                onChange={(e) => setState_of_supply(e.target.value)}
                name="State"
                placeholder="input..."
                id=""
              />
            </div>
          </div>
        </div>
        <div className="ai2">
          <div className="cl top">
            <p>item</p>
            <p>QTY</p>
            <p>UNIT</p>
            <p>PRICE/UNIT</p>
            <p>DISCOUNT</p>
            <p>TAX</p>
            <p>AMOUNT</p>
          </div>
          {rows.map((row, rowIndex) => (
            <div className="cl" key={rowIndex}>
              <div>
                <input
                  value={row.col1}
                  onChange={(e) =>
                    handleInputChange(rowIndex, "item", e.target.value)
                  }
                />
              </div>
              <div>
                <input
                  value={row.col2}
                  onChange={(e) =>
                    handleInputChange(rowIndex, "qty", e.target.value)
                  }
                />
              </div>
              <div>
                {/* <input
                    value={row.col3}
                    onChange={(e) =>
                      handleInputChange(rowIndex, "unit", e.target.value)
                    }
                  /> */}
                <select
                  name=""
                  id=""
                  onChange={(e) =>
                    handleInputChange(rowIndex, "unit", e.target.value)
                  }
                >
                  <option value="">None</option>
                  <option value="BAG">Bag</option>
                  <option value="Gram">Gram</option>
                  <option value="UNIT">UNIT</option>
                </select>
              </div>
              <div>
                <input
                  value={row.col4}
                  onChange={(e) =>
                    handleInputChange(
                      rowIndex,
                      "price_per_unit",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <input
                  value={row.col5}
                  onChange={(e) =>
                    handleInputChange(rowIndex, "discount", e.target.value)
                  }
                />
              </div>
              <div>
                {/* <input
                    value={row.col6}
                    onChange={(e) =>
                      handleInputChange(rowIndex, "tax", e.target.value)
                    }
                  /> */}
                <select
                  name=""
                  id=""
                  onChange={(e) =>
                    handleInputChange(rowIndex, "tax", e.target.value)
                  }
                >
                  <option value="0">IGST@0%</option>
                  <option value="0">GST@0%</option>
                  <option value="0.25">IGST@0.25%</option>
                  <option value="0.25">GST@0.25%</option>
                  <option value="3">IGST@3%</option>
                  <option value="3">GST@3%</option>
                  <option value="5">IGST@5%</option>
                  <option value="5">GST@5%</option>
                  <option value="12">IGST@12%</option>

                  <option value="18">IGST@18%</option>

                  <option value="18">GST@18%</option>

                  <option value="28">IGST@28%</option>

                  <option value="28">GST @28%</option>
                </select>
              </div>
              <div>
                <input
                  value={row.amount}
                  onChange={(e) =>
                    handleInputChange(rowIndex, "amount", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div className="ai3">
          <div className="l">
            <input type="checkbox" name="" id="" />
            <span>Round Off</span>
            <input
              className="in"
              value={round_off}
              onChange={(e) => setRound_off(e.target.value)}
              type="text"
            />
            <button onClick={addRow}>Add Row</button>
            <button
              onClick={() => {
                sendData();
              }}
            >
              send Data
            </button>
            <button
              onClick={() => {
                // console.log(rows);
                fetchData();
              }}
            >
              fetch Data
            </button>
          </div>
          <div className="r">
            <span>Total</span>
            <span>Rs.</span>
            <p>{totalAmount}</p>
            {/* <input
                type="text"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
              /> */}
          </div>
        </div>
        <div className="ai4">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z" />
            </svg>{" "}
            ADD DESCRIPTION
          </button>
          {/* <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
              </svg>{" "}
              ADD IMAGE
            </button> */}
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
            </svg>{" "}
            PAYMENT TYPE
          </button>
        </div>
        <div className="ai5">
          <button className="save">Save</button>
          <button className="share">
            Share{" "}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
