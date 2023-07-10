import React from 'react';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai';
import './style.css'

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  const prevPage = () => {
    if (currentPage > 1) {
      goToPage((prevPage) => prevPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="new-pagination">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
      >
        <AiOutlineDoubleLeft />
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => goToPage(index + 1)}
          className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <AiOutlineDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;
