/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { withdrawAction, resetWithdrawErrorMsg } from "store/sagaActions";
import { RenderIf } from "utils";
import { CLOSE } from "../../../assets/images";
import OTPVerificationModal from "../user/OTPVerificationModal";
import { ErrorMessageCard } from "components";
import {
  setLocalTimestamp,
  assetIcon,
} from "components/reusableFunctions/reusableFuctions";
import { ClipLoader } from "react-spinners";

const WithdrawPreview = ({ onHide, modalWidth, show, previewData, type }) => {
  const dispatch = useDispatch();

  const date = new Date();

  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const { isWithdrawLoading, withdrawErrorMsg } = useSelector(
    (state) => state.user.withdraw
  );

  const handleOpenVerificationModal = () => {
    setShowVerificationModal(true);
  };

  const handleCloseVerificationModal = () => {
    setShowVerificationModal(false);
  };

  const handlePreviewButton = () => {
    dispatch(resetWithdrawErrorMsg());
    if (type === "AFFILIATE") {
      dispatch(
        withdrawAction({
          data: {
            coin: previewData.assets.toLowerCase(),
            toAddress: previewData?.receiverWalletAddress,
            amount: parseFloat(previewData?.amount),
            type: "Withdraw",
            withdrawFrom: "saving",
            isAgentWithdraw: true,
          },
          onHide,
          handleOpenVerificationModal,
        })
      );
    } else {
      dispatch(
        withdrawAction({
          data: {
            coin: previewData.assets.toLowerCase(),
            toAddress: previewData?.receiverWalletAddress,
            amount: parseFloat(previewData?.amount),
            type: "Withdraw",
            withdrawFrom: "saving",
          },
          onHide,
          handleOpenVerificationModal,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(resetWithdrawErrorMsg());
  }, [show]);

  const receiverWalletAddress =
    previewData?.receiverWalletAddress &&
    previewData?.receiverWalletAddress.length > 10
      ? `${previewData?.receiverWalletAddress.slice(
          0,
          6
        )}...${previewData?.receiverWalletAddress.slice(-4)}`
      : previewData?.receiverWalletAddress;

  return (
    <>
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
        <div className="withdraw_modal">
          <p className="modal_title">Withdraw</p>
          <div className="withdraw_preview_container">
            <p className="preview_title font-weight-bold">Preview</p>
            <div className="d-flex justify-content-between align-items-center">
              <p className="preview_left">Asset</p>
              <p className="preview_right">
                <img
                  src={assetIcon(previewData?.assets)}
                  width="24"
                  height="24"
                />
                <span className="mr-0">{previewData?.assets}</span>
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="preview_left">Network</p>
              <p className="preview_right font-weight-bold">
                {previewData?.network}
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="preview_left">Timestamp</p>
              <p className="preview_right">{setLocalTimestamp(date)}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="preview_left">Receiver&apos;s address</p>
              <p className="preview_right font-weight-bold overflow_hidden">
                {/* {previewData?.receiverWalletAddress} */}
                {receiverWalletAddress}
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="preview_left">Amount</p>
              <p className="preview_right">
                <img
                  src={assetIcon(previewData?.assets)}
                  width="24"
                  height="24"
                />
                <span className="mr-0">
                  {previewData?.amount} {previewData?.assets}
                </span>
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="preview_left">Transaction Fees</p>
              <p className="preview_right font-weight-bold">0.05 USD</p>
            </div>
          </div>

          {/* shows withdraw errormessage */}
          <RenderIf isTrue={withdrawErrorMsg}>
            <ErrorMessageCard errorMsg={withdrawErrorMsg} />
          </RenderIf>

          <div className="preview_fund_modal">
            <Button
              id="withdraw_preview_button"
              className="w-100"
              onClick={handlePreviewButton}
              disabled={isWithdrawLoading}
            >
              {isWithdrawLoading ? (
                <ClipLoader
                  color="#fff"
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </div>
      </Modal>

      <OTPVerificationModal
        showModal={showVerificationModal}
        closeModal={handleCloseVerificationModal}
        type="WITHDRAW"
      />
    </>
  );
};

export default WithdrawPreview;
