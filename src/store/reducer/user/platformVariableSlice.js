import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  platformFeesLoading: false,
  PlatformFeesErrorMsg: "",
  platformFees: "",
  platformVariablesListLoading: false,
  PlatformVariablesListErrorMsg: "",
  platformVariableList: null,
  // LTV
  getLTVLoading: false,
  LTVvalues: null,
  getLTVErrorMsg: "",
  // tenure
  getTenureLoading: false,
  TenureValues: null,
  getTenureErrorMsg: "",
};

const platformVariableSlice = createSlice({
  name: "platformVariable",
  initialState,
  reducers: {
    // get platform fees
    getPlatformFeesStart: (state) => {
      state.platformFeesLoading = true;
    },
    getPlatformFeesSuccess: (state, { payload }) => {
      state.platformFeesLoading = false;
      state.platformFees = payload?.data?.values;
    },
    getPlatformFeesFail: (state, { payload }) => {
      state.platformFeesLoading = false;
      state.PlatformFeesErrorMsg = payload;
    },
    resetplatformFeesErrorMsg: (state) => {
      state.PlatformFeesErrorMsg = "";
    },
    // get platform variables list
    getPlatformVariablesListStart: (state) => {
      state.platformVariablesListLoading = true;
    },
    getPlatformVariablesListSuccess: (state, { payload }) => {
      state.platformVariablesListLoading = false;
      state.platformVariableList = payload?.data;
    },
    getPlatformVariablesListFail: (state, { payload }) => {
      state.platformVariablesListLoading = false;
      state.PlatformVariablesListErrorMsg = payload;
      state.platformVariableList = null;
    },
    resetPlatformVariablesList: (state) => {
      state.PlatformVariablesListErrorMsg = "";
    },
    // get ltv value
    getLTVStart: (state) => {
      state.getLTVLoading = true;
    },
    getLTVSuccess: (state, { payload }) => {
      state.getLTVLoading = false;
      state.LTVvalues = payload?.data;
    },
    getLTVFail: (state, { payload }) => {
      state.getLTVLoading = false;
      state.getLTVErrorMsg = payload;
    },
    resetLTVErrorMsg: (state) => {
      state.getLTVErrorMsg = "";
    },
    // get tenure value
    getTenureStart: (state) => {
      state.getTenureLoading = true;
    },
    getTenureSuccess: (state, { payload }) => {
      state.getTenureLoading = false;
      state.TenureValues = payload?.data;
    },
    getTenureFail: (state, { payload }) => {
      state.getTenureLoading = false;
      state.getTenureErrorMsg = payload;
    },
    resetTenureErrorMsg: (state) => {
      state.getTenureErrorMsg = "";
    },
  },
});

export const {
  getPlatformFeesStart,
  getPlatformFeesSuccess,
  getPlatformFeesFail,
  resetplatformFeesErrorMsg,
  getPlatformVariablesListStart,
  getPlatformVariablesListSuccess,
  getPlatformVariablesListFail,
  resetPlatformVariablesList,
  getLTVStart,
  getLTVSuccess,
  getLTVFail,
  resetLTVErrorMsg,
  getTenureStart,
  getTenureSuccess,
  getTenureFail,
  resetTenureErrorMsg,
} = platformVariableSlice.actions;

export const platformVariableReducer = platformVariableSlice.reducer;
