import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dev_url from "../url";
import Loader from "./Loader";
import CustomInput from "../components/customInput";

export default function AddExpense({ data, setData, change, setChange }) {
  const Navigate = useNavigate();
  const [toggle, setToggle] = useState(true);
  // var [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([
    {
      index: 1,
      item: "",
      qty: "",
      price: "",
      amount: "",
    },
  ]);

  const [indexCount, setIndexCount] = useState(0);
  const addRow = () => {
    setRows([
      ...rows,
      {
        index: indexCount,
        item: "",
        qty: "",
        price: "",
        amount: "",
      },
    ]);
    setIndexCount(indexCount + 1);
  };

  const [totalAmount, setTotalAmount] = useState(0);

  const handleInputChange = async (index, column, value) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      if (column === "qty" || column === "price") {
        const qty = parseInt(newRows[index]["qty"]);
        const price = parseInt(newRows[index]["price"]);

        console.log(qty);
        // Calculate amount
        const amount = qty * price;
        newRows[index]["amount"] = amount;

        // Update total amount
        const newTotalAmount = newRows.reduce(
          (total, row) => total + (row.amount || 0),
          0
        );
        setTotalAmount(newTotalAmount);

        // Update total tax
        // const newTotalTax = newRows.reduce(
        //   (total, row) => total + (row.amount ? tax : 0),
        //   0
        // );
        // setTotalTax(newTotalTax);
      }
      newRows[index][column] = value;
      return newRows;
    });
  };

  const [searchTerm, setSearchTerm] = useState(""); // Initial index count
  const [Name, setName] = useState(); // Initial index count
  const [invoice_number, setInvoice_number] = useState(); // Initial index count
  const [invoice_date, setInvoice_date] = useState(""); // Initial index count
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setInvoice_date(currentDate);
  }, []);
  // const [paymentType, setpaymentType] = useState("credit"); // Initial index count
  const [Description, setDescription] = useState(); // Initial index count
  const [addExpenseCategory, setAddExpenseCategory] = useState(false); // Initial index count
  const [inputFocus, setInputFocus] = useState(false); // Initial index count

  // let uid = data.uid;
  let addExpense = () => {
    // return;

    const newData = {
      Category: Name ? Name : "",
      invoice_number: invoice_number ? invoice_number : "",
      invoice_date: invoice_date ? invoice_date : "",
      // payment_type: paymentType ? paymentType : "",
      tramsactionType: "Sale",
      items: rows ? rows : "",
      total: totalAmount ? totalAmount : "",
      description: Description ? Description : "",
    };

    let newDa = data;
    newDa.expense ? newDa.expense.push(newData) : (newDa.expense = [newData]);
    newDa.total_expense
      ? (newDa.total_expense += parseFloat(newData.total))
      : (newDa.total_expense = parseFloat(newData.total));
    console.log("newData");
    console.log(newDa);
    setData(newDa);
    setChange(!change);
    Navigate("/expenses");
  };
  const [categoryName, setCategoryName] = useState(""); // Initial index count
  const [categoryType, setCategoryType] = useState(""); // Initial index count

  let addExpCategory = () => {
    console.log("hit");
    // return;

    const newData = {
      name: categoryName ? categoryName : "",
      type: categoryType ? categoryType : "",
    };

    let newDa = data;
    newDa.expenseCategory
      ? newDa.expenseCategory.push(newData)
      : (newDa.expenseCategory = [newData]);
    setData(newDa);
    setChange(!change);
    setCategoryName("");
    setCategoryType("");
    setAddExpenseCategory(!addExpenseCategory);
  };
  return (
    <div id="addsales">
      {addExpenseCategory && (
        <div className="addExpenseCategoryDiv">
          <div className="content">
            <div className="t">
              <h1>Add Expense Category</h1>
              <button onClick={() => setAddExpenseCategory(false)}>x</button>
            </div>
            <CustomInput
              inputValue={categoryName}
              setInputValue={setCategoryName}
              placeholder={"Expense Category"}
            />
            <select
              onChange={(e) => setCategoryType(e.target.value)}
              name=""
              id=""
            >
              <option value="">Dirrect Expense</option>
              <option value="">Indirrect Expense</option>
            </select>
            <button onClick={() => addExpCategory()}>Save</button>
          </div>
        </div>
      )}
      <div className="top">
        <div className="">
          <button onClick={() => Navigate("/expenses")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </button>
          <h1>Expense</h1>
        </div>
        <div className="">
          <p>GST</p>
          <div
            className={toggle ? "toggle" : "toggle opp"}
            onClick={() => {
              // setpaymentType(toggle ? "GST" : "none");
              setToggle(!toggle);
            }}
          >
            <div className="button"></div>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="ai1">
          <div className="search">
            <div className="le">
              <div className="l">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                </svg>
                <input
                  type="text"
                  name="name"
                  onFocus={() => setInputFocus(true)}
                  onBlur={() => setInputFocus(false)}
                  placeholder="Expense Catogroy"
                  id=""
                  value={Name ? Name : searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </div>
            </div>
            {searchTerm && (
              <ul>
                {data.expenseCategory
                  ?.filter((item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item) => (
                    <li
                      key={item.itemCode}
                      onClick={() => {
                        Navigate(item.to);
                        setName(item.name);
                        setSearchTerm("");
                      }}
                    >
                      {item.name}
                    </li>
                  ))}
                <li
                  className="add"
                  onClick={() => {
                    setAddExpenseCategory(true);
                  }}
                >
                  Add Expense Category +
                </li>
              </ul>
            )}
          </div>

          <div className="r">
            <div className="">
              <span>Expense No.</span>
              <input
                type="number"
                value={invoice_number}
                onChange={(e) => setInvoice_number(e.target.value)}
                name="InvNo"
                placeholder="input..."
                id=""
              />
            </div>
            <div className="">
              <span>Date</span>
              <input
                type="date"
                value={invoice_date}
                onChange={(e) => setInvoice_date(e.target.value)}
                id="birthday"
                name="birthday"
              ></input>
            </div>
          </div>
        </div>
        <div className="ai2">
          <div className="cl top">
            <p>ITEM</p>
            <p>QTY</p>
            <p>PRICE</p>
            <p>AMOUNT</p>
          </div>
          {rows.map((row, rowIndex) => (
            <div className="cl" key={rowIndex}>
              <input
                value={row.col1}
                onChange={(e) =>
                  handleInputChange(rowIndex, "item", e.target.value)
                }
              />
              <input
                type="number"
                value={row.col2}
                onChange={(e) =>
                  handleInputChange(rowIndex, "qty", e.target.value)
                }
              />
              <input
                type="number"
                value={row.col4}
                onChange={(e) =>
                  handleInputChange(rowIndex, "price", e.target.value)
                }
              />
              <input
                type="number"
                value={row.amount}
                onChange={(e) =>
                  handleInputChange(rowIndex, "amount", e.target.value)
                }
              />
            </div>
          ))}
        </div>
        <div className="ai3">
          <div className="l">
            <input
              type="text"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add Description..."
            />
            <button onClick={addRow}>ADD ROW</button>
          </div>
          <div className="">
            <div className="r">
              <span>Total</span>
              <span>Rs.</span>
              <p>{totalAmount}</p>
            </div>
          </div>
        </div>
        <div className="ai5">
          <button className="save" onClick={() => addExpense()}>
            Save
          </button>
          <button
            className="share"
            onClick={() => alert("feature not implemented")}
          >
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
