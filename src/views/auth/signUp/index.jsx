import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import PhoneInput from "react-phone-input-2";
import { ClipLoader } from "react-spinners";

import { SignUpValidatior } from "../../../validations/sign_up";
import {
  EMAIL_SVG,
  KEY_SVG,
  PROFILE_SVG,
  USER_ICON_SVG,
} from "../../../assets/images";
import {
  AuthHeaderCard,
  // CustomCheckbox,
  CustomInput,
  ErrorMessageCard,
  PrimaryButton,
} from "../../../components";
import { resetSignUpErrorMsg, signUpAction } from "../../../store/sagaActions";
import { RenderIf } from "../../../utils";

import "react-phone-input-2/lib/style.css";
import "./index.css";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mobileNumberValue, setMobileNumberValue] = useState("");
  const [countryCodeValue, setCountryCodeValue] = useState("");
  const [countryNameValue, setCountryNameValue] = useState("");
  // const [isChecked, setIsChecked] = useState(false);
  // const [fullName, setFullName] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const agentCode = searchParams.get("code");

  const { isLoading, errorMsg } = useSelector((state) => state.auth.signUp);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createInitialValue = {
    fullName: "",
    countryCode: countryCodeValue,
    country: countryNameValue,
    mobile: mobileNumberValue,
    email: "",
    password: "",
    confirmPassword: "",
    TnC: false,
  };

  // handle signup button
  const handleSubmit = (values) => {
    values.countryCode = "+" + countryCodeValue;
    values.mobile = mobileNumberValue.slice(countryCodeValue?.length);

    dispatch(resetSignUpErrorMsg());
    const param = {
      fullName: values.fullName,
      countryCode: "+" + countryCodeValue,
      country: countryNameValue,
      mobile: mobileNumberValue.slice(countryCodeValue?.length),
      email: values.email,
      password: values.password,
      agentId: agentCode ? agentCode : "",
    };

    if (param?.agentId === "") {
      delete param?.agentId;
    }
    dispatch(signUpAction({ data: param, navigate }));
  };

  useEffect(() => () => dispatch(resetSignUpErrorMsg()), []);

  return (
    <div className="auth_wrapper padding_18" id="custom_target">
      <AuthHeaderCard
        logoImage={PROFILE_SVG}
        logoClassName="mt-2"
        headerName="Register"
        showCloseIcon
      />
      <p className="text_grey mt-1 mb-1 text-center">
        Please enter the details below to complete registration
      </p>
      <Formik
        initialValues={createInitialValue}
        validationSchema={SignUpValidatior}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ errors, touched, handleBlur, setFieldValue }) => (
          <Form>
            <div className="form_wrapper">
              <Field
                type="text"
                icon={USER_ICON_SVG}
                placeholder="Full Name"
                name="fullName"
                component={CustomInput}
                requiredField
                // onChange={(e) => setFullName(e.target.value)}
              />
              <div
                id="input_number_handle "
                className={`${
                  errors.mobile && touched.mobile ? "mb24" : "mb20"
                }`}
              >
                <div
                  id="country_code_dropdown"
                  className={`${
                    errors.mobile && touched.mobile && "mobile_invalid"
                  }`}
                >
                  <PhoneInput
                    inputStyle={{
                      width: "100%",
                      paddingLeft: "70px",
                      height: "44px",
                    }}
                    inputClass={errors.mobile && touched.mobile && "is-invalid"}
                    country="us"
                    enableSearch
                    searchPlaceholder="Search"
                    disableSearchIcon={true}
                    value={mobileNumberValue}
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
                      setFieldValue("mobile", value);
                      setFieldValue("countryCode", data?.dialCode);
                      setMobileNumberValue(value);
                      setCountryNameValue(data?.name);
                    }}
                  />

                  {errors.mobile && touched.mobile && (
                    <div className="invalid-feedback mb-5 d-block">
                      Mobile number is required
                    </div>
                  )}
                </div>
              </div>
              <Field
                icon={EMAIL_SVG}
                component={CustomInput}
                name="email"
                placeholder="Email"
                type="text"
              />
              <Field
                icon={KEY_SVG}
                component={CustomInput}
                name="password"
                placeholder="Create Password"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                setShowPassword={setShowPassword}
                showPassword={showPassword}
                showEyeIcon
                errorClassName="mb-2"
                showDangerText
                showError={false}
                className="password_input_field"
              />

              <Field
                icon={KEY_SVG}
                component={CustomInput}
                name="confirmPassword"
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="off"
                setShowPassword={setShowConfirmPassword}
                showPassword={showConfirmPassword}
                showEyeIcon
                errorClassName="mb-2"
              />
            </div>

            <div
              className={`position-relative mt-4 mb-2 ${
                errors.TnC || touched.TnC ? "tnC_h50" : "h40"
              }`}
            >
              <div className="d-flex">
                {/* <Field
									name="TnC"
									mainClassName={`${
										errors.TnC ? 'mb-0' : 'mb-0'
									}`}
									className="form-check mt-0 ps-4"
									inputClassName="terms_check"
									id="TnC"
									component={CustomCheckbox}
									// handleChange={() => setIsChecked(!isChecked)}
									// showError={false}
								/> */}
                <Field
                  type="checkbox"
                  name="TnC"
                  className="form-check mt-0 ps-4 mb-0"
                />
                <p className="mt-20 terms_text ml-2 mb-1">
                  I&apos;ve read and accept the&nbsp;
                  <a
                    href="https://drive.google.com/file/d/1LKPUvje_jKdXrC4tnNRX_Dl-wiq33Msd/view?usp=share_link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Terms & Conditions
                  </a>
                  &nbsp;and&nbsp;
                  <a
                    href="https://borrowland.io/privacy-policy/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
              {errors.TnC && touched.TnC && (
                <div className="invalid-feedback mb-4 d-block">
                  {errors.TnC}
                </div>
              )}
            </div>

            {/* shows error if email or passsword is incorrect */}
            <RenderIf isTrue={errorMsg}>
              <ErrorMessageCard errorMsg={errorMsg} />
            </RenderIf>

            <PrimaryButton
              buttonId="auth_submit_button"
              className="w-100 mb-2 font-weight-bold"
              type="submit"
              text={
                isLoading ? (
                  <ClipLoader
                    color="#fff"
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Register"
                )
              }
              disabled={isLoading}
            />
          </Form>
        )}
      </Formik>
      <div className="d-flex justify-content-center align-items-center text-grey mb-1">
        Have an account ? &nbsp;
        <Link to="/" className="font-weight-bold">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
