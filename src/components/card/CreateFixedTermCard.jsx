import { useState } from "react";
import { useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import { OTPVerificationModal } from "components";
import Pagination from "components/pagination";
import {
  autoRenewalFixedTermsAction,
  cancelFixedTermsAction,
} from "store/sagaActions";
import {
  formatTime,
  formatDate,
  handleSetDropDown,
} from "components/reusableFunctions/reusableFuctions";

const CreateFixedTermCard = ({
  activeFixedTermsList,
  getAllFixedTerms,
  activeTermPaginationConfig,
}) => {
  const dispatch = useDispatch();
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");

  const handleOpenVerificationModal = () => {
    setShowVerificationModal(true);
  };

  const handleCloseVerificationModal = () => {
    setShowVerificationModal(false);
  };

  const handleAutoRenewal = (termIDValue, autoRenewal) => {
    dispatch(
      autoRenewalFixedTermsAction({
        data: {
          termId: termIDValue,
          autoRenewal: !autoRenewal,
        },
      })
    );
  };

  const handleCancelFixedTerm = (termId) => {
    setId(termId);
    setIsLoading(true);
    dispatch(
      cancelFixedTermsAction({
        id: termId,
        handleOpenVerificationModal,
        setIsLoading,
      })
    );
  };

  return (
    <>
      <div className="row">
        {activeFixedTermsList.map((item) => (
          <div className="col-6 mb-4" key={item?.key}>
            <div className="fixed_term_crad_container">
              <div className="initial_balance_container">
                <p className="saving_general_title">Initial Balance</p>
                <div className="d-flex align-items-start mt-2 mb20">
                  <img
                    src={handleSetDropDown(item?.token)}
                    className="mt-1"
                    alt="token"
                  />
                  <div>
                    <p className="fixed_term_balance_amount">
                      {item?.token} {parseFloat(item?.finalAmount).toFixed(8)}
                    </p>
                    <p>
                      <span className="fixed_term_balance_amount_span">
                        ${item?.amountInUsd}
                      </span>
                    </p>
                  </div>
                </div>
                <hr />
                {/* Interest rate */}
                <p className="saving_general_title">Interest Rate</p>
                <p className="interest_rate_value mt-2 font-weight-bold">
                  Up to {item?.interestRate}%
                </p>
              </div>
              <div className="terms_container">
                {/* terms */}
                <div className="d-flex justify-content-between align-items-center">
                  <p className="saving_general_title font-weight-bold">Terms</p>
                  <p className="saving_general_title">{item?.tenure} months</p>
                </div>
                <hr />
                {/* due date */}
                <div className="d-flex justify-content-between align-items-center">
                  <p className="saving_general_title font-weight-bold">
                    Due Date
                  </p>
                  <p className="saving_general_title">
                    {formatDate(item?.termEndsOn, "DD-MM-YYYY")}{" "}
                    {formatTime(item?.termEndsOn)}
                  </p>
                </div>
                <hr />
                {/* automatic renewal */}
                <div className="d-flex justify-content-between align-items-center">
                  <p className="saving_general_title font-weight-bold">
                    Automatic Renewal
                  </p>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="autoRenewal"
                      defaultChecked={item?.autoRenewal}
                      onChange={() => {
                        handleAutoRenewal(item?._id, item?.autoRenewal);
                      }}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <button
                  className="cancel_fixed_term_btn"
                  onClick={() => handleCancelFixedTerm(item?._id)}
                  disabled={isLoading || item?.status == "Pending"}
                >
                  {item?._id == id && isLoading ? (
                    <ClipLoader
                      color="#f95c66"
                      loading={item?._id == id && isLoading}
                      size={30}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : item?.status == "Pending" ? (
                    "In Pending..."
                  ) : (
                    "Cancel Fix Term"
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
        <OTPVerificationModal
          showModal={showVerificationModal}
          closeModal={handleCloseVerificationModal}
          type="CANCEL_FIXED_TERM"
          getAllFixedTerms={getAllFixedTerms}
        />
      </div>
      <div className="row">
        <div className="col-12">
          <Pagination paginationConfig={activeTermPaginationConfig} />
        </div>
      </div>
    </>
  );
};

export default CreateFixedTermCard;
