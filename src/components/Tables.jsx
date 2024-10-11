import React, { useEffect, useState } from "react";
import Dropdown from "./dropdown";

// Reusable Table Component
const SortableTable = ({ data, columns }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerms, setSearchTerms] = useState({}); // To track search input per column
  const [activeSearchKey, setActiveSearchKey] = useState(null); // To track which column's search is active

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

  // Function to handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Function to handle search input change
  const handleSearchChange = (key, value) => {
    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      [key]: value,
    }));
  };

  // Filter data based on search terms
  const filterData = (data) => {
    return data?.filter((item) => {
      return Object.keys(searchTerms).every((key) => {
        if (!searchTerms[key]) return true; // No filter for this column
        const columnValue = item[key]?.toString().toLowerCase() || "";
        return columnValue.includes(searchTerms[key].toLowerCase());
      });
    });
  };

  // Toggle search bar visibility
  const toggleSearchBar = (key) => {
    setActiveSearchKey(activeSearchKey === key ? null : key);
  };

  // Sort the filtered data
  const sortedData = sortData(filterData(data));

  // useEffect(() => {
  //   console.log(data);
  //   console.log(columns);
  // }, [data]);

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
    <div className="overflow-x-auto overflow-y-auto min-h-[600px] text-xs">
      <table className="min-w-full table-auto relative border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns?.map((column) => (
              <th
                key={column.key}
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-200"
              >
                <div className="flex items-center justify-between">
                  <span
                    onClick={() => handleSort(column.key)}
                    className="font-medium text-gray-700"
                  >
                    {column.label}
                    {sortConfig.key === column.key &&
                      (sortConfig.direction === "asc" ? (
                        <AscendingArrow />
                      ) : (
                        <DescendingArrow />
                      ))}
                  </span>
                  <button
                    className="ml-2 text-gray-500"
                    onClick={() => toggleSearchBar(column.key)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-4 h-4 fill-gray-500"
                    >
                      <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
                    </svg>
                  </button>
                </div>

                {/* Search bar appears in an absolute positioned div */}
                {activeSearchKey === column.key && (
                  <div className="absolute bg-white shadow-lg rounded p-3 mt-1 z-10 w-48">
                    <input
                      type="text"
                      value={searchTerms[column.key] || ""}
                      onChange={(e) =>
                        handleSearchChange(column.key, e.target.value)
                      }
                      className="w-full border border-gray-300 rounded p-1 text-sm focus:outline-none"
                      placeholder={`Search ${column.label}...`}
                    />
                    <button
                      onClick={() => setActiveSearchKey(null)} // Close search bar on Apply
                      className="bg-blue-500 text-white mt-2 p-1 rounded w-full"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData?.map((item, index) => (
            <tr key={index} className="border-t border-gray-200 relative">
              {columns.map((column) =>
                column.key === "DropDown" ? (
                  <td key={column.key}>
                    <Dropdown menuItems={item.menuItem}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 512"
                        className="w-4 h-4"
                      >
                        <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                      </svg>
                    </Dropdown>
                  </td>
                ) : column.key === "Action" ? (
                  <td key={column.key}>
                    <button
                      onClick={() => item.Action()}
                      className="px-2 py-1 rounded-sm shadow-md"
                    >
                      Convert
                    </button>
                  </td>
                ) : (
                  <td key={column.key} className="px-4 py-2">
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

export default SortableTable;
