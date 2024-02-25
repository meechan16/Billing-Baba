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
            path="/items"
            exact
            element={
              <Home part="items">
                <Items />
              </Home>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
