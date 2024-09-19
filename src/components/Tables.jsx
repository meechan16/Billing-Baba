import React, { useState } from "react";
import Dropdown from "./dropdown";

// Reusable Table Component
const SortableTable = ({ data, columns }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Generic sorting function
  const sortData = (data) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue?.localeCompare(bValue)
          : bValue?.localeCompare(aValue);
      } else if (typeof aValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      } else if (aValue instanceof Date) {
        return sortConfig.direction === "asc"
          ? new Date(aValue) - new Date(bValue)
          : new Date(bValue) - new Date(aValue);
      } else {
        return 0;
      }
    });
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = sortData(data);

  // SVG for arrows
  const AscendingArrow = () => (
    <svg
      width="12"
      height="12"
      className="inline-block ml-1"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );

  const DescendingArrow = () => (
    <svg
      width="12"
      height="12"
      className="inline-block ml-1"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  return (
    <div className="overflow-x-auto text-xs">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns?.map((column) => (
              <th
                key={column.key}
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort(column.key)}
              >
                <span className="font-medium text-gray-700">
                  {column.label}
                  {sortConfig.key === column.key &&
                    (sortConfig.direction === "asc" ? (
                      <AscendingArrow />
                    ) : (
                      <DescendingArrow />
                    ))}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData?.map((item, index) => (
            <tr key={index} className="border-t border-gray-200">
              {columns.map((column) =>
                column.key === "DropDown" ? (
                  <td key={column.key}>
                    <Dropdown menuItems={item[column.menuItems]}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 512"
                        className="w-4 h-4"
                      >
                        <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                      </svg>
                    </Dropdown>
                  </td>
                ) : (
                  <td key={column.key} className="px-4 py-2">
                    {/* Render data only for the columns specified */}
                    {item[column.key] instanceof Date
                      ? item[column.key].toLocaleDateString()
                      : item[column.key]}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Usage Example
const App = () => {
  const data = [
    {
      name: "Alice",
      age: 30,
      dateJoined: new Date("2020-01-01"),
      role: "Admin",
    },
    { name: "Bob", age: 25, dateJoined: new Date("2019-05-10"), role: "User" },
    {
      name: "Charlie",
      age: 35,
      dateJoined: new Date("2021-02-15"),
      role: "Moderator",
    },
  ];

  // Only these columns will be rendered
  const columns = [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "dateJoined", label: "Date Joined" },
  ];

  return <SortableTable data={data} columns={columns} />;
};

export default SortableTable;
