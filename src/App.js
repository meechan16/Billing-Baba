import Home from "./pages/home";
import Login from "./pages/kogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isMobile } from "react-device-detect";
import "./style.scss";
import { useEffect, useState } from "react";
import Dashboard from "./pages/dashboard";
import Parties from "./pages/parties";
import Items from "./pages/items";
import Landing from "./pages/landing";
import Profile from "./pages/profilePage";
import AddSales from "./pages/sales/addsales";
import AddPurchase from "./pages/purchase/addPurchase";
import AddItem from "./pages/addItem";
import AddParties from "./pages/addParties";
import SaleInvoice from "./pages/sales/SaleInvoice";
import EstimatedQuortation from "./pages/sales/estimatedQuortation";
import PaymentIn from "./pages/sales/paymentIn";
import SaleReturn from "./pages/sales/SaleReturn";
import SaleOrder from "./pages/sales/saleOrder";
import DelieveryChalan from "./pages/sales/DelieveryChalan";
import PurchaseOrder from "./pages/purchase/PurchaseOrder";
import PaymentOut from "./pages/purchase/PaymentOut";
import PurchaseBill from "./pages/purchase/PurchaseBill";
import PurchaseReturn from "./pages/purchase/PurchaseReturn";

function App() {
  let [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (isMobile) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            exact
            element={
              <Home part="profile">
                <Profile />
              </Home>
            }
          />
          <Route
            path="/"
            exact
            element={
              <Home part="dashboard">
                <Dashboard />
              </Home>
            }
          />
          <Route
            path="/parties"
            exact
            element={
              <Home part="parties">
                <Parties />
              </Home>
            }
          />
          <Route
            path="/AddParties"
            exact
            element={
              <Home part="parties">
                <AddParties />
              </Home>
            }
          />
          <Route
            path="/items"
            exact
            element={
              <Home part="items">
                <Items />
              </Home>
            }
          />
          <Route
            path="/add-items"
            exact
            element={
              <Home part="items">
                <AddItem />
              </Home>
            }
          />
          <Route
            path="/addsales"
            exact
            element={
              // <Home part="items">
              //   <AddItems />
              // </Home>
              <AddSales />
            }
          />
          <Route
            path="/addPurchase"
            exact
            element={
              // <Home part="items">
              //   <AddItems />
              // </Home>
              <AddPurchase />
            }
          />
          <Route
            path="/sale-invoice"
            exact
            element={
              <Home part="sale">
                <SaleInvoice />
              </Home>
            }
          />
          <Route
            path="/estimation"
            exact
            element={
              <Home part="sale">
                <EstimatedQuortation />
              </Home>
            }
          />
          <Route
            path="/payment-in"
            exact
            element={
              <Home part="sale">
                <PaymentIn />
              </Home>
            }
          />
          <Route
            path="/sales-order"
            exact
            element={
              <Home part="sale">
                <SaleOrder />
              </Home>
            }
          />
          <Route
            path="/delievery-chalan"
            exact
            element={
              <Home part="sale">
                <DelieveryChalan />
              </Home>
            }
          />
          <Route
            path="/sales-return"
            exact
            element={
              <Home part="sale">
                <SaleReturn />
              </Home>
            }
          />
          <Route
            path="/purchase-order"
            exact
            element={
              <Home part="purchase">
                <PurchaseOrder />
              </Home>
            }
          />
          <Route
            path="/payment-out"
            exact
            element={
              <Home part="purchase">
                <PaymentOut />
              </Home>
            }
          />
          <Route
            path="/purchase-bill"
            exact
            element={
              <Home part="purchase">
                <PurchaseBill />
              </Home>
            }
          />
          <Route
            path="/purchase-return"
            exact
            element={
              <Home part="purchase">
                <PurchaseReturn />
              </Home>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
