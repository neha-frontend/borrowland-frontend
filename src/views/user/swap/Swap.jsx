import axiosMain from "http/axios/axios_main";
import { useEffect, useState } from "react";
import { Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getAssetsAction, compareCoinAction } from "store/sagaActions";
import {
  BLUE_QUESTION,
  BTC_ICON_DROPDOWN,
  ETH_ICON_DROPDOWN,
  LEARN_ICON,
  QUESTION,
  SWAP_ICON,
  USDC_ICON_DROPDOWN,
  TETHER_ICON_DROPDOWN,
} from "../../../assets/images";
import SwapModal from "../../../components/modal/swapModal/SwapModal";

import "./Swap.css";

const dropDownCurrency = [
  {
    id: 1,
    icon: BTC_ICON_DROPDOWN,
    name: "BTC",
    symbol: "btc",
    symbolFullName: "bitcoin",
  },
  {
    id: 2,
    icon: ETH_ICON_DROPDOWN,
    name: "ETH",
    symbol: "eth",
    symbolFullName: "ethereum",
  },
  {
    id: 3,
    icon: USDC_ICON_DROPDOWN,
    name: "USDC",
    symbol: "usd-coin",
    symbolFullName: "usd-coin",
  },
  {
    id: 4,
    icon: TETHER_ICON_DROPDOWN,
    name: "USDT",
    symbol: "tether",
    symbolFullName: "tether",
  },
];

