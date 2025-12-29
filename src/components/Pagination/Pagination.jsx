import React from 'react';
import Link from 'next/link';

const Pagination = ({ currentPage, totalPages, searchedWord, basePath }) => {
  return (
    <div>
      <span className='mt-3 d-block'>
        Page {currentPage} of {totalPages}
      </span>
      <nav aria-label='Page navigation posts' className='mt-3'>
        <ul className='pagination'>
          <li className='page-item'>
            {currentPage > 1 && (
              <Link
                className='page-link'
                href={`${basePath}?page=${currentPage - 1}${
                  searchedWord ? `&q=${searchedWord}` : ''
                }`}
                aria-label='Previous'
              >
                <span aria-hidden='true'>&laquo;</span>
              </Link>
            )}
          </li>
          <li className='page-item'>
            <a className='page-link' href='#'>
              {currentPage}
            </a>
          </li>
          <li className='page-item'>
            <span className='page-link disabled'>
              {currentPage} / {totalPages}
            </span>
          </li>
          <li className='page-item'>
            {currentPage < totalPages && (
              <Link
                className='page-link'
                href={`${basePath}?page=${currentPage + 1}${
                  searchedWord ? `&q=${searchedWord}` : ''
                }`}
                aria-label='Next'
              >
                <span aria-hidden='true'>&raquo;</span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
