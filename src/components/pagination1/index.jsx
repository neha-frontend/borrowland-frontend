import { NEXT_ARROW } from "../../assets/images";

import "./index.css";

const Pagination = ({
  totalNumberOfPage,
  setCurrentPage,
  previousPage,
  nextPage,
  currentPage,
  handlePageClick,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalNumberOfPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex align-items-center justify-content-between pagination_container">
      <div className="pagination_result">
        {`${currentPage} of ${totalNumberOfPage} Pages`}
      </div>
      <div className="pagination_btns_container d-flex align-items-center">
        <button className="pagination_arrow_btn pagination_prev_arrow_btn">
          <img
            src={NEXT_ARROW}
            className={
              currentPage !== 1
                ? "pagination_prev_arrow"
                : "pagination_prev_arrow opacity-50"
            }
            onClick={() => {
              previousPage();
              {
                currentPage > 1 && handlePageClick(currentPage - 1);
              }
            }}
          />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={
              number === currentPage
                ? "active pagination_btn"
                : "pagination_btn"
            }
            onClick={() => {
              setCurrentPage(number);
              handlePageClick(number);
            }}
          >
            {number}
          </button>
        ))}
        <button className="pagination_arrow_btn pagination_next_arrow_btn">
          <img
            src={NEXT_ARROW}
            className={
              currentPage !== totalNumberOfPage
                ? "pagination_next_arrow"
                : "pagination_next_arrow opacity-50"
            }
            onClick={() => {
              nextPage();
              {
                currentPage < totalNumberOfPage &&
                  handlePageClick(currentPage + 1);
              }
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
