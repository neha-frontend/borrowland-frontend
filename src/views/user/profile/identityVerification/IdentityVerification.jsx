import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Persona from "persona";

import {
  getVerificationAction,
  verifyEmailAction,
  saveInquiryIdAction,
} from "store/sagaActions";
import { RenderIf } from "utils";
import {
  FEATURE_CHECK_ICON,
  IDENTITY_VERIFY_ICON,
  PERSONAL_INFO_ICON,
  VERIFY_EMAIL_ICON,
} from "../../../../assets/images";
import {
  IdentityVerificationCard,
  OTPVerificationModal,
  PROFILE_FEATURE_ARRAY,
  Spinner,
} from "../../../../components";
import {
  PERSONA_TEMPLATE_ID,
  PERSONA_ENV,
  PERSONA_ENV_ID,
} from "constants/envConstants";

import "./IdentityVerification.css";

const IdentityVerification = () => {
  const dispatch = useDispatch();

  const [client, setClient] = useState();
  const [showEmailVerificationModal, setShowEmailVerificationModal] =
    useState(false);
  const [kycButtonText, setKycButtonText] = useState("Verify");

  const { userData } = useSelector((state) => state.user.userDetails);
  const {
    isLoading: verificationLoading,
    isKYCVerified,
    kycStatus,
    isEmailVerified,
    updateKYCLoading,
  } = useSelector((state) => state.user.verification);

  const handleOpenEmailVerificationModal = () => {
    // send the otp to email
    dispatch(verifyEmailAction());
    setShowEmailVerificationModal(true);
  };
  const handleCloseEmailVerificationModal = () => {
    setShowEmailVerificationModal(false);
  };

  const handleGetVerification = () => {
    dispatch(getVerificationAction());
  };

  const handleKYCVerification = () => {
    client?.open();
  };

  useEffect(() => {
    const personaClient = new Persona.Client({
      templateId: PERSONA_TEMPLATE_ID,
      environment: PERSONA_ENV,
      environmentId: PERSONA_ENV_ID,
      referenceId: userData?._id,
      onComplete: ({ inquiryId }) => {
        // Sending finished InquiryId to backend
        dispatch(
          saveInquiryIdAction({
            data: { inqId: inquiryId },
            handleGetVerification,
          })
        );
      },
      onCancel: () => console.log("canceled KYC verification"),
      onError: (error) => console.log(error),
    });
    setClient(personaClient);
  }, []);

  useEffect(() => {
    if (!isKYCVerified) {
      if (kycStatus === "completed") {
        setKycButtonText("Under Review");
      } else if (
        kycStatus === "pending" ||
        kycStatus === "failed" ||
        kycStatus === "declined" ||
        kycStatus === "expired"
      ) {
        setKycButtonText("Verify");
      }
    }
  }, [isKYCVerified, kycStatus]);

  useEffect(() => {
    dispatch(getVerificationAction());
  }, []);

  return (
    <>
      <div className="border_box p-sm-4 p-3">
        <p className="title">Identity Verification</p>
        <p className="text pt-2">
          Complete Identity Verification to unlock all features
        </p>
        <div className="">
          {/* verify email */}
          <RenderIf isTrue={verificationLoading}>
            <Spinner className="m-20-auto" id="dashboardSpinner" />
          </RenderIf>
          <RenderIf isTrue={!verificationLoading}>
            <IdentityVerificationCard
              type="PROFILE"
              title="Verify Email"
              text="Complete Email Verification to unlock all features"
              imageIcon={VERIFY_EMAIL_ICON}
              buttonText="Verify"
              actionType={VERIFY_EMAIL_ICON}
              mainClassName="pt-4 justify-content-between"
              titleClassName="title"
              textClassName="text"
              buttonClassName="identity_verify_button profile_identity_verify_btn"
              profileBtn
              handleProfileButtonClick={handleOpenEmailVerificationModal}
              showButton={!isEmailVerified}
            />
          </RenderIf>

          {/* personal info */}
          <IdentityVerificationCard
            type="PROFILE"
            title="Personal Info"
            text="Submit your personal information and add a mobile phone number"
            imageIcon={PERSONAL_INFO_ICON}
            buttonText="Verify"
            actionType={PERSONAL_INFO_ICON}
            mainClassName="pt-4 justify-content-between"
            titleClassName="title"
            textClassName="text"
            buttonClassName="identity_verify_button profile_identity_verify_btn"
            profileBtn
            showButton={false}
          />

          {/* verify KYC */}
          <RenderIf isTrue={verificationLoading}>
            <Spinner className="m-20-auto" id="dashboardSpinner" />
          </RenderIf>
          <RenderIf isTrue={!verificationLoading && !updateKYCLoading}>
            <IdentityVerificationCard
              type="PROFILE"
              title="Identity Verification"
              text="Complete Identiy Verification to unlock all features"
              imageIcon={IDENTITY_VERIFY_ICON}
              buttonText={kycButtonText}
              actionType={IDENTITY_VERIFY_ICON}
              mainClassName="pt-4 justify-content-between"
              titleClassName="title"
              textClassName="text"
              buttonClassName="identity_verify_button profile_identity_verify_btn"
              profileBtn
              handleProfileButtonClick={handleKYCVerification}
              showButton={!isKYCVerified}
              kycStatusWaiting={kycStatus === "completed"}
            />
          </RenderIf>
        </div>

        <p className="title pt-5 mb-4">Features</p>
        <div className="main_feature_box">
          {PROFILE_FEATURE_ARRAY.map((item) => {
            return (
              <>
                <div className="feature_flex">
                  <div
                    key={item?.key}
                    className="feature_box p-3 position-relative"
                  >
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <div className="mr-3">
                          <img src={item?.image} alt="info" className="mr-2 " />
                        </div>
                        <div className="cursor_default">
                          <p className="title">{item?.title}</p>
                          <p className="text mt-2">{item?.text}</p>
                        </div>
                      </div>
                      <div className="feature_tick">
                        <img
                          src={FEATURE_CHECK_ICON}
                          alt="info"
                          className="mr-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <OTPVerificationModal
        showModal={showEmailVerificationModal}
        closeModal={handleCloseEmailVerificationModal}
      />
    </>
  );
};

export default IdentityVerification;
