import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLoanHistoryAction, resetLoanHistory } from "store/sagaActions";
import { RenderIf } from "utils";
import { MyLoansTableCard, NoDataFound, Spinner } from "../../../components";

import "./MyLoans.css";

const MyLoans = () => {
  const dispatch = useDispatch();

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(6);
  const [paginationConfig, setPaginationConfig] = useState({});

  const { loanList, isLoading, totalItems, totalPage } = useSelector(
    (state) => state.user.loan
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
    dispatch(
      getLoanHistoryAction({
        startIndex: page,
        itemsPerPage: count,
      })
    );
  };
  const updateCurrentCountPage = (page) => {
    setCount(page);
  };
  useEffect(() => {
    if (loanList) {
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
  }, [loanList]);

  useEffect(() => {
    dispatch(resetLoanHistory());
    dispatch(
      getLoanHistoryAction({
        startIndex: 1,
        itemsPerPage: 6,
      })
    );
  }, []);

  return (
    <div className="background_color">
      <div className="container  pt-5 pb-5">
        <div className="my_loans_border_box p-4">
          <p className="my_loans_title">My Loans</p>
          <RenderIf isTrue={isLoading}>
            <Spinner className="m-20-auto" id="loanSpinner" />
          </RenderIf>
          <RenderIf isTrue={!isLoading}>
            <RenderIf isTrue={loanList && totalItems > 0}>
              <MyLoansTableCard
                loanList={loanList}
                paginationConfig={paginationConfig}
              />
            </RenderIf>
            <RenderIf isTrue={loanList === null || totalItems === 0}>
              <NoDataFound text="No Loans Found" id="loansNotFound" />
            </RenderIf>
          </RenderIf>
        </div>
      </div>
    </div>
  );
};

export default MyLoans;
