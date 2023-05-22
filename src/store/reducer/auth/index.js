import { combineReducers } from "@reduxjs/toolkit";

import { loginReducer } from "./loginSlice";
import { passwordReducer } from "./passwordSlice";
import { otpVerificationReducer } from "./otpVerificationSlice";
import { signUpReducer } from "./signupSlice";

const authRootReducer = combineReducers({
  signUp: signUpReducer,
  otpVerification: otpVerificationReducer,
  login: loginReducer,
  password: passwordReducer,
});
export default authRootReducer;