const Swap = () => {
  const dispatch = useDispatch();

  const { assetsList } = useSelector((state) => state.user.assets);
  const { coinValue } = useSelector((state) => state.user.compareCoin);

  const [modalShow, setModalShow] = useState(false);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [balanceInUsd, setBalanceInUsd] = useState(0);
  const [payWith, setPayWith] = useState("ETH");
  const [recieveWith, setRecieveWith] = useState("BTC");
  const [active, setActive] = useState("ETH");
  const [crrValue, setCrrValue] = useState(1);
  const [error, setError] = useState("");
  const handleIconValue = (value) => {
    const asset_icon =
      value === "BTC"
        ? BTC_ICON_DROPDOWN
        : value === "ETH"
        ? ETH_ICON_DROPDOWN
        : value === "USDC"
        ? USDC_ICON_DROPDOWN
        : TETHER_ICON_DROPDOWN;
    return asset_icon;
  };

  const handleSetAmount = (event, calculate) => {
    if (calculate === "true") {
      setAmount(balance * event);
    } else {
      setAmount(event);
    }
  };

  useEffect(() => {
    const AMOUNT = assetsList?.filter((item) => item?.abbr === payWith);
    setBalance(AMOUNT[0]?.savingBalance);
    setBalanceInUsd(AMOUNT[0]?.savingBalanceInUsd);
    // makeAPICall(symbolFrom,symbolTo)

    dispatch(
      compareCoinAction({
        data: {
          from: payWith,
          to: recieveWith,
        },
      })
    );
  }, [payWith, recieveWith, assetsList]);

  useEffect(() => {
    // const AMOUNT = assetsList?.filter((item) => item?.abbr === payWith);
    // setBalance(AMOUNT[0]?.savingBalance);
    dispatch(getAssetsAction());
  }, []);

  // eslint-disable-next-line no-unused-vars
  const makeAPICall = async (currency, convertcrr) => {
    setActive(convertcrr);

    const param = {
      from: currency,
      to: convertcrr,
    };
    try {
      const res = await axiosMain.post("/transaction/coin-compair", {
        ...param,
      });
      setCrrValue(res?.data?.data?.items?.rate);
    } catch (err) {
      console.log("ERROR:---->", err);
    }
  };
  useEffect(() => {
    if (+amount <= 0 && amount != "") {
      setError("Amount should not be less than or equal to 0.");
    } else {
      setError("");
    }
    if (balance < amount) {
      setError("Insufficient Balance");
    }
  }, [amount, balance]);
  return (
    <>
      <div className="swap_bg">
        <div className="swap_container">
          <div className="swap_wrapper">
            <div className="swap_question_wrapper">
              <p className="swap_title">Swap</p>
              <div data-tooltip="I am tooltip">
                <img src={QUESTION} className="hw16" alt="question_icon" />
              </div>
            </div>
            <div className="wallet_wrapper">
              <p className="swap_wallet">Savings Wallet</p>
              <p className="swap_small_title">Pay with</p>
              <div id="btc_dropdown">
                <InputGroup className="my-1 swap_input_group">
                  <DropdownButton
                    title={
                      <div className="d-flex align-items-center">
                        <img src={handleIconValue(payWith)} alt="asset" />
                        <p className="btc_title ml-2">{payWith}</p>
                      </div>
                    }
                    id="input-group-dropdown-1"
                  >
                    {dropDownCurrency
                      .filter((crr) => crr.name !== recieveWith)
                      .map((item) => {
                        return (
                          <Dropdown.Item
                            className="pl-0"
                            key={item?.id}
                            onClick={() => {
                              setPayWith(item?.name);
                              setActive(item.name);
                              setAmount(0);
                            }}
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
                  <div className="input_btn_box">
                    {active === "USD" ? (
                      <Form.Control
                        disabled
                        placeholder="0.00"
                        value={amount ? amount * crrValue : ""}
                        aria-label="Text input with dropdown button"
                        onChange={(e) => {
                          const newValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleSetAmount(newValue, "false");
                        }}
                      />
                    ) : (
                      <Form.Control
                        placeholder="0.00"
                        value={amount}
                        aria-label="Text input with dropdown button"
                        onChange={(e) => {
                          const newValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleSetAmount(newValue, "false");
                        }}
                      />
                    )}
                    <div className="value_titles">
                      {/* <p
                        className={`${
                          active !== "USD" ? "value_active" : " "
                        } value_swap`}
                        onClick={() => {
                          if (amount) {
                            makeAPICall("USD", payWith);
                          }
                        }}
                      >
                        {payWith}
                      </p> */}
                      {/* <p
                        className={`${
                          active === "USD" ? "value_active" : " "
                        } value_swap`}
                        onClick={() => {
                          if (amount) {
                            makeAPICall(payWith, "USD");
                          }
                        }}
                      >
                        USD
                      </p> */}
                    </div>
                  </div>
                </InputGroup>
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="swap_small_title">
                      Available {payWith} :{" "}
                      {balance > 0 ? parseFloat(balance).toFixed(8) : balance} (
                      {`$${parseFloat(balanceInUsd).toFixed(8)}`})
                    </p>
                  </div>
                  <div className="d-flex justify-content-between max-130px">
                    <p
                      className="curser-pointer"
                      onClick={() => handleSetAmount(0.25, "true")}
                    >
                      25%
                    </p>
                    <p
                      className="curser-pointer"
                      onClick={() => handleSetAmount(0.5, "true")}
                    >
                      50%
                    </p>
                    <p
                      className="curser-pointer"
                      onClick={() => handleSetAmount(1.0, "true")}
                    >
                      100%
                    </p>
                  </div>
                </div>

                {error && <div className="balance-error">{error && error}</div>}
              </div>
              <div className="swap_section">
                <img
                  src={SWAP_ICON}
                  alt="swap_icon"
                  className="swap_icon"
                  onClick={() => {
                    setRecieveWith(payWith);
                    setPayWith(recieveWith);
                  }}
                />
              </div>
              <div className="d-flex align-items-center">
                <p className="swap_small_title">Receive</p>
                <div data-tooltip="I am tooltip">
                  <img src={QUESTION} alt="question" className="ml-2 hw16" />
                </div>
              </div>
              <div id="btc_dropdown">
                <InputGroup className="my-1 swap_input_group">
                  <DropdownButton
                    title={
                      <div className="d-flex align-items-center">
                        <img src={handleIconValue(recieveWith)} alt="asset" />
                        <p className="btc_title ml-2">{recieveWith}</p>
                      </div>
                    }
                    id="input-group-dropdown-1"
                  >
                    {dropDownCurrency
                      .filter((crr) => crr.name !== payWith)
                      .map((item) => {
                        return (
                          <Dropdown.Item
                            className="pl-0"
                            key={item?.id}
                            onClick={() => {
                              setRecieveWith(item?.name);
                            }}
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
                  <div className="input_btn_box">
                    <Form.Control
                      placeholder="0.00"
                      aria-label="Text input with dropdown button"
                      disabled
                      value={
                        amount && coinValue?.rate
                          ? +amount * +coinValue?.rate
                          : ""
                      }
                    />
                  </div>
                </InputGroup>
                <div className="d-flex justify-content-between ">
                  <div>
                    {/* <p className="swap_small_title">
                      Available BTC : 0.00000000
                    </p> */}
                  </div>
                </div>
              </div>
              <div className="preview_btn">
                <button
                  id="auth_submit_button"
                  className="btn btn-primary w-100 mt-5"
                  onClick={() => setModalShow(true)}
                  disabled={!amount || error}
                >
                  Preview Swap{" "}
                </button>
              </div>
              <div className="faq-learn-section">
                <div className="d-flex border_right_height curser-pointer">
                  <img
                    src={BLUE_QUESTION}
                    alt="blue_question"
                    className="mr-2"
                  />
                  <a
                    id="swap_howto"
                    href="http://borrowland.io/"
                    target="_blank"
                    rel="noreferrer"
                    className="faq_blue_text"
                  >
                    FAQ
                  </a>
                </div>
                <div className="border_middle" />

                <div className="d-flex padding-left-50 curser-pointer">
                  <img src={LEARN_ICON} alt="learn_icon" className="mr-2" />
                  <div className="d-flex flex-column">
                    <a
                      id="swap_howto"
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="faq_blue_text"
                    >
                      Learn how to Boost
                    </a>
                    <p id="fs_10" className="text-center fw_600 red_text">
                      Coming Soon!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SwapModal
        show={modalShow}
        payWithText={payWith}
        receiveWithText={recieveWith}
        payWithValue={amount}
        receiveWithValue={(amount * coinValue?.rate)?.toFixed(8)}
        handleIconValue={handleIconValue}
        closeModal={() => setModalShow(false)}
        modalWidth="modal-width-530"
      />
    </>
  );
};

export default Swap;
