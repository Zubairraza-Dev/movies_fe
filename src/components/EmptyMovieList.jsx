import React from "react";
import { Link } from "react-router-dom";

const EmptyMovieList = () => {
  return (
    <div className="bg-[#093545] w-full h-auto min-h-screen flex flex-col gap-24 justify-between">
      <div className="flex flex-col gap-7 justify-center mt-[324px] mb-[170px]">
        <div className="sm:text-[48px] text-[32px] font-semibold text-white text-center sm:px-0 px-4 font-Montserrat">
          Your movie list is empty
        </div>
        <Link
          to="/add-movie"
          className="sm:w-[202px] w-[87%] h-[54px] rounded-[10px] mx-auto bg-[#2BD17E] flex justify-center items-center text-white font-semibold text-[16px] font-Montserrat"
        >
          Add a new movie
        </Link>
      </div>
    </div>
  );
};

export default EmptyMovieList;
