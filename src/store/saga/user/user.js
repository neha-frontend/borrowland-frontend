import { toast } from "react-toastify";
import { put } from "redux-saga/effects";

import { errorHandler } from "../../../utils";
import {
  CLOSE_ACCOUNT_URL,
  CHANGE_PASSWORD_URL,
  GET_MARKET_HIGHLIGHTS_URL,
  GET_VERIFICATION_URL,
  UPDATE_KYC_URL,
  GET_SETTINGS_URL,
  SAVE_SETTINGS_URL,
  VERIFY_EMAIL_URL,
  GET_DASHBOARD_TOTALS_URL,
  GET_TRANSACTION_HISTORY_URL,
  GET_LOAN_HISTORY_URL,
  GET_ASSETS_URL,
  SAVE_INQUIRY_ID_URL,
  WITHDRAW_URL,
  CREATE_FIXED_TERM_URL,
  TRANSACTION_VERIFICATION_URL,
  GET_FIXED_TERM_URL,
  BORROW_LOAN_URL,
  PAY_LOAN_URL,
  CANCEL_FIXED_TERM_URL,
  AUTORENEWAL_FIXED_TERMS_URL,
  COMPARE_COIN_URL,
  PLATFORM_VARIABLE_URL,
  SWAP_COIN_BALANCE_URL,
  AFFILIATE_DASHBOARD_Statics,
  AFFILIATE_DASHBOARD_LIST,
  AFFILIATE_DASHBOARD_COUNT,
  GET_DASHBOARD_IMAGES_URL,
  SUBSCRIBE_URL,
} from "../../../apis";
import {
  changePasswordFail,
  changePasswordStart,
  changePasswordSuccess,
  getMarketHighlightsFail,
  getMarketHighlightsStart,
  getMarketHighlightsSuccess,
  closeAccountStart,
  closeAccountSuccess,
  closeAccountFail,
  getVerificationFail,
  getVerificationStart,
  getVerificationSuccess,
  updateKYCFail,
  updateKYCStart,
  updateKYCSuccess,
  getSettingStart,
  getSettingSuccess,
  getSettingFail,
  saveSettingStart,
  saveSettingSuccess,
  saveSettingFail,
  verifyEmailFail,
  verifyEmailStart,
  verifyEmailSuccess,
  getDashboardTotalsSuccess,
  getDashboardTotalsFail,
  getDashboardTotalsStart,
  getTransactionHistoryStart,
  getTransactionHistorySuccess,
  getTransactionHistoryFail,
  getLoanHistoryStart,
  getLoanHistorySuccess,
  getLoanHistoryFail,
  getAssetsStart,
  getAssetsSuccess,
  getAssetsFail,
  saveInquiryIdStart,
  saveInquiryIdSuccess,
  saveInquiryIdFail,
  withdrawStart,
  withdrawSuccess,
  withdrawFail,
  getActiveFixedTermStart,
  getActiveFixedTermSuccess,
  getActiveFixedTermFail,
  getPreviousTermStart,
  getPreviousTermSuccess,
  getPreviousTermFail,
  createFixedTermStart,
  createFixedTermSuccess,
  createFixedTermFail,
  transactionVerificationStart,
  transactionVerificationSuccess,
  transactionVerificationFail,
  borrowLoanStart,
  borrowLoanSuccess,
  borrowLoanFail,
  payLoanStart,
  payLoanSuccess,
  payLoanFail,
  cancelFixedTermStart,
  cancelFixedTermSuccess,
  cancelFixedTermFail,
  autoRenewalFixedTermStart,
  autoRenewalFixedTermSuccess,
  autoRenewalFixedTermFail,
  compareCoinStart,
  compareCoinSuccess,
  compareCoinFail,
  swapCoinStart,
  swapCoinSuccess,
  swapCoinFail,
  getPlatformFeesStart,
  getPlatformFeesSuccess,
  getPlatformFeesFail,
  getPlatformVariablesListSuccess,
  getPlatformVariablesListStart,
  getPlatformVariablesListFail,
  getDashboardImagesStart,
  getDashboardImagesSuccess,
  getDashboardImagesFail,
  getLTVStart,
  getLTVSuccess,
  getLTVFail,
  subscribeStart,
  subscribeSuccess,
  subscribeFail,
} from "../../sagaActions";
import { getAffiliateDashboardCountStart } from "store/reducer/user/affiliateSlice";
import { getAffiliateDashboardCountSuccess } from "store/reducer/user/affiliateSlice";
import { getAffiliateDashboardCountFail } from "store/reducer/user/affiliateSlice";
import { getAffiliateUserListStart } from "store/reducer/user/affiliateSlice";
import { getAffiliateUserListSuccess } from "store/reducer/user/affiliateSlice";
import { getAffiliateUserListFail } from "store/reducer/user/affiliateSlice";
import { getAffiliateUserStaticsStart } from "store/reducer/user/affiliateSlice";
import { getAffiliateUserStaticsSuccess } from "store/reducer/user/affiliateSlice";
import { getAffiliateUserStaticsFail } from "store/reducer/user/affiliateSlice";

