import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Persona from "persona";

import {
  BITCOIN_SVG,
  ETHEREUM_SVG,
  TETHER_NEW_SVG,
  USDC_SVG,
} from "../../../assets/images";
import {
  IdentityVerificationCard,
  INFORMATION_ARRAY,
  OPTION_ARRAY,
  AddBannerCard,
  InformationCard,
  BalanceCard,
  OptionCard,
  MarketHighlightCard,
  Tabination,
  OTPVerificationModal,
  Spinner,
  NoDataFound,
} from "../../../components";
import {
  PERSONA_TEMPLATE_ID,
  PERSONA_ENV,
  PERSONA_ENV_ID,
} from "constants/envConstants";
import {
  getAssetsAction,
  getDashboardTotalsAction,
  getMarketHighlightsAction,
  getVerificationAction,
  verifyEmailAction,
  // updateKycAction,
  resetAssets,
  resetDashboardTotals,
  getDashboardImagesAction,
  saveInquiryIdAction,
} from "../../../store/sagaActions";
import { RenderIf } from "utils";
import AlertModal from "components/modal/alertModal/AlertModal";

import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const info_array_length = INFORMATION_ARRAY?.length;
  const option_array_length = OPTION_ARRAY?.length;
  const [arertModal, setAlertModal] = useState(false);

  const [client, setClient] = useState();
  useState(false);
  const [showIdentityVerificationCard, setShowIdentityVerificationCard] =
    useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showEmailVerificationCard, setShowEmailVerificationCard] =
    useState(false);
  const [showEmailVerificationModal, setShowEmailVerificationModal] =
    useState(false);
  // eslint-disable-next-line no-unused-vars
  const [kycButtonText, setKycButtonText] = useState("Verify Your KYC");
  const [showAlertModal, setShowAlertModal] = useState(false);

  const { marketHighlightsList } = useSelector(
    (state) => state.user.marketHighlights
  );
  const { userData } = useSelector((state) => state.user.userDetails);
  const role = userData?.userRole;

  const googleFormForAgent =
    "https://docs.google.com/forms/d/e/1FAIpQLSfWViIbqBWKJnaXbfH-MwHO2O8lak9sMloYjbdVTP9DOyDi3Q/viewform";

  const {
    isLoading: verificationLoading,
    isKYCVerified,
    isEmailVerified,
    updateKYCLoading,
    kycStatus,
  } = useSelector((state) => state.user.verification);

  const { isLoading: assetsListLoading } = useSelector(
    (state) => state.user.assets
  );
  const { isLoading: marketHighlightsListLoading } = useSelector(
    (state) => state.user.marketHighlights
  );
  const {
    dashboardTotals,
    dashboardTotalsLoading,
    dashboardImagesLoading,
    dashboardImages,
  } = useSelector((state) => state.user.dashboard);

  const handleKYCVerification = () => {
    client?.open();
  };

  const handleOpenEmailVerificationModal = () => {
    if (!isEmailVerified) {
      dispatch(verifyEmailAction());
      setShowEmailVerificationModal(true);
    }
  };
  const handleCloseEmailVerificationModal = () => {
    setShowEmailVerificationModal(false);
  };
  // eslint-disable-next-line no-unused-vars
  const handleGetVerification = () => {
    dispatch(getVerificationAction());
  };
  const closeModal = () => {
    setAlertModal(false);
  };
  const handleKYCAlert = () => {
    if (userData?.verification?.kyc) {
      setShowAlertModal(true);
    } else if (isKYCVerified) {
      setShowAlertModal(true);
    } else {
      setShowAlertModal(false);
    }
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
    setShowEmailVerificationCard(!isEmailVerified);
    setShowIdentityVerificationCard(!isKYCVerified);
    // will require this code for production
    if (!isKYCVerified) {
      if (kycStatus === "approved") {
        setShowIdentityVerificationCard(false);
      } else if (
        kycStatus === "pending" ||
        kycStatus === "failed" ||
        kycStatus === "declined" ||
        kycStatus === "expired"
      ) {
        setShowIdentityVerificationCard(true);
        setKycButtonText("Verify Your KYC");
      } else if (kycStatus === "completed") {
        setKycButtonText("Under Review");
      }
    } else {
      setShowIdentityVerificationCard(false);
    }
  }, [isKYCVerified, isEmailVerified, kycStatus]);

  useEffect(() => {
    dispatch(resetAssets());
    dispatch(resetDashboardTotals());
    dispatch(getVerificationAction());
    dispatch(getMarketHighlightsAction());
    dispatch(getDashboardImagesAction());
  }, []);

  useEffect(() => {
    if (isKYCVerified) {
      dispatch(getDashboardTotalsAction());
      dispatch(getAssetsAction());
    }
  }, [isKYCVerified]);

  useEffect(() => {
    handleKYCAlert();
  }, [userData, isKYCVerified]);

  return (
    <>
      <div>
        {/* identity verification section */}
        <RenderIf isTrue={verificationLoading || updateKYCLoading}>
          <Spinner className="m-20-auto" id="dashboardSpinner" />
        </RenderIf>

        <RenderIf isTrue={!verificationLoading && !updateKYCLoading}>
          <RenderIf isTrue={!isKYCVerified}>
            <IdentityVerificationCard
              type="DASHBOARD"
              title="Verify Identity"
              text="Complete Identity Verification to unlock all the features"
              buttonText={kycButtonText}
              mainClassName="container"
              titleClassName="identity_verify_title"
              textClassName="identity_verify_text"
              buttonClassName="identity_verify_button"
              handleButtonClick={
                (kycStatus === "pending" ||
                  kycStatus === "failed" ||
                  kycStatus === "declined" ||
                  kycStatus === "expired") &&
                handleKYCVerification
              }
              kycStatusWaiting={kycStatus === "completed"}
            />
          </RenderIf>

          <RenderIf isTrue={!isEmailVerified}>
            <IdentityVerificationCard
              type="DASHBOARD"
              title="Verify Your Email"
              text="Verify your email to complete the verification"
              buttonText="Verify Your Email"
              mainClassName="container"
              titleClassName="identity_verify_title"
              textClassName="identity_verify_text"
              buttonClassName="identity_verify_button"
              wrapperClass="pb-4"
              handleButtonClick={handleOpenEmailVerificationModal}
            />
          </RenderIf>
        </RenderIf>

        <div className="container">
          {/* info section */}
          <div
            className={`d-flex border_box loan_box_main mb-4 ${
              showIdentityVerificationCard ? "mt_25" : "mt-5"
            }`}
          >
            {INFORMATION_ARRAY.map((item) => {
              return (
                <InformationCard
                  key={item?.id}
                  icon={item?.icon}
                  title={item?.title}
                  text={item?.text}
                  imageClassName="info_icon"
                  titleClassName="info_title"
                  textClassName="info_text"
                  borderClassName={
                    item?.id !== info_array_length
                      ? "info_card_border"
                      : "pr_10"
                  }
                />
              );
            })}
          </div>

          {/* banner section */}
          <div className="d-flex justify-content-between static_banner mb-3">
            <RenderIf isTrue={dashboardImagesLoading}>
              <Spinner className="m-20-auto" id="dashboardSpinner" />
            </RenderIf>

            <RenderIf
              isTrue={!dashboardImagesLoading && dashboardImages !== null}
            >
              {dashboardImages?.slice(0, 2).map((item) => {
                return (
                  <AddBannerCard
                    key={item?.key}
                    image={item?.image?.url}
                    alt="banner"
                    className="banner_card"
                  />
                );
              })}
            </RenderIf>
          </div>

          {/* balance section */}
          <RenderIf isTrue={dashboardTotalsLoading}>
            <Spinner className="m-20-auto" id="dashboardSpinner" />
          </RenderIf>
          <RenderIf
            isTrue={!dashboardTotalsLoading && dashboardTotals !== null}
          >
            <div
              className="mt-3 mb-3 d-flex justify-content-between cards_wrapper_balance"
              id="cards_wrapper_balance"
            >
              <BalanceCard
                title="Portfolio Balance"
                balanceValue={
                  parseFloat(dashboardTotals?.portfolioBalance).toFixed(2) || 0
                }
                mainClassName="balance_card portfolio_balance_card"
                balanceValueClassName="balance_color_grey"
              />
              <BalanceCard
                title="Total Loan"
                balanceValue={
                  dashboardTotals?.totalLoan
                    ? parseFloat(dashboardTotals?.totalLoan).toFixed(2)
                    : 0.0
                }
                title2="Collateral Balance"
                balanceValue2={
                  dashboardTotals?.totalCollateralBalance
                    ? parseFloat(
                        dashboardTotals?.totalCollateralBalance
                      ).toFixed(2)
                    : "0"
                }
                mainClassName="balance_card credit_line_card d-flex"
                balanceValueClassName="balance_color_blue"
              />
              <BalanceCard
                title="Interest Earned"
                mainClassName="balance_card interest_earned_card"
                balanceValue={parseFloat(
                  dashboardTotals?.interestEarned
                ).toFixed(2)}
                balanceValueClassName="balance_color_grey"
              />
            </div>
          </RenderIf>

          {/* options section */}
          <div className="d-flex border_box borrow_list_card">
            {OPTION_ARRAY.map((item) => {
              return (
                <OptionCard
                  key={item?.id}
                  icon={item?.icon}
                  title={item?.title}
                  text={item?.text}
                  borderClassName={
                    item?.id !== option_array_length
                      ? "info_card_border"
                      : "pr_10"
                  }
                  redirection={
                    role !== "agent" && item.title === "Refer"
                      ? googleFormForAgent
                      : item?.redirection
                  }
                  navigate={navigate}
                  kyc={showAlertModal}
                  setAlertModal={setAlertModal}
                  role={role}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg_blue">
        <div className="container">
          {/* market highlight section */}
          <div className="border_box blue_border_box">
            <div className="market_asset_wrapper">
              <p className="market_highlight_title">Market Highlights</p>
              <RenderIf isTrue={marketHighlightsListLoading}>
                <Spinner className="m-20-auto" id="dashboardSpinner" />
              </RenderIf>
              <RenderIf
                isTrue={
                  !marketHighlightsListLoading && marketHighlightsList !== null
                }
              >
                <div className="market_wrapper_box">
                  <MarketHighlightCard
                    cryptoIcon={BITCOIN_SVG}
                    cryptoName="BTC"
                    cryptoValue={marketHighlightsList?.bitcoin?.usd}
                    profit="42%"
                    changeInPrice={
                      marketHighlightsList?.bitcoin?.usd_24h_change
                    }
                    time="24H"
                    // bgblue="bgblue"
                  />
                  <MarketHighlightCard
                    cryptoIcon={ETHEREUM_SVG}
                    cryptoName="ETH"
                    cryptoValue={marketHighlightsList?.ethereum?.usd}
                    changeInPrice={
                      marketHighlightsList?.ethereum?.usd_24h_change
                    }
                    time="24H"
                    loss="2%"
                  />
                  <MarketHighlightCard
                    cryptoIcon={USDC_SVG}
                    cryptoName="USDC"
                    cryptoValue={marketHighlightsList?.usdc?.usd}
                    changeInPrice={marketHighlightsList?.usdc?.usd_24h_change}
                    time="24H"
                    loss="42%"
                  />
                  <MarketHighlightCard
                    cryptoIcon={TETHER_NEW_SVG}
                    cryptoName="USDT"
                    cryptoValue={marketHighlightsList?.tether?.usd}
                    changeInPrice={marketHighlightsList?.tether?.usd_24h_change}
                    time="24H"
                    loss="42%"
                  />
                </div>
              </RenderIf>
              <RenderIf
                isTrue={
                  !marketHighlightsListLoading && marketHighlightsList === null
                }
              >
                <NoDataFound text="No Data Found" />
              </RenderIf>
            </div>
          </div>

          {/* assets section */}
          <div className="border_box mt-4 blue_border_box" id="custom_tabs_pil">
            <div className="market_asset_wrapper px-0 position-relative">
              {/* <RenderIf isTrue={!assetsListLoading}>
                <div className="asset_input">
                  <div className="input_relative">
                    <img
                      src={SEARCH_ICON_SVG}
                      alt="search"
                      className="input_icon"
                    />
                    <input placeholder="Search" />
                  </div>
                </div>
              </RenderIf> */}
              <p className="market_highlight_title plr_40">Assets</p>

              <RenderIf isTrue={assetsListLoading}>
                <Spinner className="m-20-auto" id="dashboardSpinner" />
              </RenderIf>
              <RenderIf isTrue={!assetsListLoading}>
                <Tabination />
              </RenderIf>
            </div>
          </div>

          {/* estimated value */}
          <RenderIf isTrue={dashboardTotalsLoading}>
            <Spinner className="m-20-auto" id="dashboardSpinner" />
          </RenderIf>
          <RenderIf
            isTrue={
              !dashboardTotalsLoading &&
              dashboardTotals !== null &&
              dashboardTotals?.portfolioBalance
            }
          >
            <div className="border_box mt-4 estimated_space" id="">
              <p className="text-center estimated_desc mb-3">
                Estimated Total Value of Crypto:{" "}
                <span className="estimated_ammount">
                  $
                  {parseFloat(dashboardTotals?.portfolioBalance || 0).toFixed(
                    2
                  )}
                </span>
              </p>
              <p className="estimated_description">
                {/* If the value of your collateral assets reaches $0.00, partial
                loan repayments will be initiated automatically */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </RenderIf>
        </div>
      </div>

      <OTPVerificationModal
        showModal={showEmailVerificationModal}
        closeModal={handleCloseEmailVerificationModal}
      />
      <RenderIf isTrue={arertModal}>
        <AlertModal showModal={arertModal} closeModal={closeModal} />
      </RenderIf>
    </>
  );
};

export default Dashboard;
