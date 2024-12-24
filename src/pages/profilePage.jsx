import React, { useState } from "react";
import { logout, saveUidToLocalStorage } from "../firebase";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImgUpload";

export default function Profile({ data, setData }) {
  const Navigate = useNavigate();

  const [gstType, setGstType] = useState("withGST");

  var [Logo, setLogo] = useState();
  var [Signature, setSignature] = useState();
  const [showPopup, setShowPopup] = useState(false);

  const handleUploadProfileImage = (url) => {
    setLogo(url);
  };

  const handleUploadSign = (url) => {
    setSignature(url);
  };

  return (
    <div className="w-full h-full flex justify-center items-center pt-28">
      <div className="w-2/3 bg-gray-100 p-3 rounded-md">
      <div className="flex w-full gap-2">
        <button className="flex-1 py-1 px-3 text-sm font-semibold hover:border-b border-gray-400 bg-emerald-100 ">Accounts</button>
        <button className="flex-1 py-1 px-3 text-sm font-semibold hover:border-b border-gray-400">Manage Companies</button>
        <button className="flex-1 py-1 px-3 text-sm font-semibold hover:border-b border-gray-400">Billing & Plans</button>
        <button className="flex-1 py-1 px-3 text-sm font-semibold hover:border-b border-gray-400">User & Permissions</button>
        <button className="flex-1 py-1 px-3 text-sm font-semibold hover:border-b border-gray-400">My Staff</button>
      </div>
      <div className="w-full mt-1 mx-auto p-6 bg-white shadow-md rounded-md">
        <div className="flex justify-between w-full">
          <div className="">
          {!Logo ?(
            <>
              <button
                className="text-blue-400 font-semibold mx-2 items-center fill-blue-400 flex gap-1"
                onClick={() => setShowPopup(true)}
              >
                <span className="hover:underline">Add Business Logo</span>{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-4 h-4"
                >
                  <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                </svg>
              </button>
              {showPopup && (
                <ImageUploader
                  onClose={() => setShowPopup(false)}
                  onUpload={handleUploadProfileImage}
                />
              )}
            </>
            ): (
                <div
                  className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden relative my-2"
                >
                  <img
                    src={Logo}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                    onClick={() => setLogo()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-4 h-4"
                    >
                      <path
                        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160 85.9l11.1-11.6c9.4-10.5 9.4-27.7 0-39.2L
                    135.2 17.7zM32 128H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32S14.3 32 32 32z"
                      />
                    </svg>
                  </button>
                </div>
          )}
          <p>{Signature}</p>
          <p>{Logo}</p>
          </div>
          <div className="">
          {!Signature ?(
            <>
              <button
                className="text-blue-400 font-semibold mx-2 items-center fill-blue-400 flex gap-1"
                onClick={() => setShowPopup(true)}
              >
                <span className="hover:underline">Add Business Sign</span>{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-4 h-4"
                >
                  <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                </svg>
              </button>
              {showPopup && (
                <ImageUploader
                  onClose={() => setShowPopup(false)}
                  onUpload={handleUploadSign}
                />
              )}
            </>
          ): (
            <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden relative my-2">
                <img
                  src={Signature}
                  alt="Sign"
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                  onClick={() => setSignature()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-4 h-4"
                  >
                    <path
                      d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160 85.9l11.1-11.6c9.4-10.5 9.4-27.7 0-39.2L
                  135.2 17.7zM32 128H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32S14.3 32 32 32z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setGstType("withGST")}
          className={`flex-1 p-2 rounded-md ${gstType === "withGST" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
        >
          With GST
        </button>
        <button
          onClick={() => setGstType("nonGST")}
          className={`flex-1 p-2 rounded-md ${gstType === "nonGST" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
        >
          Non-GST
        </button>
      </div>

      {gstType === "withGST" && (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">GSTIN</label>
            <input
              type="text"
              value="23FBRPS9549M1ZG"
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
            />
            <p className="text-sm text-gray-500">Enter your 15 digit GSTIN number</p>
            <a href="#" className="text-blue-500 text-sm">Contact Us</a>, if you are facing any difficulties.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold">Company Name<span className="text-red-500">*</span></label>
              <input autoComplete="off" type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="NEW TUBE TRADERS" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Alias Name</label>
              <input autoComplete="off" type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Jack" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Address Line 1<span className="text-red-500">*</span></label>
              <input autoComplete="off" type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="shop no 30, Anjuman Shopping Complex" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Address Line 2</label>
              <input autoComplete="off" type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="marhatal, Jabalpur" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Country</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>India</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Pincode<span className="text-red-500">*</span></label>
              <input autoComplete="off" type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="482002" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">State</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>MADHYA PRADESH</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">City<span className="text-red-500">*</span></label>
              <input autoComplete="off" type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="JABALPUR" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Mobile No.<span className="text-red-500">*</span></label>
              <input autoComplete="off" type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="7987016325" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <input autoComplete="off" type="email" className="w-full p-2 border border-gray-300 rounded-md" placeholder="example@domain.com" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Company Established From</label>
              <input autoComplete="off" type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Year" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Registration Type</label>
              <input autoComplete="off" type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Type" />
            </div>
          </div>
        </div>
      )}
      {gstType === "nonGST" && (
        <div>
          {/* Non-GST form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold">Company Name<span className="text-red-500">*</span></label>
              <input autoComplete="off" type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Barry Tone PVT. LTD." />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Alias Name</label>
              <input autoComplete="off" type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Jack" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Legal Name</label>
              <input autoComplete="off" type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Barry Tone" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Address Line 1<span className="text-red-500">*</span></label>
              <input autoComplete="off" type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Floor No., Building Name" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Address Line 2</label>
              <input autoComplete="off" type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Near by Location, Landmark, Sub-district" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Country</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>India</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Pincode<span className="text-red-500">*</span></label>
              <input autoComplete="off" type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="39XX01" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">State</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>GUJARAT</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">City<span className="text-red-500">*</span></label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Select City</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Mobile No.<span className="text-red-500">*</span></label>
              <input autoComplete="off" type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="7987016325" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <input autoComplete="off" type="email" className="w-full p-2 border border-gray-300 rounded-md" placeholder="example@domain.com" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Company Established From<span className="text-red-500">*</span></label>
              <input autoComplete="off" type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="21-10-2024" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Registration Type</label>
              <input autoComplete="off" type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Unregistered (Without GST)" />
            </div>
          </div>

        </div>
      )}
          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">Cancel</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Create Company</button>
          </div>
    </div>
        {/* <div>
          <h1>Name:</h1>
          <span>{data.name}</span>
        </div>
        <div className="">
          <h1>Business Name:</h1>
          <span>{data.BusinessName}</span>
        </div>
        <div className="">
          <h1>Email:</h1>
          <span>{data.email}</span>
        </div>
        <div className="">
          <h1>GSTIN:</h1>
          <span>{data.GSTIN}</span>
        </div>
        <div className="">
          <h1>Mobile:</h1>
          <span>{data.mobile}</span>
        </div>
        <button
          onClick={() => {
            logout();
            saveUidToLocalStorage("");
            Navigate("/login");
          }}
        >
          Log Out
        </button> */}
        {/* <button onClick={() => resetData()}>reset data</button> */}
      </div>
    </div>
  );
}
