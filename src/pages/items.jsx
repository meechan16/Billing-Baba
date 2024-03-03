import React, { useState } from "react";
import Undone from "../components/undone";
import { useNavigate } from "react-router-dom";

export default function Items() {
  var [page, setPage] = useState("product");
  const Navigate = useNavigate();
  return (
    <div id="items">
      <div className="topbar">
        <button
          className={page === "product" ? "selected" : ""}
          onClick={() => setPage("product")}
        >
          Product
        </button>
        <button
          className={page === "service" ? "selected" : ""}
          onClick={() => setPage("service")}
        >
          Services
        </button>
        <button
          className={page === "category" ? "selected" : ""}
          onClick={() => setPage("category")}
        >
          Category
        </button>
        <button
          className={page === "unit" ? "selected" : ""}
          onClick={() => setPage("unit")}
        >
          Unit
        </button>
      </div>
      {page === "product" && (
        <div className="items">
          <div className="left">
            <div className="top">
              <button onClick={() => Navigate("/add-items")}>Add Item +</button>
              <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                  <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                </svg>
              </div>
            </div>
            <div className="content">
              <div className="head">
                <h2>Items</h2>
                <h2>Qty</h2>
              </div>
              <div className="tile selected">
                <h1>Boat headphones</h1>
                <div className="">
                  <p>10</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                  </svg>
                </div>
              </div>
              <div className="tile">
                <h1>Guccy Watch</h1>
                <div className="">
                  <p>02</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                  </svg>
                </div>
              </div>
              <div className="tile">
                <h1>T-shirt</h1>
                <div className="">
                  <p>18</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="title">
              <div className="tile">
                <h1>Boat Headphonest</h1>
                <button>+ Adujust Items</button>
              </div>
              <div className="tile">
                <p>
                  SALE PRICE <span> ₹ 100.00</span>(excl)
                </p>
                <p>
                  Stock Qty: <span className="red"> 10</span>
                </p>
              </div>
              <div className="tile">
                <p>
                  PURCHASE PRICE <span> ₹ 00.00</span>(excl)
                </p>
                <p>
                  Stock Qty: <span className="red"> 10</span>
                </p>
              </div>
              <div className="tile"></div>
              <div className="tile"></div>
            </div>
            <div className="content">
              <div className="t">
                <h1>TRANSACTIONS</h1>
                <div className="search">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                  <input type="" />
                </div>
              </div>
              <div className="cl top">
                <p>Type</p>
                <p>Invoice/Ref</p>
                <p>Date</p>
                <p>Total</p>
                <p>Balance</p>
              </div>
              <div className="cl">
                <p>Row header 1</p>
                <p className="grey">Item 1</p>
                <p className="grey">Item 2</p>
                <p className="grey">Item 3</p>
                <p className="grey">Item 4</p>
              </div>
              <div className="cl">
                <p>Row header 1</p>
                <p className="grey">Item 1</p>
                <p className="grey">Item 2</p>
                <p className="grey">Item 3</p>
                <p className="grey">Item 4</p>
              </div>
              <div className="cl">
                <p>Row header 1</p>
                <p className="grey">Item 1</p>
                <p className="grey">Item 2</p>
                <p className="grey">Item 3</p>
                <p className="grey">Item 4</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {page === "service" && (
        <div className="service">
          <img src="./assets/itemService.png" alt="" />
          <p>
            Add services to your customers and create sale invoices for them
            faster.
          </p>
          <button>Add Your Services</button>
        </div>
      )}
      {page === "category" && (
        <div className="items category">
          <div className="left">
            <div className="top">
              <button>Add Category +</button>
              <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                  <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                </svg>
              </div>
            </div>
            <div className="content">
              <div className="head">
                <h2>Full name</h2>
                <h2>In Short</h2>
              </div>
              <div className="tile selected">
                <h1>electronics</h1>
                <div className="">
                  <p>tech</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                  </svg>
                </div>
              </div>
              <div className="tile">
                <h1>bag</h1>
                <div className="">
                  <p>bag</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                  </svg>
                </div>
              </div>
              <div className="tile">
                <h1>cloths</h1>
                <div className="">
                  <p>cloths</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="title">
              <div className="tile">
                <h1>BAGS</h1>
                <button>Move to this category</button>
              </div>
              {/* <div className="tile">
                <p>
                  SALE PRICE <span> ₹ 100.00</span>(excl)
                </p>
                <p>
                  Stock Qty: <span className="red"> 10</span>
                </p>
              </div>
              <div className="tile">
                <p>
                  PURCHASE PRICE <span> ₹ 00.00</span>(excl)
                </p>
                <p>
                  Stock Qty: <span className="red"> 10</span>
                </p>
              </div> */}
              <div className="tile"></div>
              <div className="tile"></div>
            </div>
            <div className="content">
              <div className="t">
                <h1>UNITS</h1>
                <div className="search">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                  <input type="" />
                </div>
              </div>
              <div className="cl top">
                <p>Name</p>
                <p>Quantity</p>
                <p>Stock Value</p>
              </div>
              <div className="cl">
                <p className="grey">Boat Headphones</p>
                <p className="grey">10</p>
                <p className="grey">0.0</p>
              </div>
              <div className="cl">
                <p className="grey">Gucci Watch</p>
                <p className="grey">2</p>
                <p className="grey">0.0</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {page === "unit" && (
        <div className="items unit">
          <div className="left">
            <div className="top">
              <button>Add Category +</button>
              <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                  <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                </svg>
              </div>
            </div>
            <div className="content">
              <div className="head">
                <h2>Items</h2>
                <h2>Qty</h2>
              </div>
              <div className="tile selected">
                <h1>Boat headphones</h1>
                <div className="">
                  <p>10</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                  </svg>
                </div>
              </div>
              <div className="tile">
                <h1>Guccy Watch</h1>
                <div className="">
                  <p>02</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                  </svg>
                </div>
              </div>
              <div className="tile">
                <h1>T-shirt</h1>
                <div className="">
                  <p>18</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="title">
              <div className="tile">
                <h1>Boat Headphonest</h1>
                <button>Move to this category</button>
              </div>
              <div className="tile">
                <p>
                  SALE PRICE <span> ₹ 100.00</span>(excl)
                </p>
                <p>
                  Stock Qty: <span className="red"> 10</span>
                </p>
              </div>
              <div className="tile">
                <p>
                  PURCHASE PRICE <span> ₹ 00.00</span>(excl)
                </p>
                <p>
                  Stock Qty: <span className="red"> 10</span>
                </p>
              </div>
              <div className="tile"></div>
              <div className="tile"></div>
            </div>
            <div className="content">
              <div className="t">
                <h1>TRANSACTIONS</h1>
                <div className="search">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                  <input type="" />
                </div>
              </div>
              <div className="cl top">
                <p>Type</p>
                <p>Invoice/Ref</p>
                <p>Date</p>
                <p>Total</p>
                <p>Balance</p>
              </div>
              <div className="cl">
                <p>Row header 1</p>
                <p className="grey">Item 1</p>
                <p className="grey">Item 2</p>
                <p className="grey">Item 3</p>
                <p className="grey">Item 4</p>
              </div>
              <div className="cl">
                <p>Row header 1</p>
                <p className="grey">Item 1</p>
                <p className="grey">Item 2</p>
                <p className="grey">Item 3</p>
                <p className="grey">Item 4</p>
              </div>
              <div className="cl">
                <p>Row header 1</p>
                <p className="grey">Item 1</p>
                <p className="grey">Item 2</p>
                <p className="grey">Item 3</p>
                <p className="grey">Item 4</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