const notifyError = (toastMessage) => toast.error(toastMessage);

// get market highlights saga
export function* getMarketHighlightsSaga() {
  yield put(getMarketHighlightsStart());
  yield errorHandler({
    endpoint: GET_MARKET_HIGHLIGHTS_URL,
    successHandler: yield function* (response) {
      yield put(getMarketHighlightsSuccess(response?.data?.items));
    },
    failHandler: yield function* (response) {
      yield put(getMarketHighlightsFail(response));
    },
    failHandlerType: "CUSTOM",
    apiType: "get",
  });
}

// close account saga
export function* closeAccountSaga(action) {
  yield put(closeAccountStart());
  const { data, handleOpenVerificationModal } = action.payload;
  yield errorHandler({
    endpoint: CLOSE_ACCOUNT_URL,
    successHandler: yield function* (response) {
      yield put(closeAccountSuccess(response));
      handleOpenVerificationModal();

      // yield sessionStorage.clear();
      // setTimeout(() => {
      //   navigate("/");
      // }, 4000);
    },
    failHandler: yield function* (response) {
      yield put(closeAccountFail(response));
      notifyError(response);
    },
    failHandlerType: "CUSTOM",
    payload: data,
    apiType: "patch",
  });
}

// change password saga
export function* changePasswordSaga(action) {
  yield put(changePasswordStart());
  const { data, resetForm, handleOpenVerificationModal } = action.payload;
  yield errorHandler({
    endpoint: CHANGE_PASSWORD_URL,
    successHandler: yield function* (response) {
      yield put(changePasswordSuccess(response));
      handleOpenVerificationModal();
      resetForm();
    },
    failHandler: yield function* (response) {
      yield put(changePasswordFail(response));
    },
    failHandlerType: "CUSTOM",
    payload: data,
    apiType: "post",
  });
}

// get verification checks of user saga
export function* getVerificationSaga() {
  yield put(getVerificationStart());
  yield errorHandler({
    endpoint: GET_VERIFICATION_URL,
    successHandler: yield function* (response) {
      yield put(getVerificationSuccess(response?.data?.items));
    },
    failHandler: yield function* (response) {
      yield put(getVerificationFail(response));
    },
    failHandlerType: "CUSTOM",
    apiType: "get",
  });
}

// update KYC saga
export function* updateKYCSaga(action) {
  yield put(updateKYCStart());
  const { handleGetVerification } = action.payload;
  yield errorHandler({
    endpoint: UPDATE_KYC_URL,
    successHandler: yield function* (response) {
      yield put(updateKYCSuccess(response));
      if (handleGetVerification) {
        handleGetVerification();
      }
    },
    failHandler: yield function* (response) {
      yield put(updateKYCFail(response));
    },
    failHandlerType: "CUSTOM",
    apiType: "post",
  });
}

