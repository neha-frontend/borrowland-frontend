import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

import { BorrowPreviewDetailCard, ErrorMessageCard } from "components";
import {
  BACK_ICON_SVG,
  BORROW_PROFILE,
  CLOSE,
  MAIL,
  MAP_PIN,
  PHONE_BORROW,
} from "../../../assets/images";
import {
  setTokenIcon,
  payableAmountValue,
  loanDueDate,
} from "components/reusableFunctions/reusableFuctions";
import { RenderIf } from "utils";
import { resetBorrowLoanErrorMsg } from "store/sagaActions";

const BorrowFundsPreview = ({
  handlePreviewClick,
  handleGoBackClick,
  onHide,
  modalWidth,
  show,
  borrowData,
}) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user.userDetails);
  const { borrowLoanLoading, borrowLoanErrorMsg } = useSelector(
    (state) => state.user.loan
  );
  useEffect(() => {
    dispatch(resetBorrowLoanErrorMsg());
  }, [show]);
  return (
    <>
      <Modal
        className={modalWidth}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
      >
        <div
          className="d-flex align-items-center back_icon_modal"
          onClick={handleGoBackClick}
        >
          <img src={BACK_ICON_SVG} alt="back_icon" className="mr-2" />
          <p>Back</p>
        </div>
        <img
          src={CLOSE}
          alt="close"
          className="close_icon_modal"
          onClick={onHide}
        />
        <div className="borrow_fund_modal">
          <p className="modal_title mb-3">Borrow Funds </p>
          {/* <div className="borrow_loan_wrapper_box" id="borrow_funds_modal">
            <p className="loan_dark_text">Loan ID : #34566 </p>
          </div> */}
          <div className="preview_detailed_box">
            <div className="profile_borrow_box">
              <div
                className="d-flex align-items-center"
                id="flex_profile_borrow"
              >
                <div className="flex_profile_section">
                  <img
                    src={BORROW_PROFILE}
                    alt="borrow_profile"
                    className="mr-sm-2"
                  />
                </div>
                <div className="flex_contact_section">
                  <p className="borrow_profile_title text-capitalize">
                    {" "}
                    {userData?.fullName}
                  </p>
                  {/* <p className="borrow_location s_b_6_flex">
                    <img alt="map_pin" src={MAP_PIN} className="mr-1 h22" />
                    <p className="location_borrow">
                      6391 Elgin St. Celina, Delaware 10299
                    </p>
                  </p> */}
                </div>
              </div>
              <div className="contact_email_borrow">
                <p className="d-flex align-items-center location_borrow mb-2">
                  <img src={MAIL} alt="mail" className="mr-2" />
                  {userData?.email}
                </p>
                <p className="d-flex align-items-center location_borrow">
                  <img src={PHONE_BORROW} alt="phone" className="mr-2" />
                  {userData?.mobile}
                </p>
                <p className="borrow_location s_a_6_flex">
                  <img alt="map_pin" src={MAP_PIN} className="mr-1 h22" />
                  <p className="location_borrow">
                    6391 Elgin St. Celina, Delaware 10299
                  </p>
                </p>
              </div>
            </div>
            <div className="detailed_borrow_border">
              <p className="borrow_profile_title">Details</p>
            </div>
            <BorrowPreviewDetailCard
              title="Borrowed Amount"
              value={`${borrowData?.loan?.amount} ${borrowData?.loan?.type}`}
              image={setTokenIcon(borrowData?.loan?.type)}
            />
            <BorrowPreviewDetailCard
              title="Tenure"
              value={`${borrowData?.tenure} ${
                borrowData?.tenure > 1 ? "Months" : "Month"
              } `}
            />
            <BorrowPreviewDetailCard
              title="Collateral Amount"
              value={`${borrowData?.collateral?.amount} ${borrowData?.collateral?.type}`}
              image={setTokenIcon(borrowData?.collateral?.type)}
            />
            <BorrowPreviewDetailCard
              title="Interest Rate"
              value={`${borrowData?.interestRate}%`}
            />
            <BorrowPreviewDetailCard
              title="Payable amount"
              value={`${payableAmountValue(
                borrowData?.loan?.amount,
                borrowData?.interestRate,
                borrowData?.platformFee,
                borrowData?.tenure
              )} ${borrowData?.loan?.type}`}
              image={setTokenIcon(borrowData?.loan?.type)}
            />
            <BorrowPreviewDetailCard
              title="LTV Margin"
              value={`${borrowData?.ltvMargin}%`}
            />
            {/*<BorrowPreviewDetailCard
              title="Liquidation LTV"
              value=""
              image=""
            /> */}
            <BorrowPreviewDetailCard
              title="Due Date"
              value={loanDueDate(borrowData?.tenure)}
            />
          </div>

          {/* error message */}
          <RenderIf isTrue={borrowLoanErrorMsg}>
            <ErrorMessageCard id="borrow_error" errorMsg={borrowLoanErrorMsg} />
          </RenderIf>

          <div className="preview_fund_modal">
            <Button
              id="auth_submit_button"
              className="w-100 mt-4"
              onClick={handlePreviewClick}
              disabled={borrowLoanLoading}
            >
              {borrowLoanLoading ? (
                <ClipLoader
                  color="#fff"
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BorrowFundsPreview;
