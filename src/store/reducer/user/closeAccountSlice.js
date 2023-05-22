const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  errorMsg: "",
};

const closeAccountSlice = createSlice({
  name: "closeAccount",
  initialState,
  reducers: {
    closeAccountStart: (state) => {
      state.isLoading = true;
      state.errorMsg = "";
    },
    closeAccountSuccess: (state) => {
      state.isLoading = false;
      state.errorMsg = "";
    },
    closeAccountFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload.data;
    },
  },
});

export const { closeAccountStart, closeAccountSuccess, closeAccountFail } =
  closeAccountSlice.actions;

export const closeAccountReducers = closeAccountSlice.reducer;
