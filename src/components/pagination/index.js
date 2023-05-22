/* eslint-disable react/jsx-key */
/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";

import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
// import './pagination.scss';
import "./index.css";

const Pagination = ({ paginationConfig }) => {
  const {
    pageCount = 10,
    itemCount,
    currentPage,
    onPageChange,

    siblingCount = 1,

    className,
  } = paginationConfig;
  const [_currentPage, setCurrentPage] = useState(currentPage || 1);

  const paginationRange = usePagination({
    currentPage,
    itemCount,
    siblingCount,
    pageCount,
  });
  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    const updatedPage =
      _currentPage + 1 <= pageCount ? _currentPage + 1 : _currentPage;
    setCurrentPage(updatedPage);
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    const updatedPage = _currentPage - 1 >= 1 ? _currentPage - 1 : 1;
    setCurrentPage(updatedPage);
    onPageChange(currentPage - 1);
  };

  // eslint-disable-next-line prefer-const
  let lastPage =
    paginationRange && paginationRange[paginationRange?.length - 1];
  return (
    <div>
      {pageCount > 1 && (
        <div className="pagination d-flex justify-content-between">
          <div>
            <span className="align-self-center">
              {/* Showing {_currentPage} to {pageCount} of {itemCount} entries{' '} */}
            </span>
          </div>
          <div>
            <ul
              className={classnames("pagination-container", {
                [className]: className,
              })}
            >
              <li
                className={classnames("pagination-item", {
                  disabled: currentPage === 1,
                })}
                onClick={onPrevious}
              >
                <div className="arrow left" />
              </li>
              {paginationRange?.map((pageNumber) => {
                if (pageNumber === DOTS) {
                  return <li className="pagination-item dots">&#8230;</li>;
                }

                return (
                  <li
                    className={classnames("pagination-item", {
                      selected: pageNumber === currentPage,
                    })}
                    onClick={() => onPageChange(pageNumber)}
                  >
                    {pageNumber}
                  </li>
                );
              })}
              <li
                className={classnames("pagination-item", {
                  disabled: currentPage === lastPage,
                })}
                onClick={onNext}
              >
                <div className="arrow right" />
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;

// const Pagination = ({ paginationConfig }) => {
//   const { pageCount, itemCount, currentPage, onPageChange } = paginationConfig;
//   /* nextPage, prevPage */

//   const [_currentPage, setCurrentPage] = useState(currentPage || 1);

//   const _onPageChange = page => {
//     setCurrentPage(page);
//     onPageChange(page);
//   };

//   const nextPage = () => {
//     const updatedPage = _currentPage + 1 <= pageCount ? _currentPage + 1 : _currentPage;
//     setCurrentPage(updatedPage);
//     onPageChange(updatedPage);
//   };

//   const prevPage = () => {
//     const updatedPage = _currentPage - 1 >= 1 ? _currentPage - 1 : 1;
//     setCurrentPage(updatedPage);
//     onPageChange(updatedPage);
//   };

//   return (
//     <div>
//       {pageCount > 1 && (
//         <div className="pagination d-flex justify-content-between">
//           <div>
//             <span className="align-self-center">
//               Showing {_currentPage} to {pageCount} of {itemCount} entries{' '}
//             </span>
//           </div>
//           <div>
//             <button
//               disabled={_currentPage === 1}
//               tabIndex={0}
//               type="button"
//               onKeyDown={() => prevPage()}
//               onClick={() => prevPage()}
//               className="page active"
//             >
//               Prev
//             </button>

//             {Array.from(Array(pageCount), (ele, i) => (
//               <span
//                 tabIndex={ele + i}
//                 role="button"
//                 className={i + 1 === _currentPage ? 'active page' : 'page'}
//                 onClick={() => _onPageChange(i + 1)}
//                 onKeyDown={() => _onPageChange(i + 1)}
//               >
//                 {i + 1}
//               </span>
//             ))}

//             <button
//               disabled={_currentPage === pageCount}
//               className="page active"
//               tabIndex={0}
//               type="button"
//               onKeyDown={() => nextPage()}
//               onClick={() => nextPage()}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Pagination;
