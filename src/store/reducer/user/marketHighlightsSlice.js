import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errorMsg: "",
  marketHighlightsList: null,
};

const marketHighlightsSlice = createSlice({
  name: "marketHighlights",
  initialState,
  reducers: {
    getMarketHighlightsStart: (state) => {
      state.isLoading = true;
      state.errorMsg = "";
    },
    getMarketHighlightsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = "";
      state.marketHighlightsList = payload;
    },
    getMarketHighlightsFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    resetMarketHighlights: (state) => {
      state.isLoading = false;
      state.errorMsg = "";
      state.marketHighlightsList = null;
    },
  },
});

export const {
  getMarketHighlightsStart,
  getMarketHighlightsSuccess,
  getMarketHighlightsFail,
  resetMarketHighlights,
} = marketHighlightsSlice.actions;

export const marketHighlightsReducers = marketHighlightsSlice.reducer;
