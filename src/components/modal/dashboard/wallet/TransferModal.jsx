import { ErrorMessageCard } from "components";
import { dropDownCurrency } from "components/reusableFunctions/reusableFuctions";
import { handleSetDropDown } from "components/reusableFunctions/reusableFuctions";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { RenderIf } from "utils";
import { CLOSE, QUESTION } from "../../../../assets/images";

import "./wallet.css";

const TransferModal = ({
  show,
  onHide,
  modalWidth,
  showNext,
  transferData,
  setPreviewData,
}) => {
  const [assetsValue, setAssetsValue] = useState("");
  const [networkValue, setNetworkValue] = useState("");
  const [amountValue, setAmountValue] = useState(null);
  const [fromWalletAddressValue, setFromWalletAddressValue] = useState("");
  const [toWalletAddressValue, setToWalletAddressValue] = useState("");
  const [withdrawSavingBalance, setWithdrawSavingBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValue = {
    assets: assetsValue,
    network: networkValue,
    timeStamp: "",
    fromAddress: fromWalletAddressValue,
    toAddress: toWalletAddressValue,
    amount: amountValue,
    transactionFee: "",
  };

  // close current modal, open preview modal & send data to preview
  const handlePreviewClick = () => {
    if (
      assetsValue === "" ||
      amountValue === "" ||
      toWalletAddressValue === "" ||
      amountValue === null
    ) {
      setErrorMessage("Please fill all the details");
    } else if (
      (parseFloat(amountValue) === parseFloat(0) &&
        parseFloat(withdrawSavingBalance) === parseFloat(0)) ||
      (amountValue !== null &&
        parseFloat(amountValue) > parseFloat(withdrawSavingBalance))
    ) {
      setErrorMessage("Insufficient Balance");
    } else if (parseFloat(amountValue) <= parseFloat(0)) {
      setErrorMessage("Invalid Amount");
    } else {
      setPreviewData(initialValue);
      setErrorMessage("");
      onHide();
      showNext();
    }
  };
  const handleCloseModal = () => {
    setErrorMessage("");
    setToWalletAddressValue("");
    setAmountValue(null);
  };

  useEffect(() => {
    handleCloseModal();
  }, []);

  const handleAssetChange = (event) => {
    const newValue = event.target.value;
    const isValid = /^\d*\.?\d*$/.test(newValue);

    if (isValid) {
      setAmountValue(newValue);
    }
  };

  const handleToWalletAddressChange = (event) => {
    const newValue = event.target.value;
    setToWalletAddressValue(newValue);
  };

  useEffect(() => {
    setAssetsValue(transferData?.abbr);
    setFromWalletAddressValue(transferData?.savingReceiveAddress);
    setWithdrawSavingBalance(transferData?.savingBalance);
  }, [transferData]);

  useEffect(() => {
    {
      assetsValue === "BTC"
        ? setNetworkValue("Bitcoin (native) network")
        : setNetworkValue("Goerli Test Network");
    }
  }, [assetsValue]);
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
        onClick={() => {
          handleCloseModal();
          onHide();
        }}
      />
      <div className="interest_modal">
        <p className="modal_title mb-4">
          Transfer
          <span data-tooltip="I am tooltip">
            <img src={QUESTION} width="16" height="16" />
          </span>
        </p>
        <div className="withdraw_category_container">
          <div className="withdraw_label">Assets</div>
          <div id="withdraw_dropdown">
            <DropdownButton
              title={
                <>
                  <div className="d-flex align-items-center">
                    <img src={handleSetDropDown(assetsValue)} alt="asset" />
                    <p className="btc_title transfer_btc_title">
                      {assetsValue}
                    </p>
                  </div>
                </>
              }
              id="input-group-dropdown-1"
              disabled
            >
              {" "}
              {dropDownCurrency.map((item) => {
                return (
                  <Dropdown.Item
                    className="pl-0"
                    key={item?.id}
                    onClick={() => setAssetsValue(item?.name)}
                  >
                    <div className="d-flex">
                      <img src={item?.icon} alt={item?.name} className="mr-2" />
                      <p className="drop_title_coin">{item?.name}</p>
                    </div>
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </div>
        </div>
        <div className="withdraw_category_container">
          <div className="withdraw_label">Network</div>
          <div id="withdraw_dropdown">
            <DropdownButton
              title={
                <>
                  <div className="d-flex align-items-center transfer_dropdown_btn_title">
                    {networkValue}
                  </div>
                </>
              }
              disabled
              id="input-group-dropdown-1"
            ></DropdownButton>
          </div>
        </div>
        <div className="withdraw_category_container">
          <div className="withdraw_label">From wallet address</div>
          <input
            type="text"
            value={fromWalletAddressValue}
            className="withdraw_input transfer_input"
            disabled
          />
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
        {/* amount */}
        <div className="withdraw_category_container">
          <div className="withdraw_label">
            Amount
            <span data-tooltip="I am tooltip">
              <img src={QUESTION} width="16" height="16" alt="info" />
            </span>
          </div>
          <div className="withdraw_category_container">
            <div className="row withdraw_amount_row mx-0 asset_amount">
              <div className="col-sm-3 col-4 position-relative d-flex align-items-center border_right">
                <input
                  id="amount_input_modal"
                  className="btc_title w-100 mx-0 group_input_btc_title"
                  value={assetsValue}
                  disabled
                />
                <img
                  src={handleSetDropDown(assetsValue)}
                  alt="btc_icon"
                  className="btc_icon"
                />
              </div>
              {/* amount value */}
              <div className="col-sm-9 col-8 pr-0">
                <div className="position-relative">
                  <input
                    placeholder="0.00"
                    value={amountValue}
                    onChange={handleAssetChange}
                    aria-label="Text input with dropdown button"
                    className="pl-0 btc_amount"
                  />
                  <div
                    className="btc_amount_titles cursor_pointer"
                    onClick={() => {
                      setAmountValue(transferData?.savingBalance);
                    }}
                  >
                    MAX
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* error message */}
          <RenderIf isTrue={errorMessage}>
            <ErrorMessageCard errorMsg={errorMessage} />
          </RenderIf>

          <Button className="w-100" onClick={handlePreviewClick}>
            Preview
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TransferModal;
