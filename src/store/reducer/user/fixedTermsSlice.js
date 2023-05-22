import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // get active fixed term
  getActiveFixedTermLoading: false,
  getActiveFixedTermErrorMsg: "",
  activeFixedTermsList: [],
  totalItemsActiveTerms: 0,
  pageNumberActiveTerms: 1,
  totalPageActiveTerms: 1,
  // get previous fixed term
  getPreviousTermLoading: false,
  getPreviousTermErrorMsg: "",
  previousTermsList: [],
  totalItemsPreviousTerms: 0,
  pageNumberPreviousTerms: 1,
  totalPagePreviousTerms: 1,
  // create fixed term
  createFixedTermLoading: false,
  createFixedTermErrorMsg: "",
  // cancel fixed term
  cancelFixedTermLoading: false,
  cancelFixedTermErrorMsg: "",
  // auto renewal
  autoRenewalTermLoading: false,
  autoRenewalTermErrorMsg: "",
  isAutoRenewal: false,
};

const fixedTermSlice = createSlice({
  name: "fixedTerm",
  initialState,
  reducers: {
    // GET ACTIVE FIXED TERM
    getActiveFixedTermStart: (state) => {
      state.getActiveFixedTermLoading = true;
    },
    getActiveFixedTermSuccess: (state, { payload }) => {
      state.getActiveFixedTermLoading = false;
      state.activeFixedTermsList = payload?.data?.items;
      state.totalItemsActiveTerms = payload?.data?.totalItems;
      state.totalPageActiveTerms = payload?.data?.itemsPerPage;
      state.pageNumberActiveTerms = payload?.data?.startIndex;
      state.isAutoRenewal = false;
    },
    getActiveFixedTermFail: (state, { payload }) => {
      state.getActiveFixedTermLoading = false;
      state.getActiveFixedTermErrorMsg = payload;
    },

    // GET PREVIOUS TERM
    getPreviousTermStart: (state) => {
      state.getPreviousTermLoading = true;
    },
    getPreviousTermSuccess: (state, { payload }) => {
      state.getPreviousTermLoading = false;
      state.previousTermsList = payload?.data?.items;
      state.totalItemsPreviousTerms = payload?.data?.totalItems;
      state.totalPagePreviousTerms = payload?.data?.itemsPerPage;
      state.pageNumberPreviousTerms = payload?.data?.startIndex;
    },
    getPreviousTermFail: (state, { payload }) => {
      state.getPreviousTermLoading = false;
      state.getPreviousTermErrorMsg = payload;
    },

    // CREATE FIXED TERM
    createFixedTermStart: (state) => {
      state.createFixedTermLoading = true;
    },
    createFixedTermSuccess: (state) => {
      state.createFixedTermLoading = false;
    },
    createFixedTermFail: (state, { payload }) => {
      state.createFixedTermLoading = false;
      state.createFixedTermErrorMsg = payload;
    },
    resetCreateFixedTermErrorMsg: (state) => {
      state.createFixedTermErrorMsg = "";
    },

    // CANCEL FIXED TERMS
    cancelFixedTermStart: (state) => {
      state.cancelFixedTermLoading = true;
    },
    cancelFixedTermSuccess: (state) => {
      state.cancelFixedTermLoading = false;
    },
    cancelFixedTermFail: (state, { payload }) => {
      state.cancelFixedTermLoading = false;
      state.cancelFixedTermErrorMsg = payload;
    },
    resetCancelFixedTermErrorMsg: (state) => {
      state.cancelFixedTermErrorMsg = "";
    },

    // auto renewal fixed term
    autoRenewalFixedTermStart: (state) => {
      state.autoRenewalTermLoading = true;
    },
    autoRenewalFixedTermSuccess: (state) => {
      state.autoRenewalTermLoading = false;
      state.isAutoRenewal = true;
    },
    autoRenewalFixedTermFail: (state, { payload }) => {
      state.autoRenewalTermLoading = false;
      state.autoRenewalTermErrorMsg = payload;
      state.isAutoRenewal = false;
    },
    resetautoRenewalFixedTermErrorMsg: (state) => {
      state.autoRenewalTermErrorMsg = "";
      state.isAutoRenewal = false;
    },
  },
});

export const {
  getActiveFixedTermStart,
  getActiveFixedTermSuccess,
  getActiveFixedTermFail,
  getPreviousTermStart,
  getPreviousTermSuccess,
  getPreviousTermFail,
  createFixedTermStart,
  createFixedTermSuccess,
  createFixedTermFail,
  resetCreateFixedTermErrorMsg,
  cancelFixedTermStart,
  cancelFixedTermSuccess,
  cancelFixedTermFail,
  resetCancelFixedTermErrorMsg,
  autoRenewalFixedTermStart,
  autoRenewalFixedTermSuccess,
  autoRenewalFixedTermFail,
  resetautoRenewalFixedTermErrorMsg,
} = fixedTermSlice.actions;

export const fixedTermReducer = fixedTermSlice.reducer;
