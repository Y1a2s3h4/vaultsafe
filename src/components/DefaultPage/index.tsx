import React, { useState } from "react";
import type { RootState } from "../../redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import { addNewTab, addCurrTabData } from "../../redux/slices/tabs.slices";
import { v4 } from "uuid";
export default function DefaultPage() {
  const [toggleTab, setToggleTab] = useState(0);
  const tabs = useSelector((state: RootState) => state.tabHandler);
  const dispatch = useDispatch();

  function handleAddNewTab() {
    dispatch(addNewTab());
  }
  const handleAddCurrTabData = (e, idx) => {
    dispatch(addCurrTabData({ tabDetail: e.target.value, idx }));
  };

  return (
    <div className="flex flex-col gap-5 items-center h-screen">
      <div className="flex flex-wrap gap-5 text-lg w-full md:w-4/5">
        {tabs.map((ele, idx) => (
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
        value={tabs[toggleTab].tabDetail}
        onChange={(e) => handleAddCurrTabData(e, toggleTab)}
        className="p-4 text-xl rounded-lg border border-gray-600 md:w-4/5 h-full shadow-2xl"
        placeholder="Start Typing From Here..."
      ></textarea>
    </div>
  );
}
