import React from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  const handlePrevButton = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextButton = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex gap-3 mx-auto mt-24">
      <button className="text-white " onClick={handlePrevButton}>
        Prev
      </button>
      <div className="flex gap-2">
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={`${
              page == currentPage ? "bg-[#2BD17E]" : "bg-[#092C39]"
            } text-white  w-[32px] h-[32px] rounded-[4px]`}
          >
            {page}
          </button>
        ))}
      </div>

      <button className="text-white " onClick={handleNextButton}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
