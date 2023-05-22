import { Table } from "react-bootstrap";

import Pagination from "components/pagination";
import {
  formatTime,
  formatDate,
  FixedTermsStatus,
} from "components/reusableFunctions/reusableFuctions";

const FixedPreviewTableCard = ({
  previousTermsList,
  previousTermsPaginationConfig,
}) => {
  return (
    <div className="fixed_previous_table p_24" id="my_loan_table">
      <div className="scroll_table">
        <Table>
          <thead>
            <tr className="my_loan_title">
              <th className="sr_num">TIMESTAMP</th>
              <th>TOKEN</th>
              <th>Flex amt</th>
              <th>Int.</th>
              <th>Tenure</th>
              <th>Payable amount</th>
              <th>due date</th>
              <th className="text-center">STATUS</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {previousTermsList.map((item) => {
              return (
                <>
                  <tr>
                    {/* timestamp */}
                    <td className="sr_num_ans">
                      <div className="my_loans_value pb-2 pt-3">
                        {formatDate(item?.createdAt, "DD-MM-YYYY")}{" "}
                        {formatTime(item?.createdAt)}
                      </div>
                    </td>
                    {/* TOKEN */}
                    <td className="sr_num_ans">
                      <div className="my_loans_value pb-2 pt-3">
                        {item?.token}
                      </div>
                    </td>
                    {/* Flex amt */}
                    <td className="sr_num_ans">
                      <div className="my_loans_value pb-2 pt-3">
                        {item?.amount}
                      </div>
                    </td>
                    {/* Int. */}
                    <td className="sr_num_ans">
                      <div className="my_loans_value pb-2 pt-3">
                        {item?.interestRate}%
                      </div>
                    </td>
                    {/* Tenure */}
                    <td className="sr_num_ans">
                      <div className="my_loans_value pb-2 pt-3">
                        {item?.tenure} {item?.tenure === 1 ? "Month" : "Months"}
                      </div>
                    </td>
                    {/* Payable amount */}
                    <td className="sr_num_ans">
                      <div className="my_loans_value pb-2 pt-3">
                        {item?.finalAmount}
                      </div>
                    </td>
                    {/* due date */}
                    <td className="sr_num_ans">
                      <div className="my_loans_value pb-2 pt-3">
                        {formatDate(item?.termEndsOn, "DD-MM-YYYY")}
                      </div>
                    </td>
                    {/* STATUS */}
                    <td className="sr_num_ans">
                      <div className="my_loans_value pb-2 pt-3">
                        <p
                          className={`status_box status_text ${
                            FixedTermsStatus(
                              item?.termEndsOn,
                              item?.createdAt
                            ) === "Completed"
                              ? "completed_status"
                              : "pending_status"
                          }`}
                        >
                          {FixedTermsStatus(item?.termEndsOn, item?.createdAt)}
                        </p>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Pagination paginationConfig={previousTermsPaginationConfig} />
    </div>
  );
};

export default FixedPreviewTableCard;
