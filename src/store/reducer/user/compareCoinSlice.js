import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errorMsg: "",
  coinValue: null,
};

const compareCoinSlice = createSlice({
  name: "compareCoin",
  initialState,
  reducers: {
    compareCoinStart: (state) => {
      state.isLoading = true;
    },
    compareCoinSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.coinValue = payload?.data?.items;
    },
    compareCoinFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    resetCompareCoin: (state) => {
      state.resetCompareCoin = "";
    },
  },
});

export const {
  compareCoinStart,
  compareCoinSuccess,
  compareCoinFail,
  resetCompareCoin,
} = compareCoinSlice.actions;

export const compareCoinReducer = compareCoinSlice.reducer;
