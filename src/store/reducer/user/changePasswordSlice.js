import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  changePasswordLoading: false,
  changePasswordErrorMsg: "",
  isSuccess: false,
};

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {
    // Change password reducers
    changePasswordStart: (state) => {
      state.changePasswordLoading = true;
      state.isSuccess = false;
    },
    changePasswordSuccess: (state) => {
      state.changePasswordLoading = false;
      state.changePasswordErrorMsg = "";
      state.isSuccess = true;
    },
    changePasswordFail: (state, { payload }) => {
      state.changePasswordLoading = false;
      state.changePasswordErrorMsg = payload;
    },
    resetChangePasswordErrorMsg: (state) => {
      state.changePasswordErrorMsg = "";
      state.isSuccess = false;
    },
  },
});

export const {
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFail,
  resetChangePasswordErrorMsg,
} = changePasswordSlice.actions;

export const changePasswordReducers = changePasswordSlice.reducer;
