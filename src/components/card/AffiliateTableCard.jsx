import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";

import { NoDataFound } from "components";
import { affiliateDashoardList } from "store/sagaActions";
import {
  formatTime,
  formatDate,
} from "components/reusableFunctions/reusableFuctions";
import Spinner from "components/spinner";

import "./index.css";

const AffiliateTableCard = () => {
  const dispatch = useDispatch();
  const { affiliateDashoardListData, isAffiliateUserListLoading } = useSelector(
    (state) => state.user.affiliate
  );

  useEffect(() => {
    dispatch(affiliateDashoardList());
  }, []);

  return (
    <div className="mt-3" id="my_table">
      <div className="scroll_table">
        <Table className="mb-0">
          <thead>
            <tr>
              <th className="sr_num">#</th>
              <th>Name</th>
              <th>Date</th>
              <th>Swap</th>
              <th>Borrow</th>
              <th>Lend</th>
            </tr>
          </thead>
          <tbody>
            {isAffiliateUserListLoading ? (
              <tr>
                <td colSpan={6}>
                  <Spinner className="m-20-auto" id="dashboardSpinner" />
                </td>
              </tr>
            ) : affiliateDashoardListData &&
              affiliateDashoardListData?.length > 0 ? (
              affiliateDashoardListData?.map((item, index) => {
                return (
                  <>
                    <tr key={item?._id}>
                      <td className="sr_num_ans">
                        <div className="centered_content">{index + 1}</div>
                      </td>
                      {/* name */}
                      <td>
                        <div className="centered_content">
                          {item?.fullName || "-"}
                        </div>
                      </td>
                      {/* date */}
                      <td>
                        <div className="centered_content">
                          {formatDate(item?.createdAt, "DD-MM-YYYY") || "-"}{" "}
                          {formatTime(item?.createdAt)}
                        </div>
                      </td>
                      {/* swap */}
                      <td>
                        <div className="centered_content">
                          {+item?.assets?.Swap?.toFixed(8) || "-"}
                        </div>
                      </td>

                      {/* lend */}
                      <td>
                        <div className="centered_content">
                          {+item?.assets?.Loan?.toFixed(8) || "-"}
                        </div>
                      </td>
                      {/*borrow */}
                      <td>
                        <div className="centered_content">
                          {+item?.assets?.Fixed_Term?.toFixed(8) || "-"}
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="px-0">
                  <NoDataFound text="No Data Found" />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AffiliateTableCard;
