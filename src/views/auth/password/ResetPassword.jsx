import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { ClipLoader } from "react-spinners";

import { KEY_SVG, LOCK_ICON_SVG } from "../../../assets/images";
import {
  AuthHeaderCard,
  CustomInput,
  ErrorMessageCard,
  PrimaryButton,
} from "../../../components";
import { resetPasswordValidator } from "../../../validations/password";
import {
  resetPasswordAction,
  resettingPasswordErrorMsg,
} from "../../../store/sagaActions";
import { RenderIf } from "../../../utils";

import "./index.css";

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // states for reset password via link
  const [otpValue, setOtpValue] = useState();
  const [codeValue, setCodeValue] = useState("");
  const [mobileValue, setMobileValue] = useState("");

  const { passwordCountryCode, passwordMobile } = useSelector(
    (state) => state.auth.password
  );
  const { resetPasswordLoading, resetPasswordErrorMsg } = useSelector(
    (state) => state.auth.password
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const createInitialValue = {
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmitData = (values) => {
    dispatch(resettingPasswordErrorMsg());
    dispatch(
      resetPasswordAction({
        data: {
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
          countryCode: location?.state ? passwordCountryCode : "+" + codeValue,
          mobile: location?.state ? passwordMobile : mobileValue,
          otp: location?.state ? location?.state?.otp : parseInt(otpValue),
        },
        navigate,
      })
    );
  };

  useEffect(() => {
    dispatch(resettingPasswordErrorMsg());
  }, []);

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const mobileNo = queryParameters.get("mobile");
    const otp = queryParameters.get("otp");
    const code = queryParameters.get("code");
    if (mobileNo) {
      setMobileValue(mobileNo);
    }
    if (otp) {
      setOtpValue(otp);
    }
    if (code) {
      setCodeValue(code.trim());
    }
  }, []);

  return (
    <div className="auth_wrapper padding_50">
      <AuthHeaderCard
        logoImage={LOCK_ICON_SVG}
        headerName="Reset Password"
        showCloseIcon
        showBackIcon
      />
      <Formik
        initialValues={createInitialValue}
        validationSchema={resetPasswordValidator}
        enableReinitialize
        onSubmit={(values) => {
          handleSubmitData(values);
        }}
      >
        <Form>
          <div className="form_wrapper">
            <Field
              icon={KEY_SVG}
              component={CustomInput}
              name="newPassword"
              placeholder="New Password"
              type={showNewPassword ? "text" : "password"}
              autoComplete="off"
              setShowPassword={setShowNewPassword}
              showPassword={showNewPassword}
              showEyeIcon
              inputId="reset_pwd"
            />
            <Field
              icon={KEY_SVG}
              component={CustomInput}
              name="confirmPassword"
              placeholder="Re-type New Password"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="off"
              setShowPassword={setShowConfirmPassword}
              showPassword={showConfirmPassword}
              showEyeIcon
            />
          </div>

          {/* shows error if if incorrect */}
          <RenderIf isTrue={resetPasswordErrorMsg}>
            <ErrorMessageCard errorMsg={resetPasswordErrorMsg} />
          </RenderIf>

          <PrimaryButton
            buttonId="auth_submit_button"
            className="mt-4 w-100"
            type="submit"
            text={
              resetPasswordLoading ? (
                <ClipLoader
                  color="#fff"
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Reset Password"
              )
            }
            disabled={resetPasswordLoading}
          />
        </Form>
      </Formik>
    </div>
  );
};

export default ResetPassword;
