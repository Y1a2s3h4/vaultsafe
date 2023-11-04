"use client";
import { SubMenuPropsTypes } from "@/types";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { v4 } from "uuid";

export default function SubMenu({title, location, handleSave, disableSave, params}: SubMenuPropsTypes) {
  return (
    <div key={v4()} className="flex items-start w-full md:w-4/5">
      <ErrorBoundary fallback={<h1>Sorry.. there was an error</h1>}>
        <h1 className="font-bold text-3xl text-left self-center mr-2">
          {!title && location === "/new"
            ? title
            : decodeURIComponent(params.name)}
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
  );
}
