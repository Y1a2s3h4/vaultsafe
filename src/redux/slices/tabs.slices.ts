import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  TabsDataState,
  UpdateTabDataApi,
  DeleteTabApi,
  AddTabsDataApi,
} from "../../types";
const API_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;
console.log({
  API_URL,
  VITE_API_URL_PROD: import.meta.env.VITE_API_URL_PROD,
  VITE_API_URL_DEV: import.meta.env.VITE_API_URL_DEV
})
export const fetchTabsData = createAsyncThunk(
  "tabsData/get",
  async (urlName: string) => {
    const response = await fetch(`${API_URL}getData?urlName=${urlName}`);
    return response.json();
  }
);

export const addTabsData = createAsyncThunk(
  "tabsData/add",
  async (data: AddTabsDataApi) => {
    console.log(data);
    const response = await fetch(`${API_URL}addData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
);
export const updateTabsData = createAsyncThunk(
  "tabsData/update",
  async (data: UpdateTabDataApi) => {
    const response = await fetch(`${API_URL}updateData`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
);
export const deleteTabsData = createAsyncThunk(
  "tabsData/delete",
  async (data: DeleteTabApi) => {
    const response = await fetch(`${API_URL}deleteData`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
);
const initialState: TabsDataState = {
  isLoading: false,
  isError: false,
  data: {
    tabsList: [],
  },
};
export const tabHandlerSlice = createSlice({
  name: "tabsData",
  initialState,
  reducers: {
    addNewTab: (state) => {
      const newTab = { tabNo: state.data.tabsList.length, tabDetail: "" };
      state.data["tabsList"].push(newTab);
    },
    deleteTab: (state, action) => {
      const newTabsList = state.data["tabsList"].filter(
        (_, i) => i !== action.payload.idx
      );
      state.data["tabsList"] = [...newTabsList];
    },
    addCurrTabData: (state, action) => {
      state.data["tabsList"][action.payload.idx].tabDetail =
        action.payload.tabDetail;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTabsData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTabsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = { ...action.payload };
      })
      .addCase(fetchTabsData.rejected, (state) => {
        state.isLoading = false;
        console.log("Fetch Error: " + state.isError);
        state.isError = true;
      })
      .addCase(addTabsData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addTabsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = { ...action.payload };
      })
      .addCase(addTabsData.rejected, (state) => {
        state.isLoading = false;
        console.log("Add Error: " + state.isError);
        state.isError = true;
      })
      .addCase(updateTabsData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateTabsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = { ...action.payload };
      })
      .addCase(updateTabsData.rejected, (state) => {
        state.isLoading = false;
        console.log("Update Error: " + state.isError);
        state.isError = true;
      })
      .addCase(deleteTabsData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteTabsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = { ...action.payload };
      })
      .addCase(deleteTabsData.rejected, (state) => {
        state.isLoading = false;
        console.log("Delete Error: " + state.isError);
        state.isError = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { addNewTab, addCurrTabData, deleteTab } = tabHandlerSlice.actions;

export default tabHandlerSlice.reducer;
