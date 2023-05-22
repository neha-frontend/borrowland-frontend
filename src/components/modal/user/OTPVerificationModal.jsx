import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { ResendOTP } from "otp-input-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { ClipLoader } from "react-spinners";

import PrimaryButton from "../../buttons/primaryButton";
import { CustomOtpComponent } from "../../customComponent";
import CustomModal from "../CustomModal";
import {
  verifyEmailAction,
  otpVerificationAction,
  transactionVerificationAction,
  resetVerifyEmailErrorMsg,
  resetTransactionVerificationErrorMsg,
  resendOtpAction,
  resetOtpVerificationErrorMsg,
} from "store/sagaActions";
import { RenderIf } from "utils";
import { ErrorMessageCard } from "components";

import "./index.css";

const OTPVerificationModal = ({
  showModal = false,
  closeModal,
  type = "",
  handleActiveTerms,
  handleCloseAccountRedirection,
  passwordData,
  handleResetCreateTerm,
  getAllFixedTerms,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = (toastMessage) => toast.success(toastMessage);

  const [otp, setOtp] = useState("");
  const [hideResend, setHideResend] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  const [transactionOtpType, setTransactionOtpType] = useState("");
  const [otpSentOnMobile, setOtpSentOnMobile] = useState(false);
  const [userEmailValue, setUserEmailValue] = useState("");
  const [userMobileValue, setUserMobileValue] = useState("");

  const { userData } = useSelector((state) => state.user.userDetails);

  const {
    verifyEmailErrorMsg,
    transactionVerificationErrorMsg,
    transactionVerificationLoading,
    verifyEmailLoading,
  } = useSelector((state) => state.user.verification);

  // checks for email
  const {
    isLoading: otpVerificationLoading,
    errorMsg: otpVerificationErrorMessage,
  } = useSelector((state) => state.auth.otpVerification);

  const handleResetErrorMessages = () => {
    dispatch(resetOtpVerificationErrorMsg());
    dispatch(resetVerifyEmailErrorMsg());
    dispatch(resetTransactionVerificationErrorMsg());
  };

  const hidePartialEmail = (value) => {
    const maxIndex = value?.indexOf("@");
    const hiddenPart = value?.slice(2, maxIndex);
    const partialEmail =
      value?.slice(0, 2) +
      "*".repeat(hiddenPart?.length) +
      value?.slice(maxIndex, value?.length + 1);
    return partialEmail;
  };

  const hidePartialMobile = (value) => {
    const totalLength = value?.length;
    const hiddenPart = "*".repeat(totalLength - 2);
    const partialMobile =
      hiddenPart + value?.slice(totalLength - 2, totalLength + 1);
    return partialMobile;
  };

  const handleChange = useCallback(
    (otp) => {
      setOtp(otp);
    },
    [otp]
  );

  const renderTime = (remainingTime) => {
    if (hideResend) return null;

    return (
      <p className={`timer mt-4 ${remainingTime == 0 ? "hide" : ""}`}>
        00:{remainingTime < 10 ? "0" + remainingTime : remainingTime}
      </p>
    );
  };

  const renderResentOtpButton = (props) => {
    if (hideResend) return null;

    useEffect(() => {
      setOtp("");
    }, []);

    return (
      <div
        {...props}
        className={`d-flex justify-content-between mt-4 resent_link cursor_pointer ${
          props.disabled ? "disabled-link" : "text"
        }`}
      >
        Resend Code
      </div>
    );
  };

  const handleResend = () => {
    handleResetErrorMessages();
    if (
      type === "WITHDRAW" ||
      type === "BORROW" ||
      type === "CREATE_TERM" ||
      type === "SWAP" ||
      type === "LOAN_REPAYMENT" ||
      type === "CANCEL_FIXED_TERM" ||
      type === "CLOSE_ACCOUNT" ||
      type === "CHANGE_PASSWORD"
    ) {
      dispatch(
        resendOtpAction({
          data: {
            otpType: transactionOtpType,
            otpSendOn: "mobile",
            countryCode: userData?.countryCode,
            mobile: userData?.mobile,
            email: userData?.email,
          },
          notify,
        })
      );
    } else {
      dispatch(verifyEmailAction({ notify }));
    }

    setOtp("");
    setHideResend(false);
    renderTime(30);
  };

  const handleOtpVerifyButton = () => {
    handleResetErrorMessages();

    if (
      type === "WITHDRAW" ||
      type === "BORROW" ||
      type === "CREATE_TERM" ||
      type === "SWAP" ||
      type === "LOAN_REPAYMENT" ||
      type === "CANCEL_FIXED_TERM" ||
      type === "CLOSE_ACCOUNT"
    ) {
      dispatch(
        transactionVerificationAction({
          data: {
            otpType: transactionOtpType,
            otp: parseInt(otp),
          },
          notify,
          notifyMessage,
          dispatch,
          closeModal,
          handleActiveTerms,
          type,
          navigate,
          handleCloseAccountRedirection,
          handleResetCreateTerm,
          getAllFixedTerms,
        })
      );
    } else if (type === "CHANGE_PASSWORD") {
      dispatch(
        otpVerificationAction({
          data: {
            otpSentOn: "mobile",
            otpType: "changePassword",
            mobile: userData?.mobile,
            otp: parseInt(otp),
            countryCode: userData?.countryCode,
            oldPassword: passwordData?.currentPassword,
            newPassword: passwordData?.newPassword,
          },
          notify,
          notifyMessage,
          type,
          dispatch,
          closeModal,
        })
      );
    } else {
      dispatch(
        otpVerificationAction({
          data: {
            otpSentOn: "email",
            otpType: "verifyEmail",
            email: userData?.email,
            otp: parseInt(otp),
          },
          notify,
          dispatch,
          closeModal,
        })
      );
    }
  };

  const handleCloseModal = () => {
    closeModal();
    handleResetErrorMessages();
  };

  useEffect(() => {
    handleResetErrorMessages();
    if (type === "WITHDRAW") {
      setTransactionOtpType("authenticate_transaction");
      setNotifyMessage(
        "Your transaction is successful. Please wait for the administrative approval."
      );
      setOtpSentOnMobile(true);
    } else if (type === "BORROW") {
      setTransactionOtpType("authenticate_loan");
      setNotifyMessage("You have succesfully borrowed the amount.");
      setOtpSentOnMobile(true);
    } else if (type === "CREATE_TERM") {
      setOtpSentOnMobile(true);
      setTransactionOtpType("authenticate_fixed_term");
      setNotifyMessage("You have succesfully created the term.");
    } else if (type === "SWAP") {
      setOtpSentOnMobile(true);
      setTransactionOtpType("authenticate_swap");
      setNotifyMessage("You have succesfully swap.");
    } else if (type === "LOAN_REPAYMENT") {
      setOtpSentOnMobile(true);
      setTransactionOtpType("authenticate_loan_repayment");
      setNotifyMessage("You have succesfully paid for the loan.");
    } else if (type === "CANCEL_FIXED_TERM") {
      setOtpSentOnMobile(true);
      setTransactionOtpType("authenticate_cancel_fixed_term");
      setNotifyMessage("You have succesfully cancelled the fixed term.");
    } else if (type === "CLOSE_ACCOUNT") {
      setOtpSentOnMobile(true);
      setTransactionOtpType("authenticate_close_account");
      setNotifyMessage("Your account has been closed successfully.");
    } else if (type === "CHANGE_PASSWORD") {
      setOtpSentOnMobile(true);
      setTransactionOtpType("changePassword");
      setNotifyMessage("Your password has been changed successfully.");
    }
  }, []);

  useEffect(() => {
    setUserMobileValue(hidePartialMobile(userData?.mobile));
    setUserEmailValue(hidePartialEmail(userData?.email));
  }, [userData]);

  return (
    <CustomModal
      showModal={showModal}
      closeModal={handleCloseModal}
      showCloseButton
    >
      <div
        id="otp_verification"
        className="px-sm-5 py-sm-5 px-3 py-5 d-flex flex-column"
      >
        {/* <p className="auth_title pt-4 mt-4">{showModal?.heading}</p>
        <p className="text_grey text-center mt-3 mb-3">
          {showModal?.subHeading}
        </p> */}

        <div className="d-flex flex-column text-center">
          <p className="heading_text">
            Verify{" "}
            {type === "CLOSE_ACCOUNT" || type === "CHANGE_PASSWORD"
              ? "Your Number"
              : otpSentOnMobile
              ? "Transaction"
              : "Email"}
          </p>
          <p className="subheading_text pt-2">
            Protecting your account is our priority. Please verify your account
            by entering the code sent to{" "}
            {otpSentOnMobile ? userMobileValue : userEmailValue}
          </p>
        </div>
        <Formik
          initialValues={{ otp: "" }}
          onSubmit={() => {
            handleOtpVerifyButton();
          }}
        >
          <Form>
            <div className="custom_otp d-flex justify-content-center pt-5">
              <CustomOtpComponent
                otpType="number"
                value={otp}
                onChange={handleChange}
                OTPLength={6}
                className="otp_input_container"
              />
            </div>

            <ResendOTP
              onResendClick={handleResend}
              hideResend={hideResend}
              renderButton={renderResentOtpButton}
              renderTime={renderTime}
              maxTime={30}
              className="resend-container mt-3 d-flex align-items-center justify-content-between otp_input_container"
            />

            {/* error message */}
            <RenderIf
              isTrue={
                otpVerificationErrorMessage ||
                verifyEmailErrorMsg ||
                transactionVerificationErrorMsg
              }
            >
              <ErrorMessageCard
                id="verification_error"
                errorMsg={
                  otpVerificationErrorMessage ||
                  verifyEmailErrorMsg ||
                  transactionVerificationErrorMsg
                }
              />
            </RenderIf>

            <PrimaryButton
              buttonId="auth_submit_button"
              className="mt-3 w-100 verify_button"
              type="submit"
              text={
                otpVerificationLoading || transactionVerificationLoading ? (
                  <ClipLoader
                    color="#fff"
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Verify"
                )
              }
              disabled={
                otp.length !== 6 ||
                transactionVerificationLoading ||
                verifyEmailLoading ||
                otpVerificationLoading
              }
            />
          </Form>
        </Formik>
      </div>
    </CustomModal>
  );
};

export default OTPVerificationModal;
