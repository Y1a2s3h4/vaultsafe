import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { RootState } from "../../redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewTab,
  addCurrTabData,
  fetchTabsData,
} from "../../redux/slices/tabs.slices";
import { v4 } from "uuid";
import Modal from "../Model";
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function DefaultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const MySwal = withReactContent(Swal)

  const [toggleTab, setToggleTab] = useState(0);
  const [isModal, setModal] = useState(false);
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
  useEffect(() => {
    if (!(location.pathname === "/new")) {
      dispatch(fetchTabsData());
    }
    else {
      handleAddNewTab()
      setModal(true)
        MySwal.fire({
        icon: "info",
        allowOutsideClick: false,
        allowEscapeKey: false,
        title: "<p>New to this site?</p>",
        html: "Read below instruction\n<ul> <li> - Press <code style='background:#ddd;padding:0px 6px;border-radius:3px;'>ctrl+s</code> to save content on site.</li></ul>",
        confirmButtonText: 'Okay!',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        return MySwal.fire({
          icon: "question",
          allowOutsideClick: false,
          allowEscapeKey: false,
          title: "<p>Create new site?</p>",
          input: "text",
          inputPlaceholder: 'E.g: site101',
          // html: "<input class='border border-black rounded px-3 py-2' placeholder='E.g: site101' required type='text' />",
          showCancelButton: true,
          confirmButtonText: 'Create',
          confirmButtonColor: '#3085d6',
        })
      })
      .then((result) => {
        if (result.isDismissed) {
          navigate("/")
        }
      })

    }
  }, []);
  return (
    <>
    
    <div className="flex flex-col gap-5 items-center h-screen">
      <div className="flex flex-wrap gap-5 text-lg w-full md:w-4/5">
        {tabs.data.map((_, idx) => (
          <button
            key={v4()}
            onClick={() => setToggleTab(idx)}
            className={`px-5 py-3 ${
              toggleTab === idx ? "active-link" : ""
            } border border-black rounded-md`}
          >
            Tab {idx + 1}
          </button>
        ))}
        <button
          onClick={handleAddNewTab}
          className="px-5 py-3 border border-black rounded-md text-3xl"
        >
          &#43;
        </button>
      </div>
      <textarea
        value={tabs?.data[toggleTab]?.tabDetail}
        onChange={(e) => handleAddCurrTabData(e, toggleTab)}
        className="p-4 text-xl rounded-lg border border-gray-600 md:w-4/5 h-full shadow-2xl"
        placeholder="Start Typing From Here..."
      ></textarea>
    </div></>
  );
}
