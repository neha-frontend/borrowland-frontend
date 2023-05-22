import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  COPY,
  REFER_OPTION,
  REPAY_OPTION,
  BORROW_OPTION,
  SWAP_OPTION,
  INFO_ICON2_SVG,
} from "assets/images";
import {
  FooterBar,
  AffiliateCard,
  AffiliateTableCard,
  WithdrawPreview,
  AffiliateWithdrawModal,
  NoDataFound,
  Spinner,
} from "components";
import {
  affiliateDashoardStatics,
  affiliateDashoardCount,
} from "store/sagaActions";
import PieChart from "components/chart/PieChart";
import useCopyToClipboard from "hooks/useCopyToClipboard";
import { RenderIf } from "utils";

import "./affiliate.css";

const Affiliate = () => {
  const dispatch = useDispatch();
  const {
    isAffiliateCountLoading,
    affiliateDashoardCountData,
    isAffiliateUserStaticsLoading,
    affiliateUserStaticsData,
  } = useSelector((state) => state.user.affiliate);
  const [, copy] = useCopyToClipboard();
  const [copyTooltipValue, setCopyTooltipValue] = useState("");

  const [withdrawType, setWithdrawType] = useState("");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showWithdrawPreviewModal, setShowWithdrawPreviewModal] =
    useState(false);
  const [previewData, setPreviewData] = useState({
    assets: "",
    network: "",
    receiverAddress: "",
    amount: "",
  });

  const options = {
    animationEnabled: true,
    labels: affiliateUserStaticsData && affiliateUserStaticsData?.label,
    datasets: [
      {
        data: affiliateUserStaticsData && affiliateUserStaticsData?.value,
        backgroundColor: ["#e1131d", "#134ee1", "#6fe113", "#eee609"],
        hoverBackgroundColor: ["#e1131d", "#134ee1", "#6fe113", "#eee609"],
        hoverBorderColor: "#fff",
      },
    ],
  };
  const userActivityOptions = {
    animationEnabled: true,
    labels:
      affiliateUserStaticsData && affiliateUserStaticsData?.activeUserLabel,
    datasets: [
      {
        data:
          affiliateUserStaticsData && affiliateUserStaticsData?.activeUserValue,
        backgroundColor: ["#e1131d", "#134ee1", "#6fe113", "#eee609"],
        hoverBackgroundColor: ["#e1131d", "#134ee1", "#6fe113", "#eee609"],
        hoverBorderColor: "#fff",
      },
    ],
  };
  useEffect(() => {
    dispatch(affiliateDashoardCount());
    dispatch(affiliateDashoardStatics());
  }, []);

  const handleCopy = (e, url) => {
    e.stopPropagation();
    e.preventDefault();
    copy(url);
    setCopyTooltipValue("Copied");
  };

  const handleOpenWithdrawModal = () => {
    setShowWithdrawModal(true);
  };

  const handleCloseWithdrawModal = () => {
    setShowWithdrawModal(false);
    setShowWithdrawPreviewModal(true);
  };

  return (
    <>
      {/* Agent’s Dashboard */}
      <div className="affiliate_wrapper">
        <p className="affiliate_title">Agent’s Dashboard</p>
        <RenderIf isTrue={isAffiliateCountLoading}>
          <Spinner className="m-20-auto" id="dashboardSpinner" />
        </RenderIf>
        <RenderIf
          isTrue={!isAffiliateCountLoading && affiliateDashoardCountData}
        >
          <div className="row mb-3">
            {/* My Earnings */}
            <RenderIf isTrue={affiliateDashoardCountData?.Earning !== null}>
              <div className="col-lg-6 mt-3">
                <AffiliateCard
                  affiliate_icon={INFO_ICON2_SVG}
                  titleText="My Earnings"
                  valueText={`${+affiliateDashoardCountData?.Earning?.toFixed(
                    4
                  )} USD`}
                  btnText="Withdraw Funds"
                  onClick={handleOpenWithdrawModal}
                />
              </div>
            </RenderIf>

            {/* Invite */}
            <RenderIf isTrue={affiliateDashoardCountData?.Link}>
              <div className="col-lg-6 mt-3">
                <AffiliateCard
                  affiliateClass="invite_affiliate_card "
                  affiliate_icon={INFO_ICON2_SVG}
                  titleText="Invite users to register"
                  valueText="Generate a link invite multiple or individual user"
                  btnText="Copy Link"
                  btnImg={COPY}
                  tooltip={`${copyTooltipValue ? copyTooltipValue : "Copy"}`}
                  onClick={(e) =>
                    handleCopy(e, affiliateDashoardCountData?.Link)
                  }
                />
              </div>
            </RenderIf>
          </div>

          <div className="row">
            <RenderIf isTrue={affiliateDashoardCountData?.Users !== null}>
              <div className="col-lg-6 col-xl-3 mt-3">
                <AffiliateCard
                  affiliateClass="affiliate_option"
                  affiliate_icon={REFER_OPTION}
                  valueText={affiliateDashoardCountData?.Users}
                  titleText="User Onboard"
                />
              </div>
            </RenderIf>

            <RenderIf isTrue={affiliateDashoardCountData?.Swap !== null}>
              <div className="col-lg-6 col-xl-3 mt-3">
                <AffiliateCard
                  affiliateClass="affiliate_option"
                  affiliate_icon={SWAP_OPTION}
                  valueText={+affiliateDashoardCountData?.Swap?.toFixed(4)}
                  titleText="Swap"
                />
              </div>
            </RenderIf>

            <RenderIf isTrue={affiliateDashoardCountData?.Lending !== null}>
              <div className="col-lg-6 col-xl-3 mt-3">
                <AffiliateCard
                  affiliateClass="affiliate_option"
                  affiliate_icon={REPAY_OPTION}
                  valueText={+affiliateDashoardCountData?.Lending?.toFixed(4)}
                  titleText="Lending"
                />
              </div>
            </RenderIf>

            <RenderIf isTrue={affiliateDashoardCountData?.Borrow !== null}>
              <div className="col-lg-6 col-xl-3 mt-3">
                <AffiliateCard
                  affiliateClass="affiliate_option"
                  affiliate_icon={BORROW_OPTION}
                  valueText={+affiliateDashoardCountData?.Borrow?.toFixed(4)}
                  titleText="Borrow"
                />
              </div>
            </RenderIf>
          </div>
        </RenderIf>
      </div>

      <div className="bg_blue mt-0">
        {/* User’s Leaderboard */}
        <div className="affiliate_wrapper py-0">
          <div className="row">
            <div className="col-12">
              <div className="border_box blue_border_box">
                <div className="affiliate_leaderboard_container pb-0">
                  <p className="title">User’s Leaderboard</p>
                  <AffiliateTableCard />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Statistics */}
        <div className="affiliate_wrapper">
          <div className="row">
            <div className="col-12">
              <div className="border_box blue_border_box">
                <div className="affiliate_leaderboard_container pb-0">
                  <p className="title">User Statistics</p>
                  <RenderIf isTrue={isAffiliateUserStaticsLoading}>
                    <Spinner className="m-20-auto" id="dashboardSpinner" />
                  </RenderIf>
                  <RenderIf isTrue={!isAffiliateUserStaticsLoading}>
                    <RenderIf isTrue={affiliateUserStaticsData}>
                      <div className="row my-5">
                        <div className="col-6 d-flex align-items-center justify-content-center flex-column">
                          {/* <img
												src={STATISTICS_ONE}
												alt="statistics"
												className="img-fluid"
											/> */}
                          <RenderIf isTrue={affiliateUserStaticsData?.label}>
                            <PieChart data={options} />
                          </RenderIf>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-center flex-column">
                          {/* <img
												src={STATISTICS_TWO}
												alt="statistics"
												className="img-fluid"
											/> */}
                          <RenderIf
                            isTrue={affiliateUserStaticsData?.activeUserLabel}
                          >
                            <PieChart data={userActivityOptions} />
                          </RenderIf>
                        </div>
                      </div>
                    </RenderIf>
                    <RenderIf isTrue={affiliateUserStaticsData === null}>
                      <NoDataFound text="No Data Found" />
                    </RenderIf>
                  </RenderIf>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterBar />
      <AffiliateWithdrawModal
        show={showWithdrawModal}
        showNext={handleCloseWithdrawModal}
        onHide={() => setShowWithdrawModal(false)}
        modalWidth="modal-width-460 withdraw_modal_dialog"
        withdrawType={withdrawType}
        setWithdrawType={setWithdrawType}
        earningBalance={affiliateDashoardCountData?.Earning}
        setPreviewData={setPreviewData}
      />
      <WithdrawPreview
        show={showWithdrawPreviewModal}
        onHide={() => setShowWithdrawPreviewModal(false)}
        modalWidth="modal-width-460 withdraw_modal_dialog"
        previewData={previewData}
        type="AFFILIATE"
      />
    </>
  );
};

export default Affiliate;
