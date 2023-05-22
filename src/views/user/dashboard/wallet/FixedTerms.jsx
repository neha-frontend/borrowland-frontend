import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Accordion,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Tab,
  Tabs,
} from "react-bootstrap";
import { ClipLoader } from "react-spinners";

import {
  DROP_ICON,
  EMPTY_BOX,
  GO_BACK_SVG,
  INFO_ICON,
  INTEREST_PLUS_ICON,
  QUESTION,
} from "assets/images";
import {
  CreateFixedTermCard,
  ErrorMessageCard,
  FixedPreviewTableCard,
  OTPVerificationModal,
  Spinner,
} from "../../../../components";
import { RenderIf } from "utils";
import {
  getActiveFixedTermAction,
  getpreviousTermAction,
  createFixedTermAction,
  getAssetsAction,
  resetCreateFixedTermErrorMsg,
  getPlatformVariableAction,
  getSettingsAction,
} from "store/sagaActions";
import {
  handleSetDropDown,
  dropDownCurrency,
} from "components/reusableFunctions/reusableFuctions";

const FixedTerms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [assetsValue, setAssetsValue] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [autoRenewal, setAutoRenewal] = useState(false);
  const [tenure, setTenure] = useState("");
  const [availableBalance, setAvailableBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [navigateBackTo, setNavigateBackTo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    getActiveFixedTermLoading,
    activeFixedTermsList,
    totalItemsActiveTerms,
    totalPageActiveTerms,
    getPreviousTermLoading,
    previousTermsList,
    totalItemsPreviousTerms,
    totalPagePreviousTerms,
    createFixedTermErrorMsg,
    isAutoRenewal,
  } = useSelector((state) => state.user.fixedTerm);

  const { platformVariableList } = useSelector(
    (state) => state.user.platformVariable
  );

  const { fixedTerms } = useSelector((state) => state.user.setting);

  // active terms pagination states
  const [activeTermsCurrentPage, setActiveTermsCurrentPage] = useState(1);
  const [activetermscount, setActiveTermsCount] = useState(2);
  const [activeTermPaginationConfig, setActiveTermPaginationConfig] = useState(
    {}
  );

  const onActiveTermsPageChange = (page) => {
    setActiveTermsCurrentPage(page);
    dispatch(
      getActiveFixedTermAction({
        startIndex: page,
        itemsPerPage: activetermscount,
      })
    );
  };
  const updateCurrentActiveTermsCountPage = (page) => {
    setActiveTermsCount(page);
  };
  useEffect(() => {
    if (activeFixedTermsList) {
      const paginationConfigTemp = {
        currentPage: activeTermsCurrentPage,
        pageCount: Math.ceil(totalItemsActiveTerms / totalPageActiveTerms),
        count: activetermscount,
        itemCount: totalItemsActiveTerms,
        onPageChange: onActiveTermsPageChange,
        updateCurrentCountPage: updateCurrentActiveTermsCountPage,
      };
      setActiveTermPaginationConfig(paginationConfigTemp);
    }
  }, [activeFixedTermsList]);

  useEffect(() => {
    setAutoRenewal(fixedTerms);
  }, [fixedTerms]);

  // previous terms pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(4);
  const [previousTermsPaginationConfig, setPreviousTermsPaginationConfig] =
    useState({});

  const onPageChange = (page) => {
    setCurrentPage(page);
    dispatch(
      getpreviousTermAction({
        startIndex: page,
        itemsPerPage: count,
      })
    );
  };
  const updateCurrentCountPage = (page) => {
    setCount(page);
  };
  useEffect(() => {
    if (previousTermsList) {
      const paginationConfigTemp = {
        currentPage,
        pageCount: Math.ceil(totalItemsPreviousTerms / totalPagePreviousTerms),
        count,
        itemCount: totalItemsPreviousTerms,
        onPageChange,
        updateCurrentCountPage,
      };
      setPreviousTermsPaginationConfig(paginationConfigTemp);
    }
  }, [previousTermsList]);
  // previous terms pagination ends

  const handleOpenVerificationModal = () => {
    setShowVerificationModal(true);
  };
  const handleCloseVerificationModal = () => {
    setShowVerificationModal(false);
  };

  const getActiveFixedTerms = () => {
    dispatch(
      getActiveFixedTermAction({
        startIndex: 1,
        itemsPerPage: 2,
      })
    );
  };

  const getAllFixedTerms = () => {
    dispatch(
      getActiveFixedTermAction({
        startIndex: 1,
        itemsPerPage: 2,
      })
    );
    dispatch(
      getpreviousTermAction({
        startIndex: 1,
        itemsPerPage: 4,
      })
    );
  };

  const handleCreateTerm = () => {
    dispatch(resetCreateFixedTermErrorMsg());
    setErrorMessage("");
    if (
      (parseFloat(+amount) === parseFloat(0) &&
        parseFloat(+availableBalance.toFixed(8)) === parseFloat(0)) ||
      (+amount !== null &&
        parseFloat(+amount) > parseFloat(+availableBalance.toFixed(8)))
    ) {
      setErrorMessage("Insufficient Balance");
    } else if (parseFloat(+amount) <= parseFloat(0)) {
      setErrorMessage("Please enter amount greater than 0");
    } else {
      setIsLoading(true);
      dispatch(
        createFixedTermAction({
          data: {
            autoRenewal: autoRenewal,
            interestRate: 2,
            amount: parseFloat(amount),
            tenure: parseFloat(tenure),
            coin: assetsValue.toLocaleLowerCase(),
          },
          handleOpenVerificationModal,
          setIsLoading,
        })
      );
    }
  };

  const handleResetForm = () => {
    setTenure("");
    setAutoRenewal("");
    setAmount("");
  };

  useEffect(() => {
    if (isAutoRenewal) {
      dispatch(
        getActiveFixedTermAction({
          startIndex: 1,
          itemsPerPage: 2,
        })
      );
    }
  }, [isAutoRenewal]);

  useEffect(() => {
    getAllFixedTerms();
    dispatch(getSettingsAction());
    dispatch(getAssetsAction());
    dispatch(resetCreateFixedTermErrorMsg());
  }, []);

  useEffect(() => {
    if (location?.pathname.includes("/wallet/ETH/fixed-terms")) {
      setNavigateBackTo("/wallet/ETH");
      setAssetsValue("ETH");
    } else if (location?.pathname.includes("/wallet/BTC/fixed-terms")) {
      setNavigateBackTo("/wallet/BTC");
      setAssetsValue("BTC");
    } else if (location?.pathname.includes("/wallet/USDC/fixed-terms")) {
      setNavigateBackTo("/wallet/USDC");
      setAssetsValue("USDC");
    } else if (location?.pathname.includes("/wallet/USDT/fixed-terms")) {
      setNavigateBackTo("/wallet/USDT");
      setAssetsValue("USDT");
    }
  }, []);

  // called when walletDetails is available
  useEffect(() => {
    setAvailableBalance(location?.state?.walletDetails?.savingBalance);
  }, [location?.state?.walletDetails]);

  // called when assetValue is changed from dropdown
  useEffect(() => {
    setAmount("");
    setErrorMessage("");
    dispatch(resetCreateFixedTermErrorMsg());
    dispatch(
      getPlatformVariableAction({
        name: `${assetsValue} Fixed-Term Rate`,
      })
    );
  }, [assetsValue]);

  return (
    <div>
      <Tabs
        defaultActiveKey="wallet"
        id="fixed_terms_tab"
        className="wallet_tabs_container wallet_fixed_terms_tabs_container"
      >
        <Tab eventKey="market" title="Market">
          <div className="coming_soon_bg">
            <div className="text-center coming_soon_txt">Coming Soon...</div>
          </div>
        </Tab>
        <Tab eventKey="wallet" title="Wallet">
          <div className="common_bg">
            <div
              id="fixed_terms_navigation"
              className="d-flex align-items-center pb-4 pt-4"
            >
              <img
                src={GO_BACK_SVG}
                alt="back"
                className="h24 curser-pointer"
                onClick={() => navigate(navigateBackTo)}
              />
              <p className="text">
                <Link to={navigateBackTo} className="text mx-sm-2 mx-1">
                  Back
                </Link>
                /
              </p>
              <p className="text">
                <Link to={navigateBackTo} className="text mx-sm-2 mx-1">
                  Manage Token Wallets
                </Link>
              </p>
              <p id="bold_text" className="text curser-pointer">
                /<b className="ml-2">Fixed Terms</b>
              </p>
            </div>

            <div className="row">
              <div className="col-lg-8 col-12">
                <div className="saving_container px-0 fixed_container h-100">
                  <p className="fixed_terms_title">Fixed Terms</p>
                  <Tabs
                    defaultActiveKey="active"
                    id="fixed_terms_sub_tab"
                    className="wallet_tabs_container pl-0 fixed_tabs_container"
                  >
                    <Tab
                      eventKey="active"
                      title={[
                        "Active Terms",
                        <span
                          key={""}
                          className={
                            activeFixedTermsList.length < 0
                              ? "d-none"
                              : "active_terms_number"
                          }
                        >
                          {totalItemsActiveTerms}
                        </span>,
                      ]}
                      className="h-100 p-4"
                    >
                      <RenderIf isTrue={getActiveFixedTermLoading}>
                        <Spinner className="m-20-auto" id="" />
                      </RenderIf>
                      <RenderIf
                        isTrue={
                          activeFixedTermsList.length === 0 &&
                          !getActiveFixedTermLoading
                        }
                      >
                        <div className="no_active_term h-100 pb-lg-0 pt-lg-0 pb-5 pt-4 d-flex flex-column justify-content-center align-items-center">
                          <img src={EMPTY_BOX} alt="empty" />
                          <p className="no_active_term_text">No active terms</p>
                        </div>
                      </RenderIf>

                      <RenderIf
                        isTrue={
                          totalItemsActiveTerms > 0 &&
                          !getActiveFixedTermLoading
                        }
                      >
                        <CreateFixedTermCard
                          activeFixedTermsList={activeFixedTermsList}
                          activeTermPaginationConfig={
                            activeTermPaginationConfig
                          }
                          getAllFixedTerms={getAllFixedTerms}
                        />
                      </RenderIf>
                    </Tab>
                    <Tab
                      eventKey="previous"
                      title="Previous Terms"
                      className="h-100"
                    >
                      <RenderIf isTrue={getPreviousTermLoading}>
                        <Spinner className="m-20-auto" id="" />
                      </RenderIf>
                      <RenderIf
                        isTrue={
                          !getPreviousTermLoading &&
                          totalItemsPreviousTerms <= 0
                        }
                      >
                        <div className="no_active_term h-100 pb-lg-0 pt-lg-0 pb-5 pt-4 d-flex flex-column justify-content-center align-items-center">
                          <img src={EMPTY_BOX} alt="empty" />
                          <p className="no_active_term_text">
                            No Previous terms
                          </p>
                        </div>
                      </RenderIf>

                      <RenderIf
                        isTrue={
                          !getPreviousTermLoading && totalItemsPreviousTerms > 0
                        }
                      >
                        <FixedPreviewTableCard
                          previousTermsList={previousTermsList}
                          previousTermsPaginationConfig={
                            previousTermsPaginationConfig
                          }
                        />
                      </RenderIf>
                    </Tab>
                  </Tabs>
                </div>
              </div>

              {/*  Create Fixed Term */}
              <div className="col-lg-4 col-12 mt-lg-0 mt-4">
                <div className="saving_container px-0 fixed_container mb-0">
                  <div className="border_bottom">
                    <p className="fixed_terms_title fw_700 create_fixed_terms_title pb-3">
                      Create Fixed Term
                    </p>
                  </div>
                  <div className="create_fixed_terms_container">
                    <p className="create_fixed_term_title">
                      Fixed Term
                      <span data-tooltip="I am tooltip">
                        <img
                          src={QUESTION}
                          alt="question"
                          width="16"
                          height="16"
                        />
                      </span>
                    </p>
                    {/* create term - select month */}
                    <div className="d-flex justify-content-between">
                      {platformVariableList !== null &&
                        platformVariableList?.values?.length > 0 &&
                        platformVariableList?.values?.map((item) => (
                          <div key={item?._id}>
                            <label
                              className={
                                parseFloat(tenure) === item?.tenure
                                  ? "w-100 pt-4 checked_radio"
                                  : "w-100 pt-4"
                              }
                            >
                              <div className="d-flex">
                                <div className="position-relative width_30 custom_radio">
                                  <input
                                    type="radio"
                                    value={item?.tenure}
                                    name="fixed_term_radio"
                                    checked={
                                      parseFloat(tenure) === item?.tenure
                                    }
                                    onChange={(e) => {
                                      setTenure(e.target.value);
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                </div>
                                <div className="d-flex flex-column">
                                  <p className="fixed_radio_title">
                                    {item?.tenure}{" "}
                                    {item?.tenure <= 1 ? "Month" : "Months"}
                                  </p>
                                  <p className="fixed_radio_text">
                                    Bonus +{item?.rate}%
                                  </p>
                                </div>
                              </div>
                            </label>
                          </div>
                        ))}
                    </div>
                    {/* amount */}
                    <p className="fixed_term_small_title mt-3 fw_700">Amount</p>
                    <div id="btc_dropdown">
                      <InputGroup className="my-1 swap_input_group">
                        <DropdownButton
                          title={
                            <div className="d-flex align-items-center">
                              <img
                                src={handleSetDropDown(assetsValue)}
                                alt="asset"
                              />
                              <p className="btc_title ml-2">{assetsValue}</p>
                            </div>
                          }
                          id="input-group-dropdown-1"
                          disabled
                        >
                          {dropDownCurrency.map((item) => {
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
                                  <p className="drop_title_coin">
                                    {item?.name}
                                  </p>
                                </div>
                              </Dropdown.Item>
                            );
                          })}
                        </DropdownButton>
                        <div className="input_btn_box">
                          <Form.Control
                            placeholder="0.00"
                            aria-label="Text input with dropdown button"
                            value={amount}
                            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                            onChange={(e) => {
                              const newValue = e.target.value.replace(
                                /[^0-9.]/g,
                                ""
                              );
                              setAmount(newValue);
                            }}
                          />
                          <div className="value_titles vertically_center curser-pointer">
                            <p
                              className="value_btc"
                              onClick={() => {
                                setAmount(
                                  parseFloat(availableBalance).toFixed(8)
                                );
                              }}
                            >
                              MAX
                            </p>
                          </div>
                        </div>
                      </InputGroup>
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="fixed_term_small_title fw_700">
                            Available {assetsValue} :{" "}
                            {parseFloat(availableBalance).toFixed(8)}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* auto renewal */}
                    <div className="fixed_checkbox_container">
                      <label
                        htmlFor="fixedTerm"
                        className={`${autoRenewal ? "fw_700" : ""} checkbox`}
                      >
                        <input
                          type="checkbox"
                          name="fixedTerm"
                          id="fixedTerm"
                          className="checkbox__input"
                          checked={autoRenewal}
                          onChange={(e) => setAutoRenewal(e.target.checked)}
                        />
                        <div className="checkbox__box"></div>
                        Automatic Renewal
                      </label>
                    </div>

                    {/* error message */}
                    <RenderIf isTrue={errorMessage || createFixedTermErrorMsg}>
                      <ErrorMessageCard
                        errorMsg={errorMessage || createFixedTermErrorMsg}
                      />
                    </RenderIf>

                    <button
                      className="btn btn-primary w-100"
                      onClick={handleCreateTerm}
                      disabled={!assetsValue || !amount || !tenure}
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
                        <>
                          <span className="create_term_icon">
                            <img src={INTEREST_PLUS_ICON} alt="plus" />
                          </span>
                          Create Term
                        </>
                      )}
                    </button>
                    {/* Important Notes */}
                    <Accordion className="mt-3 fixed_terms_important_terms_accordion">
                      <Accordion.Item eventKey="0">
                        <div className="d-flex important_terms_button">
                          <p className="d-flex">
                            <img src={INFO_ICON} className="mr-1" alt="info" />
                            Important Notes
                          </p>
                          <Accordion.Header className="mb-0">
                            <img src={DROP_ICON} alt="drop_arrow" />
                          </Accordion.Header>
                        </div>

                        <Accordion.Body>
                          Amet minim mollit non deserunt ullamco est sit aliqua
                          dolor do amet sint. Velit officia consequat duis enim
                          velit mollit. Exercitation veniam consequat sunt
                          nostrud amet.
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>

      <OTPVerificationModal
        showModal={showVerificationModal}
        closeModal={handleCloseVerificationModal}
        type="CREATE_TERM"
        handleActiveTerms={getActiveFixedTerms}
        handleResetCreateTerm={handleResetForm}
      />
    </div>
  );
};

export default FixedTerms;
