import { useState } from "react";
import { Modal } from "react-bootstrap";

import { CLOSE, COPY, INTEREST_ICON, INTEREST_PLUS_ICON } from "assets/images";
import {
  assetIcon,
  shortenWalletAddress,
  formatTime,
  formatDate,
} from "components/reusableFunctions/reusableFuctions";
import useCopyToClipboard from "hooks/useCopyToClipboard";
import { RenderIf } from "utils";

import "./wallet.css";

const InterestModal = ({ show, onHide, modalWidth, interestData }) => {
  const [, copy] = useCopyToClipboard();
  const [copyTooltipValue, setCopyTooltipValue] = useState("");
  return (
    <Modal
      className={modalWidth}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
    >
      <img
        src={CLOSE}
        alt="close"
        className="close_icon_modal"
        onClick={onHide}
      />
      <div className="interest_modal">
        <p className="modal_title mb-4">Interest</p>
        <div className="interset_icon_container mx-auto">
          <img src={INTEREST_ICON} alt="interest" />
          <img src={INTEREST_PLUS_ICON} alt="plus" className="interest_plus" />
        </div>
        <div
          id="interest_token"
          className="interest_value d-flex align-items-center justify-content-center"
        >
          <span className="ml-0 plus">+</span>
          <img src={assetIcon(interestData?.abbr)} alt="asset" />
          <span>
            {interestData?.abbr}{" "}
            {parseFloat(interestData?.savingBalance).toFixed(8)}
          </span>
        </div>
        {/* <div className="interest_value d-flex align-items-center justify-content-center mt-1">
          <span className="ml-0 plus">+</span>
          <img src={USDT_ICON_DROPDOWN} />
          <span>USDC 2.16</span>
        </div> */}
        {/* <div className="interest_hint d-flex align-items-center justify-content-center mt-1">
          1 BTC = 1.02545 USDC
        </div> */}

        <div className="interest_info_container">
          {/* last transaction time */}
          <RenderIf
            isTrue={
              interestData?.lastInterestTxnTime &&
              interestData?.lastInterestTxnStatus
            }
          >
            <div className="interest_info d-flex justify-content-between align-items-center">
              <p className="interest_info_left">
                {formatDate(interestData?.lastInterestTxnTime, "DD-MM-YYYY")}{" "}
                {formatTime(interestData?.lastInterestTxnTime)}
              </p>
              <p className="apy_percent mr-0">
                {interestData?.lastInterestTxnStatus === "Success"
                  ? "Approved"
                  : "Pending"}
              </p>
            </div>
          </RenderIf>

          {/* last transaction id */}
          <RenderIf isTrue={interestData?.lastInterestTxnId}>
            <div className="interest_info d-flex justify-content-between align-items-center mt-3">
              <p className="interest_info_left">Transaction ID</p>
              <p className="id_value mr-0">
                {shortenWalletAddress(interestData?.lastInterestTxnId)}
                <span
                  className="down_tooltip copy_tooltip "
                  data-tooltip={`${
                    copyTooltipValue ? copyTooltipValue : "Copy"
                  }`}
                >
                  <img
                    src={COPY}
                    alt="copy"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setCopyTooltipValue("Copied");
                      copy(interestData?.lastInterestTxnId);
                    }}
                  />
                </span>
              </p>
            </div>
          </RenderIf>
        </div>
        <div className="interest_details_container">
          <p className="interest_info_left">Details</p>
          <p className="id_value mr-0 mt-2">
            {interestData?.abbr} Interest Earned
          </p>
          <div className="d-flex mt-2">
            <div className="my-auto flex-grow-1 interest_hr"></div>
            <p className="px-1 interest_title">Interest</p>
            <div className="my-auto flex-grow-1 interest_hr interest_full_hr"></div>
          </div>
          <div id="interest_token" className="interest_details_box">
            <div className="mt-2">
              <p className="interest_detail_title">Earning Balance</p>
              <div className="interest_value d-flex align-items-center mt-0">
                <img src={assetIcon(interestData?.abbr)} alt="asset" />
                <span>
                  {interestData?.abbr}{" "}
                  {parseFloat(interestData?.savingBalance).toFixed(8)}
                </span>
              </div>
            </div>

            {/* interest in token & USD */}
            <RenderIf
              isTrue={
                interestData?.interestInToken && interestData?.interestInUsd
              }
            >
              <div className="mt-2">
                <p className="interest_detail_title">Interest Earned</p>
                <div className="interest_value d-flex align-items-center mt-0">
                  <img src={assetIcon(interestData?.abbr)} alt="asset" />
                  <span>
                    {interestData?.abbr}{" "}
                    {parseFloat(interestData?.interestInToken).toFixed(8)}
                  </span>
                </div>
                <p className="interest_detail_title interset_earned_value pl_30">
                  ${parseFloat(interestData?.interestInUsd).toFixed(8)}
                </p>
              </div>
            </RenderIf>

            <div className="mt-2">
              <p className="interest_detail_title">Interest Rate</p>
              <p className="apy_percent mr-0">{interestData?.earnInterest}%</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InterestModal;
