import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forgotPasswordLoading: false,
  resetPasswordLoading: false,
  passwordCountryCode: "",
  passwordMobile: "",
  forgotPasswordErrorMsg: "",
  resetPasswordErrorMsg: "",
};

const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    // forgot password reducers
    forgotPasswordStart: (state) => {
      state.forgotPasswordLoading = true;
    },
    forgotPasswordSuccess: (state, { payload }) => {
      state.forgotPasswordLoading = false;
      state.passwordMobile = payload?.items?.mobile;
      state.passwordCountryCode = payload?.items?.countryCode;
    },
    forgotPasswordFail: (state, { payload }) => {
      state.forgotPasswordLoading = false;
      state.forgotPasswordErrorMsg = payload;
    },
    resetForgotPasswordErrorMsg: (state) => {
      state.forgotPasswordErrorMsg = "";
    },

    // Reset password reducers
    resetPasswordStart: (state) => {
      state.resetPasswordLoading = true;
    },
    resetPasswordSuccess: (state) => {
      state.resetPasswordLoading = false;
    },
    resetPasswordFail: (state, { payload }) => {
      state.resetPasswordLoading = false;
      state.resetPasswordErrorMsg = payload;
    },

    resettingPasswordErrorMsg: (state) => {
      state.resetPasswordErrorMsg = "";
    },
  },
});

export const {
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetForgotPasswordErrorMsg,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFail,
  resettingPasswordErrorMsg,
} = passwordSlice.actions;

export const passwordReducer = passwordSlice.reducer;
