"use client"
import { TabsButtonsTypes } from "@/types";
import { v4 } from "uuid";

export default function TabsButton({handleAddNewTab, tabsList, toggleTab, handleDeleteTab, setToggleTab}: TabsButtonsTypes){
    return (
        <div className="flex flex-wrap gap-5 text-lg w-full md:w-4/5">
          {tabsList.map((tab, idx: number) => (
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
    )
}