// get setting saga
export function* getSettingSaga() {
  yield put(getSettingStart());
  yield errorHandler({
    endpoint: GET_SETTINGS_URL,
    successHandler: yield function* (response) {
      yield put(getSettingSuccess(response?.data?.items));
    },
    failHandler: yield function* (response) {
      yield put(getSettingFail(response));
    },
    failHandlerType: "CUSTOM",
    apiType: "get",
  });
}

// save settings saga
export function* saveSettingsSaga(action) {
  yield put(saveSettingStart());
  const { data } = action.payload;
  yield errorHandler({
    endpoint: SAVE_SETTINGS_URL,
    successHandler: yield function* (response) {
      yield put(saveSettingSuccess(response));
    },
    failHandler: yield function* (response) {
      yield put(saveSettingFail(response));
    },
    failHandlerType: "CUSTOM",
    payload: data,
    apiType: "post",
  });
}

// verify your email saga
export function* verifyEmailSaga(action) {
  yield put(verifyEmailStart());
  yield errorHandler({
    endpoint: VERIFY_EMAIL_URL,
    successHandler: yield function* (response) {
      yield put(verifyEmailSuccess(response));
      if (action?.payload?.notify) {
        action?.payload?.notify("OTP has been resent successfully.");
      }
    },
    failHandler: yield function* (response) {
      yield put(verifyEmailFail(response));
    },
    failHandlerType: "CUSTOM",
    apiType: "post",
  });
}

// get dashboard totals saga
export function* getDashboardTotalsSaga() {
  yield put(getDashboardTotalsStart());
  yield errorHandler({
    endpoint: GET_DASHBOARD_TOTALS_URL,
    successHandler: yield function* (response) {
      yield put(getDashboardTotalsSuccess(response));
    },
    failHandler: yield function* (response) {
      yield put(getDashboardTotalsFail(response));
    },
    failHandlerType: "CUSTOM",
    apiType: "get",
  });
}

// get transaction history saga
export function* getTransactionHistorySaga(action) {
  yield put(getTransactionHistoryStart());
  const { startIndex, itemsPerPage, URL = "" } = action.payload;
  yield errorHandler({
    endpoint: `${GET_TRANSACTION_HISTORY_URL}startIndex=${startIndex}&itemsPerPage=${itemsPerPage}${URL}`,
    successHandler: yield function* (response) {
      yield put(getTransactionHistorySuccess({ response, ...action.payload }));
    },
    failHandler: yield function* (response) {
      yield put(getTransactionHistoryFail(response));
    },
    failHandlerType: "CUSTOM",
    apiType: "get",
  });
}

// get loan history saga
export function* getLoanHistorySaga(action) {
  yield put(getLoanHistoryStart());
  const { startIndex, itemsPerPage } = action.payload;
  yield errorHandler({
    endpoint: `${GET_LOAN_HISTORY_URL}startIndex=${startIndex}&itemsPerPage=${itemsPerPage}`,
    successHandler: yield function* (response) {
      yield put(getLoanHistorySuccess({ response, ...action.payload }));
    },
    failHandler: yield function* (response) {
      yield put(getLoanHistoryFail(response));
    },
    failHandlerType: "CUSTOM",
    apiType: "get",
  });
}

// get assets saga
export function* getAssetsSaga() {
  yield put(getAssetsStart());
  yield errorHandler({
    endpoint: GET_ASSETS_URL,
    successHandler: yield function* (response) {
      yield put(getAssetsSuccess(response));
    },
    failHandler: yield function* (response) {
      yield put(getAssetsFail(response));
    },
    failHandlerType: "CUSTOM",
    apiType: "get",
  });
}

// save inquiry id saga
export function* saveInquiryIdSaga(action) {
  yield put(saveInquiryIdStart());
  const { data, handleGetVerification } = action.payload;
  yield errorHandler({
    endpoint: SAVE_INQUIRY_ID_URL,
    successHandler: yield function* (response) {
      yield put(saveInquiryIdSuccess(response));
      if (handleGetVerification) {
        handleGetVerification();
      }
    },
    failHandler: yield function* (response) {
      yield put(saveInquiryIdFail(response));
    },
    failHandlerType: "CUSTOM",
    payload: data,
    apiType: "post",
  });
}

