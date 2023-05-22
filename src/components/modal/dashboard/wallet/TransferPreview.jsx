import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";

import { CLOSE } from "../../../../assets/images";
import {
  assetIcon,
  setLocalTimestamp,
} from "components/reusableFunctions/reusableFuctions";
import { OTPVerificationModal } from "components";
import { withdrawAction, resetWithdrawErrorMsg } from "store/sagaActions";
import { RenderIf } from "utils";
import { ErrorMessageCard } from "components";
import { shortenWalletAddress } from "components/reusableFunctions/reusableFuctions";

const TransferPreview = ({
  onHide,
  modalWidth,
  show,
  // handlePreviewClick,
  previewData,
}) => {
  const date = new Date();
  const dispatch = useDispatch();
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
    dispatch(
      withdrawAction({
        data: {
          coin: previewData.assets.toLowerCase(),
          toAddress: previewData?.toAddress,
          amount: parseFloat(previewData?.amount),
          type: "Withdraw",
          withdrawFrom: "saving",
        },
        onHide,
        handleOpenVerificationModal,
      })
    );
  };

  useEffect(() => {
    dispatch(resetWithdrawErrorMsg());
  }, []);

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
            <p className="preview_title">Preview</p>
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
              <p className="preview_right">{previewData?.network}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="preview_left">Timestamp</p>
              <p className="preview_right timestamp">
                <span className="mr-0">{setLocalTimestamp(date)}</span>
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="preview_left">From address</p>
              <p className="preview_right overflow_hidden">
                {shortenWalletAddress(previewData?.fromAddress)}
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="preview_left">To address</p>
              <p className="preview_right overflow_hidden">
                {shortenWalletAddress(previewData?.toAddress)}
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="preview_left">Amount</p>
              <p className="preview_right">
                <img
                  src={assetIcon(previewData?.assets)}
                  alt="asset"
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
              <p className="preview_right">0.81 USD</p>
            </div>
          </div>

          {/* shows withdraw errormessage */}
          <RenderIf isTrue={withdrawErrorMsg}>
            <ErrorMessageCard errorMsg={withdrawErrorMsg} />
          </RenderIf>

          <div className="preview_fund_modal">
            <Button
              className="w-100"
              onClick={handlePreviewButton}
              disabled={isWithdrawLoading}
            >
              Confirm
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

export default TransferPreview;
