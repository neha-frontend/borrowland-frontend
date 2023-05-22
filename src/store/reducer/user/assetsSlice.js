import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errorMsg: "",
  assetsList: [],
};

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    getAssetsStart: (state) => {
      state.isLoading = true;
    },
    getAssetsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = "";
      state.assetsList = payload?.data?.items;
    },
    getAssetsFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    resetAssets: (state) => {
      state.isLoading = false;
      state.errorMsg = "";
      state.assetsList = [];
    },
  },
});

export const { getAssetsStart, getAssetsSuccess, getAssetsFail, resetAssets } =
  assetsSlice.actions;

export const assetsReducers = assetsSlice.reducer;
