import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { RootState } from "../../redux/store/store";
import { useSelector, useDispatch } from "react-redux";

import Hotkeys from "react-hot-keys";
import {
  addNewTab,
  addCurrTabData,
  deleteTab,
  fetchTabsData,
  addTabsData,
  updateTabsData,
  deleteTabsData,
} from "../../redux/slices/tabs.slices";

import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function DefaultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const [toggleTab, setToggleTab] = useState(0);
  const tabs = useSelector((state: RootState) => state.tabHandler);
  const dispatch = useDispatch();

  function handleAddNewTab() {
    dispatch(addNewTab());
  }
  const handleAddCurrTabData = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    idx: number
  ) => {
    dispatch(addCurrTabData({ tabDetail: e.target.value, idx }));
  };
  const [title, setTitle] = useState(null);

  useEffect(() => {
    if (!(location.pathname === "/new")) {
      console.log(location.pathname);
      setTitle(decodeURIComponent(location.pathname.slice(1)));
      dispatch(
        fetchTabsData(decodeURIComponent(location.pathname.slice(1)))
      ).then((res) => {
        localStorage.setItem("urlData", JSON.stringify(res.payload));
      });
    } else {
      handleAddNewTab();

      MySwal.fire({
        icon: "info",
        allowOutsideClick: false,
        allowEscapeKey: false,
        title: "<p>New to this site?</p>",
        html: "Read below instruction\n<ul> <li> - Press <code style='background:#ddd;padding:0px 6px;border-radius:3px;'>ctrl+s</code> to save content on site.</li></ul>",
        confirmButtonText: "Okay!",
        confirmButtonColor: "#3085d6",
      })
        .then(() => {
          return MySwal.fire({
            icon: "question",
            allowOutsideClick: false,
            allowEscapeKey: false,
            title: "<p>Create new site?</p>",
            input: "text",
            inputPlaceholder: "E.g: site101",
            inputValidator: (value) => {
              if (!value) {
                return "You need to write something!";
              }
            },
            showCancelButton: true,
            confirmButtonText: "Create",
            confirmButtonColor: "#3085d6",
          });
        })
        .then((result) => {
          if (result.isConfirmed) {
            setTitle(result.value);
            navigate(`/${result.value}`);
          }
          if (result.isDismissed) {
            navigate("/");
          }
        });
    }
  }, [location]);
  async function handleSave() {
    if (tabs.data.statusCode === 200) {
      dispatch(
        updateTabsData({
          _id: tabs.data._id,
          tabsList: tabs.data.tabsList,
        })
      );
    } else {
      const saveDetails = await MySwal.fire({
        icon: "info",
        allowOutsideClick: false,
        allowEscapeKey: false,
        title: "<p>Create Password</p>",
        html: "<form><input type='password' id='swal-input1' class='swal2-input' placeholder='Password'> <input type='password' id='swal-input2' class='swal2-input' placeholder='Confirm Password'></form>",
        confirmButtonText: "Save!",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        preConfirm: () => {
          const pass = MySwal.getPopup().querySelector("#swal-input1").value;
          const cpass = MySwal.getPopup().querySelector("#swal-input2").value;
          console.log(pass, cpass);
          if (!pass || !cpass) {
            MySwal.showValidationMessage(`Please enter password`);
          } else if (pass !== cpass) {
            MySwal.showValidationMessage(`Password doesn't match`);
          }
          return { pass, cpass };
        },
      });
      dispatch(
        addTabsData({
          urlName: title,
          pswd: saveDetails?.value?.pass,
          tabsList: tabs.data,
        })
      );
    }
  }
  function handleDeleteTab(idx) {
    dispatch(
      deleteTab({
        idx,
      })
    );
    dispatch(
      deleteTabsData({
        _id: tabs.data._id,
        tabId: tabs.data.tabsList[idx]._id,
      })
    );
  }
  console.log(tabs);

  return (
    <>
      {/* <Hotkeys 
        keyName="ctrl+s" 
        onKeyDown={handleSave}
        filter={(event) => {
          return true;
        }}
      > */}
      <div className="flex flex-col gap-5 items-center h-screen px-5">
        {!(location.pathname === "/new") && (
          <div 
          key={v4()}
          className="flex items-start w-full md:w-4/5">
            <h1 className="font-bold text-3xl text-left self-center mr-2">
              {!title && location.pathname === "/new"
                ? title
                : decodeURIComponent(location.pathname.slice(1))}
            </h1>
            <button
              onClick={handleSave}
              className={`px-4 py-2 active-link border border-black rounded-md`}
            >
              Save
            </button>
          </div>
        )}
        <div className="flex flex-wrap gap-5 text-lg w-full md:w-4/5">
          {tabs?.data?.tabsList?.map((_, idx) => (
            <div className="relative">
              <button
                key={v4()}
                onClick={() => setToggleTab(idx)}
                className={`px-5 py-3 ${
                  toggleTab === idx ? "active-link" : ""
                } border border-black rounded-md`}
              >
                Tab {idx + 1}
              </button>
              <button
                onClick={() => handleDeleteTab(idx)}
                className="absolute m-0 p-0 w-6 h-6 flex justify-center items-center -right-2 -top-2 bg-black text-white rounded-full"
              >
                <span
                  className="mb-1"
                  style={{
                    width: "-webkit-fill-available",
                    borderRadius: "100%",
                  }}
                >
                  <b>&times;</b>
                </span>
              </button>
            </div>
          ))}
          <button
            onClick={handleAddNewTab}
            className="px-5 py-3 border border-black rounded-md text-3xl"
          >
            <span className="mb-1">&#43;</span>
          </button>
        </div>
        <textarea
          value={tabs?.data?.tabsList[toggleTab]?.tabDetail}
          onChange={(e) => handleAddCurrTabData(e, toggleTab)}
          className="p-4 text-xl rounded-lg border border-gray-600 w-full md:w-4/5 h-full shadow-2xl"
          placeholder="Start Typing From Here..."
        ></textarea>
      </div>
      {/* </Hotkeys> */}
    </>
  );
}
