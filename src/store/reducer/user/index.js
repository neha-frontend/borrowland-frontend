import { combineReducers } from "@reduxjs/toolkit";

import { changePasswordReducers } from "./changePasswordSlice";
import { marketHighlightsReducers } from "./marketHighlightsSlice";
import { closeAccountReducers } from "./closeAccountSlice";
import { userDetailsReducers } from "./userDetailsSlice";
import { verificationReducers } from "./verificationSlice";
import { settingsReducer } from "./settingsSlice";
import { dashboardReducers } from "./dashboardSlice";
import { transactionReducers } from "./transactionSlice";
import { loanReducers } from "./loanSlice";
import { assetsReducers } from "./assetsSlice";
import { withdrawReducers } from "./withdrawSlice";
import { fixedTermReducer } from "./fixedTermsSlice";
import { compareCoinReducer } from "./compareCoinSlice";
import { platformVariableReducer } from "./platformVariableSlice";
import { affiliateDashboardReducers } from "./affiliateSlice";
import { swapCoinReducer } from "./swapCoinSlice";

const userRootReducer = combineReducers({
  userDetails: userDetailsReducers,
  marketHighlights: marketHighlightsReducers,
  closeAccount: closeAccountReducers,
  changePassword: changePasswordReducers,
  verification: verificationReducers,
  setting: settingsReducer,
  dashboard: dashboardReducers,
  transaction: transactionReducers,
  loan: loanReducers,
  assets: assetsReducers,
  withdraw: withdrawReducers,
  fixedTerm: fixedTermReducer,
  compareCoin: compareCoinReducer,
  platformVariable: platformVariableReducer,
  affiliate: affiliateDashboardReducers,
  swapCoin: swapCoinReducer,
});
export default userRootReducer;
