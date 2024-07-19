// Pagination.jsx

import React from "react";

function Pagination({ currentPage, setCurrentPage }) {
  const lastPage = 10; // The last page number
  const firstPage = 1; // The first page number
  const leftOrRight = 1; // Number of pages to show to the left and right of the current page

  // Calculate the range of pages to display
  const startRange = Math.max(currentPage - leftOrRight, firstPage);
  const endRange = Math.min(currentPage + leftOrRight, lastPage);

  // Generate an array of page numbers to display
  const pages = [...Array(lastPage)]
    .map((_, index) => index + firstPage)
    .filter(
      (item) =>
        item === firstPage ||
        item === lastPage ||
        (item >= startRange && item <= endRange),
    );

  return (
    <div className="flex items-center justify-center gap-x-2">
      {/* Button to go to the previous page */}
      <button
        className="flex h-8 cursor-pointer items-center justify-center rounded-md border px-2 py-2 text-sm disabled:border-none disabled:bg-gray-700 disabled:text-gray-400 disabled:hover:cursor-auto"
        onClick={() => {
          setCurrentPage((currentPage) => currentPage - 1);
        }}
        disabled={currentPage === firstPage}
      >
        Previous
      </button>

      {/* Page number buttons */}
      <div className="flex w-56 flex-nowrap items-center justify-center gap-x-2">
        {pages.map((item, index, array) => {
          return (
            <React.Fragment key={index}>
              {/* Display ellipsis for skipped pages */}
              {item > firstPage + leftOrRight &&
                item - array[index - 1] > 1 && <span className="">...</span>}

              {/* Individual page button */}
              <button
                key={item}
                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border px-2 py-2 text-center text-sm ${
                  item === currentPage ? "bg-pink-700" : ""
                }`}
                onClick={() => {
                  setCurrentPage(item);
                }}
              >
                {item}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Button to go to the next page */}
      <button
        className="flex h-8 cursor-pointer items-center justify-center rounded-md border px-2 py-2 text-sm disabled:border-none disabled:bg-gray-700 disabled:text-gray-400 disabled:hover:cursor-auto"
        onClick={() => {
          setCurrentPage((currentPage) => currentPage + 1);
        }}
        disabled={currentPage === lastPage}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
