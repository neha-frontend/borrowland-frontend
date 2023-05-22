import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  DropdownButton,
  InputGroup,
  Modal,
  Form,
  Accordion,
} from "react-bootstrap";
import { ClipLoader } from "react-spinners";

import { CLOSE, QUESTION, INFO_ICON, DROP_ICON } from "assets/images";
import {
  handleSetDropDown,
  assetIcon,
} from "components/reusableFunctions/reusableFuctions";
import { withdrawAction, resetWithdrawErrorMsg } from "store/sagaActions";
import { RenderIf } from "utils";
import { OTPVerificationModal, ErrorMessageCard } from "components";

const WithdrawFundsModal = ({ show, onHide, modalWidth, creditLineData }) => {
  const dispatch = useDispatch();
  const [assetsValue, setAssetsValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [toWalletAddressValue, setToWalletAddressValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAssetChange = (event) => {
    const newValue = event.target.value;
    const isValid = /^\d*\.?\d*$/.test(newValue);

    if (isValid) {
      setAmountValue(newValue);
    }
  };

  useEffect(() => {
    setAssetsValue(creditLineData?.abbr);
    setMaxValue(creditLineData?.creditLineBalance);
  }, [creditLineData]);

  const handleToWalletAddressChange = (event) => {
    const newValue = event.target.value;
    setToWalletAddressValue(newValue);
  };

  const handleCloseModal = () => {
    dispatch(resetWithdrawErrorMsg());
    setErrorMessage("");
    setToWalletAddressValue("");
    setAmountValue(null);
  };
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
    if (
      assetsValue === "" ||
      toWalletAddressValue === "" ||
      amountValue === ""
    ) {
      setErrorMessage("Please fill all the details");
    } else if (
      (parseFloat(amountValue) === parseFloat(0) &&
        parseFloat(creditLineData?.creditLineBalance) === parseFloat(0)) ||
      (amountValue !== null &&
        parseFloat(amountValue) > parseFloat(creditLineData?.creditLineBalance))
    ) {
      setErrorMessage("Insufficient Balance");
    } else if (parseFloat(amountValue) <= parseFloat(0)) {
      setErrorMessage("Invalid Amount");
    } else {
      setErrorMessage("");
      dispatch(
        withdrawAction({
          data: {
            coin: assetsValue.toLowerCase(),
            toAddress: toWalletAddressValue,
            amount: parseFloat(amountValue),
            type: "Withdraw",
            withdrawFrom: "creditLine",
          },
          onHide,
          handleOpenVerificationModal,
        })
      );
    }
  };

  useEffect(() => {
    handleCloseModal();
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
          onClick={() => {
            handleCloseModal();
            onHide();
          }}
        />
        <div className="deposit_modal">
          <p className="modal_title mb-4">Withdrawal Funds From Credit Line</p>
          <div className="withdrawl_fund_container">
            <div className="d-flex justify-content-between align-items-center">
              <p className="id_value">Credit Line Wallet</p>
              <div
                data-tooltip="Lopersm ver am"
                className="withdrawl_modal_tooltip"
              >
                <img src={QUESTION} alt="infos" width="16" height="16" />
              </div>
            </div>
            <div className="balance_container mb-0 saving_balance_container d-flex align-items-start">
              <div className="d-flex align-items-start">
                <img
                  src={assetIcon(creditLineData?.abbr)}
                  className="mt-1"
                  alt="asset"
                />
                <div>
                  <p className="withdrawfund_usdc_balance_amount">
                    {creditLineData?.abbr}{" "}
                    {parseFloat(creditLineData?.creditLineBalance).toFixed(8)}
                  </p>
                  <p className="withdrawfund_usdc_balance_amount">
                    <span className="mx-0">
                      $
                      {parseFloat(
                        creditLineData?.creditLineBalanceInUsd
                      ).toFixed(8)}
                    </span>
                  </p>
                </div>
              </div>
              <p className="apy_percent ml-3 mr-0 credit_apy_percent">
                15% LTV
              </p>
            </div>
          </div>
          <div className="withdrawl_fund_container">
            {/* <p className="recieve_fund_title">
            How would you like to receive the funds?
          </p>
          <div className="funds_receive_btn_container row">
            <div className="col-md-3 col-6">
              <label
                htmlFor="btc"
                className="checkbox fund_label position-relative"
              >
                <input
                  type="checkbox"
                  name="fixedTerm"
                  id="btc"
                  className="checkbox__input"
                  defaultChecked={true}
                />
                <div className="refund_checkbox__box"></div>
                <img src={BTC_ICON_DROPDOWN} alt="" className="mr-2" /> BTC
              </label>
            </div>
            <div className="col-md-3 col-6">
              <label
                htmlFor="eth"
                className="checkbox fund_label position-relative"
              >
                <input
                  type="checkbox"
                  name="fixedTerm"
                  id="eth"
                  className="checkbox__input"
                />
                <div className="refund_checkbox__box"></div>
                <img src={ETH_ICON_DROPDOWN} alt="" className="mr-2" /> ETH
              </label>
            </div>

            <div className="col-md-3 col-6">
              <label
                htmlFor="usdc"
                className="checkbox fund_label position-relative"
              >
                <input
                  type="checkbox"
                  name="fixedTerm"
                  id="usdc"
                  className="checkbox__input"
                />
                <div className="refund_checkbox__box"></div>
                <img src={USDC_ICON_DROPDOWN} alt="" className="mr-2" /> USDC
              </label>
            </div>
            <div className="col-md-3 col-6">
              <label
                htmlFor="usdt"
                className="checkbox fund_label position-relative"
              >
                <input
                  type="checkbox"
                  name="fixedTerm"
                  id="usdt"
                  className="checkbox__input"
                />
                <div className="refund_checkbox__box"></div>
                <img src={USDT_ICON_DROPDOWN} alt="" className="mr-2" /> USDT
              </label>
            </div>
          </div> */}
            <p className="fixed_term_small_title mt-3">Withdrawal Amount</p>
            <div
              id="btc_dropdown"
              className="withdraw_fund_btc_dropdown withdrawl_amount_coin_dropdown"
            >
              <InputGroup className="my-1 swap_input_group">
                <DropdownButton
                  title={
                    <div className="d-flex align-items-center">
                      <img src={handleSetDropDown(assetsValue)} />
                      <p className="btc_title ml-2">{assetsValue}</p>
                    </div>
                  }
                  id="input-group-dropdown-1"
                  disabled
                ></DropdownButton>
                <div className="input_btn_box">
                  <Form.Control
                    placeholder="0.00"
                    value={amountValue}
                    onChange={handleAssetChange}
                    aria-label="Text input with dropdown button"
                  />
                  <div
                    className="value_titles vertically_center"
                    onClick={() => {
                      setAmountValue(maxValue);
                    }}
                  >
                    <p className="value_btc  cursor-pointer">MAX</p>
                  </div>
                </div>
              </InputGroup>
            </div>
            <div className="withdraw_category_container">
              <div className="withdraw_label">To wallet address</div>
              <input
                type="text"
                value={toWalletAddressValue}
                onChange={handleToWalletAddressChange}
                placeholder="Paste the address"
                className="withdraw_input transfer_input"
              />
            </div>
          </div>
          <Accordion className="mt-3 fixed_terms_important_terms_accordion">
            <Accordion.Item eventKey="0">
              <div className="d-flex important_terms_button">
                <p className="d-flex">
                  <img src={INFO_ICON} className="mr-2" alt="info" />
                  Important Notes
                </p>
                <Accordion.Header className="mb-0">
                  <img src={DROP_ICON} alt="note" />
                </Accordion.Header>
              </div>

              <Accordion.Body>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* error message */}
          <RenderIf isTrue={errorMessage || withdrawErrorMsg}>
            <ErrorMessageCard
              id="creditline_withdraw"
              errorMsg={errorMessage || withdrawErrorMsg}
            />
          </RenderIf>

          <Button
            className="mx-auto mt-4 withdraw_funds_confirm_btn"
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
      </Modal>
      <OTPVerificationModal
        showModal={showVerificationModal}
        closeModal={handleCloseVerificationModal}
        type="WITHDRAW"
      />
    </>
  );
};

export default WithdrawFundsModal;
