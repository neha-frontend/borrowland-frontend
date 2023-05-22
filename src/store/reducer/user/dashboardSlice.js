import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboardTotalsLoading: false,
  dashboardTotalsErrorMsg: "",
  dashboardTotals: null,
  // dashboard images
  dashboardImagesLoading: false,
  dashboardImagesErrorMsg: "",
  dashboardImages: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // get dashboard totals
    getDashboardTotalsStart: (state) => {
      state.dashboardTotalsLoading = true;
      state.dashboardTotalsErrorMsg = "";
    },
    getDashboardTotalsSuccess: (state, { payload }) => {
      state.dashboardTotalsLoading = false;
      state.dashboardTotalsErrorMsg = "";
      state.dashboardTotals = payload?.data?.items;
    },
    getDashboardTotalsFail: (state, { payload }) => {
      state.dashboardTotalsLoading = false;
      state.dashboardTotalsErrorMsg = payload;
    },
    resetDashboardTotals: (state) => {
      state.dashboardTotals = null;
    },
    // get dashboard images
    getDashboardImagesStart: (state) => {
      state.dashboardImagesLoading = true;
      state.dashboardImagesErrorMsg = "";
    },
    getDashboardImagesSuccess: (state, { payload }) => {
      state.dashboardImagesLoading = false;
      state.dashboardImagesErrorMsg = "";
      state.dashboardImages = payload?.data?.items;
    },
    getDashboardImagesFail: (state, { payload }) => {
      state.dashboardImagesLoading = false;
      state.dashboardImagesErrorMsg = payload;
    },
  },
});

export const {
  getDashboardTotalsStart,
  getDashboardTotalsSuccess,
  getDashboardTotalsFail,
  resetDashboardTotals,
  getDashboardImagesStart,
  getDashboardImagesSuccess,
  getDashboardImagesFail,
} = dashboardSlice.actions;

export const dashboardReducers = dashboardSlice.reducer;
