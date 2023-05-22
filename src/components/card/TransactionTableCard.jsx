import { useState } from "react";
import { Table } from "react-bootstrap";

import { ViewReceiptModal } from "components";
import {
  setTokenIcon,
  setActionIcon,
  formatDate,
  formatTime,
} from "components/reusableFunctions/reusableFuctions";
import Pagination from "components/pagination";

const TransactionTableCard = ({ transactionHistoryList, paginationConfig }) => {
  const [viewReceiptData, setViewReceiptData] = useState({});
  const [showViewReceiptModal, setShowViewReceiptModal] = useState(false);

  const handleOpenViewReceiptModal = (data) => {
    setShowViewReceiptModal(true);
    setViewReceiptData(data);
  };
  const handleCloseViewReceiptModal = () => {
    setShowViewReceiptModal(false);
  };

  return (
    <>
      <div className="pt-4 position-relative" id="my_table">
        <div className="scroll_table">
          <Table>
            <thead>
              <tr>
                <th className="sr_num">TIMESTAMP</th>
                <th>TOKEN</th>
                <th>TOKEN QTY</th>
                <th>ACTION</th>
                <th>STATUS</th>
                <th>RECEIPT</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {transactionHistoryList?.map((item) => {
                return (
                  <>
                    <tr>
                      {/* timestamp */}
                      <td className="sr_num_ans">
                        <div className="coin_title pb-2 pt-3">
                          {formatDate(item?.createdAt, "DD-MM-YYYY")}{" "}
                          {formatTime(item?.createdAt)}
                        </div>
                      </td>
                      <td className="sr_num_ans">
                        <div className="coin_title pb-2 pt-3 d-flex justify-content-start align-content-center">
                          <img
                            src={setTokenIcon(item?.token)}
                            alt="action_icon"
                            className="mr-2 h20"
                          />
                          {item?.token}
                        </div>
                      </td>
                      {/* token qty */}
                      <td className="sr_num_ans">
                        <div className="coin_title pb-2 pt-3">
                          {parseFloat(item?.amount).toFixed(8)}
                        </div>
                      </td>
                      {/* action */}
                      <td className="sr_num_ans">
                        <div className="coin_title pb-2 pt-3 d-flex justify-content-start align-content-center">
                          <img
                            src={setActionIcon(item?.type)}
                            alt="action_icon"
                            className="mr-1"
                          />
                          {item?.type}
                        </div>
                      </td>
                      {/* status */}
                      <td className="sr_num_ans">
                        <div className="coin_title pb-2 pt-3">
                          <p
                            className={`status_box status_text ${
                              item?.status === "Success"
                                ? "success_status"
                                : item?.status === "Pending"
                                ? "pending_status"
                                : item?.status === "Failed"
                                ? "failed_status"
                                : item?.status === "Rejected"
                                ? "reject_status"
                                : "pending_status"
                            }`}
                          >
                            {item?.status}
                          </p>
                        </div>
                      </td>
                      {/* view */}
                      <td className="sr_num_ans">
                        <div className="coin_title pb-2 pt-3">
                          <button
                            id="pay_now_button"
                            className="btn btn-primary"
                            onClick={() => handleOpenViewReceiptModal(item)}
                          >
                            View
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
        <div className="position-absolute pagination_div">
          <Pagination paginationConfig={paginationConfig} />
        </div>
      </div>
      <ViewReceiptModal
        show={showViewReceiptModal}
        onHide={() => setShowViewReceiptModal(false)}
        handlePreviewClick={handleCloseViewReceiptModal}
        modalWidth="modal-width-460 withdraw_modal_dialog"
        viewReceiptData={viewReceiptData}
      />
    </>
  );
};

export default TransactionTableCard;
