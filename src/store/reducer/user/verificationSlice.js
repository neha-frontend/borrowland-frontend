import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // get verifications checks
  isLoading: false,
  errorMsg: "",
  isMobileVerified: false,
  isEmailVerified: false,
  isKYCVerified: false,
  kycStatus: "",
  // update KYC
  updateKYCLoading: false,
  updateKYCErrorMsg: "",
  // verify email
  verifyEmailLoading: false,
  verifyEmailErrorMsg: "",
  // save inquiry id
  saveInquiryIdLoading: false,
  saveInquiryIdErrorMsg: "",
  // transaction verification
  transactionVerificationLoading: false,
  transactionVerificationErrorMsg: "",
  transactionVerificationSuccessMsg: "",
};

const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    // get verification checks
    getVerificationStart: (state) => {
      state.isLoading = true;
      state.errorMsg = "";
    },
    getVerificationSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = "";
      state.isEmailVerified = payload?.email;
      state.isMobileVerified = payload?.mobile;
      state.isKYCVerified = payload?.kyc;
      state.kycStatus = payload?.kycStatus;
    },
    getVerificationFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    // update KYC reducers
    updateKYCStart: (state) => {
      state.updateKYCLoading = true;
      state.updateKYCErrorMsg = "";
    },
    updateKYCSuccess: (state) => {
      state.updateKYCLoading = false;
      state.updateKYCErrorMsg = "";
    },
    updateKYCFail: (state, { payload }) => {
      state.updateKYCLoading = false;
      state.updateKYCErrorMsg = payload;
    },
    // verify email reducers
    verifyEmailStart: (state) => {
      state.verifyEmailLoading = true;
      state.verifyEmailErrorMsg = "";
    },
    verifyEmailSuccess: (state) => {
      state.verifyEmailLoading = false;
      state.verifyEmailErrorMsg = "";
    },
    verifyEmailFail: (state, { payload }) => {
      state.verifyEmailLoading = false;
      state.verifyEmailErrorMsg = payload;
    },
    resetVerifyEmailErrorMsg: (state) => {
      state.verifyEmailErrorMsg = "";
    },
    // save inquiry id
    saveInquiryIdStart: (state) => {
      state.saveInquiryIdLoading = true;
      state.saveInquiryIdErrorMsg = "";
    },
    saveInquiryIdSuccess: (state) => {
      state.saveInquiryIdLoading = false;
      state.saveInquiryIdErrorMsg = "";
    },
    saveInquiryIdFail: (state, { payload }) => {
      state.saveInquiryIdLoading = false;
      state.saveInquiryIdErrorMsg = payload;
    },
    // transaction verification - verify otp
    transactionVerificationStart: (state) => {
      state.transactionVerificationLoading = true;
    },
    transactionVerificationSuccess: (state, { payload }) => {
      state.transactionVerificationLoading = false;
      state.transactionVerificationErrorMsg = "";
      state.transactionVerificationSuccessMsg = payload;
    },
    transactionVerificationFail: (state, { payload }) => {
      state.transactionVerificationLoading = false;
      state.transactionVerificationErrorMsg = payload;
    },
    resetTransactionVerificationErrorMsg: (state) => {
      state.transactionVerificationErrorMsg = "";
      state.transactionVerificationSuccessMsg = "";
    },
  },
});

export const {
  getVerificationStart,
  getVerificationSuccess,
  getVerificationFail,
  updateKYCStart,
  updateKYCSuccess,
  updateKYCFail,
  verifyEmailStart,
  verifyEmailSuccess,
  verifyEmailFail,
  resetVerifyEmailErrorMsg,
  saveInquiryIdStart,
  saveInquiryIdSuccess,
  saveInquiryIdFail,
  transactionVerificationStart,
  transactionVerificationSuccess,
  transactionVerificationFail,
  resetTransactionVerificationErrorMsg,
} = verificationSlice.actions;

export const verificationReducers = verificationSlice.reducer;
