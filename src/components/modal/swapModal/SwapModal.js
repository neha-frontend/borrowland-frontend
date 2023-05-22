import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

import {
  formatDate,
  formatTime,
} from "components/reusableFunctions/reusableFuctions";
import { swapCoinAction, resetSwapCoinErrorMsg,getPlatformFeesAction } from "store/sagaActions";
import { CLOSE, SWAP_MODAL_PREVIEW } from "../../../assets/images";
import OTPVerificationModal from "../user/OTPVerificationModal";
import { RenderIf } from "utils";
import { ErrorMessageCard } from "components";

import "./modal.css";

const SwapModal = ({
  show,
  closeModal,
  modalWidth,
  payWithText,
  receiveWithText,
  receiveWithValue,
  payWithValue,
  handleIconValue,
}) => {
  const dispatch = useDispatch();
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const { isLoading, errorMsg } = useSelector((state) => state.user.swapCoin);
  const notify = (toastMessage) => toast.success(toastMessage);
  const { platformFees } = useSelector((state) => state.user.platformVariable);

  useEffect(() => {
    dispatch(
      getPlatformFeesAction({
        name: "Platform Fee",
      })
    )
  }, []);
    

  const onSubmit = () => {
    dispatch(resetSwapCoinErrorMsg());
    dispatch(
      swapCoinAction({
        data: {
          fromCoin: payWithText.toLowerCase(),
          toCoin: receiveWithText.toLowerCase(),
          amount: +payWithValue,
          type: "Swap",
          swapFee: platformFees ? (platformFees[0]?.rate/100*+payWithValue): 0.5/100 * +payWithValue,
        },
        notify,
        closeModal,
        handleOpenVerificationModal,
      })
    );
  };
  const handleOpenVerificationModal = () => {
    setShowVerificationModal(true);
  };

  const handleCloseVerificationModal = () => {
    setShowVerificationModal(false);
  };

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
          onClick={() => {
            dispatch(resetSwapCoinErrorMsg());
            closeModal();
          }}
        />
        <div className="swap_modal">
          <p className="modal_title">Swap Preview </p>
          <div className="swap_preview_section mt-3">
            <div className="d-flex justify-content-between px-3 py-3">
              <div className="d-flex align-items-center">
                <img
                  src={handleIconValue(payWithText)}
                  alt="btc"
                  className="mr-2 hw24"
                />
                <p className="title_swap">{payWithText}</p>
              </div>
              <div className="min100 text-center">
                <p className="dark_coin_title">
                  {payWithValue} {payWithText}
                </p>
              </div>
            </div>
            <div className="swap_preview_middle">
              <img
                src={SWAP_MODAL_PREVIEW}
                alt="swap_modal"
                className="swap_modal_preview"
              />
            </div>
            <div className="d-flex justify-content-between px-3 py-3">
              <div className="d-flex align-items-center">
                <img
                  src={handleIconValue(receiveWithText)}
                  alt="btc"
                  className="mr-2 hw24"
                />
                <p className="title_swap">{receiveWithText}</p>
              </div>
              <div className="min100 text-center">
                <p className="dark_coin_title">
                  {receiveWithValue} {receiveWithText}
                </p>
              </div>
            </div>
          </div>
          <div className="time_stamp_wrapper">
            <p className="time_ques">Time Stamp</p>
            <p className="time_ans">
              {" "}
              {formatDate(new Date(), "DD-MM-YYYY")} {formatTime(new Date())}
            </p>
          </div>
          <div className="time_stamp_wrapper mt-0 mb-4">
            <p className="time_ques">Transaction Fees</p>
            <p className="time_ans">{`${((platformFees ? platformFees[0]?.rate/100 : 0.05/100)*+payWithValue).toFixed(8)} ${payWithText} (${(platformFees ? platformFees[0]?.rate : 0.05)}%)`}</p>
          </div>
          <RenderIf isTrue={errorMsg}>
            <ErrorMessageCard errorMsg={errorMsg} />
          </RenderIf>

          <Button
            id="auth_submit_button"
            className="w-100"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader
                color="#ffffff"
                loading={isLoading}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Confirm"
            )}
          </Button>
        </div>
      </Modal>
      <OTPVerificationModal
        showModal={showVerificationModal}
        closeModal={handleCloseVerificationModal}
        type="SWAP"
      />
    </>
  );
};

export default SwapModal;
