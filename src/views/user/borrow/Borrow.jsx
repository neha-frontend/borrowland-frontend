import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";

import {
  borrowLoanAction,
  resetBorrowLoanErrorMsg,
  getPlatformVariableAction,
  compareCoinAction,
  getPlatformFeesAction,
  getAssetsAction,
  getLTVAction,
} from "store/sagaActions";
import { DANGER_ICON_FILLED } from "../../../assets/images";
import {
  BorrowFunds,
  BorrowFundsPreview,
  OTPVerificationModal,
} from "../../../components";
import {
  handleSetDropDown,
  dropDownCurrency,
  tenureValue,
  platformFeesValue,
  payableAmountValue,
  LTVvalue,
  // collateralAmountInToken,
  // countLoanAmountInUSD,
  countCollateralAmount,
  countLoanAmountInTokenCopy,
} from "components/reusableFunctions/reusableFuctions";

import "./Borrow.css";

const Borrow = () => {
  const dispatch = useDispatch();

  // useStates
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showBorrowPreviewModal, setShowBorrowPreviewModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [error, setError] = useState("");
  // collateral
  const [collateralType, setCollateralType] = useState("BTC");
  const [collateralAmountInUSD, setCollateralAmountInUSD] = useState("");
  // const [marketPriceOfCollateral, setMarketPriceOfCollateral] = useState('')
  const [collateralAmountInTokenValue, setCollateralAmountInTokenValue] =
    useState("");

  // loan
  const [loanType, setLoanType] = useState("ETH");
  const [loanAmountInUSD, setLoanAmountinUSD] = useState("");
  const [loanAmountinTokenValue, setLoanAmountinTokenValue] = useState("");
  const [marketPriceOfLoanType, setMarketPriceOfLoanType] = useState("");

  const [tenureType, setTenureType] = useState("");
  const [LTVtype, setLTVType] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [platFormFeeValue, setPlatFormFeeVaue] = useState("");
  const [LTVListValue, setLTVListValue] = useState(null);

  // useSelectors
  const { platformFees, platformVariableList, LTVvalues, getLTVLoading } =
    useSelector((state) => state.user.platformVariable);
  const { assetsList } = useSelector((state) => state.user.assets);
  const { coinValue } = useSelector((state) => state.user.compareCoin);

  const handlePreviewClick = () => {
    setShowBorrowModal(false);
    setShowBorrowPreviewModal(true);
  };
  const handleCloseBorrowPreviewModal = () => {
    setShowBorrowPreviewModal(false);
  };

  const handleOpenVerificationModal = () => {
    setShowVerificationModal(true);
  };

  const handleCloseVerificationModal = () => {
    setShowVerificationModal(false);
  };

  const handleBorrowContinueButtonClick = () => {
    dispatch(resetBorrowLoanErrorMsg());
    dispatch(
      borrowLoanAction({
        data: {
          loan: {
            amount: loanAmountinTokenValue,
            type: loanType.toLowerCase(),
          },
          collateral: {
            type: collateralType.toLowerCase(),
            amount: collateralAmountInTokenValue,
          },
          tenure: tenureValue(tenureType),
          interestRate: interestRate,
          platformFee: platformFeesValue(
            loanAmountinTokenValue,
            platFormFeeValue
          ),
          totalAmount: parseFloat(
            payableAmountValue(
              loanAmountinTokenValue,
              interestRate,
              platFormFeeValue,
              tenureValue(tenureType)
            )
          ),
          ltvMargin: LTVvalue(LTVtype),
        },
        // notify,
        handleCloseBorrowPreviewModal,
        handleOpenVerificationModal,
      })
    );
  };
  const handleGoBackClick = () => {
    setShowBorrowPreviewModal(false);
    setShowBorrowModal(true);
  };
  const initialValues = {
    loan: {
      amount: parseFloat(loanAmountinTokenValue),
      type: loanType,
    },
    collateral: {
      type: collateralType,
      amount: parseFloat(collateralAmountInTokenValue),
    },
    tenure: tenureValue(tenureType),
    interestRate: interestRate,
    platformFee: platFormFeeValue*loanAmountinTokenValue/100,
    ltvMargin: LTVvalue(LTVtype),
  };
  
  const handleContinueButton = () => {
    setShowBorrowModal(true);
  };

  useEffect(() => {
    if (LTVvalues !== null) {
      const ltvList = LTVvalues?.filter((item) => item?.values);
      if (ltvList) {
        const ltvRate = ltvList?.filter((item) => item?.values[0]?.rate);
        if (ltvRate) {
          setLTVListValue(ltvRate);
        }
      }
    }
  }, [LTVvalues]);

  useEffect(() => {
    //
  }, [LTVListValue]);

  // step 1 - get platform fees
  useEffect(() => {
    dispatch(getAssetsAction());
    dispatch(
      getPlatformFeesAction({
        name: "Platform Fee",
      })
    );
    dispatch(getLTVAction({ name: "ltv" }));
  }, []);

  // step 2 - set in setPlatFormFeeVaue on having platformFees
  useEffect(() => {
    if (platformFees && platformFees[0]?.rate) {
      setPlatFormFeeVaue(platformFees[0]?.rate);
    }
  }, [platformFees]);

  // step 3 - on having loan type, get tenure & interest rate
  useEffect(() => {
    if (loanType === "ETH") {
      setCollateralType("BTC");
    } else if (loanType === "BTC") {
      setCollateralType("ETH");
    }
    setInterestRate("");
    const name = `${loanType} Loan Rate`;
    if (loanType) {
      dispatch(getPlatformVariableAction({ name: name }));
    }
  }, [loanType]);

  // step 4 - on having platformVariableList, set Interest rate & tenure
  useEffect(() => {
    if (platformVariableList !== null) {
      const v = platformVariableList?.values?.filter(
        (item) => item?.tenure === tenureValue(tenureType)
      );
      if (v) {
        setInterestRate(v[0]?.rate);
      }
    }
  }, [platformVariableList, tenureType]);

  // step 5 - get market price of collateral type
  // useEffect(() => {
  // 	if (assetsList && collateralType) {
  // 		const v = assetsList?.filter((item) => {
  // 			return item?.abbr === collateralType
  // 		})
  // 		if (v) setMarketPriceOfCollateral(v[0]?.marketPlaceValue)
  // 	}
  // }, [assetsList, collateralType])

  // step 6 - on having market price & collateralAmountInUSD, convert into token
  useEffect(() => {
    if (coinValue && loanAmountInUSD)
      // var value = (+loanAmountInUSD * (LTVtype + 100)) / +coinValue?.rate
      var temp = (+loanAmountInUSD / LTVtype) * 100;
    var value = temp * +coinValue?.rate;
    // var value = +loanAmountInUSD * +coinValue?.rate * (LTVtype + 100)
    setCollateralAmountInTokenValue(value);
  }, [coinValue, loanAmountInUSD]);
  // step 7 - set loan type, on having LTV, collateralAmountInUSD, loanType
  useEffect(() => {
    if (LTVtype && loanType && loanAmountInUSD && collateralType) {
      dispatch(
        compareCoinAction({
          data: {
            from: "USD",
            to: collateralType,
          },
        })
      );
    }
  }, [LTVtype, loanType, loanAmountInUSD, collateralType]);

  // step 8 - set loan amount in USD
  useEffect(() => {
    if (loanAmountInUSD && LTVtype) {
      setCollateralAmountInUSD(
        countCollateralAmount(+loanAmountInUSD, LTVvalue(LTVtype))
      );
    } else {
      setCollateralAmountInUSD("-");
    }
    if (+loanAmountInUSD <= 99.99 && loanAmountInUSD != "") {
      setError("Loan Amount should be greater than or equal to $ 100.");
    } else {
      setError("");
    }
  }, [loanAmountInUSD, LTVtype]);

  // step 9 - set loan amount in token, on having collateralAmount, LTV, collateral Type
  useEffect(() => {
    setLoanAmountinTokenValue(
      countLoanAmountInTokenCopy(
        +loanAmountInUSD,
        LTVvalue(LTVtype),
        marketPriceOfLoanType
      )
    );
  }, [LTVtype, loanAmountInUSD, marketPriceOfLoanType]);

  // step 10 - get market price of loan type
  useEffect(() => {
    if (assetsList && loanType) {
      const v = assetsList?.filter((item) => {
        return item?.abbr === loanType;
      });

      if (v) setMarketPriceOfLoanType(v[0]?.marketPlaceValue);
    }
  }, [assetsList, loanType]);

  return (
    <>
      <div className="borrow_wrapper h100vh">
        <div className="borrow-container">
          <div className="borrow_heading">Borrow Loans</div>
          <div className="borrow_sub_heading text-justify">
            We&apos;ve made it simple to get a loan using your crypto assets as
            collateral - no credit check required. Just tell us how much
            you&apos;d like to borrow and what type of collateral you have.
          </div>
          <div className="borrow_loan_wrapper">
            {/* LTV Type */}
            <div className="borrow_load_content">
              <p className="lable_loan">LTV Type *</p>
              <div id="borrow_dropdown">
                <DropdownButton
                  title={
                    <p className={LTVtype ? "borrow_value" : "reason_title"}>
                      {LTVtype ? `${LTVtype} %` : "Select"}
                    </p>
                  }
                  displayName="Select"
                  variant="success"
                  id="borrow_dropdown_button"
                  onSelect={(value) => {
                    console.log("Value", value);
                    setLTVType(value);
                  }}
                >
                  {!getLTVLoading &&
                    LTVListValue !== null &&
                    LTVListValue?.map((item) => {
                      return (
                        <Dropdown.Item eventKey={item?.values[0]?.rate} key="1">
                          {item?.values[0]?.rate} %
                        </Dropdown.Item>
                      );
                    })}
                </DropdownButton>
              </div>
            </div>

            {/* loan type */}
            <div className="borrow_load_content">
              <p className="lable_loan">Loan Type*</p>
              <div id="borrow_dropdown">
                <DropdownButton
                  title={
                    <div className="d-flex align-items-center">
                      <img src={handleSetDropDown(loanType)} />{" "}
                      <p className="btc_title">{loanType}</p>
                    </div>
                  }
                  displayName="Select"
                  variant="success"
                  id="borrow_dropdown_button"
                >
                  {dropDownCurrency.map((item) => {
                    return (
                      <Dropdown.Item
                        className="pl-0"
                        key={item?.id}
                        onClick={() => {
                          setLoanType(item?.name);
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
              </div>
            </div>

            {/* loan amount */}
            <div className="borrow_load_content">
              <p className="lable_loan">Loan Amount (USD)*</p>
              <input
                className="borrow_input borrow_value"
                value={loanAmountInUSD}
                contentEditable={true}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/[^0-9.]/g, "");
                  setLoanAmountinUSD(newValue);
                }}
                min={100}
                onFocus={(e) =>
                  e.target.addEventListener(
                    "wheel",
                    function (e) {
                      e.preventDefault();
                    },
                    { passive: false }
                  )
                }
              />
            </div>

            {/* Collateral Type */}
            <div className="borrow_load_content">
              <p className="lable_loan">Collateral Type*</p>
              <div id="borrow_dropdown">
                <DropdownButton
                  title={
                    <div className="d-flex align-items-center">
                      <img
                        src={handleSetDropDown(
                          loanType == "ETH"
                            ? "BTC"
                            : loanType == "BTC"
                            ? "ETH"
                            : collateralType
                        )}
                      />{" "}
                      <p className="btc_title">
                        {loanType == "ETH"
                          ? "BTC"
                          : loanType == "BTC"
                          ? "ETH"
                          : collateralType}
                      </p>
                    </div>
                  }
                  displayName="Select"
                  variant="success"
                  id="borrow_dropdown_button"
                >
                  {dropDownCurrency
                    .filter((crr) => crr.name !== "USDC" && crr.name !== "USDT")
                    .map((item) => {
                      return (
                        <Dropdown.Item
                          className="pl-0"
                          key={item?.id}
                          onClick={() => {
                            setCollateralType(item?.name);
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
              </div>
            </div>

            {/* Collateral Amount */}
            <div className="borrow_load_content">
              <p className="lable_loan">
                Collateral Tokens (
                {loanType == "ETH"
                  ? "BTC"
                  : loanType == "BTC"
                  ? "ETH"
                  : collateralType}
                )
              </p>
              <input
                type="number"
                className="borrow_input borrow_value bg_blue_input"
                value={collateralAmountInTokenValue}
                disabled
              />
            </div>

            {/* tenure */}
            <div className="borrow_load_content">
              <p className="lable_loan">Tenure*</p>
              <div id="borrow_dropdown">
                <DropdownButton
                  title={
                    <p className={tenureType ? "borrow_value" : "reason_title"}>
                      {tenureType ? tenureType : "Select"}
                    </p>
                  }
                  displayName="Select"
                  variant="success"
                  id="borrow_dropdown_button"
                  onSelect={(value) => setTenureType(value)}
                >
                  {platformVariableList &&
                    platformVariableList !== null &&
                    platformVariableList?.values?.map((item) => {
                      return (
                        <>
                          <Dropdown.Item eventKey={`${item?.tenure} Months`}>
                            {`${item?.tenure} Months`}
                          </Dropdown.Item>
                        </>
                      );
                    })}
                </DropdownButton>
              </div>
            </div>

            {/* Interest rate */}
            <div className="borrow_load_content">
              <p className="lable_loan">Interest Rate</p>
              <input
                className="borrow_input bg_blue_input borrow_value"
                value={interestRate ? `${interestRate}%` : "-"}
                disabled
              />
            </div>

            {/* platform fees */}
            <div className="borrow_load_content">
              <p className="lable_loan">Platform Fees</p>
              <input
                className="borrow_input bg_blue_input borrow_value"
                value={platFormFeeValue ? `${platFormFeeValue}%` : "-"}
                disabled
              />
            </div>
          </div>

          {/* warning */}
          <div className="d-flex align-items-center warning_space">
            <img src={DANGER_ICON_FILLED} alt="warning" className="mr-2" />
            <p className="warning_text">
              Make sure you have enough collateral in your Borrowland account
              before you sign this offer.
            </p>
          </div>
          {/* continue button */}
          <div className="error text-center mb-4">{error && error}</div>
          <div className="borrow_btn">
            <button
              className="btn btn-primary"
              onClick={handleContinueButton}
              disabled={
                !loanAmountInUSD ||
                !loanType ||
                !collateralType ||
                !collateralAmountInUSD ||
                !tenureType ||
                !LTVtype ||
                error
              }
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <BorrowFunds
        show={showBorrowModal}
        handlePreviewClick={handlePreviewClick}
        onHide={() => setShowBorrowModal(false)}
        modalWidth="modal-width-760"
        borrowData={initialValues}
      />
      <BorrowFundsPreview
        show={showBorrowPreviewModal}
        handleGoBackClick={handleGoBackClick}
        onHide={() => setShowBorrowPreviewModal(false)}
        handlePreviewClick={handleBorrowContinueButtonClick}
        modalWidth="modal-width-830 borrow_funds_preview_modal pl-0"
        borrowData={initialValues}
      />
      {/* <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      /> */}
      <OTPVerificationModal
        showModal={showVerificationModal}
        closeModal={handleCloseVerificationModal}
        type="BORROW"
      />
    </>
  );
};

export default Borrow;
