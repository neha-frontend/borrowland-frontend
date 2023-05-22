import { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

import { closeAccountAction } from "store/sagaActions";
import { OTPVerificationModal } from "components";
import PrimaryButton from "../../../../components/buttons/primaryButton";
import { CLOSE_ACCOUNT_SVG, GO_BACK_SVG, LIST_MARKER_SVG } from "assets/images";
import { RenderIf } from "utils";
import { ErrorMessageCard } from "components";

import "./CloseAccount.css";

const CloseAccount = () => {
  const [reasonForClosing, setReasonForClosing] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [otherReason, setOtherReason] = useState("");

  const { errorMsg, isLoading } = useSelector(
    (state) => state.user.closeAccount
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const REASON_LIST = [
    { id: 1, reason: "You will be logged out of all devices" },
    { id: 2, reason: "You will stop receiving marketing communication" },
    { id: 3, reason: "Your account will be permanently closed" },
    { id: 4, reason: "This action can't be undone" },
  ];

  const notifyError = (toastMessage) => toast.error(toastMessage);

  // const sleep = (ms) => {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // };

  if (errorMsg) {
    notifyError("Server error. Please try again later!");
  }

  const handleOpenVerificationModal = () => {
    setShowVerificationModal(true);
  };

  const handleCloseVerificationModal = () => {
    setShowVerificationModal(false);
  };

  const handleCloseAccountClick = () => {
    if (reasonForClosing) {
      setErrorMessage("");
      dispatch(
        closeAccountAction({
          data: {
            reason: otherReason ? otherReason : reasonForClosing,
          },

          handleOpenVerificationModal,
        })
      );
    } else {
      setErrorMessage("Please select the reason for closing.");
    }
  };

  const handleReasonForClosing = (e) => {
    setReasonForClosing(e);
    setErrorMessage("");
  };

  const handleCloseAccountRedirection = () => {
    sessionStorage.clear();
    setTimeout(() => {
      window.location.reload();
      navigate("/");
    }, 4000);
  };

  return (
    <div className="background_color">
      <div className="container h100vh pt-3 pb-5">
        <div className="d-flex align-items-center pb-4 pt-4">
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

          <p id="bold_text" className="text">
            /<b className="ml-2">Close Account</b>
          </p>
        </div>

        <div className="border_box p-4 close_account_box">
          <div className="d-flex align-items-center justify-content-between ">
            <div className="d-flex align-items-center">
              <div className="mr-4 verify_email_img">
                <img src={CLOSE_ACCOUNT_SVG} />
              </div>
              <div className="verify_email_title">
                <p className="title">Close Account</p>
                <p className="text mt-2">
                  Please make sure your account balance is $0.00 before you
                  begin.
                </p>
              </div>
            </div>
          </div>

          <div className="close_acount_causes_box mt-4 p-4">
            <p className="close_subheading">
              Closing your account will cause the following:
            </p>

            <ul className="pl-0">
              {REASON_LIST.map((item) => {
                return (
                  <li key={item?.id}>
                    <img
                      src={LIST_MARKER_SVG}
                      alt="marker"
                      className="list_marker mr-2"
                    />
                    {item?.reason}
                  </li>
                );
              })}
            </ul>

            <p className="reason_dropdown_title pt-1">Reason for closing</p>
            <div id="dropdown_div">
              <DropdownButton
                title={
                  <p className="reason_title">
                    {reasonForClosing ? reasonForClosing : "Select"}
                  </p>
                }
                displayName="Select"
                id={
                  errorMessage ? "error_border_red" : "close_account_dropdown"
                }
                onSelect={handleReasonForClosing}
                // className={
                // 	errorMessage
                // 		? 'error_border_red'
                // 		: 'border-0'
                // }
              >
                <Dropdown.Item eventKey="Reason-1">Reason 1</Dropdown.Item>
                <Dropdown.Item eventKey="Reason-2">Reason 2</Dropdown.Item>
                <Dropdown.Item eventKey="Reason-3">Reason 3</Dropdown.Item>
                <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
              </DropdownButton>
            </div>
            {reasonForClosing === "Other" && (
              <div className="mt-2">
                <textarea
                  name="other"
                  id="close_account_dropdown"
                  onChange={(e) => setOtherReason(e.target.value)}
                  value={otherReason}
                />
              </div>
            )}
            {/* error message */}
            <RenderIf isTrue={errorMessage}>
              <ErrorMessageCard
                id="close_account_error"
                errorMsg={errorMessage}
              />
            </RenderIf>
          </div>
          <p className="close_account_footer pt-3">
            Borrowland will retain some of your personal information for a
            minimum of five years or as necessary to comply with our legal
            obligations, to prevent fraud, or to resolve disputes, as outlined
            in our&nbsp;
            <a
              href="#privacy"
              target="_blank"
              rel="noreferrer"
              className="privacy_text"
            >
              Privacy Policy.
            </a>
          </p>
        </div>
        <div id="close_account_button" className="d-flex justify-content-end">
          <PrimaryButton
            className="mt-3 mb-5"
            text={
              isLoading ? (
                <ClipLoader
                  color="#fff"
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Close My Account"
              )
            }
            disabled={isLoading}
            handleClick={handleCloseAccountClick}
          />
        </div>
      </div>
      <OTPVerificationModal
        showModal={showVerificationModal}
        closeModal={handleCloseVerificationModal}
        type="CLOSE_ACCOUNT"
        handleCloseAccountRedirection={handleCloseAccountRedirection}
      />
    </div>
  );
};

export default CloseAccount;
