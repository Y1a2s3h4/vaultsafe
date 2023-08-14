import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TabType } from "../../types";

export const fetchTabsData = createAsyncThunk(
  "tabsData/get",
  async (urlName: string) => {
    const response = await fetch(`http://localhost:8888/.netlify/functions/getData?urlName=${urlName}`)
    return response.json();
  }
);

export const addTabsData = createAsyncThunk(
  "tabsData/add",
  async (data) => {
    console.log(data)
    const response = await fetch("http://localhost:8888/.netlify/functions/addData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return response.json();
  }
);
export const updateTabsData = createAsyncThunk(
  "tabsData/update",
  async (data) => {
    const response = await fetch("http://localhost:8888/.netlify/functions/updateData", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return response.json();
  }
);
export const deleteTabsData = createAsyncThunk(
  "tabsData/delete",
  async (data) => {
    const response = await fetch("http://localhost:8888/.netlify/functions/deleteData", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return response.json();
  }
);


export const tabHandlerSlice = createSlice({
  name: "tabsData",
  initialState: {
    isLoading: false,
    isError: false,
    data: {
      tabsList: []
    },
  },
  reducers: {
    addNewTab: (state) => {
      const newTab = { tabNo: state.data.length, tabDetail: "" };
      state.data['tabsList'].push(newTab);
    },
    deleteTab: (state, action) => {
      const newTabsList = state.data['tabsList'].filter((e,i)=>i!==action.payload.idx)
      state.data['tabsList'] = [...newTabsList]
    },
    addCurrTabData: (state, action) => {
      state.data['tabsList'][action.payload.idx].tabDetail = action.payload.tabDetail;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTabsData.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    }).addCase(fetchTabsData.fulfilled, (state, action) => {
      console.log(action)
      state.isLoading = false;
      state.isError = false;
      state.data = {...action.payload};
    }).addCase(fetchTabsData.rejected, (state) => {
      state.isLoading = false;
      console.log("Fetch Error: " + state.isError);
      state.isError = true;
    })
  .addCase(addTabsData.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    }).addCase(addTabsData.fulfilled, (state, action) => {
      console.log(action)
      state.isLoading = false;
      state.isError = false;
      state.data = {...action.payload};
    }).addCase(addTabsData.rejected, (state) => {
      state.isLoading = false;
      console.log("Add Error: " + state.isError);
      state.isError = true;
    })
    .addCase(updateTabsData.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    }).addCase(updateTabsData.fulfilled, (state, action) => {
      console.log(action)
      state.isLoading = false;
      state.isError = false;
      state.data = {...action.payload};
    }).addCase(updateTabsData.rejected, (state) => {
      state.isLoading = false;
      console.log("Update Error: " + state.isError);
      state.isError = true;
    })
    .addCase(deleteTabsData.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    }).addCase(deleteTabsData.fulfilled, (state, action) => {
      console.log(action)
      state.isLoading = false;
      state.isError = false;
      state.data = {...action.payload};
    }).addCase(deleteTabsData.rejected, (state) => {
      state.isLoading = false;
      console.log("Delete Error: " + state.isError);
      state.isError = true;
    })
    
    
  },
});

// Action creators are generated for each case reducer function
export const { addNewTab, addCurrTabData, deleteTab } = tabHandlerSlice.actions;

export default tabHandlerSlice.reducer;
