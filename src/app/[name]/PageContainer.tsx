"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { AppDispatch, RootState } from "../../redux/store/store";
import { useSelector, useDispatch } from "react-redux";

import bcrypt from "bcryptjs";

import { genEncryptedText, genDecryptedText } from "@/utils";

import {
  addNewTab,
  addCurrTabData,
  deleteTab,
  fetchTabsData,
  verifyUrlPass,
  addTabsData,
  updateTabsData,
  fillTabDataInStore,
} from "../../redux/slices/tabs.slices";

import Swal, { SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { TabsDataState, TabsDataTypes } from "../../types";
import ReactHotkeys from "react-hot-keys";
import SubMenu from "./SubMenu";
import TabsButton from "./TabsButtons";
import TextArea from "./TextArea";
export default function PageContainer({
  params,
  TabsData,
}: {
  params: { name: string };
  TabsData: TabsDataTypes;
}) {
  console.log(TabsData)
  const location = usePathname();
  const navigate = useRouter();

  const MySwal = withReactContent(Swal);

  const [toggleTab, setToggleTab] = useState(0);
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [disableSave, setDisableSave] = useState(true);

  const userPass = useRef()

  const tabs: TabsDataState = useSelector(
    (state: RootState) => state.tabHandler
  );
  const dispatch = useDispatch<AppDispatch>();

  function handleAddNewTab() {
    dispatch(addNewTab({ tabNo: tabs.data.tabsList[tabs.data.tabsList.length - 1].tabNo + 1, tabDetail: "" }));
  }
  const handleAddCurrTabData = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    idx: number
  ) => {
    dispatch(addCurrTabData({ tabDetail: e.target.value, idx }));
  };
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (!(location === "/new")) {
      setTitle(decodeURIComponent(params.name));
      dispatch(fillTabDataInStore({ urlName: title, tabsList: tabs.data.tabsList }))
      if (TabsData.statusCode === 200 && !isAuthorised) {
        setDisableSave(true);
        MySwal.fire({
          icon: "info",
          allowOutsideClick: false,
          allowEscapeKey: false,
          title: `<p>${decodeURIComponent(
            params.name
          )} Already Exist!\nIf This Site Belongs To You?</p>`,
          input: "password",
          inputPlaceholder: "Enter Password...",
          inputValidator: async (value: string) => {
            if (!value) {
              return "Please enter password`";
            } else {
              if (!bcrypt.compareSync(value, TabsData.pswd)) {
                return "Incorrect Password";
              }
            }
          },
          confirmButtonText: "Unlock!",
          confirmButtonColor: "#3085d6",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              userPass.current = result.value
              const decrypVal = await genDecryptedText(
                TabsData.tabsList,
                result.value
              );
              dispatch(fillTabDataInStore({ ...TabsData, tabsList: decrypVal }))
              setDisableSave(false);
              setIsAuthorised(true);
            } catch (error) {
              console.log("Error while decrypting: ", error);
              // Handle the error appropriately, e.g., show an error message to the user.
            }
          }
        });
      }
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
            navigate.push(`/${result.value}`);
          }
          if (result.isDismissed) {
            navigate.push("/");
          }
        });
    }
  }, [location]);
  async function handleSave() {
    if (tabs.data._id && tabs.data.statusCode === 200 && userPass.current) {
      dispatch(
        updateTabsData({
          urlName: tabs.data.urlName,
          _id: tabs.data._id,
          tabsList: await genEncryptedText(tabs.data.tabsList, userPass.current),
        })
      );
    } else {
      const saveDetails: SweetAlertResult = await MySwal.fire({
        icon: "info",
        allowOutsideClick: false,
        allowEscapeKey: false,
        title: "<p>Create Password</p>",
        html: "<form><input type='password' id='swal-input1' class='swal2-input' placeholder='Password'> <input type='password' id='swal-input2' class='swal2-input' placeholder='Confirm Password'></form>",
        confirmButtonText: "Save!",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        preConfirm: () => {
          const pass = (
            MySwal?.getPopup()?.querySelector(
              "#swal-input1"
            ) as HTMLInputElement
          )?.value;
          const cpass = (
            MySwal?.getPopup()?.querySelector(
              "#swal-input2"
            ) as HTMLInputElement
          )?.value;
          if (!pass || !cpass) {
            MySwal.showValidationMessage(`Please enter password!`);
          } else if (pass !== cpass) {
            MySwal.showValidationMessage(`Password doesn't match!`);
          } else if (pass.length >= 8 && cpass.length >= 8) {
            MySwal.showValidationMessage(`Password should be atleast 8 characters long!`);
          }
          return { pass, cpass };
        },
      });
      userPass.current = saveDetails.value.pass
      dispatch(
        addTabsData({
          urlName: title,
          pswd: saveDetails.value.pass,
          tabsList: await genEncryptedText(
            tabs.data.tabsList,
            saveDetails.value.pass
          ),
        })
      );
    }
  }
  function handleDeleteTab(idx: number) {
    if (tabs.data.tabsList.length > 1) {
      setDisableSave(false);
      dispatch(
        deleteTab({
          idx,
        })
      );
      setToggleTab(idx - 1);
    } else {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can't delete first tab!",
        confirmButtonText: "Okay!",
        confirmButtonColor: "#3085d6",
      });
    }
  }

  return (
    <ReactHotkeys
      keyName="ctrl+s"
      onKeyDown={(keyName, e, handle) => e.preventDefault()}
      onKeyUp={(keyName, e, handle) => {
        e.preventDefault();
        if (!disableSave) {
          handleSave();
        } else {
          alert("Please make some changes to save");
        }
      }}
      filter={() => {
        return true;
      }}
    >
      {/* <div> */}
      {!(location === "/new") && (
        <>
          <SubMenu
            title={title}
            location={location}
            handleSave={handleSave}
            disableSave={disableSave}
            params={params}
          />

        </>
      )}
      <TabsButton
        handleAddNewTab={handleAddNewTab}
        tabsList={tabs.data.tabsList}
        toggleTab={toggleTab}
        handleDeleteTab={handleDeleteTab}
        setToggleTab={setToggleTab}
      />
      <TextArea
        handleAddCurrTabData={handleAddCurrTabData}
        tabs={tabs}
        toggleTab={toggleTab}
        setDisableSave={setDisableSave}
        disableSave={disableSave}
      />
      {/* </div> */}
    </ReactHotkeys>
  );
}
