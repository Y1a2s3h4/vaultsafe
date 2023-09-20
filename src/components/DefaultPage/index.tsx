import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { AppDispatch, RootState } from "../../redux/store/store";
import { useSelector, useDispatch } from "react-redux";

import {
  addNewTab,
  addCurrTabData,
  deleteTab,
  fetchTabsData,
  verifyUrlPass,
  addTabsData,
  updateTabsData,
} from "../../redux/slices/tabs.slices";

import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { TabsDataState } from "../../types";
import ErrorBoundary from "../ErrorBoundary";
import ReactHotkeys from "react-hot-keys";

export default function DefaultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const [toggleTab, setToggleTab] = useState(0);
  const [disableSave, setDisableSave] = useState(true);
  const tabs: TabsDataState = useSelector(
    (state: RootState) => state.tabHandler
  );
  const dispatch = useDispatch<AppDispatch>();

  function handleAddNewTab() {
    dispatch(addNewTab());
  }
  const handleAddCurrTabData = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    idx: number
  ) => {
    dispatch(addCurrTabData({ tabDetail: e.target.value, idx }));
  };
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (!(location.pathname === "/new")) {
      setTitle(decodeURIComponent(location.pathname.slice(1)));
      dispatch(
        fetchTabsData(decodeURIComponent(location.pathname.slice(1)))
      )
      .then(async (res) => {
          if(res.payload.statusCode === 200){
            setDisableSave(true)
            await MySwal.fire({
              icon: "info",
              allowOutsideClick: false,
              allowEscapeKey: false,
              title: `<p>${decodeURIComponent(location.pathname.slice(1))} Already Exist!\nIf This Site Belongs To You?</p>`,
              input: "password",
              inputPlaceholder: "Enter Password...",
              inputValidator: async (value: string) => {
                if (!value) {
                  return "Please enter password`";
                } else {
                  const verifyResult = await dispatch(
                    verifyUrlPass({
                      pswd: value,
                      urlName: decodeURIComponent(location.pathname.slice(1)),
                    })
                  )
                  if(verifyResult.payload.statusCode === 401){
                    return "Incorrect Password"
                  }
                }
              },
              confirmButtonText: "Unlock!",
              confirmButtonColor: "#3085d6",
            }).then((result) => {
              if (result.isConfirmed) {
                setDisableSave(false)
              }
              
            })
          }
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
            navigate(`/${result.value}`);
          }
          if (result.isDismissed) {
            navigate("/");
          }
        });
    }
  }, [location]);
  async function handleSave() {
    if (tabs.data._id && tabs.data.statusCode === 200) {
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
          const pass = (MySwal?.getPopup()?.querySelector("#swal-input1") as HTMLInputElement)?.value;
          const cpass = (MySwal?.getPopup()?.querySelector("#swal-input2") as HTMLInputElement)?.value;
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
          pswd: saveDetails.value?.pass ?? '',
          tabsList: tabs.data.tabsList,
        })
      );
    }
  }
  function handleDeleteTab(idx: number) {
    setDisableSave(false);
    dispatch(
      deleteTab({
        idx,
      })
    );
    // if(tabs.data._id && tabs.data.tabsList[idx]._id && tabs.data.statusCode === 200){
    //   dispatch(
    //     deleteTabsData({
    //       _id: tabs.data._id,
    //       tabId: tabs.data.tabsList[idx]._id ?? '',
    //     })
    //   );
    // }
  }

  return (
    <>
      <ReactHotkeys 
        keyName="ctrl+s" 
        onKeyDown={(keyName,e,handle)=>e.preventDefault()}
        onKeyUp={(keyName,e,handle)=>{
          e.preventDefault()
          if(!disableSave){
            handleSave()
          } else {
            alert("Please make some changes to save")
          }
        }}
        filter={(e) => {
          return true;
        }}
      >

      <div className="flex flex-col gap-5 items-center h-screen px-5">
        {!(location.pathname === "/new") && (
          <div key={v4()} className="flex items-start w-full md:w-4/5">
            <ErrorBoundary>
              <h1 className="font-bold text-3xl text-left self-center mr-2">
                {!title && location.pathname === "/new"
                  ? title
                  : decodeURIComponent(location.pathname.slice(1))}
              </h1>
            </ErrorBoundary>
            <button
              onClick={handleSave}
              disabled={disableSave}
              className={`px-5 py-2 disabled:opacity-75 disabled:cursor-not-allowed active-link border border-black rounded-md`}
            >
              <span className="self-center">Save</span>
            </button>
          </div>
        )}
        <div className="flex flex-wrap gap-5 text-lg w-full md:w-4/5">
          {tabs.data.tabsList.map((tab, idx: number) => (
            <div className="relative" key={v4()}>
              <button
                onClick={() => setToggleTab(idx)}
                className={`px-5 py-3 ${
                  toggleTab === idx ? "active-link" : ""
                } border border-black rounded-md`}
              >
                Tab {tab.tabNo}
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
        <div className="relative w-full md:w-4/5 h-full mx-auto">
          <ErrorBoundary>
            <textarea
              value={!disableSave ? tabs?.data?.tabsList[toggleTab]?.tabDetail : ''}
              disabled={tabs.isLoading}
              onChange={(e) => {
                handleAddCurrTabData(e, toggleTab);
                setDisableSave(false);
              }}
              className="p-4 z-10 text-xl rounded-lg border border-gray-600 w-full h-full shadow-2xl"
              placeholder="Start Typing From Here..."
            ></textarea>
            {tabs.isLoading ? (
              <div className="absolute top-0 left-0 z-20 rounded-lg bg-[#ffffff50] w-full h-full flex justify-center items-center ">
                <div className="ms-2 self-center spinner w-6 md:w-16 h-6 md:h-16 border-solid border-black border-4 rounded-full border-r-transparent border-b-transparent animate-spin"></div>
              </div>
            ) : null}
          </ErrorBoundary>
        </div>
      </div>
    </ReactHotkeys>
    </>
  );
}
