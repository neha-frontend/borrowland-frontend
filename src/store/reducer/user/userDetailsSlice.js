import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errorMsg: "",
  userData: null,
  // subscribe
  subscribeLoading: false,
  subscribeErrorMsg: "",
  subscribeSuccessMsg: "",
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserDetailsStart: (state) => {
      state.isLoading = true;
      state.errorMsg = "";
    },
    setUserDetailsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = "";
      state.userData = payload?.data;
    },
    setUserDetailsFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    resetUserDetails: (state) => {
      state.isLoading = false;
      state.errorMsg = "";
      state.userData = null;
    },
    // reducers for subscribe
    subscribeStart: (state) => {
      state.subscribeLoading = true;
      state.subscribeErrorMsg = "";
      state.subscribeSuccessMsg = "";
    },
    subscribeSuccess: (state) => {
      state.subscribeLoading = false;
      state.subscribeErrorMsg = "";
    },
    subscribeFail: (state, { payload }) => {
      state.subscribeLoading = false;
      state.subscribeErrorMsg = payload;
      state.subscribeSuccessMsg = "";
    },
    resetSubscribeMsg: (state) => {
      state.subscribeErrorMsg = "";
      state.subscribeSuccessMsg = "";
    },
  },
});

export const {
  setUserDetailsStart,
  setUserDetailsSuccess,
  setUserDetailsFail,
  resetUserDetails,
  subscribeStart,
  subscribeSuccess,
  subscribeFail,
  resetSubscribeMsg,
} = userDetailsSlice.actions;

export const userDetailsReducers = userDetailsSlice.reducer;
