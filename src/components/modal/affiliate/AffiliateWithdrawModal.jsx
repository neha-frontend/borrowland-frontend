import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";

import { CLOSE } from "assets/images";
import { ErrorMessageCard } from "components";
import { RenderIf } from "utils";
import {
  handleSetDropDown,
  dropDownCurrency,
} from "components/reusableFunctions/reusableFuctions";
import { compareCoinAction } from "store/sagaActions";

import "../withdrawModal/index.css";

const AffiliateWithdrawModal = ({
  onHide,
  show,
  modalWidth,
  showNext,
  earningBalance,
  setPreviewData,
}) => {
  const dispatch = useDispatch();
  const { coinValue } = useSelector((state) => state.user.compareCoin);

  const [assetsValue, setAssetsValue] = useState("USDC");
  const [networkValue, setNetworkValue] = useState("Goerli Test Network");
  const [receiverWalletAddressValue, setReceiverWalletAddressValue] =
    useState("");
  const [amountValue, setAmountValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValue = {
    assets: assetsValue,
    network: networkValue,
    receiverWalletAddress: receiverWalletAddressValue,
    amount: amountValue,
    isAgentWithdraw: true,
  };

  const handleCloseModal = () => {
    setErrorMessage("");
    setReceiverWalletAddressValue("");
    setAmountValue(null);
    // setAssetsValue('')
  };

  const handleNetworkDropdown = (e) => {
    setNetworkValue(e);
  };
  const handleAssetChange = (event) => {
    const newValue = event.target.value;
    const isValid = /^\d*\.?\d*$/.test(newValue);

    if (isValid) {
      setAmountValue(newValue);
    }
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
        parseFloat(earningBalance) === parseFloat(0)) ||
      (amountValue !== null &&
        parseFloat(amountValue) > parseFloat(earningBalance))
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

  useEffect(() => {
    setAmountValue("");
    dispatch(
      compareCoinAction({
        data: {
          from: "USD",
          to: assetsValue,
        },
      })
    );
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
              {`${parseFloat(earningBalance).toFixed(8)} USD`}
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
              {dropDownCurrency
                .filter((i) => i?.name !== "BTC" && i?.name !== "ETH")
                .map((item) => {
                  return (
                    <Dropdown.Item
                      className="pl-0"
                      key={item?.id}
                      onClick={() => setAssetsValue(item?.name)}
                    >
                      <div className="d-flex">
                        <img
                          src={item?.icon}
                          alt={item?.name}
                          className="mr-2"
                        />
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
                    setAmountValue(coinValue?.rate);
                  }}
                >
                  MAX
                </div>
              </div>
            </div>
          </div>
          <div className="balance-error">
            <p className="withdraw_text fw_600 mt-2 mb-4 text-left">
              Available {assetsValue} : {earningBalance / coinValue?.rate}
            </p>
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

export default AffiliateWithdrawModal;
