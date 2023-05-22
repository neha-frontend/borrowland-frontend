import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";

import { RenderIf } from "utils";
import { CLOSE } from "assets/images";
import { ErrorMessageCard } from "components";
import {
  dropDownCurrency,
  handleSetDropDown,
} from "components/reusableFunctions/reusableFuctions";

import "./index.css";

const WithdrawModal = ({
  onHide,
  show,
  modalWidth,
  showNext,
  withdrawType,
  setPreviewData,
}) => {
  const [assetsValue, setAssetsValue] = useState("BTC");
  const [networkValue, setNetworkValue] = useState("Bitcoin (native) network");
  const [receiverWalletAddressValue, setReceiverWalletAddressValue] =
    useState("");
  const [amountValue, setAmountValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [withdrawSavingBalance, setWithdrawSavingBalance] = useState("");
  const [withdrawData, setWithdrawData] = useState("");

  const { assetsList } = useSelector((state) => state.user.assets);

  const initialValue = {
    assets: assetsValue,
    network: networkValue,
    receiverWalletAddress: receiverWalletAddressValue,
    amount: amountValue,
  };

  // close current modal, open preview modal & send data to preview
  const handlePreviewClick = () => {
    if (
      assetsValue === "" ||
      receiverWalletAddressValue === "" ||
      !amountValue
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
      onHide();
      setErrorMessage("");
      setReceiverWalletAddressValue("");
      showNext();
    }
  };

  const handleNetworkDropdown = (e) => {
    setNetworkValue(e);
  };

  const handleCloseModal = () => {
    setErrorMessage("");
    setReceiverWalletAddressValue("");
    setAmountValue(null);
    // setAssetsValue('')
  };

  useEffect(() => {
    handleCloseModal();
  }, []);
  useEffect(() => {
    setAmountValue(null);
  }, [show]);

  const handleAssetChange = (event) => {
    const newValue = event.target.value;
    const isValid = /^\d*\.?\d*$/.test(newValue);

    if (isValid) {
      setAmountValue(newValue);
    }
  };

  // called when withdraw modal opens for the first time
  useEffect(() => {
    setAssetsValue(withdrawType);
    setWithdrawData(assetsList?.filter((item) => item?.abbr === withdrawType));
  }, [withdrawType]);

  // called when withdrawData is changed
  useEffect(() => {
    setWithdrawSavingBalance(withdrawData[0]?.savingBalance);
  }, [withdrawData]);

  // called when assetValue is changed from dropdown
  useEffect(() => {
    setAmountValue("");
    {
      assetsValue === "BTC"
        ? setNetworkValue("Bitcoin (native) network")
        : setNetworkValue("Goerli Test Network");
    }
    setWithdrawData(assetsList?.filter((item) => item?.abbr === assetsValue));
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
      <div className="withdraw_modal">
        <p className="modal_title">Withdraw</p>
        <div className="withdraw_container mt-3">
          <p className="withdraw_btc_msg">
            You can withdraw up to
            <span className="withdraw_btc_amount">
              {`${assetsValue} ${parseFloat(withdrawSavingBalance).toFixed(8)}`}
            </span>
          </p>
          <p className="withdraw_text fw_600">
            You can only withdraw assets from the Savings Wallet. Go to Manage
            Wallets if you want to transfer assets before the withdrawal.
          </p>
        </div>

        {/* Assets dropdown */}
        <div className="withdraw_category_container">
          <div className="withdraw_label">Assets</div>
          <div id="withdraw_dropdown">
            <DropdownButton
              title={
                <div className="d-flex align-items-center">
                  <img src={handleSetDropDown(assetsValue)} />
                  <p className="btc_title withdraw_btc_title">{assetsValue}</p>
                </div>
              }
              id="input-group-dropdown-1"
            >
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

        {/* Network dropdown */}
        <div className="withdraw_category_container">
          <div className="withdraw_label">Network</div>
          <div id="withdraw_dropdown">
            <DropdownButton
              title={
                <>
                  <p className="network_placeholder">
                    {networkValue ? networkValue : "Bitcoin (native) network"}
                  </p>
                </>
              }
              id="input-group-dropdown-1"
              onSelect={handleNetworkDropdown}
              disabled
            >
              <Dropdown.Item eventKey="Bitcoin (native) network">
                Bitcoin (native) network
              </Dropdown.Item>
              <Dropdown.Item eventKey="Goerli Test Network">
                Goerli Test Network
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>

        {/* Receivers wallet address */}
        <div className="withdraw_category_container">
          <div className="withdraw_label">Receiver&apos;s wallet address</div>
          <input
            type="text"
            className="withdraw_input"
            onChange={(e) => setReceiverWalletAddressValue(e.target.value)}
          />
        </div>

        {/* Amount */}
        <div className="withdraw_category_container">
          <div className="withdraw_label">Amount</div>
          <div className="row withdraw_amount_row mx-0 asset_amount">
            <div className="col-sm-3 col-4 position-relative d-flex align-items-center border_right">
              <input
                id="amount_input_modal"
                className="btc_title w-100 mx-0 withdraw_input_btc_title"
                value={assetsValue}
                disabled
              />
              <img
                src={handleSetDropDown(assetsValue)}
                alt="icon"
                className="btc_icon"
              />
            </div>
            <div className="col-sm-9 col-8 pr-0">
              <div className="position-relative">
                <input
                  type="text"
                  value={amountValue}
                  onChange={handleAssetChange}
                  className="pl-0 btc_amount"
                  placeholder="0.00"
                />
                <div
                  className="btc_amount_titles fw_600 cursor-pointer"
                  onClick={() => {
                    setAmountValue(withdrawSavingBalance);
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
    </Modal>
  );
};

export default WithdrawModal;
