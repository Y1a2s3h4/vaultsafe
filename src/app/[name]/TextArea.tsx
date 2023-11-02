"use client"

import { TextAreaPropsTypes } from "@/types";
import { ErrorBoundary } from "react-error-boundary";

export default function TextArea({handleAddCurrTabData, tabs, toggleTab, setDisableSave, disableSave}: TextAreaPropsTypes){
    return (
        <div className="relative w-full md:w-4/5 h-full mx-auto">
          <ErrorBoundary fallback={<h1>Sorry.. there was an error</h1>}>
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
    )
}