// withdraw saga
export function* withdrawSaga(action) {
  yield put(withdrawStart());
  const { data, onHide, handleOpenVerificationModal } = action.payload;
  yield errorHandler({
    endpoint: WITHDRAW_URL,
    successHandler: yield function* (response) {
      yield put(withdrawSuccess(response));
      onHide();
      handleOpenVerificationModal();
    },
    failHandler: yield function* (response) {
      yield put(withdrawFail(response));
    },
    failHandlerType: "CUSTOM",
    payload: data,
    apiType: "post",
  });
}

// get Active fixed term saga
export function* getActiveFixedTermSaga(action) {
  yield put(getActiveFixedTermStart());
  const { startIndex, itemsPerPage, URL = "" } = action.payload;
  yield errorHandler({
    endpoint: `${GET_FIXED_TERM_URL}startIndex=${startIndex}&itemsPerPage=${itemsPerPage}&isActive=${true}${URL}`,
    successHandler: yield function* (response) {
      yield put(getActiveFixedTermSuccess(response));
    },
    failHandler: yield function* (response) {
      yield put(getActiveFixedTermFail(response));
    },
    failHandlerType: "CUSTOM",
    apiType: "get",
  });
}

// get previous term saga
export function* getPreviousTermSaga(action) {
  yield put(getPreviousTermStart());
  const { startIndex, itemsPerPage, URL = "" } = action.payload;
  yield errorHandler({
    endpoint: `${GET_FIXED_TERM_URL}startIndex=${startIndex}&itemsPerPage=${itemsPerPage}&isActive=${false}${URL}`,
    successHandler: yield function* (response) {
      yield put(getPreviousTermSuccess(response));
    },
    failHandler: yield function* (response) {
      yield put(getPreviousTermFail(response));
    },
    failHandlerType: "CUSTOM",
    apiType: "get",
  });
}

// create fixed term saga
export function* createFixedTermSaga(action) {
  yield put(createFixedTermStart());
  const { data, handleOpenVerificationModal, setIsLoading } = action.payload;
  yield errorHandler({
    endpoint: CREATE_FIXED_TERM_URL,
    successHandler: yield function* (response) {
      yield put(createFixedTermSuccess(response));
      handleOpenVerificationModal();
      setIsLoading(false);
    },
    failHandler: yield function* (response) {
      yield put(createFixedTermFail(response));
      setIsLoading(false);
    },
    failHandlerType: "CUSTOM",
    payload: data,
    apiType: "post",
  });
}

// Transaction Verification Saga
export function* transactionVerificationSaga(action) {
  yield put(transactionVerificationStart());
  const {
    data,
    notify,
    notifyMessage,
    closeModal,
    handleActiveTerms,
    handleCloseAccountRedirection,
    type,
    navigate,
    handleResetCreateTerm,
    getAllFixedTerms,
  } = action.payload;
  yield errorHandler({
    endpoint: TRANSACTION_VERIFICATION_URL,
    successHandler: yield function* (response) {
      yield put(transactionVerificationSuccess(response));
      if (notify) {
        notify(notifyMessage);
      }
      if (closeModal) {
        closeModal();
      }
      if (handleActiveTerms) {
        handleActiveTerms();
      }
      if (handleCloseAccountRedirection) {
        handleCloseAccountRedirection();
      }
      if (type === "BORROW") {
        setTimeout(() => {
          navigate("/my-loans");
        }, 3000);
      }
      if (type === "SWAP" || type === "LOAN_REPAYMENT") {
        setTimeout(() => {
          navigate("/transactions");
        }, 2000);
      }
      if (handleResetCreateTerm) {
        handleResetCreateTerm();
      }
      if (getAllFixedTerms) {
        getAllFixedTerms();
      }
    },
    failHandler: yield function* (response) {
      yield put(transactionVerificationFail(response));
    },
    failHandlerType: "CUSTOM",
    payload: data,
    apiType: "post",
  });
}

