import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

import { assetIcon } from "components/reusableFunctions/reusableFuctions";
import CustomModal from "../CustomModal";
import { RenderIf } from "utils";
import { ErrorMessageCard } from "components";

import "./index.css";

const RepaymentPreviewModal = ({
  showModal,
  closeModal,
  previewModalValues,
  handlePayLoan,
  loanAmountValue,
}) => {
  const [totalAmountValue, setTotalAmountValue] = useState("");

  const { payLoanLoading, payLoanErrorMsg } = useSelector(
    (state) => state.user.loan
  );

  useEffect(() => {
    const total = previewModalValues?.penalty + loanAmountValue;
    setTotalAmountValue(total);
  }, [previewModalValues, loanAmountValue]);

  const handleConfirmClick = () => {
    handlePayLoan();
  };

  return (
    <CustomModal showModal={showModal} closeModal={closeModal} showCloseButton>
      <div id="repayment_confirm">
        <p className="auth_title pt-2 mt-4">{previewModalValues?.subTitle}</p>
        <div className="repayment_box mt-2 mb-3 p-4">
          <p className="repayment_subheading text-center pb-2">Preview</p>
          <div className="responsive_wrp_box">
            <div className="d-flex mt-2 mb-2 justify-content-between align-items-center f_wrap">
              <p className="repayment_text">Payable Amount</p>
              <div className="d-flex">
                <img
                  src={assetIcon(previewModalValues?.currency?.toUpperCase())}
                  alt="coin"
                  className="repayment_usdc"
                />
                <p className="repayment_value">
                  {loanAmountValue}{" "}
                  {previewModalValues?.currency?.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="d-flex mt-2 mb-2 justify-content-between align-items-center f_wrap">
              <p className="repayment_text">Liquidated Penalty</p>
              <div className="d-flex">
                <img
                  src={assetIcon(previewModalValues?.currency?.toUpperCase())}
                  alt="coin"
                  className="repayment_usdc"
                />
                <p className="repayment_value">
                  {parseFloat(previewModalValues?.penalty).toFixed(8)}{" "}
                  {previewModalValues?.currency?.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="d-flex mt-2 pt-2 justify-content-between border_top_grey align-items-center f_wrap">
              <p className="repayment_text">Total amount</p>
              <div className="d-flex">
                <img
                  src={assetIcon(previewModalValues?.currency?.toUpperCase())}
                  alt="coin"
                  className="repayment_usdc"
                />
                <p className="repayment_value fw600">
                  {totalAmountValue}{" "}
                  {previewModalValues?.currency?.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* error message */}
        <RenderIf isTrue={payLoanErrorMsg}>
          <ErrorMessageCard id="loan_error" errorMsg={payLoanErrorMsg} />
        </RenderIf>

        <button
          id="auth_submit_button"
          className="btn btn-primary w-100"
          onClick={handleConfirmClick}
          disabled={payLoanLoading}
        >
          {payLoanLoading ? (
            <ClipLoader
              color="#fff"
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Confirm"
          )}
        </button>
      </div>
    </CustomModal>
  );
};

export default RepaymentPreviewModal;
