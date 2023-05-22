import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import {
  resetChangePasswordErrorMsg,
  changePasswordAction,
} from "store/sagaActions";
import { RenderIf } from "utils";
import {
  GO_BACK_SVG,
  PROFILE_CHANGE_PASSWORD,
} from "../../../../assets/images";
import {
  CustomInput,
  ErrorMessageCard,
  OTPVerificationModal,
  PrimaryButton,
} from "../../../../components";
import { securityChangePasswordValidator } from "../../../../validations/password";

import "./ChangePassword.css";

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [passwordData, setPasswordData] = useState({});

  const { changePasswordErrorMsg, changePasswordLoading } = useSelector(
    (state) => state.user.changePassword
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createInitialValue = {
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };

  const handleOpenVerificationModal = () => {
    setShowVerificationModal(true);
  };

  const handleCloseVerificationModal = () => {
    setShowVerificationModal(false);
  };

  const handleSubmitData = (values, resetForm) => {
    setPasswordData(values);
    dispatch(resetChangePasswordErrorMsg());
    dispatch(
      changePasswordAction({
        data: {
          oldPassword: values.currentPassword,
          newPassword: values.newPassword,
        },

        resetForm,
        handleOpenVerificationModal,
      })
    );
  };

  useEffect(() => {
    dispatch(resetChangePasswordErrorMsg());
  }, []);

  useEffect(() => {
    dispatch(resetChangePasswordErrorMsg());
  }, []);

  return (
    <div className="background_color">
      <div className="d-flex align-items-center">
        <div className="d-flex flex-column align-items-center container pt-3">
          <div
            id="change_password_navigation"
            className="d-flex align-items-center pb-4 pt-4"
          >
            <img
              src={GO_BACK_SVG}
              alt="back"
              className="h24 curser-pointer"
              onClick={() => navigate("/security")}
            />
            <p className="text">
              <Link to="/security" className="text ml-2 mr-2">
                Back
              </Link>
              /
            </p>
            <p className="text">
              <Link to="/security" className="text ml-2 mr-2">
                Security
              </Link>
            </p>

            <p id="bold_text" className="text curser-pointer">
              /<b className="ml-2"> Change Password</b>
            </p>
          </div>

          <div className="change_password p-4">
            <div className="d-flex">
              <img src={PROFILE_CHANGE_PASSWORD} alt="back" className="mr-3" />
              <div className="">
                <p className="title mb-1">Change Password</p>
                <p className="text">
                  Never share your password with anyone, including the
                  Borrowland team.
                </p>
              </div>
            </div>
            {/* password */}
            <Formik
              initialValues={createInitialValue}
              validationSchema={securityChangePasswordValidator}
              enableReinitialize
              onSubmit={(values, { resetForm }) => {
                handleSubmitData(values, resetForm);
              }}
            >
              <Form id="change_password_form">
                <div className="form_wrapper pt-4 change_password_form_wrapper">
                  <Field
                    component={CustomInput}
                    className="mb-4 "
                    name="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    autoComplete="off"
                    setShowPassword={setShowCurrentPassword}
                    showPassword={showCurrentPassword}
                    showEyeIcon
                    label="Current Password"
                    withOutLabel
                  />
                  <Field
                    component={CustomInput}
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    autoComplete="off"
                    setShowPassword={setShowNewPassword}
                    showPassword={showNewPassword}
                    showEyeIcon
                    label="New Password"
                    withOutLabel
                  />
                  <Field
                    component={CustomInput}
                    name="repeatNewPassword"
                    type={showRepeatNewPassword ? "text" : "password"}
                    autoComplete="off"
                    setShowPassword={setShowRepeatNewPassword}
                    showPassword={showRepeatNewPassword}
                    showEyeIcon
                    label="Repeat New Password"
                    withOutLabel
                  />
                </div>
                {/* shows error if email or passsword is incorrect */}
                <RenderIf isTrue={changePasswordErrorMsg}>
                  <ErrorMessageCard errorMsg={changePasswordErrorMsg} />
                </RenderIf>
                <PrimaryButton
                  buttonId="auth_submit_button"
                  className="w-100 mt_25 verify_button"
                  type="submit"
                  text={
                    changePasswordLoading ? (
                      <ClipLoader
                        color="#fff"
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      "Change"
                    )
                  }
                  disabled={changePasswordLoading}
                />
              </Form>
            </Formik>
          </div>
        </div>
      </div>

      <OTPVerificationModal
        showModal={showVerificationModal}
        closeModal={handleCloseVerificationModal}
        type="CHANGE_PASSWORD"
        passwordData={passwordData}
      />
    </div>
  );
};

export default ChangePassword;
