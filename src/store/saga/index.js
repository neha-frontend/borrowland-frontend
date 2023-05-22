import { all, takeLatest } from "redux-saga/effects";

import {
  changePasswordAction,
  forgotPasswordAction,
  getMarketHighlightsAction,
  getVerificationAction,
  loginAction,
  logoutAction,
  otpVerificationAction,
  resendOtpAction,
  resetPasswordAction,
  signUpAction,
  closeAccountAction,
  updateKycAction,
  getSettingsAction,
  saveSettingsAction,
  verifyEmailAction,
  getDashboardTotalsAction,
  getTransactionHistoryAction,
  getLoanHistoryAction,
  getAssetsAction,
  saveInquiryIdAction,
  withdrawAction,
  getActiveFixedTermAction,
  getpreviousTermAction,
  createFixedTermAction,
  transactionVerificationAction,
  borrowLoanAction,
  payLoanAction,
  cancelFixedTermsAction,
  autoRenewalFixedTermsAction,
  compareCoinAction,
  swapCoinAction,
  getPlatformFeesAction,
  getPlatformVariableAction,
  affiliateDashoardCount,
  affiliateDashoardList,
  affiliateDashoardStatics,
  agentSignUp,
  getDashboardImagesAction,
  getLTVAction,
  subscribeAction,
} from "../sagaActions";
import {
  agentSignUpSaga,
  forgotPasswordSaga,
  loginSaga,
  logoutSaga,
  otpVerificationSaga,
  resendOTPSaga,
  resetPasswordSaga,
  signUpSaga,
} from "./auth/auth";

import {
  changePasswordSaga,
  getMarketHighlightsSaga,
  closeAccountSaga,
  getVerificationSaga,
  updateKYCSaga,
  getSettingSaga,
  saveSettingsSaga,
  verifyEmailSaga,
  getDashboardTotalsSaga,
  getTransactionHistorySaga,
  getLoanHistorySaga,
  getAssetsSaga,
  saveInquiryIdSaga,
  withdrawSaga,
  getActiveFixedTermSaga,
  getPreviousTermSaga,
  createFixedTermSaga,
  transactionVerificationSaga,
  borrowLoanSaga,
  payLoanSaga,
  cancelFixedTermSaga,
  autoRenewalFixedTermSaga,
  compareCoinSaga,
  getPlatformFeesSaga,
  getPlatformVariableListSaga,
  swapCoinSaga,
  getAffiliateDashboardStaticsSaga,
  getAffiliateDashboardListSaga,
  getAffiliateDashboardCountSaga,
  getDashboardImagesSaga,
  getLTVSaga,
  subscribeSaga,
} from "./user/user";

function* watchAuthentication() {
  yield takeLatest(signUpAction.type, signUpSaga);
  yield takeLatest(agentSignUp.type, agentSignUpSaga);

  yield takeLatest(otpVerificationAction.type, otpVerificationSaga);
  yield takeLatest(resendOtpAction.type, resendOTPSaga);
  yield takeLatest(loginAction.type, loginSaga);
  yield takeLatest(forgotPasswordAction.type, forgotPasswordSaga);
  yield takeLatest(resetPasswordAction.type, resetPasswordSaga);
  yield takeLatest(logoutAction.type, logoutSaga);
}

function* watchUser() {
  yield takeLatest(getMarketHighlightsAction.type, getMarketHighlightsSaga);
  yield takeLatest(closeAccountAction.type, closeAccountSaga);
  yield takeLatest(changePasswordAction.type, changePasswordSaga);
  yield takeLatest(getVerificationAction.type, getVerificationSaga);
  yield takeLatest(updateKycAction.type, updateKYCSaga);
  yield takeLatest(getSettingsAction.type, getSettingSaga);
  yield takeLatest(saveSettingsAction.type, saveSettingsSaga);
  yield takeLatest(verifyEmailAction.type, verifyEmailSaga);
  yield takeLatest(getDashboardTotalsAction.type, getDashboardTotalsSaga);
  yield takeLatest(getTransactionHistoryAction.type, getTransactionHistorySaga);
  yield takeLatest(getLoanHistoryAction.type, getLoanHistorySaga);
  yield takeLatest(getAssetsAction.type, getAssetsSaga);
  yield takeLatest(saveInquiryIdAction.type, saveInquiryIdSaga);
  yield takeLatest(withdrawAction.type, withdrawSaga);
  yield takeLatest(getActiveFixedTermAction.type, getActiveFixedTermSaga);
  yield takeLatest(getpreviousTermAction.type, getPreviousTermSaga);
  yield takeLatest(createFixedTermAction.type, createFixedTermSaga);
  yield takeLatest(
    transactionVerificationAction.type,
    transactionVerificationSaga
  );
  yield takeLatest(affiliateDashoardCount.type, getAffiliateDashboardCountSaga);
  yield takeLatest(affiliateDashoardList.type, getAffiliateDashboardListSaga);
  yield takeLatest(
    affiliateDashoardStatics.type,
    getAffiliateDashboardStaticsSaga
  );

  yield takeLatest(borrowLoanAction.type, borrowLoanSaga);
  yield takeLatest(payLoanAction.type, payLoanSaga);
  yield takeLatest(cancelFixedTermsAction.type, cancelFixedTermSaga);
  yield takeLatest(autoRenewalFixedTermsAction.type, autoRenewalFixedTermSaga);
  yield takeLatest(compareCoinAction.type, compareCoinSaga);
  yield takeLatest(swapCoinAction.type, swapCoinSaga);
  yield takeLatest(getPlatformFeesAction.type, getPlatformFeesSaga);
  yield takeLatest(getPlatformVariableAction.type, getPlatformVariableListSaga);
  yield takeLatest(getDashboardImagesAction.type, getDashboardImagesSaga);
  yield takeLatest(getLTVAction.type, getLTVSaga);
  yield takeLatest(subscribeAction.type, subscribeSaga);
}

export default function* rootSaga() {
  yield all([watchAuthentication(), watchUser()]);
}
