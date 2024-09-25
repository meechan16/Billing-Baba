import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SaleInvoice from "./sales/SaleInvoice";
import PurchaseBill from "./purchase/PurchaseBill";
import Undone from "../components/undone";
import Daybook from "../components/reports/daybook";
import AllTransactions from "../components/reports/allTransactions";
import PartyStatement from "./partyStatement";
import BillWiseProfit from "../components/reports/BillWiseProfit";
import CashFlow from "../components/reports/CashFlow";
import PartyWiseProfit from "../components/reports/partyWiseProfits";
import AllParties from "../components/reports/AllParties";
import ItemWiseParties from "../components/reports/ItemWiseParties";
import SalePurchaseByParties from "../components/reports/salePurchaseByParties";
import SalePurchaseByGroup from "../components/reports/SalePurchaseByGroup";
import ExpenseReport from "../components/reports/expenseReport";
import ExpenseCategoryReport from "../components/reports/ExpenseCategoryReport";
import SaleOrderReport from "../components/reports/SaleOrderReport";

export default function Rep({ data, setData }) {
  const Navigate = useNavigate();
  let [currentPage, setCurrentPage] = useState();
  return (
    <div id="report">
      <ul className="sidebar">
        <li className="head">Transaction Report</li>
        <li
          className={currentPage === 1 ? "selected" : ""}
          onClick={() => setCurrentPage(1)}
        >
          Sales
        </li>
        <li
          className={currentPage === 2 ? "selected" : ""}
          onClick={() => setCurrentPage(2)}
        >
          Purchase
        </li>
        <li
          className={currentPage === 3 ? "selected" : ""}
          onClick={() => setCurrentPage(3)}
        >
          Day book
        </li>
        <li
          className={currentPage === 4 ? "selected" : ""}
          onClick={() => setCurrentPage(4)}
        >
          All Transaction
        </li>
        <li
          className={currentPage === 5 ? "selected" : ""}
          onClick={() => setCurrentPage(5)}
        >
          Profit And Loss
        </li>
        <li
          className={currentPage === 6 ? "selected" : ""}
          onClick={() => setCurrentPage(6)}
        >
          Bill Wise Profit
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
        </li>
        <li
          className={currentPage === 7 ? "selected" : ""}
          onClick={() => setCurrentPage(7)}
        >
          Cash Flow
          <svg
            className="disabled"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 200H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
          </svg>
        </li>
        <li
          className={currentPage === 8 ? "selected" : ""}
          onClick={() => setCurrentPage(8)}
        >
          Trial Balance Report
          <svg
            className="disabled"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 200H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
          </svg>
        </li>
        <li
          className={currentPage === 9 ? "selected" : ""}
          onClick={() => setCurrentPage(9)}
        >
          Balance Sheet
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
        </li>
        <li className="head">Party report</li>
        <li
          className={currentPage === 10 ? "selected" : ""}
          onClick={() => setCurrentPage(10)}
        >
          Party Statement
        </li>
        <li
          className={currentPage === 11 ? "selected" : ""}
          onClick={() => setCurrentPage(11)}
        >
          Party wise Profit & Loss
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
        </li>
        <li
          className={currentPage === 12 ? "selected" : ""}
          onClick={() => setCurrentPage(12)}
        >
          All Parties
        </li>
        <li
          className={currentPage === 13 ? "selected" : ""}
          onClick={() => setCurrentPage(13)}
        >
          Party Report by Item
        </li>
        <li
          className={currentPage === 14 ? "selected" : ""}
          onClick={() => setCurrentPage(14)}
        >
          Sale Purchase By Party
        </li>
        <li
          className={currentPage === 15 ? "selected" : ""}
          onClick={() => setCurrentPage(15)}
        >
          Sale Purchase By Party Group
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
        </li>
        <li className="head">GST Reports</li>
        <li
          className={currentPage === 16 ? "selected" : ""}
          onClick={() => setCurrentPage(16)}
        >
          GSTR 1
          <svg
            className="disabled"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 200H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
          </svg>
        </li>
        <li
          className={currentPage === 17 ? "selected" : ""}
          onClick={() => setCurrentPage(17)}
        >
          GSTR 2
          <svg
            className="disabled"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 200H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
          </svg>
        </li>
        <li
          className={currentPage === 18 ? "selected" : ""}
          onClick={() => setCurrentPage(18)}
        >
          GSTR 3 B
          <svg
            className="disabled"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 200H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
          </svg>
        </li>
        <li
          className={currentPage === 19 ? "selected" : ""}
          onClick={() => setCurrentPage(19)}
        >
          GSTR 9
          <svg
            className="disabled"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 200H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
          </svg>
        </li>
        <li
          className={currentPage === 20 ? "selected" : ""}
          onClick={() => setCurrentPage(20)}
        >
          Sale Summarty By HSN
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
        </li>
        <li
          className={currentPage === 21 ? "selected" : ""}
          onClick={() => setCurrentPage(21)}
        >
          SAC Report
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
        </li>
        <li className="head">Item/Stock report</li>
        <li
          className={currentPage === 22 ? "selected" : ""}
          onClick={() => setCurrentPage(22)}
        >
          Stock Summary
        </li>
        <li
          className={currentPage === 23 ? "selected" : ""}
          onClick={() => setCurrentPage(23)}
        >
          Item Serial Report
          <svg
            className="disabled"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 200H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
          </svg>
        </li>
        <li
          className={currentPage === 24 ? "selected" : ""}
          onClick={() => setCurrentPage(24)}
        >
          Item Batch Report
        </li>
        <li
          className={currentPage === 25 ? "selected" : ""}
          onClick={() => setCurrentPage(25)}
        >
          Item Report By Party
        </li>
        <li
          className={currentPage === 26 ? "selected" : ""}
          onClick={() => setCurrentPage(26)}
        >
          Item Wise Profit And Loss
        </li>
        <li
          className={currentPage === 27 ? "selected" : ""}
          onClick={() => setCurrentPage(27)}
        >
          Low Stock Summary
        </li>
        <li
          className={currentPage === 28 ? "selected" : ""}
          onClick={() => setCurrentPage(28)}
        >
          Stock Detail
        </li>
        <li
          className={currentPage === 29 ? "selected" : ""}
          onClick={() => setCurrentPage(29)}
        >
          Item Detail
        </li>
        <li
          className={currentPage === 30 ? "selected" : ""}
          onClick={() => setCurrentPage(30)}
        >
          Item Detail
        </li>
        <li
          className={currentPage === 31 ? "selected" : ""}
          onClick={() => setCurrentPage(31)}
        >
          Sale/Purchase Report By Item Category
        </li>
        <li
          className={currentPage === 32 ? "selected" : ""}
          onClick={() => setCurrentPage(32)}
        >
          Stock Summary Report By Item Category
        </li>
        <li
          className={currentPage === 33 ? "selected" : ""}
          onClick={() => setCurrentPage(33)}
        >
          Item Wise Discount
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
        </li>
        <li className="head">Business Status</li>
        <li
          className={currentPage === 34 ? "selected" : ""}
          onClick={() => setCurrentPage(34)}
        >
          Bank Statement
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
        </li>
        <li
          className={currentPage === 35 ? "selected" : ""}
          onClick={() => setCurrentPage(35)}
        >
          Discount Report
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
        </li>
        <li className="head">Taxes</li>
        <li
          className={currentPage === 36 ? "selected" : ""}
          onClick={() => setCurrentPage(36)}
        >
          GST Report
        </li>
        <li
          className={currentPage === 37 ? "selected" : ""}
          onClick={() => setCurrentPage(37)}
        >
          GST Rate Report
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
        </li>
        <li
          className={currentPage === 38 ? "selected" : ""}
          onClick={() => setCurrentPage(38)}
        >
          Form No. 27EQ
          <svg
            className="disabled"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 200H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
          </svg>
        </li>
        <li
          className={currentPage === 39 ? "selected" : ""}
          onClick={() => setCurrentPage(39)}
        >
          TCS Receivable
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
        </li>
        <li className="head">Expense Report</li>
        <li
          className={currentPage === 40 ? "selected" : ""}
          onClick={() => setCurrentPage(40)}
        >
          Expense
        </li>
        <li
          className={currentPage === 41 ? "selected" : ""}
          onClick={() => setCurrentPage(41)}
        >
          Expense Category Report
        </li>
        <li
          className={currentPage === 42 ? "selected" : ""}
          onClick={() => setCurrentPage(42)}
        >
          Expense Item Report
        </li>
        <li className="head">Sale/Purchase Order Report</li>
        <li
          className={currentPage === 43 ? "selected" : ""}
          onClick={() => setCurrentPage(43)}
        >
          Sale Order
        </li>
        <li
          className={currentPage === 44 ? "selected" : ""}
          onClick={() => setCurrentPage(44)}
        >
          Sale Order Item
        </li>
        <li className="head">Loan Accounts</li>
        <li
          className={currentPage === 45 ? "selected" : ""}
          onClick={() => setCurrentPage(45)}
        >
          Loan Statement
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
        </li>
      </ul>
      <div className="content">
        {!currentPage && (
          <div className="base">
            <h1>Select an option</h1>
          </div>
        )}
        {currentPage === 1 ? (
          <SaleInvoice data={data} setData={setData} />
        ) : currentPage === 2 ? (
          <PurchaseBill data={data} setData={setData} />
        ) : currentPage === 3 ? (
          <Daybook data={data} setData={setData} />
        ) : currentPage === 4 ? (
          <AllTransactions data={data} setData={setData} />
        ) : currentPage === 6 ? (
          <BillWiseProfit data={data} setData={setData} />
        ) : currentPage === 7 ? (
          <CashFlow data={data} setData={setData} />
        ) : currentPage === 10 ? (
          <PartyStatement data={data} setData={setData} />
        ) : currentPage === 11 ? (
          <PartyWiseProfit data={data} setData={setData} />
        ) : currentPage === 12 ? (
          <AllParties data={data} setData={setData} />
        ) : currentPage === 13 ? (
          <ItemWiseParties data={data} setData={setData} />
        ) : currentPage === 14 ? (
          <SalePurchaseByParties data={data} setData={setData} />
        ) : currentPage === 15 ? (
          <SalePurchaseByGroup data={data} setData={setData} />
        ) : currentPage === 40 ? (
          <ExpenseReport data={data} setData={setData} />
        ) : currentPage === 41 ? (
          <ExpenseCategoryReport data={data} setData={setData} />
        ) : currentPage === 43 ? (
          <SaleOrderReport data={data} setData={setData} />
        ) : (
          <Undone data={data} setData={setData} />
        )}
      </div>
    </div>
  );
}
