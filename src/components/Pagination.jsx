import React from 'react'

function Pagination ({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = []
  const maxPageButtonsToShow = 5

  let startPage = Math.max(
    1,
    currentPage - Math.floor(maxPageButtonsToShow / 2)
  )
  let endPage = Math.min(totalPages, startPage + maxPageButtonsToShow - 1)

  if (endPage === totalPages) {
    startPage = Math.max(1, endPage - maxPageButtonsToShow + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  const handlePageClick = page => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
    }
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <nav
      aria-label='Pagination'
      className='flex justify-center items-center space-x-2 mt-10 mb-4'
    >
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
          currentPage === 1
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        Previous
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => handlePageClick(1)}
            className='px-3 py-1 rounded-md text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900'
          >
            1
          </button>
          {startPage > 2 && (
            <span className='text-gray-500 dark:text-gray-400 px-1'>...</span>
          )}
        </>
      )}

      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => handlePageClick(number)}
          disabled={currentPage === number}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
            currentPage === number
              ? 'bg-indigo-600 text-white cursor-default'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-current={currentPage === number ? 'page' : undefined}
        >
          {number}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className='text-gray-500 dark:text-gray-400 px-1'>...</span>
          )}
          <button
            onClick={() => handlePageClick(totalPages)}
            className='px-3 py-1 rounded-md text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900'
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
          currentPage === totalPages
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        Next
      </button>
    </nav>
  )
}

export default Pagination
