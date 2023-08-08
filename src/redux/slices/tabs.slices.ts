import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TabType } from "../../types";
export const fetchTabsData = createAsyncThunk(
  "tabsData/get",
  async () => {
    const response = await fetch("http://localhost:8888/.netlify/functions/getData")
    return response.json();
  }
);


export const tabHandlerSlice = createSlice({
  name: "tabsData",
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
  },
  reducers: {
    addNewTab: (state) => {
      const newTab = { tabNo: state.data.length, tabDetail: "" };
      state.data.push(newTab);
    },
    addCurrTabData: (state, action) => {
      state.data[action.payload.idx].tabDetail = action.payload.tabDetail;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTabsData.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchTabsData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTabsData.rejected, (state) => {
      state.isLoading = false;
      console.log("Error: " + state.isError);
      
      state.isError = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { addNewTab, addCurrTabData } = tabHandlerSlice.actions;

export default tabHandlerSlice.reducer;
