const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  errorMsg: "",
  savingIntrestPreference: false,
  autoCollateralTransfer: false,
  fixedTerms: false,
  // save setting
  saveSettingLoading: false,
  saveSettingErrorMsg: "",
};

const settingsSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    // get settings reducer
    getSettingStart: (state) => {
      state.isLoading = true;
      state.errorMsg = "";
    },
    getSettingSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = "";
      state.savingIntrestPreference = payload?.savingIntrestPreference;
      state.autoCollateralTransfer = payload?.autoCollateralTransfer;
      state.fixedTerms = payload?.fixedTerms;
    },
    getSettingFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    resetSettings: (state) => {
      state.savingIntrestPreference = false;
      state.autoCollateralTransfer = false;
      state.fixedTerms = false;
    },
    // save settings reducer
    saveSettingStart: (state) => {
      state.saveSettingLoading = true;
      state.saveSettingErrorMsg = "";
    },
    saveSettingSuccess: (state) => {
      state.saveSettingLoading = false;
      state.saveSettingErrorMsg = "";
    },
    saveSettingFail: (state, { payload }) => {
      state.saveSettingLoading = false;
      state.saveSettingErrorMsg = payload;
    },
  },
});

export const {
  getSettingStart,
  getSettingSuccess,
  getSettingFail,
  resetSettings,
  saveSettingStart,
  saveSettingSuccess,
  saveSettingFail,
} = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
