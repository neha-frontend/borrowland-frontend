import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errorMsg: "",
  swapValue: null,
};

const swapCoinSlice = createSlice({
  name: "swapCoin",
  initialState,
  reducers: {
    swapCoinStart: (state) => {
      state.isLoading = true;
    },
    swapCoinSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.swapValue = payload?.data?.items;
      state.errorMsg = "";
    },
    swapCoinFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    resetSwapCoinErrorMsg: (state) => {
      state.errorMsg = "";
    },
  },
});

export const {
  swapCoinStart,
  swapCoinSuccess,
  swapCoinFail,
  resetSwapCoinErrorMsg,
} = swapCoinSlice.actions;

export const swapCoinReducer = swapCoinSlice.reducer;
