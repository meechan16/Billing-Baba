import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommingSoon from "./commingSoon";

export default function Setting({ data, setData }) {
  const Navigate = useNavigate();
  const [page, setPage] = useState("general");
  const [popup, setpopup] = useState();

  const [newtax, setNewTax] = useState({ tax: "", taxName: "" });

  const setTax = () => {
    if (newtax === undefined) return;
    if (data.customTax) {
      setData({ ...data, customTax: [...data.customTax, newtax] });
    } else {
      setData({ ...data, customTax: [newtax] });
    }
  };
  if (!data.settings) {
    setData({
      ...data,
      settings: {
        enablePasscode: false,
        businessCurrency: "",
        maxDecimal: 2,
        tntNum: false,
        estimateQ: true,
        SalePRes: true,
        OtherInc: false,
        fixAsset: false,
        DelChalan: true,
        partyGrouping: false,
        PartyShippingAdd: false,
        partyReminder: false,
        PartyLoyaltyPoints: false,
        itembarcodeScanner: false,
        itemStockMaintainance: true,
        Manifacturing: false,
        enableitem: true,
      },
    });
  }

  return (
    <div id="settings">
      <ul className="sidebar">
        <li className="t">
          <p>SETTINGS</p>{" "}
          <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </div>
        </li>
        <li
          onClick={() => setPage("general")}
          className={page === "general" && "selected"}
        >
          GENERAL
        </li>
        <li
          onClick={() => setPage("transaction")}
          className={page === "transaction" && "selected"}
        >
          TRANSACTION
        </li>
        <li
          onClick={() => setPage("print")}
          className={page === "print" && "selected"}
        >
          PRINT
        </li>
        <li
          onClick={() => setPage("userM")}
          className={page === "userM" && "selected"}
        >
          USER MANAGEMENT
        </li>
        <li
          onClick={() => setPage("taxes")}
          className={page === "taxes" && "selected"}
        >
          TAXES
        </li>
        <li
          onClick={() => setPage("party")}
          className={page === "party" && "selected"}
        >
          PARTY
        </li>
        <li
          onClick={() => setPage("item")}
          className={page === "item" && "selected"}
        >
          ITEM
        </li>
      </ul>
      <div className="closebtn" onClick={() => Navigate("/")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </div>
      {page === "general" && (
        <div className="content">
          <div className="tile">
            <h1>Application</h1>
            <div>
              <input
                type="checkbox"
                value={data.settings.enablePasscode}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.enablePasscode,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Enable Passcode</span>
            </div>
            <div>
              <span>Business Currency</span>{" "}
              <select name="" id="">
                <option value="$">$</option>
                <option value="₹">₹ (Rs)</option>
              </select>
            </div>
            <div>
              <span>Max decimal place</span> <input type="number" />
            </div>
            <div>
              <input
                type="checkbox"
                value={data.settings.TntNum}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.TntNum,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>TNT Number</span>
            </div>
          </div>

          <div className="tile">
            <h1>
              <input type="checkbox" name="" id="" />
              Multi Firm
            </h1>
            <p>Currenly Unavilable</p>
          </div>
          <div className="tile">
            <h1>Backup & History</h1>
            <p>Auto backup permanent in web version</p>
            <div>
              <input type="checkbox" name="" checked disabled id="" />{" "}
              <span>Auto Backup</span>
            </div>
            <div>
              <input
                type="checkbox"
                value={data.settings.transactionhistory}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.transactionhistory,
                    },
                  })
                }
                checked
                name=""
                id=""
              />{" "}
              <span>Transaction History</span>
            </div>
          </div>
          <div className="tile">
            <h1>More Transactions</h1>
            <div>
              <input
                type="checkbox"
                value={data.settings.estmateQ}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.estmateQ,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Estimate/Quotation</span>
            </div>
            <div>
              <input
                type="checkbox"
                value={data.settings.saleOrder}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.saleOrder,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Sale/Purchase Order</span>
            </div>
            <div>
              <input
                type="checkbox"
                value={data.settings.otherIncome}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.otherIncome,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Other Income</span>
            </div>
            <div>
              <input
                type="checkbox"
                value={data.settings.fixedAssets}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.fixedAssets,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Fixed Assets (FA)</span>
            </div>
            <div>
              <input
                type="checkbox"
                value={data.settings.chalan}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.chalan,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Delivery Challan</span>
            </div>
          </div>
          <div className="tile">
            <h1>Stock Transfer Between Store</h1>
            <p>
              Manage all your stores/godowns and transfer stock seamlessly
              between them. Using this feature, you can transfer stock between
              stores/godowns and manage your inventory more efficiently.
            </p>
            <br />
            <p>Multi store feature unavailable</p>
          </div>
          <div className="tile">
            <h1>Customize Your View</h1>
            <p>
              Specific for application, for web you can zoom in and out with
              `ctrl` + `+`
            </p>
            <div className="">
              <input
                className="range"
                type="range"
                min={0}
                max={300}
                step={10}
                value={100}
                disabled
                // onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}
      {page === "transaction" && (
        <div className="content">
          <div className="tile">
            <h1>Transaction header</h1>
            <div>
              <input type="checkbox" name="" checked id="" />{" "}
              <span>Invoice/Bill No</span>
            </div>
            <div>
              <input type="checkbox" name="" id="" />{" "}
              <span>Add Time on transation</span>
            </div>
            <div>
              <input type="checkbox" name="" id="" />{" "}
              <span>Cash Sale By Default</span>
            </div>
            <div>
              <input type="checkbox" name="" id="" />{" "}
              <span>Billing Name of Parties</span>
            </div>
            <div>
              <input type="checkbox" name="" id="" />{" "}
              <span>Customer P.O. Details on Transactions</span>
            </div>
          </div>

          <div className="tile">
            <h1>Items Table</h1>
            {/* <p>Currenly Unavilable</p> */}
            <div>
              <input type="checkbox" name="" checked id="" />{" "}
              <span>Inclusive/Exclusive Tax on Rate(Price/Unit)</span>
            </div>
            <div>
              <input type="checkbox" name="" checked id="" />{" "}
              <span>Display Purchase Price of Items</span>
            </div>
            <div>
              <input type="checkbox" name="" id="" />{" "}
              <span>Show last 5 Sale Price of Items</span>
            </div>
            <div>
              <input type="checkbox" name="" id="" />{" "}
              <span>Free Item Quantity</span>
            </div>
            <div>
              <input type="checkbox" name="" id="" /> <span>Count</span>
            </div>
          </div>

          <div className="tile">
            <h1>More Transactions Features</h1>
            <div>
              <input type="checkbox" name="" id="" /> <span>Quick Entry</span>
            </div>
            <div>
              <input type="checkbox" name="" id="" />{" "}
              <span>Do not Show Invoice Preview</span>
            </div>
            <div>
              <input type="checkbox" name="" id="" />{" "}
              <span>Enable Passcode for transaction edit/delete</span>
            </div>
            <div>
              <input type="checkbox" name="" id="" />{" "}
              <span>Discount During Payments</span>
            </div>
            <div>
              <input type="checkbox" name="" id="" />{" "}
              <span>Delivery Challan</span>
            </div>
            <div>
              <input type="checkbox" name="" id="" />{" "}
              <span>Link Payments to Invoices</span>
            </div>
            <div>
              <input type="checkbox" name="" id="" />{" "}
              <span>Due Dates and Payment Terms</span>
            </div>
            <div>
              <input type="checkbox" name="" id="" />{" "}
              <span>Show Profit while making Sale Invoice</span>
            </div>
          </div>
          <div className="tile">
            <h1>Taxes, Discount & Totals</h1>
            {/* <p>Auto backup permanent in web version</p> */}
            <div>
              <input type="checkbox" name="" checked disabled id="" />{" "}
              <span>Transaction wise Tax</span>
            </div>
            <div>
              <input type="checkbox" checked name="" id="" />{" "}
              <span>Transaction wise Discount</span>
            </div>
          </div>
          {/* <div className="tile">
            <h1>Stock Transfer Between Store</h1>
            <p>
              Manage all your stores/godowns and transfer stock seamlessly
              between them. Using this feature, you can transfer stock between
              stores/godowns and manage your inventory more efficiently.
            </p>
            <br />
            <p>Multi store feature unavailable</p>
          </div>
          <div className="tile">
            <h1>Customize Your View</h1>
            <p>
              Specific for application, for web you can zoom in and out with
              `ctrl` + `+`
            </p>
            <div className="">
              <input
                className="range"
                type="range"
                min={0}
                max={300}
                step={10}
                value={100}
                disabled
                // onChange={handleChange}
              />
            </div>
          </div> */}
        </div>
      )}
      {page === "print" && (
        <div className="content">
          <div className="tile">
            <h1>Print & Invoice</h1>
            <p>
              Note: Billing baba currentlly support 1 design for invoice, please
              contact developers for more designs.
            </p>
          </div>
        </div>
      )}
      {page === "userM" && (
        <div className="content">
          <div className="tile">
            <h1>User Management</h1>
            <p>
              Note: Billing Baba does not support multi - user access on the
              same device. Please logout to switch users
            </p>
          </div>
        </div>
      )}
      {page === "taxes" && (
        <div className="content">
          {popup === "addTax" && (
            <div className="popup">
              <div className="popupC">
                <h1>Add Custom Tax Rate</h1>
                <input
                  type="text"
                  placeholder="tax name"
                  value={newtax.taxName ? newtax.taxName : ""}
                  onChange={(e) =>
                    setNewTax({ ...newtax, taxName: e.target.value })
                  }
                  name=""
                  id=""
                />
                <input
                  type="number"
                  placeholder="Rate %"
                  value={newtax.tax ? newtax.tax : ""}
                  onChange={(e) =>
                    setNewTax({ ...newtax, tax: e.target.value })
                  }
                  name=""
                  id=""
                />
                <button onClick={() => setTax()} className="add">
                  Add Tax
                </button>
                <button onClick={() => setpopup()}>Cancel</button>
              </div>
            </div>
          )}
          <div className="tile">
            <h1>
              Add New Tax Rate{" "}
              <button onClick={() => setpopup("addTax")}>+</button>
            </h1>
            {data.customTax?.map((element, index) => (
              <div>
                <span>
                  {element.taxName} {"-"}
                </span>
                <span>{element.tax} %</span>
              </div>
            ))}
          </div>

          {/* <div className="tile">
            <h1>
              Add New Tax Group <button>+</button>
            </h1>
            <div>
              <input type="checkbox" name="" checked id="" />{" "}
              <span>Inclusive/Exclusive Tax on Rate(Price/Unit)</span>
            </div>
          </div> */}
        </div>
      )}
      {page === "party" && (
        <div className="content">
          <div className="tile">
            <h1>Party Settings</h1>
            <div>
              <input
                type="checkbox"
                value={data.settings.enablePasscode}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.enablePasscode,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Party Grouping</span>
            </div>
            <div>
              <input
                type="checkbox"
                value={data.settings.PartyShippingAdd}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.PartyShippingAdd,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Shipping Address</span>
            </div>
            <div>
              <input
                type="checkbox"
                value={data.settings.partyReminder}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.partyReminder,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Enable Payment Reminder</span>
            </div>
          </div>

          <div className="tile">
            <h1>Enable Loyalty Points</h1>
            <div>
              <input
                type="checkbox"
                value={data.settings.PartyLoyaltyPoints}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.PartyLoyaltyPoints,
                    },
                  })
                }
              />
              <span>Enable Loyalty Points</span>
            </div>
          </div>
        </div>
      )}
      {page === "item" && (
        <div className="content">
          <div className="tile">
            <h1>Item Settings</h1>
            <div>
              <input
                type="checkbox"
                value={data.settings.enableitem}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.enableitem,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Enable Item</span>
            </div>
            <div>
              <input
                type="checkbox"
                value={data.settings.itembarcodeScanner}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.itembarcodeScanner,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Barcode Scanner</span>
            </div>
            <div>
              <input
                type="checkbox"
                value={data.settings.itemStockMaintainance}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.itemStockMaintainance,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Stock Maintainance</span>
            </div>
            <div>
              <input
                type="checkbox"
                value={data.settings.Manifacturing}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.Manifacturing,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Manifacturig</span>
            </div>
            <div>
              <input
                type="checkbox"
                value={data.settings.Manifacturing}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.Manifacturing,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Manifacturig</span>
            </div>
            <div>
              <input
                type="checkbox"
                value={data.settings.lowStockDialogue}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.lowStockDialogue,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Low stock Dialogue</span>
            </div>
            <div>
              <input
                type="checkbox"
                value={data.settings.ItemUnits}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.ItemUnits,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Item Units</span>
            </div>
            <div>
              <input
                type="checkbox"
                value={data.settings.itemCategory}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.itemCategory,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Item Category</span>
            </div>
            <div>
              <input
                type="checkbox"
                value={data.settings.itemwiseDiscount}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings.itemwiseDiscount,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>item wise Discount</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
