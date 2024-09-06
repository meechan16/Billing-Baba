import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BulkUpdateItems = ({ data, setData, change, setChange }) => {
  const Navigate = useNavigate();
  const [editedItems, setEditedItems] = useState([...data.items]);

  const handleChange = (index, field, value) => {
    const updatedItems = editedItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setEditedItems(updatedItems);
  };

  const handleSave = () => {
    setData({ ...data, items: editedItems });
    setChange(!change);
    Navigate("/items");
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-lg font-semibold mb-4">Edit Items</h3>

      <div className="grid grid-cols-12 gap-4 items-center mb-2">
        <span className="col-span-2 p-2 font-semibold">Name</span>
        <span className="col-span-1 p-2 font-semibold">HSN</span>
        <span className="col-span-1 p-2 font-semibold">Category"</span>
        <span className="col-span-1 p-2 font-semibold">Code</span>
        <span className="col-span-1 p-2 font-semibold">salesPrice</span>
        <span className="col-span-1 p-2 font-semibold">discount</span>
        <span className="col-span-1 p-2 font-semibold">Purchase Price</span>
        <span className="col-span-1 p-2 font-semibold">Tax</span>
        <span className="col-span-1 p-2 font-semibold">Opening Quantity</span>
        <span className="col-span-1 p-2 font-semibold">location</span>
      </div>
      {editedItems.map((item, index) => (
        <div key={index} className="grid grid-cols-12 gap-4 items-center mb-2">
          <input
            type="text"
            className="col-span-2 p-2 border border-gray-300 rounded"
            value={item.Name}
            onChange={(e) => handleChange(index, "Name", e.target.value)}
            placeholder="Name"
          />
          <input
            type="text"
            className="col-span-1 p-2 border border-gray-300 rounded"
            value={item.HSN}
            onChange={(e) => handleChange(index, "HSN", e.target.value)}
            placeholder="HSN"
          />
          <input
            type="text"
            className="col-span-1 p-2 border border-gray-300 rounded"
            value={item.Category}
            onChange={(e) => handleChange(index, "Category", e.target.value)}
            placeholder="Category"
          />
          <input
            type="text"
            className="col-span-1 p-2 border border-gray-300 rounded"
            value={item.Code}
            onChange={(e) => handleChange(index, "Code", e.target.value)}
            placeholder="Code"
          />
          <input
            type="number"
            className="col-span-1 p-2 border border-gray-300 rounded"
            value={item.salesPrice}
            onChange={(e) => handleChange(index, "salesPrice", e.target.value)}
            placeholder="Sales Price"
          />
          <input
            type="number"
            className="col-span-1 p-2 border border-gray-300 rounded"
            value={item.discount}
            onChange={(e) => handleChange(index, "discount", e.target.value)}
            placeholder="Discount"
          />
          <input
            type="number"
            className="col-span-1 p-2 border border-gray-300 rounded"
            value={item.purchasePrice}
            onChange={(e) =>
              handleChange(index, "purchasePrice", e.target.value)
            }
            placeholder="Purchase Price"
          />
          <input
            type="number"
            className="col-span-1 p-2 border border-gray-300 rounded"
            value={item.Tax}
            onChange={(e) => handleChange(index, "Tax", e.target.value)}
            placeholder="Tax"
          />
          {item.itemType === "product" && (
            <>
              <input
                type="number"
                className="col-span-1 p-2 border border-gray-300 rounded"
                value={item.openingQuantity}
                onChange={(e) =>
                  handleChange(index, "openingQuantity", e.target.value)
                }
                placeholder="Opening Quantity"
              />
              <input
                type="text"
                className="col-span-1 p-2 border border-gray-300 rounded"
                value={item.location}
                onChange={(e) =>
                  handleChange(index, "location", e.target.value)
                }
                placeholder="Location"
              />
            </>
          )}
        </div>
      ))}
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};

export default BulkUpdateItems;
