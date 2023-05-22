import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { ClipLoader } from "react-spinners";
import ReCaptchaV2 from "react-google-recaptcha";

import {
  AuthHeaderCard,
  CustomInput,
  ErrorMessageCard,
  PrimaryButton,
} from "../../../components";
import { loginValidator } from "../../../validations/login";
import { EMAIL_SVG, KEY_SVG, PROFILE_SVG } from "../../../assets/images";
import { loginAction, resetLoginErrorMsg } from "../../../store/sagaActions";
import { RenderIf } from "../../../utils";

import "./index.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [captchaErrorMsg, setCaptchErrorMsg] = useState("");

  const { isLoading, errorMsg } = useSelector((state) => state.auth.login);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recaptchaRef = React.createRef();

  const createInitialValue = {
    email: "",
    password: "",
  };

  // handle login button
  const handleSubmit = (values) => {
    dispatch(resetLoginErrorMsg());
    setCaptchErrorMsg("");

    const recaptchaValue = recaptchaRef.current.getValue();

    if (recaptchaValue) {
      setCaptchErrorMsg("");
      dispatch(
        loginAction({
          data: { username: values.email, password: values.password },
          navigate,
        })
      );
    } else {
      setCaptchErrorMsg("Please select captcha");
    }
  };

  useEffect(() => {
    setCaptchErrorMsg("");
    dispatch(resetLoginErrorMsg());
  }, []);

  return (
    <div className="auth_wrapper padding_18" id="custom_target">
      <AuthHeaderCard
        logoImage={PROFILE_SVG}
        headerName="Log In"
        showCloseIcon
        page="LOGIN"
      />
      <Formik
        initialValues={createInitialValue}
        validationSchema={loginValidator}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <Form>
          <div className="form_wrapper">
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
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              setShowPassword={setShowPassword}
              showPassword={showPassword}
              showEyeIcon
              errorClassName="mb-2"
              inputId="login_error"
            />
            <div className="d-flex justify-content-end">
              <Link to="/forgot-password" className="forgot_margin">
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* shows error if email or passsword is incorrect */}
          <RenderIf isTrue={errorMsg}>
            <ErrorMessageCard errorMsg={errorMsg} />
          </RenderIf>

          {/* captcha */}
          <div className="d-flex justify-content-center align-items-center">
            <ReCaptchaV2
              sitekey="6LeIuXMkAAAAAK1bU4eSTOJRPNmXSkanZEOR4wiL"
              ref={recaptchaRef}
            />
          </div>

          {/* shows error if captcha is invalid */}
          <RenderIf isTrue={captchaErrorMsg}>
            <ErrorMessageCard errorMsg={captchaErrorMsg} id="captcha_error" />
          </RenderIf>

          {/* log in button */}
          <PrimaryButton
            buttonId="auth_submit_button"
            className="mt-3 w-100 mb-3"
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
                "Log In"
              )
            }
            disabled={isLoading}
          />
        </Form>
      </Formik>

      <div className="d-flex justify-content-center align-items-center text-grey mb-1">
        Don’t have an account ? &nbsp;
        <Link to="/signup">Register</Link>
      </div>
    </div>
  );
};

export default Login;
