import { Form, Formik, Field } from "formik";
import { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  getTransactionHistoryAction,
  resetGetTransactionHistoryList,
} from "store/sagaActions";
import { RenderIf } from "utils";
import { CLOSE, FILTER_ICON } from "../../../assets/images";
import {
  CustomDateInputLog,
  PrimaryButton,
  Spinner,
  TransactionTableCard,
} from "../../../components";
import {
  dropDownCurrency,
  handleSetDropDown,
  formatDate,
} from "components/reusableFunctions/reusableFuctions";
import generateURL from "utils/generateURL";
import NoDataFound from "components/card/NoDataFound";

import "./Transactions.css";

const Transactions = () => {
  const [transactionType, setTransactionType] = useState("");
  const [assetsValue, setAssetsValue] = useState("");
  const [latestStartDate, setStartDate] = useState("");
  const [latestEndDate, setEndDate] = useState("");
  const [tempValue, setTempValue] = useState();

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(6);
  const [paginationConfig, setPaginationConfig] = useState({});

  const dispatch = useDispatch();

  const {
    transactionHistoryList,
    isLoading: transactionListLoading,
    totalItems,
    totalPage,
  } = useSelector((state) => state.user.transaction);

  const onPageChange = (page) => {
    setCurrentPage(page);
    dispatch(
      getTransactionHistoryAction({
        startIndex: page,
        itemsPerPage: count,
        URL: tempValue,
      })
    );
    // setFilter(prev => ({ ...prev, startIndex: (page*10)+1 }));
  };

  const updateCurrentCountPage = (page) => {
    setCount(page);
  };
  useEffect(() => {
    if (transactionHistoryList) {
      const paginationConfigTemp = {
        currentPage,
        pageCount: Math.ceil(totalItems / totalPage),
        count,
        itemCount: totalItems,
        onPageChange,
        updateCurrentCountPage,
      };
      setPaginationConfig(paginationConfigTemp);
    }
  }, [transactionHistoryList]);
  const [isFilterShown, setFilterShown] = useState(false);

  const toggleFilter = () => {
    setFilterShown((current) => !current);
  };
  const createInitialValue = {
    startDate: "",
    endDate: "",
    txnType: transactionType,
    token: assetsValue,
    sortBy: "time",
    sortValue: -1,
  };

  const handleClearButton = () => {
    window.location.reload();
  };

  const handleSubmit = (values) => {
    setCurrentPage(1);
    setCount(6);
    const temp = Object.fromEntries(
      // eslint-disable-next-line no-unused-vars
      Object.entries(values).filter(([_, v]) => v !== "")
    );
    delete temp.startDate;
    delete temp.endDate;
    let param = {
      URL: generateURL({
        sortBy: "time",
        ...temp,
        startDate:
          values.startDate !== ""
            ? formatDate(values.startDate, "YYYY-MM-DD")
            : latestStartDate,
        endDate:
          values.endDate !== ""
            ? formatDate(values.endDate, "YYYY-MM-DD")
            : latestEndDate,
      }),
    };

    setTempValue(param.URL);
    dispatch(
      getTransactionHistoryAction({
        startIndex: 1,
        itemsPerPage: 6,
        URL: param.URL,
      })
    );
    // setFilterShown((current) => !current);
  };

  const callTransactionAPI = () => {
    setTimeout(() => {
      dispatch(
        getTransactionHistoryAction({
          startIndex: 1,
          itemsPerPage: 6,
          URL: generateURL({
            sortBy: "time",
            sortValue: -1,
          }),
        })
      );
    }, 300000);
  };
  useEffect(() => {
    dispatch(resetGetTransactionHistoryList());
    dispatch(
      getTransactionHistoryAction({
        startIndex: 1,
        itemsPerPage: 6,
        URL: generateURL({
          sortBy: "time",
          sortValue: -1,
        }),
      })
    );
    callTransactionAPI();
  }, []);
  return (
    <div className="background_color">
      <div className="container  pt-5 pb-5">
        <div className="row">
          <div
            className={`col-lg-4 ${
              isFilterShown ? "col-lg-4" : "col-lg-4 d-lg-block d-none"
            }`}
          >
            <div className="border_box transaction_box p-4">
              <img
                src={CLOSE}
                alt="close"
                className="d-lg-none d-block ml-auto mb-3 filter_icon"
                onClick={toggleFilter}
              />

              <Formik
                initialValues={createInitialValue}
                onSubmit={(values) => {
                  handleSubmit(values);
                  // toggleFilter();
                }}
              >
                {({ values, setFieldValue, resetForm }) => (
                  <Form id="transaction_filter">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="title">Filter</p>
                      <p
                        className="clear_filter curser-pointer"
                        onClick={() => handleClearButton(resetForm)}
                      >
                        Clear
                      </p>
                    </div>
                    {/* start date */}
                    <Field
                      component={CustomDateInputLog}
                      name="startDate"
                      value={
                        (values.startDate && new Date(values.startDate)) || ""
                      }
                      className="date_input_field mt_20 mb-0"
                      showMonth={true}
                      showYear={true}
                      label="Start Date"
                      placeholder="DD/MM/YYYY"
                      dateFormat="dd/MM/yyyy"
                      showCalenderIcon
                      calendarClassName="calendar_icon"
                      minDate=""
                      maxDate={new Date()}
                      onchangeDateHandle={() => {
                        setFieldValue("endDate", "");
                        setFieldValue("sortValue", -1);
                      }}
                    />
                    {/* end date */}
                    <Field
                      component={CustomDateInputLog}
                      name="endDate"
                      value={(values.endDate && new Date(values.endDate)) || ""}
                      className="date_input_field mt_20 mb-0"
                      showMonth={true}
                      showYear={true}
                      label="End Date"
                      placeholder="DD/MM/YYYY"
                      dateFormat="dd/MM/yyyy"
                      showCalenderIcon
                      calendarClassName="calendar_icon"
                      disabled={values.startDate === ""}
                      minDate={values.startDate}
                      maxDate={new Date()}
                      required={values.startDate ? true : false}
                    />
                    {/* transaction type */}
                    <div className="transaction_filter_dropdown filter_category_container">
                      <div className="filter_label">
                        Select Transaction Type
                      </div>
                      <DropdownButton
                        title={
                          <p
                            className={`${
                              transactionType
                                ? "dropdown_value"
                                : "reason_title"
                            }`}
                          >
                            {transactionType
                              ? transactionType.replaceAll(
                                  "_",
                                  " "
                                  // eslint-disable-next-line no-mixed-spaces-and-tabs
                                )
                              : "Select"}
                          </p>
                        }
                        displayName="Select"
                        id="transaction_filter_dropdown_button"
                        onSelect={(e) => {
                          setTransactionType(e);
                          setFieldValue("txnType", e);
                        }}
                      >
                        {/* possible dropdown values & corresponding event key value
                          deposit - Deposit
                          withdraw  - Withdraw
                          Swap  - Swap
                          Loan  - Loan
                          Interest - Interest
                          Gift  - Gift
                          Loan Repayement - Loan_Repayment
                          Fixed_term  - Fixed_Term
                          Cancel_fixed_term - Cancel_Fixed_Term
                          End Fixed Term - End_Fixed_Term
                          Collateral - Collateral
                          Collateral Return - Collateral_Return
                          Fixed Term Interest - Fixed_Term_Interest
                           */}

                        {/*  Note - DO NOT CHANGE THE VALUE OF "EVENT_KEY" BELOW, 
                            IT'S SET AS PER API RESPONSE REQUIRED   */}
                        <Dropdown.Item eventKey="Deposit">
                          Deposit
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Withdraw">
                          Withdraw
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Swap">Swap</Dropdown.Item>
                        <Dropdown.Item eventKey="Loan">Loan</Dropdown.Item>
                        <Dropdown.Item eventKey="Interest">
                          Interest
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Gift">Gift</Dropdown.Item>
                        <Dropdown.Item eventKey="Loan_Repayment">
                          Loan Repayement
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Fixed_Term">
                          Fixed-Term
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Cancel_Fixed_Term">
                          Cancel Fixed terms
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="End_Fixed_Term">
                          End Fixed Term
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Collateral">
                          Collateral
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Collateral_Return">
                          Collateral Return
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Fixed_Term_Interest">
                          Fixed Term Interest
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Daily_Interest">
                          Daily Interest
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Auto Liquidate">
                          Auto Liquidate
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>

                    {/* Assets dropdown */}
                    <div className="transaction_filter_dropdown filter_category_container">
                      <div className="filter_label">Assets</div>
                      <DropdownButton
                        title={
                          <div className="d-flex align-items-center">
                            <RenderIf isTrue={assetsValue}>
                              <img src={handleSetDropDown(assetsValue)} />
                            </RenderIf>

                            <p
                              className={`${
                                assetsValue ? "btc_title" : "reason_title"
                              }`}
                            >
                              {assetsValue ? assetsValue : "Select"}
                            </p>
                          </div>
                        }
                        displayName="Select"
                        id="transaction_filter_dropdown_button"
                      >
                        {dropDownCurrency.map((item) => {
                          return (
                            <Dropdown.Item
                              className="pl-0"
                              key={item?.id}
                              onClick={() => {
                                setAssetsValue(item?.name);
                                setFieldValue("token", item?.name);
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

                    {/* sort by */}
                    <div className="filter_category_container">
                      <div className="filter_label sort_filter_label">
                        Sort By
                      </div>
                      <div className="form-check d-flex align-items-center mb-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="newToOld"
                          name="sortValue"
                          value={-1}
                          onClick={(e) => {
                            setFieldValue("sortValue", e.target.value);
                          }}
                          defaultChecked
                        />
                        <label
                          className="transaction-filter-checkbox-label"
                          htmlFor="newToOld"
                        >
                          Newest to Oldest
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center mb-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="oldToNew"
                          name="sortValue"
                          value={1}
                          onClick={(e) => {
                            setFieldValue("sortValue", e.target.value);
                          }}
                        />
                        <label
                          className="transaction-filter-checkbox-label"
                          htmlFor="oldToNew"
                        >
                          Oldest to Newest
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center mb-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="lastThreeMonths"
                          name="sortValue"
                          value="3-months"
                          onClick={() => {
                            setFieldValue("sortValue", -1);
                            setFieldValue("startDate", "");
                            setFieldValue("endDate", "");
                            setStartDate(
                              moment().subtract(3, "month").format("YYYY-MM-DD")
                            );
                            setEndDate(moment(new Date()).format("YYYY-MM-DD"));
                          }}
                          // onClick={(e) => {
                          // setFieldValue("sortValue", e.target.value);
                          // }}
                        />
                        <label
                          className="transaction-filter-checkbox-label"
                          htmlFor="lastThreeMonths"
                        >
                          Last 3 months
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center mb-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="lastSixMonths"
                          value="6-months"
                          name="sortValue"
                          onClick={() => {
                            setFieldValue("sortValue", -1);
                            setFieldValue("startDate", "");
                            setFieldValue("endDate", "");
                            setStartDate(
                              moment().subtract(6, "month").format("YYYY-MM-DD")
                            );
                            setEndDate(moment(new Date()).format("YYYY-MM-DD"));
                          }}
                        />
                        <label
                          className="transaction-filter-checkbox-label"
                          htmlFor="lastSixMonths"
                        >
                          Last 6 months
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center mb-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="lastOneYear"
                          name="sortValue"
                          value="1-year"
                          onClick={() => {
                            setFieldValue("sortValue", -1);
                            setFieldValue("startDate", "");
                            setFieldValue("endDate", "");
                            setStartDate(
                              moment()
                                .subtract(12, "month")
                                .format("YYYY-MM-DD")
                            );
                            setEndDate(moment(new Date()).format("YYYY-MM-DD"));
                          }}
                          // onClick={(e) => {
                          // setFieldValue("sortValue", e.target.value);
                          // }}
                        />
                        <label
                          className="transaction-filter-checkbox-label"
                          htmlFor="lastOneYear"
                        >
                          Last 1 year
                        </label>
                      </div>
                    </div>

                    <PrimaryButton
                      buttonId="auth_submit_button"
                      className="transaction_filter_apply_btn w-100 mt-3 d-lg-flex d-none"
                      type="submit"
                      text="Apply"
                      disabled={transactionListLoading}
                    />
                    <PrimaryButton
                      buttonId="auth_submit_button"
                      className="transaction_filter_apply_btn w-100 mt-3 d-lg-none d-flex"
                      type="submit"
                      text="Apply"
                      disabled={transactionListLoading}
                      handleClick={() => toggleFilter()}
                    />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div
            className={`col-lg-8 border_box transaction_box p-4  ${
              isFilterShown ? "d-none" : "col-lg-8 col-12"
            }`}
          >
            <div
              className={`${
                !transactionListLoading && "d-flex"
              } align-items-center justify-content-between`}
            >
              <p className="title">Transactions</p>
              <RenderIf isTrue={transactionListLoading}>
                <Spinner className="m-20-auto" id="" />
              </RenderIf>
              <RenderIf isTrue={!transactionListLoading}>
                <img
                  src={FILTER_ICON}
                  alt="filter"
                  className="d-lg-none d-block filter_icon"
                  onClick={toggleFilter}
                />
              </RenderIf>
            </div>
            <RenderIf isTrue={!transactionListLoading}>
              <RenderIf
                isTrue={
                  transactionHistoryList && transactionHistoryList?.length > 0
                }
              >
                <TransactionTableCard
                  transactionHistoryList={transactionHistoryList}
                  paginationConfig={paginationConfig}
                />
              </RenderIf>
              <RenderIf isTrue={transactionHistoryList?.length === 0}>
                <NoDataFound
                  text="No Transactions Found"
                  id="transaction_not_found"
                />
              </RenderIf>
            </RenderIf>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
