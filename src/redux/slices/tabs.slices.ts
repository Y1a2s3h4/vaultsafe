import { createSlice } from "@reduxjs/toolkit";

export const tabHandlerSlice = createSlice({
  name: "tabsData",
  initialState: [
    {
      tabNo: 0,
      tabDetail: "",
    },
  ],
  reducers: {
    addNewTab: (state) => {
      const newTab = { tabNo: state.length, tabDetail: "" };
      state.push(newTab);
    },
    addCurrTabData: (state, action) => {
      console.log(action);

      state[action.payload.idx].tabDetail = action.payload.tabDetail;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNewTab, addCurrTabData } = tabHandlerSlice.actions;

export default tabHandlerSlice.reducer;
