import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "react-bootstrap";

import RepaymentModal from "../modal/user/RepaymentModal";
import RepaymentPreviewModal from "../modal/user/RepaymentPreviewModal";
import Pagination from "components/pagination";
import { formatDate } from "components/reusableFunctions/reusableFuctions";
import { resetPayLoanErrorMsg, payLoanAction } from "store/sagaActions";
import { OTPVerificationModal } from "components";


const MyLoansTableCard = ({ loanList, paginationConfig }) => {
  const dispatch = useDispatch();

  const [loanAmountValue, setLoanAmountValue] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const [showPayNowModal, setShowPayNowModal] = useState(false);
  const [showRepaymentPreviewModal, setShowRepaymentPreviewModal] =
    useState(false);

  const [payNowModalValues, setShowPayNowModalValues] = useState({
    loanId: "",
    subTitle: "",
    currency: "",
    loanAmount: "",
    ltvValue: "",
    penalty: "",
    pendingAmountInUsd: "",
    pendingAmount: "",
  });

  const handleOpenPayNowModal = (item) => {
    const title =
      item?.status === "Active" ? "Pre-payment of loan" : "Outstanding payment";
    // const loanStatus = status === "Active" ? "ACTIVE" : "OUTSTANDING";
    setShowPayNowModalValues({
      loanId: item?.loanId,
      subTitle: title,
      currency: item?.loan?.token,
      loanAmount: item?.loan?.amount,
      ltvValue: item?.ltvMargin,
      penalty: item?.penalty,
      pendingAmountInUsd: item?.pendingAmountInUsd,
      pendingAmount: item?.pendingAmount,
    });
    setShowPayNowModal(true);
  };
  const handleClosePayNowModal = () => {
    setShowPayNowModal(false);
  };

  const handleOpenRepaymentPreviewModal = () => {
    setShowRepaymentPreviewModal(true);
  };
  const handleCloseRepaymentPreviewModal = () => {
    setShowRepaymentPreviewModal(false);
  };

  const handleOpenVerificationModal = () => {
    setShowVerificationModal(true);
  };

  const handleCloseVerificationModal = () => {
    setShowVerificationModal(false);
  };

  const handlePayLoan = () => {
    dispatch(resetPayLoanErrorMsg());
    dispatch(
      payLoanAction({
        id: payNowModalValues?.loanId,
        handleOpenVerificationModal,
        handleCloseRepaymentPreviewModal,
      })
    );
  };

  return (
    <>
      <div className="pt-4 position-relative h_630" id="my_loan_table">
        <div className="scroll_table">
          <Table>
            <thead>
              <tr className="my_loan_title">
                <th className="sr_num">LOAN ID</th>
                <th>TOKEN</th>
                <th>LOAN AMOUNT</th>
                <th>COLLATERAL AMOUNT</th>
                <th>LTV MARGIN</th>
                <th>LIQUIDATION PRICE</th>
                <th>INT. RATE</th>
                <th>DUE DATE</th>
                <th>TOTAL AMOUNT</th>
                <th>PENDING AMOUNT</th>
                <th>PENALTY</th>
                <th>STATUS</th>
                <th>ACTION</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {loanList.map((item) => {
                return (
                  <>
                    <tr>
                      {/* loan id */}
                      <td className="sr_num_ans">
                        <div className="my_loans_value pb-2 pt-2">
                          {item?.loanId}
                        </div>
                      </td>
                      {/* token */}
                      <td className="sr_num_ans">
                        <div className="my_loans_value pb-2 pt-2">
                          {item?.loan?.token?.toUpperCase()}
                        </div>
                      </td>
                      {/* loan amount */}
                      <td className="sr_num_ans">
                        <div className="my_loans_value pb-2 pt-2">
                          ${parseFloat(item?.loanAmountInUsd).toFixed(6)}
                        </div>
                      </td>
                      {/* collateral amount */}
                      <td className="sr_num_ans">
                        <div className="my_loans_value pb-2 pt-2">
                          ${parseFloat(item?.collateralAmountInUsd).toFixed(6)}
                        </div>
                      </td>
                      {/* LTV margin */}
                      <td className="sr_num_ans">
                        <div className="my_loans_value pb-2 pt-2">
                          {parseFloat(item?.ltvMargin)}%
                        </div>
                      </td>
                      {/* liquidation price */}
                      <td className="sr_num_ans">
                        <div className="my_loans_value pb-2 pt-2">
                          {item?.ltvMargin
                            ? `$ ${parseFloat(
                              item?.collateral?.unitPrice ?
                              item.ltvMargin === 97 ?  
                              item?.ltvMargin/100 * item?.collateral?.unitPrice :
                              (item?.ltvMargin+5)/100 * item?.collateral?.unitPrice :
                              0
                              ).toFixed(
                                6
                              )}`
                            : "-"}
                        </div>
                      </td>
                      {/* interest */}
                      <td className="sr_num_ans">
                        <div className="my_loans_value pb-2 pt-2">
                          {item?.interestRate}%
                        </div>
                      </td>
                      {/* due date */}
                      <td className="sr_num_ans">
                        <div className="my_loans_value pb-2 pt-2">
                          {formatDate(item?.dueDate, "DD-MM-YYYY")}
                        </div>
                      </td>
                      {/* total amount */}
                      <td className="sr_num_ans">
                        <div className="my_loans_value pb-2 pt-2">
                          ${parseFloat(item?.totalAmountInUsd).toFixed(6)}
                        </div>
                      </td>
                      {/* pending amount */}
                      <td className="sr_num_ans">
                        <div className="my_loans_value pb-2 pt-2">
                          ${parseFloat(item?.pendingAmountInUsd).toFixed(6)}
                        </div>
                      </td>
                      {/* penalty */}
                      <td className="sr_num_ans">
                        <div className="my_loans_value pb-2 pt-2">
                          {parseFloat(item?.penalty) > 0
                            ? `$${parseFloat(item?.penalty).toFixed(6)}`
                            : "-"}
                        </div>
                      </td>
                      {/* status */}
                      <td className="sr_num_ans">
                        <div className="my_loans_value pb-2 pt-2">
                          <p
                            className={`status_box status_text ${
                              item?.status === "Active"
                                ? "active_status"
                                : item?.status === "Closed" ||
                                  item?.status === "Completed"
                                ? "completed_status"
                                : item?.status === "Pending"
                                ? "pending_status"
                                : "outstanding_status"
                            }`}
                          >
                            {item?.status}
                          </p>
                        </div>
                      </td>
                      {/* action */}
                      <td className="sr_num_ans">
                        <div className="my_loans_value pb-2 pt-2">
                          <button
                            id="pay_now_button"
                            className="btn btn-primary"
                            disabled={
                              item?.status === "Completed" ||
                              item?.status === "Pending" ||
                              item?.status === "Closed"
                            }
                            onClick={() => handleOpenPayNowModal(item)}
                          >
                            Pay Now
                          </button>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="position-absolute transaction_pagination_div">
          <Pagination paginationConfig={paginationConfig} />
        </div>

        <RepaymentModal
          modalWidth="modal_width_760"
          handlePreviewModal={handleOpenRepaymentPreviewModal}
          showModal={showPayNowModal}
          closeModal={handleClosePayNowModal}
          showNext={handleOpenRepaymentPreviewModal}
          payNowModalValues={payNowModalValues}
          setLoanAmountValue={setLoanAmountValue}
          loanAmountValue={loanAmountValue}
        />
        <RepaymentPreviewModal
          showModal={showRepaymentPreviewModal}
          closeModal={handleCloseRepaymentPreviewModal}
          handlePayLoan={handlePayLoan}
          previewModalValues={payNowModalValues}
          loanAmountValue={loanAmountValue}
        />
        <OTPVerificationModal
          showModal={showVerificationModal}
          closeModal={handleCloseVerificationModal}
          type="LOAN_REPAYMENT"
        />
      </div>
    </>
  );
};

export default MyLoansTableCard;
