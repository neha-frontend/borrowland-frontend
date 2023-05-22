import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errorMsg: "",
  transactionHistoryList: null,
  totalItems: 0,
  pageNumber: 1,
  totalPage: 1,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    // get verification checks
    getTransactionHistoryStart: (state) => {
      state.isLoading = true;
      state.errorMsg = "";
    },
    getTransactionHistorySuccess: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = "";
      state.transactionHistoryList = payload?.response?.data?.items;
      state.totalItems = payload?.response?.data?.totalItems;
      state.totalPage = payload?.response?.data?.itemsPerPage;
      state.pageNumber = payload?.response?.data?.startIndex;
    },
    getTransactionHistoryFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    resetGetTransactionHistoryList: (state) => {
      state.transactionHistoryList = null;
    },
  },
});
export const {
  getTransactionHistoryStart,
  getTransactionHistorySuccess,
  getTransactionHistoryFail,
  resetGetTransactionHistoryList,
} = transactionSlice.actions;
export const transactionReducers = transactionSlice.reducer;
