import React, { useState, useRef, useEffect } from "react";

function Dropdown({
  children,
  menuItems,
  isLabelOnly = false,
  callback = null,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    if (!isLabelOnly && item.action) {
      item.action();
      setIsOpen(false); // Close the dropdown after selecting an item if action is performed
    }
  };

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-button" onClick={handleToggle}>
        {children}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {menuItems?.map((item, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(item)}
              className={isLabelOnly ? "label-only" : ""}
            >
              {item.label ? item.label : item}{" "}
              {/* Display the label of the item */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