// Borrow Loan Saga
export function* borrowLoanSaga(action) {
  yield put(borrowLoanStart());
  const { data, handleOpenVerificationModal, handleCloseBorrowPreviewModal } =
    action.payload;
  yield errorHandler({
    endpoint: BORROW_LOAN_URL,
    successHandler: yield function* (response) {
      yield put(borrowLoanSuccess(response));
      handleCloseBorrowPreviewModal();
      handleOpenVerificationModal();
    },
    failHandler: yield function* (response) {
      yield put(borrowLoanFail(response));
    },
    failHandlerType: "CUSTOM",
    payload: data,
    apiType: "post",
  });
}

// pay Loan Saga
export function* payLoanSaga(action) {
  yield put(payLoanStart());
  const { id, handleOpenVerificationModal, handleCloseRepaymentPreviewModal } =
    action.payload;
  yield errorHandler({
    endpoint: `${PAY_LOAN_URL}/${id}`,
    successHandler: yield function* (response) {
      yield put(payLoanSuccess(response));
      handleCloseRepaymentPreviewModal();
      handleOpenVerificationModal();
    },
    failHandler: yield function* (response) {
      yield put(payLoanFail(response));
    },
    failHandlerType: "CUSTOM",
    apiType: "post",
  });
}

// cancel fixed term saga
export function* cancelFixedTermSaga(action) {
  yield put(cancelFixedTermStart());
  const { id, handleOpenVerificationModal, setIsLoading } = action.payload;
  yield errorHandler({
    endpoint: `${CANCEL_FIXED_TERM_URL}/${id}`,
    successHandler: yield function* (response) {
      yield put(cancelFixedTermSuccess(response));
      handleOpenVerificationModal();
      setIsLoading(false);
    },
    failHandler: yield function* (response) {
      yield put(cancelFixedTermFail(response));
    },
    failHandlerType: "CUSTOM",

    apiType: "post",
  });
}

// auto renewal fixed term saga
export function* autoRenewalFixedTermSaga(action) {
  yield put(autoRenewalFixedTermStart());
  const { data, handleActiveTerms } = action.payload;
  yield errorHandler({
    endpoint: AUTORENEWAL_FIXED_TERMS_URL,
    successHandler: yield function* (response) {
      yield put(autoRenewalFixedTermSuccess(response));
      if (handleActiveTerms) handleActiveTerms();
    },
    failHandler: yield function* (response) {
      yield put(autoRenewalFixedTermFail(response));
    },
    failHandlerType: "CUSTOM",
    payload: data,
    apiType: "post",
  });
}

// compare coin saga
export function* compareCoinSaga(action) {
  yield put(compareCoinStart());
  const { data } = action.payload;
  yield errorHandler({
    endpoint: COMPARE_COIN_URL,
    successHandler: yield function* (response) {
      yield put(compareCoinSuccess(response));
    },
    failHandler: yield function* (response) {
      yield put(compareCoinFail(response));
    },
    failHandlerType: "CUSTOM",
    payload: data,
    apiType: "post",
  });
}

// swap coin saga
export function* swapCoinSaga(action) {
  yield put(swapCoinStart());
  const { data, handleOpenVerificationModal, closeModal } = action.payload;
  yield errorHandler({
    endpoint: SWAP_COIN_BALANCE_URL,
    successHandler: yield function* (response) {
      yield put(swapCoinSuccess(response));
      closeModal();
      handleOpenVerificationModal();
    },
    failHandler: yield function* (response) {
      yield put(swapCoinFail(response));
    },
    failHandlerType: "CUSTOM",
    payload: data,
    apiType: "post",
  });
}

// get platform variable list saga
export function* getPlatformVariableListSaga(action) {
  yield put(getPlatformVariablesListStart());
  const { name } = action.payload;
  yield errorHandler({
    endpoint: `${PLATFORM_VARIABLE_URL}name=${name}`,
    successHandler: yield function* (response) {
      yield put(getPlatformVariablesListSuccess(response));
    },
    failHandler: yield function* (response) {
      yield put(getPlatformVariablesListFail(response));
    },
    failHandlerType: "CUSTOM",
    customBaseURL: true,
    apiType: "get",
  });
}

