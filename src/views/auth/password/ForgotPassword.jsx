import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import PhoneInput from "react-phone-input-2";
import { ClipLoader } from "react-spinners";

import {
  AuthHeaderCard,
  ErrorMessageCard,
  PrimaryButton,
} from "../../../components";
import { forgotPasswordValidator } from "../../../validations/password";
import { LOCK_ICON_SVG } from "../../../assets/images";
import {
  forgotPasswordAction,
  resetForgotPasswordErrorMsg,
} from "../../../store/sagaActions";
import { RenderIf } from "../../../utils";

import "react-phone-input-2/lib/style.css";
import "./index.css";

const ForgotPassword = () => {
  const [mobileNumberValue, setMobileNumberValue] = useState("");
  const [countryCodeValue, setCountryCodeValue] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState(false);

  const { forgotPasswordLoading, forgotPasswordErrorMsg } = useSelector(
    (state) => state.auth.password
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValue = {
    countryCode: countryCodeValue,
    mobile: mobileNumberValue,
  };

  const handleSubmitData = (values) => {
    if (countryCodeValue < 1 || mobileNumberValue < 10) {
      return setMobileNumberError(true);
    }
    values.countryCode = "+" + countryCodeValue;
    values.mobile = mobileNumberValue.slice(countryCodeValue?.length);

    dispatch(resetForgotPasswordErrorMsg());

    dispatch(
      forgotPasswordAction({
        data: {
          countryCode: values?.countryCode,
          mobile: values?.mobile,
        },
        navigate,
      })
    );
  };

  useEffect(() => () => dispatch(resetForgotPasswordErrorMsg()), []);

  return (
    <div className="auth_wrapper padding_18" id="custom_target">
      <AuthHeaderCard
        logoImage={LOCK_ICON_SVG}
        headerName="Forgot Password"
        showCloseIcon
        showBackIcon
      />
      <div className="form_wrapper">
        <p className="fs_14 font_alter text-center text_grey">
          Enter your registered mobile number
        </p>
        <Formik
          initialValues={initialValue}
          validationSchema={forgotPasswordValidator}
          onSubmit={(values) => {
            handleSubmitData(values);
          }}
        >
          {({ values, errors, touched, handleBlur, setFieldValue }) => (
            <Form>
              <div
                id="input_number_handle "
                className={`${
                  (errors.mobile && touched.mobile) || mobileNumberError
                    ? "mb24"
                    : "mb20"
                }`}
              >
                <div
                  id="country_code_dropdown"
                  className={`${
                    (errors.mobile && touched.mobile) ||
                    (mobileNumberError && "mobile_invalid")
                  }`}
                >
                  <PhoneInput
                    inputStyle={{
                      width: "100%",
                      paddingLeft: "70px",
                      height: "44px",
                    }}
                    inputClass={
                      (errors.mobile && touched.mobile) ||
                      (mobileNumberError && "is-invalid")
                    }
                    country="us"
                    enableSearch
                    disableSearchIcon={true}
                    value={values.mobile}
                    placeholder="Mobile Number"
                    autoFormat={true}
                    name="mobile"
                    onBlur={handleBlur}
                    inputProps={{
                      name: "mobile",
                      autoFocus: false,
                    }}
                    countryCodeEditable={true}
                    defaultErrorMessage="This field is required"
                    onChange={(value, data) => {
                      setCountryCodeValue(data?.dialCode);
                      setMobileNumberValue(value);
                      setFieldValue("countryCode", data?.dialCode);
                      setFieldValue("mobile", value);
                      if (countryCodeValue > 1 || mobileNumberValue >= 10) {
                        setMobileNumberError(false);
                      }
                    }}
                  />

                  {(errors.mobile && touched.mobile) ||
                    (mobileNumberError && (
                      <div className="invalid-feedback mb-5 d-block">
                        Mobile number is required
                      </div>
                    ))}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* shows error if  incorrect */}
      <RenderIf isTrue={forgotPasswordErrorMsg}>
        <ErrorMessageCard errorMsg={forgotPasswordErrorMsg} />
      </RenderIf>

      <PrimaryButton
        buttonId="auth_submit_button"
        className="mt-4 w-100 mb-2"
        type="submit"
        text={
          forgotPasswordLoading ? (
            <ClipLoader
              color="#fff"
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Submit"
          )
        }
        disabled={forgotPasswordLoading}
        handleClick={handleSubmitData}
      />
    </div>
  );
};

export default ForgotPassword;
