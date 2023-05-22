import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errorMsg: "",
  loanList: [],
  totalItems: 0,
  pageNumber: 1,
  totalPage: 1,
  // borrow loan
  borrowLoanLoading: false,
  borrowLoanErrorMsg: "",
  // pay loan
  payLoanLoading: false,
  payLoanErrorMsg: "",
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    // GET LOAN HISTORY
    getLoanHistoryStart: (state) => {
      state.isLoading = true;
      state.errorMsg = "";
    },
    getLoanHistorySuccess: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = "";
      state.loanList = payload?.response?.data?.items;
      state.totalItems = payload?.response?.data?.totalItems;
      state.totalPage = payload?.response?.data?.itemsPerPage;
      state.pageNumber = payload?.response?.data?.startIndex;
    },
    getLoanHistoryFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    resetLoanHistory: (state) => {
      state.isLoading = false;
      state.errorMsg = "";
      state.loanList = [];
    },
    // BORROW LOAN
    borrowLoanStart: (state) => {
      state.borrowLoanLoading = true;
    },
    borrowLoanSuccess: (state) => {
      state.borrowLoanLoading = false;
    },
    borrowLoanFail: (state, { payload }) => {
      state.borrowLoanLoading = false;
      state.borrowLoanErrorMsg = payload;
    },
    resetBorrowLoanErrorMsg: (state) => {
      state.borrowLoanErrorMsg = "";
    },
    // pay loan
    payLoanStart: (state) => {
      state.payLoanLoading = true;
    },
    payLoanSuccess: (state) => {
      state.payLoanLoading = false;
    },
    payLoanFail: (state, { payload }) => {
      state.payLoanLoading = false;
      state.payLoanErrorMsg = payload;
    },
    resetPayLoanErrorMsg: (state) => {
      state.payLoanErrorMsg = "";
    },
  },
});

export const {
  getLoanHistoryStart,
  getLoanHistorySuccess,
  getLoanHistoryFail,
  resetLoanHistory,
  borrowLoanStart,
  borrowLoanSuccess,
  borrowLoanFail,
  resetBorrowLoanErrorMsg,
  payLoanStart,
  payLoanSuccess,
  payLoanFail,
  resetPayLoanErrorMsg,
} = loanSlice.actions;

export const loanReducers = loanSlice.reducer;
