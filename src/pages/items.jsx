import React, { useEffect, useState } from "react";
import Undone from "../components/undone";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/customInput";
import Dropdown from "../components/dropdown";
import StockAdjust from "../components/stock_Adjustment";
import dev_url from "../url";
import Loader from "./Loader";

export default function Items({ data, setData, change, setChange }) {
  var [page, setPage] = useState("product");
  var [StockPage, setStockPage] = useState(false);
  const Navigate = useNavigate();
  var [Category, setCategory] = useState();
  var [Units, setUnits] = useState();
  // var [addToggle, setAddToggle] = useState(false);
  // var [itemsToggle, setItemsToggle] = useState(false);

  const [selecteditems, setSelectedItems] = useState(null);
  const [selectedunits, setSelectedUnits] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  var [loading, setloading] = useState(false);
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
  //       setData(data.data || []); // Ensure data is always an array
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  var [unitName, setUnitName] = useState("");
  var [unitShorthand, setUnitShorthand] = useState("");

  var [addCategory, setAddCategory] = useState("");

  const addthings = async () => {
    let newDa = data;

    if (page === "category") {
      newDa.category
        ? newDa.category.push({ name: addCategory })
        : (newDa.category = [{ name: addCategory }]);
      console.log(newDa);
      setData(newDa);
      setAddCategory("");
    } else if (page === "unit") {
      newDa.units
        ? newDa.units.push({ name: unitName, shortHand: unitShorthand })
        : (newDa.units = [{ name: unitName, shortHand: unitShorthand }]);
      console.log(newDa);
      setData(newDa);
      setUnits(false);
      setUnitName("");
      setUnitShorthand("");
    }
    setChange(!change);
    setCategory(false);
  };

  let [sortedArray, setSortedArray] = useState([]);
  let [sortbase, setSortBase] = useState({ name: "", stage: 0 });

  let sortFunction = (array, key, type = "number") => {
    if (sortbase.name === key) {
      if (sortbase.stage >= 1) {
        setSortedArray(array);
        setSortBase({ stage: 0, name: "" });
        return;
      }
      if (type === "string") {
        setSortedArray(
          array.sort((a, b) => a[key]?.localeCompare(b[key])).reverse()
        );
      } else {
        setSortedArray(array.sort((a, b) => a[key] - b[key]).reverse());
      }
      setSortBase({ ...sortbase, stage: 1 });
      return;
    } else {
      if (type === "string") {
        setSortedArray(array.sort((a, b) => a[key]?.localeCompare(b[key])));
      } else {
        setSortedArray(array.sort((a, b) => a[key] - b[key]));
      }
      setSortBase({ stage: 0, name: key });
      return;
    }
  };

  let [DataArr, setDataArr] = useState([]);

  useState(() => {
    if (selecteditems) {
      setDataArr(
        [...data?.sales, ...data?.purchase].filter((item) => {
          return item.items.some((term) => term.item === selecteditems.Name);
        })
      );
    }
  }, [selecteditems]);

  const callbackFn = (fn, item, index) => {
    if (fn === "View/Edit") {
      // Navigate("/edit-item", { state: { data: item, index: index } });
      console.log("edit hit");
    } else if (fn === "Delete") {
      let newDa = data;
      newDa.items.splice(index, 1);
      setData(newDa);
      setChange(!change);
    }
  };

  if (loading) return <Loader />;

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
                <Dropdown
                  menuItems={[
                    "Bulk inactive",
                    "Bulk Active",
                    "Bulk Assign Code",
                    "Assign Units",
                    "Bulk Update Items",
                  ]}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                  </svg>
                </Dropdown>
              </div>
            </div>
            <div className="content">
              <div className="head">
                <h2>Items</h2>
                <h2>Qty</h2>
              </div>
              {data?.items
                ?.filter((item) => item.itemType !== "service")
                .map((item, index) => (
                  <div
                    className={`tile ${
                      selecteditems === item ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => setSelectedItems(item)}
                  >
                    <h1>{item.Name}</h1>
                    <div className="">
                      <p>{item.stock ? item.stock : item.openingQty || 0}</p>
                      <Dropdown
                        menuItems={["View/Edit", "Delete"]}
                        callback={(e) => callbackFn(e)}
                        pIndex={item}
                        pItem={index}
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
                ))}
            </div>
          </div>
          <div className="right">
            <div className="title">
              <div className="tile">
                <h1>
                  {selecteditems ? selecteditems.Name : "No Item Selected"}
                </h1>
                <button onClick={() => setStockPage(!StockPage)}>
                  + Adujust Items
                </button>
                {StockPage && <StockAdjust setClose={setStockPage} />}
              </div>

              {selecteditems && (
                <div className="tile">
                  <p>
                    SALE PRICE{" "}
                    <span>
                      {" "}
                      ₹ {selecteditems ? selecteditems.salesPrice : "Null"}
                    </span>
                    (excl)
                  </p>
                  <p>
                    Stock Qty:{" "}
                    <span className="red">
                      {" "}
                      {selecteditems ? selecteditems.stock : "-"}
                    </span>
                  </p>
                </div>
              )}
              {selecteditems && (
                <div className="tile">
                  <p>
                    PURCHASE PRICE{" "}
                    <span>
                      {" "}
                      ₹ {selecteditems ? selecteditems.purchasePrice : "-"}
                    </span>
                    (excl)
                  </p>
                  <p>
                    Stock Qty:{" "}
                    <span className="red">
                      {" "}
                      {selecteditems ? selecteditems.purchaseStock : "-"}
                    </span>
                  </p>
                </div>
              )}
              <div className="tile"></div>
              <div className="tile"></div>
            </div>
            {selecteditems && (
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
                    <input type="" />
                  </div>
                </div>
                <div className="cl top">
                  <p>Type</p>
                  <p>Invoice/Ref</p>
                  <p
                    className="hover:underline"
                    onClick={() => sortFunction(data.sales, "name", "string")}
                  >
                    Name
                  </p>
                  <p>Date</p>
                  <p>Quantity</p>
                  <p
                    className="hover:underline"
                    onClick={() => sortFunction(data.sales, "total")}
                  >
                    Price
                  </p>
                  <p>Status</p>
                </div>

                {sortedArray.length > 0
                  ? sortedArray
                      .filter((item) => {
                        return item.items.some(
                          (term) => term.item === selecteditems.Name
                        );
                      })
                      .map((sale, index) => (
                        <div className="cl" key={index}>
                          <p className="grey">{sale.type}</p>
                          {/* <p className="grey">{sale.payment_type}</p> */}
                          <p className="grey">{sale.invoice_number}</p>
                          <p className="grey">{sale.name}</p>
                          <p className="">{sale.invoice_date}</p>
                          <p className="grey">{sale.items?.length}</p>
                          <p className="grey">{sale.total}</p>
                          <p className="">
                            {sale.payment_type === "credit" ? "Unpaid" : "Paid"}
                          </p>
                        </div>
                      ))
                  : DataArr.map((sale, index) => (
                      <div className="cl" key={index}>
                        <p className="grey">{sale.type}</p>
                        {/* <p className="grey">{sale.payment_type}</p> */}
                        <p className="grey">{sale.invoice_number}</p>
                        <p className="grey">{sale.name}</p>
                        <p className="">{sale.invoice_date}</p>
                        <p className="grey">{sale.items?.length}</p>
                        <p className="grey">{sale.total}</p>
                        <p className="">
                          {sale.payment_type === "credit" ? "Unpaid" : "Paid"}
                        </p>
                      </div>
                    ))}
                {/* <div className="cl">
                <p>Tech</p>
                <p className="grey">231</p>
                <p className="grey">Boat</p>
                <p className="grey">03/02/2024</p>
                <p className="grey">10</p>
                <p className="grey">3000</p>
                <p className="grey">Unpaid</p>
              </div> */}
              </div>
            )}
          </div>
        </div>
      )}
      {page === "service" && (
        <>
          {data?.items?.some((item) => item.itemType === "service") ? (
            <div className="items">
              <div className="left">
                <div className="top">
                  <button onClick={() => Navigate("/add-items")}>
                    Add Item +
                  </button>
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                    <Dropdown
                      menuItems={[
                        "Bulk inactive",
                        "Bulk Active",
                        "Bulk Assign Code",
                        "Assign Units",
                        "Bulk Update Items",
                      ]}
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
                <div className="content">
                  <div className="head">
                    <h2>Items</h2>
                  </div>
                  {data?.items
                    ?.filter((item) => item.itemType === "service")
                    .map((item, index) => (
                      <div
                        className={`tile ${
                          selecteditems === item ? "selected" : ""
                        }`}
                        key={index}
                        onClick={() => setSelectedItems(item)}
                      >
                        <h1>{item.Name}</h1>
                        <div className="">
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
                <div className="title">
                  <div className="tile">
                    <h1>
                      {selecteditems ? selecteditems.Name : "No Item Selected"}
                    </h1>
                    <button onClick={() => setStockPage(!StockPage)}>
                      + Adujust Items
                    </button>
                    {StockPage && <StockAdjust setClose={setStockPage} />}
                  </div>

                  {selecteditems && (
                    <div className="tile">
                      <p>
                        SALE PRICE{" "}
                        <span>
                          {" "}
                          ₹ {selecteditems ? selecteditems.salesPrice : "Null"}
                        </span>
                        (excl)
                      </p>
                    </div>
                  )}
                  <div className="tile"></div>
                  <div className="tile"></div>
                </div>
                {selecteditems && (
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
                        <input type="" />
                      </div>
                    </div>
                    <div className="cl top">
                      <p>Type</p>
                      <p>Invoice/Ref</p>
                      <p>Name</p>
                      <p>Date</p>
                      <p>Quantity</p>
                      <p>Price</p>
                      <p>profit</p>
                    </div>

                    {data?.sales
                      ?.filter((item) => {
                        return item.items.some(
                          (term) => term.item === selecteditems.Name
                        );
                      })
                      .map((sale, index) => (
                        <div className="cl" key={index}>
                          <p className="grey">{sale.payment_type}</p>
                          <p className="grey">{sale.invoice_number}</p>
                          <p className="grey">{sale.name}</p>
                          <p className="">{sale.invoice_date}</p>
                          <p className="grey">{sale.items?.length}</p>
                          <p className="grey">{sale.total}</p>
                          <p className="">{sale.profit || 0}</p>
                        </div>
                      ))}
                    {/* <div className="cl">
                <p>Tech</p>
                <p className="grey">231</p>
                <p className="grey">Boat</p>
                <p className="grey">03/02/2024</p>
                <p className="grey">10</p>
                <p className="grey">3000</p>
                <p className="grey">Unpaid</p>
              </div> */}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="service">
              <img src="./assets/itemService.png" alt="" />
              <p>
                Add services to your customers and create sale invoices for them
                faster.
              </p>
              <button onClick={() => Navigate("/add-items")}>
                Add Your Services
              </button>
            </div>
          )}
        </>
      )}
      {page === "category" && (
        <div className="items category">
          <div className="left">
            <div className="top">
              <button onClick={() => setCategory(!Category)}>
                Add Category +
              </button>
              <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </div>
              {Category && (
                <div id="ItemCategory">
                  <div className="center">
                    <div className="t">
                      <h1>Add Category</h1>
                      <button onClick={() => setCategory(!Category)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                        >
                          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                      </button>
                    </div>
                    <div className="m">
                      <span>Enter Category Name</span>
                      <input
                        type="text"
                        value={addCategory}
                        onChange={(e) => setAddCategory(e.target.value)}
                        placeholder="eg. Grocery"
                      />
                      <button onClick={() => addthings()}>Create</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="content">
              <div className="head">
                <h2>CATEGORY NAME</h2>
                {/* <h2>In Short</h2> */}
              </div>
              {data?.category?.map((item, index) => (
                <div
                  className={`tile ${
                    selectedCategory === item ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => setSelectedCategory(item)}
                >
                  <h1>{item.name}</h1>
                  <div className="">
                    {/* <p>{item.name || "-"}</p> */}
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
              {/* <div className="tile selected">
                <h1>electronics</h1>
                <div className="">
                  <p>tech</p>
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
              <div className="tile">
                <h1>bag</h1>
                <div className="">
                  <p>bag</p>
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
              <div className="tile">
                <h1>cloths</h1>
                <div className="">
                  <p>cloths</p>
                  <Dropdown menuItems={["View/Edit", "Delete"]}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 128 512"
                    >
                      <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                    </svg>
                  </Dropdown>
                </div>
              </div> */}
            </div>
          </div>
          <div className="right">
            <div className="title">
              <div className="tile">
                <h1>{selectedCategory?.name || "no name selected"}</h1>
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
            {selectedCategory && (
              <div className="content">
                <div className="t">
                  <h1>Transactions</h1>
                  <div className="search">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
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
                {data?.sales
                  ?.filter((item) => {
                    console.log(selectedCategory);
                    return item.items.some(
                      (term) => term.item_details?.category === selectedCategory
                    );
                  })
                  .map((sale, index) => (
                    <div className="cl" key={index}>
                      <p className="grey">{sale.payment_type}</p>
                      <p className="grey">{sale.invoice_number}</p>
                      <p className="grey">{sale.name}</p>
                      <p className="">{sale.invoice_date}</p>
                      <p className="grey">{sale.items?.length}</p>
                      <p className="grey">{sale.total}</p>
                      <p className="">{sale.total - sale.paid}</p>
                    </div>
                  ))}
                {/* <div className="cl">
                  <p className="grey">Gucci Watch</p>
                  <p className="grey">2</p>
                  <p className="grey">0.0</p>
                </div> */}
              </div>
            )}
          </div>
        </div>
      )}
      {page === "unit" && (
        <div className="items unit">
          <div className="left">
            <div className="top">
              <button onClick={() => setUnits(!Units)}>Add Units +</button>
              <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </div>
              {Units && (
                <div id="ItemCategory">
                  <div className="center">
                    <div className="t">
                      <h1>New Units</h1>
                      <button onClick={() => setUnits(!Units)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                        >
                          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                      </button>
                    </div>
                    <div className="m">
                      <CustomInput
                        inputValue={unitName}
                        setInputValue={setUnitName}
                        placeholder={"Unit Name"}
                      />
                      <CustomInput
                        inputValue={unitShorthand}
                        setInputValue={setUnitShorthand}
                        placeholder={"Short Name"}
                      />
                      <button onClick={() => addthings()}>Save</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="content">
              <div className="head">
                <h2>FULLNAME</h2>
                <h2>SHORTNAME</h2>
              </div>
              {data?.units?.map((item, index) => (
                <div
                  className={`tile ${selectedunits === item ? "selected" : ""}`}
                  key={index}
                  onClick={() => setSelectedUnits(item)}
                >
                  <h1>{item.name}</h1>
                  <div className="">
                    <p>{item.shortHand || "-"}</p>
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
            <div className="title">
              <div className="tile">
                <h1>{selectedunits?.name || "no unit selected"}</h1>
                <button>Add Conversions</button>
              </div>
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
                <p>-</p>
                <p>Conversion</p>
              </div>
              <div className="cl"></div>
              <div className="cl"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
