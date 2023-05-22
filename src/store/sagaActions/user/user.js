import { createAction } from "@reduxjs/toolkit";

export const getMarketHighlightsAction = createAction(
  "GET_MARKET_HIGHLIGHTS_ACTION"
);

export const closeAccountAction = createAction("CLOSE_ACCOUNT_ACTION");

export const changePasswordAction = createAction("CHANGE_PASSWORD_ACTION");

export const getVerificationAction = createAction("GET_VERIFICATION_ACTION");

export const updateKycAction = createAction("UPDATE_KYC_ACTION");

export const getSettingsAction = createAction("GET_SETTINGS_ACTION");

export const saveSettingsAction = createAction("SAVE_SETTINGS_ACTION");

export const verifyEmailAction = createAction("VERIFY_EMAIL_ACTION");

export const getDashboardTotalsAction = createAction(
  "GET_DASHBOARD_TOTALS_ACTION"
);

export const getTransactionHistoryAction = createAction(
  "GET_TRANSACTION_HISTORY_ACTION"
);

export const getLoanHistoryAction = createAction("GET_LOAN_HISTORY_ACTION");

export const getAssetsAction = createAction("GET_ASSETS_ACTION");

export const saveInquiryIdAction = createAction("SAVE_INQUIRY_ID_ACTION");

export const withdrawAction = createAction("WITHDRAW_ACTION");

export const getActiveFixedTermAction = createAction(
  "GET_ACTIVE_FIXED_TERM_ACTION"
);

export const getpreviousTermAction = createAction("GET_PREVIOUS_TERM_ACTION");

export const createFixedTermAction = createAction("CREATE_FIXED_TERM_ACTION");

export const transactionVerificationAction = createAction(
  "WITHDRAW_AUTHENTICATION_ACTION"
);

export const borrowLoanAction = createAction("BORROW_LOAN_ACTION");

export const payLoanAction = createAction("PAY_LOAN_ACTION");

export const cancelFixedTermsAction = createAction("CANCEL_FIXED_TERMS_ACTION");

export const autoRenewalFixedTermsAction = createAction(
  "AUTORENEWAL_FIXED_TERMS_ACTION"
);

export const compareCoinAction = createAction("COMPARE_COIN_ACTION");

export const swapCoinAction = createAction("SWAP_COIN_ACTION");

export const getPlatformVariableAction = createAction(
  "GET_PLATFORM_VARIABLE_ACTION"
);

export const getPlatformFeesAction = createAction("GET_PLATFORM_FEES_ACTION");

export const affiliateDashoardCount = createAction(
  "GET_AFFILIATE_DASHBOARD_COUNT"
);
export const affiliateDashoardList = createAction(
  "GET_AFFILIATE_DASHBOARD_LIST"
);
export const affiliateDashoardStatics = createAction(
  "GET_AFFILIATE_DASHBOARD_STATIVS"
);
export const getDashboardImagesAction = createAction(
  "GET_DASHBOARD_IMAGES_ACTION"
);
export const getLTVAction = createAction("GET_LTV_ACTION");

export const subscribeAction = createAction("SUBSCRIBE_ACTION");
