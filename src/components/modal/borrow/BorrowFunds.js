import { Button, Modal } from "react-bootstrap";

import { CLOSE, QUESTION } from "../../../assets/images";
import {
  handleSetDropDown,
  payableAmountValue,
} from "components/reusableFunctions/reusableFuctions";

import "./borrowmodal.css";

const BorrowFunds = ({
  onHide,
  modalWidth,
  show,
  handlePreviewClick,
  borrowData,
}) => {
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
          onClick={onHide}
        />
        <div className="borrow_fund_modal">
          <p className="modal_title">Borrow Funds </p>
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
            <p className="loan_title_modal">Loan Calculation Offer</p>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <p className="lable_loan">Payable Amount</p>
                <div className="d-flex">
                  <div className="flex_22 position-relative">
                    <input
                      className="borrow_input mt-1 modal_input_text"
                      value={borrowData?.loan?.type}
                      disabled
                    />
                    <img
                      src={handleSetDropDown(borrowData?.loan?.type)}
                      alt="usdt_drop"
                      className="crypto_icon_borrow"
                    />
                  </div>
                  <div className="flex_78">
                    <input
                      className="borrow_input mt-1 modal_input_text"
                      value={payableAmountValue(
                        borrowData?.loan?.amount,
                        borrowData?.interestRate,
                        borrowData?.platformFee,
                        borrowData?.tenure
                      )}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <p className="lable_loan res_loan">Interest Rate</p>
                <input
                  className="borrow_input mt-1 modal_input_text"
                  value={`${borrowData?.interestRate}%`}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="preview_fund_modal">
            <Button className="w-100" onClick={handlePreviewClick}>
              Preview
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BorrowFunds;