// get platform fees saga
export function* getPlatformFeesSaga(action) {
  yield put(getPlatformFeesStart());
  const { name } = action.payload;
  yield errorHandler({
    endpoint: `${PLATFORM_VARIABLE_URL}name=${name}`,
    successHandler: yield function* (response) {
      yield put(getPlatformFeesSuccess(response));
    },
    failHandler: yield function* (response) {
      yield put(getPlatformFeesFail(response));
    },
    failHandlerType: "CUSTOM",
    customBaseURL: true,
    apiType: "get",
  });
}

// get platform fees saga
export function* getLTVSaga(action) {
  yield put(getLTVStart());
  const { name } = action.payload;
  yield errorHandler({
    endpoint: `${PLATFORM_VARIABLE_URL}name=${name}`,
    successHandler: yield function* (response) {
      yield put(getLTVSuccess(response));
    },
    failHandler: yield function* (response) {
      yield put(getLTVFail(response));
    },
    failHandlerType: "CUSTOM",
    customBaseURL: true,
    apiType: "get",
  });
}

// get Affiliate Count saga
export function* getAffiliateDashboardCountSaga() {
  yield put(getAffiliateDashboardCountStart());
  // const { name } = action.payload
  yield errorHandler({
    endpoint: `${AFFILIATE_DASHBOARD_COUNT}`,
    successHandler: yield function* (response) {
      yield put(getAffiliateDashboardCountSuccess(response));
    },
    failHandler: yield function* (response) {
      yield put(getAffiliateDashboardCountFail(response));
    },
    failHandlerType: "CUSTOM",
    apiType: "get",
  });
}

// get Affiliate List saga
export function* getAffiliateDashboardListSaga() {
  yield put(getAffiliateUserListStart());
  // const { name } = action.payload
  yield errorHandler({
    endpoint: `${AFFILIATE_DASHBOARD_LIST}`,
    successHandler: yield function* (response) {
      yield put(getAffiliateUserListSuccess(response));
    },
    failHandler: yield function* (response) {
      yield put(getAffiliateUserListFail(response));
    },
    failHandlerType: "CUSTOM",
    apiType: "get",
  });
}

// get platform fees saga
export function* getAffiliateDashboardStaticsSaga() {
  yield put(getAffiliateUserStaticsStart());
  // const { name } = action.payload
  yield errorHandler({
    endpoint: `${AFFILIATE_DASHBOARD_Statics}`,
    successHandler: yield function* (response) {
      yield put(getAffiliateUserStaticsSuccess(response));
    },
    failHandler: yield function* (response) {
      yield put(getAffiliateUserStaticsFail(response));
    },
    failHandlerType: "CUSTOM",
    apiType: "get",
  });
}

// get dashboard images saga
export function* getDashboardImagesSaga() {
  yield put(getDashboardImagesStart());
  yield errorHandler({
    endpoint: GET_DASHBOARD_IMAGES_URL,
    successHandler: yield function* (response) {
      yield put(getDashboardImagesSuccess(response));
    },
    failHandler: yield function* (response) {
      yield put(getDashboardImagesFail(response));
    },
    failHandlerType: "CUSTOM",
    apiType: "get",
  });
}

// subscribe saga
export function* subscribeSaga(action) {
  const { data, notify } = action.payload;
  yield put(subscribeStart());
  yield errorHandler({
    endpoint: SUBSCRIBE_URL,
    successHandler: yield function* (response) {
      yield put(subscribeSuccess(response));
      if (notify) notify(response?.data?.message);
    },
    failHandler: yield function* (response) {
      yield put(subscribeFail(response));
      notifyError("Servor Error.Please try again later!");
    },
    failHandlerType: "CUSTOM",
    payload: data,
    apiType: "put",
  });
}
