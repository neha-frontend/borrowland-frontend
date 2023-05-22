import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { CLOSE, QUESTION } from "../../../assets/images";
import { assetIcon } from "components/reusableFunctions/reusableFuctions";

import "../borrow/borrowmodal.css";

const RepaymentModal = ({
  closeModal,
  modalWidth,
  showModal,
  payNowModalValues,
  showNext,
  loanAmountValue,
  setLoanAmountValue,
}) => {
  const handlePreviewClick = () => {
    if (loanAmountValue <= 0) {
      setError("Please enter value greater than 0.");
    } else if (loanAmountValue > payNowModalValues?.pendingAmount) {
      setError("Please enter value less than or equal to payable amount");
    } else {
      setError("");
      closeModal();
      showNext();
    }
  };
  const [error, setError] = useState("");
  useEffect(() => {
    setLoanAmountValue(payNowModalValues?.pendingAmount);
  }, [payNowModalValues]);

  useEffect(() => {
    setError("");
  }, []);
  return (
    <>
      <Modal
        className={modalWidth}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
      >
        <img
          src={CLOSE}
          alt="close"
          className="close_icon_modal"
          onClick={() => {
            setError("");
            closeModal();
          }}
        />
        <div className="borrow_fund_modal" id="repayment_modal_box">
          <p className="modal_title">{payNowModalValues?.subTitle}</p>
          <div
            className="loan_calculation_wrapper position-relative"
            id="borrow_funds_modal"
          >
            <div
              data-tooltip="I am tooltip"
              className="question_modal position-absolute"
            >
              <img src={QUESTION} alt="ques" />
            </div>
            <p className="loan_title_modal">{payNowModalValues?.title}</p>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <p className="lable_loan">Enter Tokens</p>
                <div className="d-flex">
                  <div className="flex_22 position-relative">
                    <input
                      className="borrow_input mt-1 modal_input_text"
                      value={payNowModalValues?.currency?.toUpperCase()}
                      disabled
                    />
                    <img
                      src={assetIcon(
                        payNowModalValues?.currency?.toUpperCase()
                      )}
                      alt="usdt_drop"
                      className="crypto_icon_borrow"
                    />
                  </div>
                  <div className="flex_78">
                    <input
                      className="borrow_input mt-1 modal_input_text"
                      value={loanAmountValue}
                      contentEditable={true}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/[^0-9.]/g, "");
                        setLoanAmountValue(newValue);
                        // if (
                        // 	+newValue <= 0 &&
                        // 	newValue != ''
                        // ) {
                        // 	setError(
                        // 		'Please enter value greater than 0.',
                        // 	)
                        // } else {
                        // 	setError('')
                        // 	setLoanAmountValue(newValue)
                        // }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <p className="lable_loan res_loan">LTV</p>
                <input
                  className="borrow_input mt-1 modal_input_text"
                  value={`${payNowModalValues?.ltvValue}%`}
                  disabled
                />
              </div>
              <div className="col-sm-12">
                <p className="lable_loan mt-2">
                  Total Payable amount : {payNowModalValues?.pendingAmount}{" "}
                </p>
              </div>
              <div className="col-12 error">{error}</div>
            </div>
          </div>
          <div className="preview_fund_modal">
            <Button
              className="w-100"
              onClick={handlePreviewClick}
              disabled={!loanAmountValue}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RepaymentModal;
