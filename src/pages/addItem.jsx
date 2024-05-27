import React, { useEffect, useState } from "react";
import CustomInput from "../components/customInput";
import { useNavigate } from "react-router-dom";
import { dev_url } from "../url";
import Loader from "./Loader";

export default function AddItem({
  data,
  setData,
  t = true,
  change,
  setChange,
}) {
  const Navigate = useNavigate();
  var [toggle, setToggle] = useState(t);
  var [page, setPage] = useState("pricing");
  var [itemName, setitemName] = useState();
  var [itemHSN, setitemHSN] = useState();
  var [itemCategory, setitemCategory] = useState();
  var [itemCode, setitemCode] = useState();
  var [sellPrice, setSellPrice] = useState();
  var [discount, setDescount] = useState();
  var [purchaseprice, setPurchasePrice] = useState();
  var [tax, setTax] = useState();
  var [openingQuantity, setOpeningQuantity] = useState();
  var [atPrice, setAtPrice] = useState();
  var [asDate, setAsDate] = useState();
  var [minToMaintain, setMinToMaintain] = useState();
  var [location, setLocation] = useState();

  var [loading, setLoading] = useState(false);
  // var [toggle, set] = useState();

  useEffect(() => {
    if (sellPrice < discount) {
      alert("discount can't be more than sales price");
    } else if (purchaseprice >= sellPrice - discount) {
      alert("purchase price more than sale price, please fix");
    }
  }, [purchaseprice, sellPrice]);

  let uid = data.uid;
  const addItemReq = async () => {
    setLoading(true);
    let newData;
    if (toggle) {
      newData = {
        Name: itemName ? itemName : "",
        HSN: itemHSN ? itemHSN : "",
        Category: itemCategory ? itemCategory : "",
        Code: itemCode ? itemCode : "",
        salesPrice: sellPrice ? sellPrice : "",
        discount: discount ? discount : "",
        purchasePrice: purchaseprice ? purchaseprice : "",
        Tax: tax ? tax : "",
        openingQuantity: openingQuantity ? openingQuantity : "",
        atPrice: atPrice ? atPrice : "",
        asDate: asDate ? asDate : "",
        minToMaintain: minToMaintain ? minToMaintain : "",
        location: location ? location : "",
        profit: sellPrice - discount - purchaseprice,
      };
    } else {
      newData = {
        Name: itemName ? itemName : "",
        HSN: itemHSN ? itemHSN : "",
        Category: itemCategory ? itemCategory : "",
        Code: itemCode ? itemCode : "",
        salesPrice: sellPrice ? sellPrice : "",
        discount: discount ? discount : "",
        Tax: tax ? tax : "",
        profit: sellPrice - discount,
      };
    }
    console.log(data);
    let newDa = data;
    newDa.items ? newDa.items.push(newData) : (newDa.items = [newData]);
    console.log(newDa);
    setData(newDa);
    setChange(!change);
    Navigate("/items");
  };

  if (loading) return <Loader />;

  return (
    <div id="addItem">
      <div className="container">
        <div className="top">
          <div className="l">
            <h1>Add Item</h1>
            <p>Product</p>
            <div
              className={toggle ? "toggle" : "toggle opp"}
              onClick={() => setToggle(!toggle)}
            >
              <div className="button"></div>
            </div>
            <p>service</p>
          </div>
          <div className="r">
            <button onClick={() => Navigate("/settings")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000"
                viewBox="0 0 512 512"
              >
                <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
              </svg>
            </button>
            <button onClick={() => Navigate("/items")}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="c1">
          <div className="p1">
            <CustomInput
              inputValue={itemName}
              setInputValue={setitemName}
              placeholder={toggle ? "Item Name *" : "Service Name *"}
            />
            <CustomInput
              inputValue={itemHSN}
              setInputValue={setitemHSN}
              placeholder={toggle ? "Item HSN" : "Service HSN"}
            />
            {/* <button>Select Unit</button> */}
          </div>
          <div className="p1">
            <select
              onChange={(e) => setitemCategory(e.target.value)}
              className="box"
            >
              <option value="" style={{ color: "blue", fontWeight: "600" }}>
                + add category
              </option>
              <option className="grey">Not Available</option>
              {data.category?.map((c, index) => (
                <option className="grey">{c.name || "-"}</option>
              ))}
            </select>
            {/* <input type="text" className="box" /> */}
            <CustomInput
              inputValue={itemCode}
              setInputValue={setitemCode}
              placeholder={toggle ? "Item Code" : "Service Code"}
            />
          </div>
        </div>
        <div className="c2">
          <div className="top t">
            <button
              className={page === "pricing" && "active"}
              onClick={() => setPage("pricing")}
            >
              Pricing
            </button>
            {toggle && (
              <button
                className={page === "stock" && "active"}
                onClick={() => setPage("stock")}
              >
                Stock
              </button>
            )}
          </div>
          {page === "pricing" ? (
            <div className="div">
              <div className="t">
                <CustomInput
                  inputValue={sellPrice}
                  setInputValue={setSellPrice}
                  placeholder={"Sale Price"}
                />
                <CustomInput
                  inputValue={discount}
                  setInputValue={setDescount}
                  placeholder={"Descount"}
                />
              </div>
              <div className="b">
                {toggle && (
                  <CustomInput
                    inputValue={purchaseprice}
                    setInputValue={setPurchasePrice}
                    placeholder={"Purchase Price"}
                  />
                )}
                <CustomInput
                  inputValue={tax}
                  setInputValue={setTax}
                  placeholder={"Taxes"}
                />
              </div>
            </div>
          ) : (
            <div className="div s">
              <CustomInput
                inputValue={openingQuantity}
                setInputValue={setOpeningQuantity}
                placeholder={"Opening Quantity"}
              />
              <CustomInput
                inputValue={atPrice}
                setInputValue={setAtPrice}
                placeholder={"At Price"}
              />
              <input
                type="date"
                onChange={(e) => setAsDate(e.target.value)}
                id="birthday"
                name="birthday"
              ></input>
              <CustomInput
                inputValue={minToMaintain}
                setInputValue={setMinToMaintain}
                placeholder={"Min Stock to maintain"}
              />
              <CustomInput
                inputValue={location}
                setInputValue={setLocation}
                placeholder={"Location"}
              />
            </div>
          )}
        </div>
        <div className="c3">
          <button onClick={() => addItemReq()}>Save & New</button>
          <button onClick={() => addItemReq()}>Save</button>
        </div>
      </div>
    </div>
  );
}
