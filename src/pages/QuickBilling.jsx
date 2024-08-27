import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dev_url from "../url";

export default function QuickBilling({ data, setData, t = true }) {
  const Navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedItem, setSelectedItem] = useState(null);
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [billingItems, setBillingItems] = useState([]);

  const [CurrentItems, setCurrentItems] = useState();

  // Sample data
  const items = [
    { name: "tshirt", itemCode: "001", unit: "pcs", total: 600 },
    { name: "pants", itemCode: "002", unit: "pcs", total: 2000 },
    { name: "banana", itemCode: "003", unit: "pcs", total: 70 },
    { name: "shoes", itemCode: "003", unit: "pcs", total: 6000 },
    { name: "apple", itemCode: "003", unit: "pcs", total: 100 },
    { name: "mango", itemCode: "003", unit: "pcs", total: 60 },
    { name: "shirt", itemCode: "003", unit: "pcs", total: 1000 },
    { name: "jeans", itemCode: "003", unit: "pcs", total: 3000 },
    { name: "samsung s24 ultra", itemCode: "003", unit: "pcs", total: 69000 },
    { name: "apple iphone 15", itemCode: "003", unit: "pcs", total: 125000 },
  ];

  useEffect(() => {}, [items]);
  const customers = [
    { name: "Customer 1" },
    { name: "Customer 2" },
    { name: "Customer 3" },
  ];

  const handleItemSelect = async (item) => {
    const existingItemIndex = billingItems.findIndex(
      (billingItem) => billingItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // Item exists, increment the quantity
      const updatedBillingItems = billingItems.map((billingItem, index) => {
        if (index === existingItemIndex) {
          return {
            ...billingItem,
            quantity: billingItem.quantity + 1,
            total: billingItem.total + item.total, // Update total if needed
          };
        }
        return billingItem;
      });

      setBillingItems(updatedBillingItems);
    } else {
      // Item does not exist, add it to the array with a quantity of 1
      setBillingItems([...billingItems, { ...item, quantity: 1 }]);
    }

    setTotalAmount(totalAmount + item.total);
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  // Barcode Locha
  let barcode = "";
  let lastKeyTime = Date.now();

  let [barcodes, setbarcodes] = useState([]);

  document.addEventListener("keydown", async (event) => {
    const currentTime = Date.now();

    // Check if the time between keypresses is less than 50ms to determine if it's part of a barcode scan
    if (currentTime - lastKeyTime > 50) {
      barcode = ""; // Reset barcode if too much time has passed
    }
    lastKeyTime = currentTime;

    // Filter out non-character keys
    if (event.key.length === 1) {
      barcode += event.key;
    }

    if (event.key === "Enter") {
      if (barcode) {
        // setbarcodes([...barcodes, barcode]);
        let item = data.items.find((item, i) => item.Code === barcode);
        if (item) {
          await handleItemSelect(item);
        } else {
          alert("Item not found");
        }
        barcode = ""; // Clear the barcode after processing
      }
    }
  });

  useEffect(() => {
    console.log(barcodes);
  }, [barcodes]);

  return (
    <div id="QuickBilling">
      {/* Left side */}
      <div className="l">
        <div className="w-[75vw]">
          <div className="relative w-full my-1">
            <input
              type="text"
              placeholder="Search item..."
              className="p-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <ul className="absolute w-full bg-white z-10 shadow-lg rounded-lg overflow-hidden">
                {console.log(data.items)}
                {data.items
                  ?.filter((item, index) =>
                    item.Name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item) => (
                    <li
                      key={item.Code}
                      onClick={() => {
                        handleItemSelect({ ...item, quantity: 1 });
                        setSearchTerm("");
                      }}
                      className="flex w-full justify-between items-center p-2"
                    >
                      <p>
                        {item.Code} - {item.Name}
                      </p>
                      <p>{item.salesPrice}</p>
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <table className="w-full">
            <thead className="w-full my-1">
              <tr className="rounded-sm flex w-full justify-between gap-1 md-2 items-center">
                <th className="w-full  py-3  text-center bg-emerald-100 rounded-sm">
                  #
                </th>
                <th className="w-full  py-3  text-center bg-emerald-100 rounded-sm">
                  ITEM CODE
                </th>
                <th className="w-full  py-3  text-center bg-emerald-100 rounded-sm">
                  NAME
                </th>
                <th className="w-full  py-3  text-center bg-emerald-100 rounded-sm">
                  QTY
                </th>
                <th className="w-full  py-3  text-center bg-emerald-100 rounded-sm">
                  Unit
                </th>
                <th className="w-full  py-3  text-center bg-emerald-100 rounded-sm">
                  PRICE / UNIT
                </th>
                <th className="w-full  py-3  text-center bg-emerald-100 rounded-sm">
                  DESCOUNT
                </th>
                <th className="w-full  py-3  text-center bg-emerald-100 rounded-sm">
                  TAX
                </th>
                <th className="w-full  py-3  text-center bg-emerald-100 rounded-sm">
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {billingItems.map((item, index) => (
                <tr
                  key={index}
                  // className={CurrentItems === index ? "selected" : ""}
                  className={`rounded-sm my-1 flex justify-between gap-1 md-2 items-center ${
                    CurrentItems === index && "selected"
                  }`}
                >
                  <td className="w-full  py-3  text-center bg-gray-100 rounded-sm">
                    {item.Code}
                  </td>
                  <td className="w-full  py-3  text-center bg-gray-100 rounded-sm">
                    {index}
                  </td>
                  <td className="w-full  py-3  text-center bg-gray-100 rounded-sm">
                    {item.Name}
                  </td>
                  <td className="w-full  py-3  text-center bg-gray-100 rounded-sm">
                    {item.quantity}
                  </td>
                  <td className="w-full  py-3  text-center bg-gray-100 rounded-sm">
                    {item.unit || "none"}
                  </td>
                  <td className="w-full  py-3  text-center bg-gray-100 rounded-sm">
                    {item.salesPrice}
                  </td>
                  <td className="w-full  py-3  text-center bg-gray-100 rounded-sm">
                    {item.discount}
                  </td>
                  <td className="w-full  py-3  text-center bg-gray-100 rounded-sm">
                    {item.Tax}
                  </td>
                  <td className="w-full  py-3  text-center bg-gray-100 rounded-sm">
                    {item.salesPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="b">
          <button>Change Quantity</button>
          <button>Item Descount</button>
          <button>Remove Item</button>
          <button className="unavailable">Bill Item</button>
          <button className="unavailable">Additionl changes</button>
          <button className="unavailable">Bill discount</button>
          <button className="unavailable">Loyal points</button>
          <button className="unavailable">Remarks</button>
        </div>
      </div>
      {/* // Right side */}
      <div className="r">
        <div className="rounded-lg border border-gray-300 p-2 w-full">
          <h1 className="text-lg font-Poppins font-semibold">
            Customer details
          </h1>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Search customer..."
            value={
              selectedCustomer ? selectedCustomer.name : customerSearchTerm
            }
            disabled={selectedCustomer ? true : false}
            onChange={(e) => setCustomerSearchTerm(e.target.value)}
          />
          {customerSearchTerm && (
            <ul>
              {data.parties
                .filter((customer) =>
                  customer.partyName
                    .toLowerCase()
                    .includes(customerSearchTerm.toLowerCase())
                )
                .map((customer) => (
                  <li
                    key={customer.partyName}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setCustomerSearchTerm("");
                    }}
                  >
                    {customer.partyName}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="rounded-lg border h-full border-gray-300 p-2">
          <h1>Bill Details</h1>
          <div className="flex justify-between">
            <h2>Sub Total:</h2>
          </div>
          <div className="flex justify-between">
            <h2>Total Descounts</h2>
          </div>
          <div className="flex justify-between">
            <h2>Total Tax</h2>
          </div>
          <h1>Total Amount: {totalAmount}</h1>
        </div>
        <div className="rounded-lg border border-gray-300 p-3 mt-1">
          <h1 className="text-md font-semibold"> CASH/UPI</h1>
          <div className="flex justify-between w-full">
            <p className="my-2 text-md">Payment Method</p>
            <select
              name=""
              className="p-2 my-2 border border-b-gray-500 rounded-md"
              id=""
            >
              <option value="cash">Cash</option>
              <option value="credit">Credit</option>
            </select>
          </div>
          <div className="flex justify-between w-full">
            <p className="my-2 text-md">Amount Recieved</p>
            <input
              name=""
              className="p-2 my-2 border border-b-gray-500 rounded-md"
              id=""
            />
          </div>
          <div className="flex justify-between w-full">
            <p className="my-2 text-xl">Change to return</p>
            <p className="my-2 text-xl">{totalAmount}</p>
          </div>

          <button
            className="bg-red-500 text-white p-3 hover:bg-white hover:text-red-500 border-red-500 border-1 rounded-md w-full text-center"
            onClick={() => Navigate("/")}
          >
            Save Bill
          </button>
        </div>
      </div>
    </div>
  );
}

// function QuickBil({ data, setData, t = true }) {
//   const Navigate = useNavigate();
//   const [toggle, setToggle] = useState(true);
//   const [rows, setRows] = useState([
//     {
//       index: 1,
//       item: "",
//       qty: "",
//       unit: "",
//       price_per_unit: "",
//       discount: "",
//       tax: "",
//       amount: "",
//     },
//   ]);

//   const [indexCount, setIndexCount] = useState();
//   const addRow = () => {
//     setRows([
//       ...rows,
//       {
//         index: indexCount,
//         item: "",
//         qty: "",
//         unit: "",
//         price_per_unit: "",
//         discount: "",
//         tax: "",
//         amount: "",
//       },
//     ]);
//     setIndexCount(indexCount + 1);
//   };

//   const [totalAmount, setTotalAmount] = useState(0);
//   const [totalTax, setTotalTax] = useState(0);

//   const handleInputChange = async (index, column, value) => {
//     setRows((prevRows) => {
//       const newRows = [...prevRows];
//       if (
//         column === "qty" ||
//         column === "price_per_unit" ||
//         column === "discount" ||
//         column === "tax"
//       ) {
//         const qty = parseInt(newRows[index]["qty"]);
//         const pricePerUnit = parseInt(newRows[index]["price_per_unit"]);
//         const discount = parseInt(newRows[index]["discount"]);
//         const taxPercentage = parseInt(newRows[index]["tax"]);

//         console.log(qty);
//         console.log(pricePerUnit);
//         console.log(discount);
//         const tax = (pricePerUnit - discount) * (taxPercentage / 100);
//         console.log(tax);
//         // Calculate amount
//         const amount = qty * (pricePerUnit - discount + tax);
//         newRows[index]["amount"] = amount;

//         // Update total amount
//         const newTotalAmount = newRows.reduce(
//           (total, row) => total + (row.amount || 0),
//           0
//         );
//         setTotalAmount(newTotalAmount);

//         // Update total tax
//         const newTotalTax = newRows.reduce(
//           (total, row) => total + (row.amount ? tax : 0),
//           0
//         );
//         setTotalTax(newTotalTax);
//       }
//       newRows[index][column] = value;
//       return newRows;
//     });
//   };

//   const [Name, setName] = useState(); // Initial index count
//   const [phone_no, setPhone_no] = useState(); // Initial index count
//   const [invoice_number, setInvoice_number] = useState(); // Initial index count
//   const [invoice_date, setInvoice_date] = useState(""); // Initial index count
//   const [state_of_supply, setState_of_supply] = useState(); // Initial index count
//   const [round_off, setRound_off] = useState(); // Initial index count
//   const [paymentType, setpaymentType] = useState("credit"); // Initial index count
//   const [Description, setDescription] = useState(); // Initial index count
//   const [paymentStatus, setPaymentStatus] = useState("pending");
//   const [paid, setPaid] = useState(0);
//   const [pending, setPending] = useState(0);
//   useEffect(() => {
//     setPending(totalAmount - paid);
//   }, [totalAmount, paid]);
//   let sendData = () => {
//     const data = {
//       name: Name ? Name : "",
//       phone_no: phone_no ? phone_no : "",
//       invoice_number: invoice_number ? invoice_number : "",
//       invoice_date: invoice_date ? invoice_date : "",
//       state_of_supply: state_of_supply ? state_of_supply : "",
//       payment_type: paymentType ? paymentType : "",
//       transactionType: "Sale",
//       items: rows ? rows : "",
//       round_off: round_off ? round_off : "",
//       total: totalAmount ? totalAmount : "",
//       total_tax: totalTax ? totalTax : "",
//       description: Description ? Description : "",
//       payment_status: paymentStatus ? paymentStatus : "",
//       pending: pending ? pending : "",
//       paid: paid ? paid : "",
//     };
//     let url = dev_url + "addsales";
//     fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "nulll", // Modify this if necessary
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("sales: ", data);
//         alert("done");
//         Navigate("/");
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   let sendData_and_get_pdf = async () => {
//     const data = {
//       name: Name ? Name : "",
//       phone_no: phone_no ? phone_no : "",
//       invoice_number: invoice_number ? invoice_number : "",
//       invoice_date: invoice_date ? invoice_date : "",
//       state_of_supply: state_of_supply ? state_of_supply : "",
//       payment_type: paymentType ? paymentType : "",
//       items: rows ? rows : "",
//       round_off: round_off ? round_off : "",
//       total: totalAmount ? totalAmount : "",
//       total_tax: totalTax ? totalTax : "",
//       description: Description ? Description : "",
//       payment_status: paymentStatus ? paymentStatus : "",
//       pending: pending ? pending : "",
//       paid: paid ? paid : "",
//     };
//     try {
//       let url1 = dev_url + "addsalesAndGetPdf";
//       const response = await fetch(url1, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "nulll",
//         },
//         body: JSON.stringify(data),
//       });
//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       window.open(url, "_blank");
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     }
//   };

//   useEffect(() => {
//     console.log(paymentType);
//   }, [paymentType]);
//   return (
//     <div id="addsales">
//       <div className="top">
//         <div className="">
//           <button onClick={() => Navigate("/")}>
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
//               <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
//             </svg>
//           </button>
//           <h1>Sale</h1>
//         </div>
//         <div className="">
//           <p>Credit</p>
//           <div
//             className={toggle ? "toggle" : "toggle opp"}
//             onClick={() => {
//               setpaymentType(toggle ? "Cash" : "Credit");
//               setToggle(!toggle);
//             }}
//           >
//             <div className="button"></div>
//           </div>
//           <p>Cash</p>
//         </div>
//       </div>
//       <div className="body">
//         <div className="ai1">
//           <div className="le">
//             <div className="l">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
//                 <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
//               </svg>
//               <input
//                 type="text"
//                 name="name"
//                 value={Name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Search by Name/Phone"
//                 id=""
//               />
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                 <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
//               </svg>
//             </div>
//             <div className="l">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                 <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
//               </svg>
//               <input
//                 type="number"
//                 value={phone_no}
//                 onChange={(e) => setPhone_no(e.target.value)}
//                 name="phNo"
//                 placeholder="Phone Number"
//                 id=""
//               />
//             </div>
//           </div>

//           <div className="r">
//             {/* <div className="">
//               <span>Phone No</span>
//               <input
//                 type="text"
//                 value={phone_no}
//                 onChange={(e) => setPhone_no(e.target.value)}
//                 name="phNo"
//                 placeholder="input..."
//                 id=""
//               />
//             </div> */}
//             <div className="">
//               <span>Invoice Number</span>
//               <input
//                 type="number"
//                 value={invoice_number}
//                 onChange={(e) => setInvoice_number(e.target.value)}
//                 name="InvNo"
//                 placeholder="input..."
//                 id=""
//               />
//             </div>
//             <div className="">
//               <span>Invoice Date</span>
//               {/* <DatePicker
//                 selected={invoice_date}
//                 onChange={handleChange}
//                 dateFormat="dd/MM/yyyy"
//               /> */}
//               <input
//                 type="date"
//                 onChange={(e) => setInvoice_date(e.target.value)}
//                 id="birthday"
//                 name="birthday"
//               ></input>
//               {/* <input
//                 type="text"
//                 value={invoice_date}
//                 onChange={(e) => setInvoice_date(e.target.value)}
//                 name="InvDate"
//                 placeholder="input..."
//                 id=""
//               /> */}
//             </div>
//             <div className="">
//               <span>State of supply</span>
//               <input
//                 type="text"
//                 value={state_of_supply}
//                 onChange={(e) => setState_of_supply(e.target.value)}
//                 name="State"
//                 placeholder="input..."
//                 id=""
//               />
//             </div>
//           </div>
//         </div>
//         <div className="ai2">
//           <div className="cl top">
//             <p>item</p>
//             <p>QTY</p>
//             <p>UNIT</p>
//             <p>PRICE/UNIT</p>
//             <p>DISCOUNT</p>
//             <p>TAX</p>
//             <p>AMOUNT</p>
//           </div>
//           {rows.map((row, rowIndex) => (
//             <div className="cl" key={rowIndex}>
//               <div>
//                 <input
//                   value={row.col1}
//                   onChange={(e) =>
//                     handleInputChange(rowIndex, "item", e.target.value)
//                   }
//                 />
//               </div>
//               <div>
//                 <input
//                   type="number"
//                   value={row.col2}
//                   onChange={(e) =>
//                     handleInputChange(rowIndex, "qty", e.target.value)
//                   }
//                 />
//               </div>
//               <div>
//                 {/* <input
//                   value={row.col3}
//                   onChange={(e) =>
//                     handleInputChange(rowIndex, "unit", e.target.value)
//                   }
//                 /> */}
//                 <select
//                   name=""
//                   id=""
//                   onChange={(e) =>
//                     handleInputChange(rowIndex, "unit", e.target.value)
//                   }
//                 >
//                   <option value="">None</option>
//                   <option value="BAG">Bag</option>
//                   <option value="Gram">Gram</option>
//                   <option value="UNIT">UNIT</option>
//                 </select>
//               </div>
//               <div>
//                 <input
//                   type="number"
//                   value={row.col4}
//                   onChange={(e) =>
//                     handleInputChange(
//                       rowIndex,
//                       "price_per_unit",
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>
//               <div>
//                 <input
//                   type="number"
//                   value={row.col5}
//                   onChange={(e) =>
//                     handleInputChange(rowIndex, "discount", e.target.value)
//                   }
//                 />
//               </div>
//               <div>
//                 {/* <input
//                   value={row.col6}
//                   onChange={(e) =>
//                     handleInputChange(rowIndex, "tax", e.target.value)
//                   }
//                 />

// give me react component page that is used as a quick billing portal, page is devided into 2 sides,

// on left on top there's input box, as we type input it search name attribute from array of objects of item, and show it in dropdown, once we select one object, objet's "name" and "itemcode" "unit" and "price" is apended into table below,

// on the right on top theres an iinput bar that is search for customer's name, it search from array of customer's object for name and show suggestion in dropdown, and we select a object from dropdown, under input we have "total ammount" h1 for addition of all objects, and "save bill" button
//                 */}
//                 <select
//                   name=""
//                   id=""
//                   onChange={(e) =>
//                     handleInputChange(rowIndex, "tax", e.target.value)
//                   }
//                 >
//                   <option value="0">IGST@0%</option>
//                   <option value="0">GST@0%</option>
//                   <option value="0.25">IGST@0.25%</option>
//                   <option value="0.25">GST@0.25%</option>
//                   <option value="3">IGST@3%</option>
//                   <option value="3">GST@3%</option>
//                   <option value="5">IGST@5%</option>
//                   <option value="5">GST@5%</option>
//                   <option value="12">IGST@12%</option>

//                   <option value="18">IGST@18%</option>

//                   <option value="18">GST@18%</option>

//                   <option value="28">IGST@28%</option>

//                   <option value="28">GST @28%</option>
//                 </select>
//               </div>
//               <div>
//                 <input
//                   type="number"
//                   value={row.amount}
//                   onChange={(e) =>
//                     handleInputChange(rowIndex, "amount", e.target.value)
//                   }
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="ai3">
//           <div className="l">
//             {/* <input type="checkbox" name="" id="" />
//             <span>Round Off</span>
//             <input
//               className="in"
//               value={round_off}
//               onChange={(e) => setRound_off(e.target.value)}
//               type="text"
//             /> */}

//             <input
//               type="text"
//               value={Description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Add Description..."
//             />
//             {/* <select onChange={(e) => setpaymentType(e.target.value)}>

//               <option disabled selected value="">
//                 PAYMENT TYPE
//               </option>
//               <option value="">CASH</option>
//               <option value="">CHECK</option>
//             </select> */}
//             <button onClick={addRow}>ADD ROW</button>
//             {/* <button
//               onClick={() => {
//                 sendData();
//               }}
//             >
//               send Data
//             </button> */}
//             {/* <button
//               onClick={() => {
//                 // console.log(rows);
//                 fetchData();
//               }}
//             >
//               fetch Data
//             </button> */}
//           </div>
//           <div className="">
//             {paymentStatus === "pending" && (
//               <div className="a">
//                 <span>Amount paid: </span>
//                 <input
//                   type="number"
//                   value={paid}
//                   onChange={(e) => setPaid(e.target.value)}
//                 />
//               </div>
//             )}
//             <div className="r">
//               <span>Total</span>
//               <span>Rs.</span>
//               <p>{totalAmount}</p>
//             </div>
//           </div>
//         </div>
//         <div className="ai4">{/* <p>{paymentStatus}</p> */}</div>
//         <div className="ai5">
//           <label>
//             Paid
//             <input
//               type="radio"
//               value="paid"
//               checked={paymentStatus === "paid"}
//               onChange={(e) => setPaymentStatus(e.target.value)}
//             />
//           </label>
//           <br />
//           <label>
//             Pending
//             <input
//               type="radio"
//               value="pending"
//               checked={paymentStatus === "pending"}
//               onChange={(e) => setPaymentStatus(e.target.value)}
//             />
//           </label>
//           <button className="save1" onClick={() => sendData_and_get_pdf()}>
//             Save & Generate Invoice
//           </button>
//           <button className="save" onClick={() => sendData()}>
//             Save
//           </button>
//           <button className="share">
//             Share{" "}
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
//               <path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
