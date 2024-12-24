import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const maxVisiblePages = 7; 

  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (end - start + 1 < maxVisiblePages) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxVisiblePages - 1);
      } else if (end === totalPages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => handlePageChange(currentPage - 1)}>
          &laquo;
        </button>
      )}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => handlePageChange(currentPage + 1)}>
          &raquo;
        </button>
      )}
    </div>
  );
};

export default Pagination;
