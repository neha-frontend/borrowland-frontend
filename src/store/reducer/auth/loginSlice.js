import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  logoutLoading: false,
  authToken: "",
  loginName: "",
  loginEmail: "",
  loginMobile: "",
  loginCountryCode: "",
  isEmailVerified: false,
  isKycVerified: false,
  isMobileVerified: false,
  errorMsg: "",
  logoutErrorMsg: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.errorMsg = "";
    },
    loginSuccess: (state, { payload }) => {
      state.errorMsg = "";
      state.isLoading = false;
      // state.authToken = payload?.authToken;
      state.loginName = payload?.items?.fullName;
      state.loginEmail = payload?.items?.email;
      state.loginMobile = payload?.items?.mobile;
      state.loginCountryCode = payload?.items?.countryCode;
      state.isEmailVerified = payload?.items?.varification?.email;
      state.isKycVerified = payload?.items?.varification?.kyc;
      state.isMobileVerified = payload?.items?.varification?.mobile;
    },
    loginFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload.data;
    },
    resetLoginErrorMsg: (state) => {
      state.errorMsg = "";
    },
    // LOGOUT
    logoutStart: (state) => {
      state.logoutLoading = true;
      state.logoutErrorMsg = "";
    },
    logoutSuccess: (state) => {
      state.logoutLoading = false;
      state.isLoading = false;
      state.authToken = "";
      state.logoutErrorMsg = "";
    },
    logoutFail: (state, { payload }) => {
      state.logoutLoading = false;
      state.logoutErrorMsg = payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  resetLoginErrorMsg,
  logoutStart,
  logoutSuccess,
  logoutFail,
} = loginSlice.actions;

export const loginReducer = loginSlice.reducer;
