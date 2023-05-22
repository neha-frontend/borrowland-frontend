import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  authToken: null,
  otp: null,
  errorMsg: "",
  successMsg: "",
  // resend otp
  resendOTPLoading: false,
  resendOTPErrorMsg: "",
};

const otpVerificationSlice = createSlice({
  name: "otpVerification",
  initialState,
  reducers: {
    // verify otp
    otpVerificationStart: (state) => {
      state.isLoading = true;
      state.errorMsg = "";
      state.successMsg = "";
    },
    otpVerificationSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.authToken = payload?.data?.items;
      state.successMsg = "";
      state.errorMsg = "";
      state.otp = payload.otp;
    },
    otpVerificationFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    resetAuthToken: (state) => {
      state.authToken = null;
    },
    resetOtpVerificationErrorMsg: (state) => {
      state.errorMsg = "";
      state.successMsg = "";
    },
    // resend OTP
    resendOTPStart: (state) => {
      state.resendOTPLoading = true;
      state.resendOTPErrorMsg = "";
      state.successMsg = "";
    },
    resendOTPSuccess: (state, { payload }) => {
      state.resendOTPLoading = false;
      state.successMsg = payload.message;
    },
    resendOTPFail: (state, { payload }) => {
      state.resendOTPLoading = false;
      state.resendOTPErrorMsg = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  // verify otp
  otpVerificationStart,
  otpVerificationSuccess,
  otpVerificationFail,
  resetAuthToken,
  resetOtpVerificationErrorMsg,
  // resend otp
  resendOTPStart,
  resendOTPSuccess,
  resendOTPFail,
} = otpVerificationSlice.actions;

export const otpVerificationReducer = otpVerificationSlice.reducer;
