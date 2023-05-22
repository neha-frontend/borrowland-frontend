import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWithdrawLoading: false,
  withdrawErrorMsg: "",
};

const withdrawSlice = createSlice({
  name: "withdraw",
  initialState,
  reducers: {
    withdrawStart: (state) => {
      state.isWithdrawLoading = true;
      state.withdrawErrorMsg = "";
    },
    withdrawSuccess: (state) => {
      state.isWithdrawLoading = false;
      state.withdrawErrorMsg = "";
    },
    withdrawFail: (state, { payload }) => {
      state.isWithdrawLoading = false;
      state.withdrawErrorMsg = payload;
    },
    resetWithdrawErrorMsg: (state) => {
      state.withdrawErrorMsg = "";
    },
  },
});

export const {
  withdrawStart,
  withdrawSuccess,
  withdrawFail,
  resetWithdrawErrorMsg,
} = withdrawSlice.actions;

export const withdrawReducers = withdrawSlice.reducer;
