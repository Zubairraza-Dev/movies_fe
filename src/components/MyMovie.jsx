import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import addIcon from "../assets/svg/add.svg";
import logoutIcon from "../assets/svg/logout.svg";
// import Pagination from "./Pagination";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../lib/store/hook";
import { clearAuthStorage } from "../lib/store/slice/user/UserSlice";
import httpRequest from "../axios/index";
import { LOGOUT, MOVIES } from "../constants/apiEndPoints";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import EmptyMovieList from "./EmptyMovieList";
import Skeleton from "./Skeleton";

const MyMovie = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movies, setmovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleLogout = async () => {
    const response = await httpRequest.post(`${LOGOUT}`);
    if (response?.status === 200) {
      localStorage.clear();
      dispatch(clearAuthStorage());
      navigate("/");
    }
  };

  useEffect(() => {
    getMovies(MOVIES, currentPage);
  }, [currentPage]);

  const getMovies = async (url, page) => {
    try {
      setLoading(true);
      const response = await httpRequest.get(`${url}?page=${page}&limit=8`);
      if (response?.status === 200 || 201) {
        const data = response?.data?.data;
        setmovies(data?.data || []);
        setTotalPages(data?.meta?.totalPages || 1);
      }
    } catch (error) {
      const errorMessage =
        error.response.data.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    const Currentpage = selectedPage === 0 ? 1 : selectedPage + 1;
    setCurrentPage(Currentpage);
  };

  return (
    <div className="bg-[#093545] w-full h-auto flex flex-col gap-24 justify-between">
      <div className="w-[85%] mx-auto flex flex-col sm:mt-[120px] mt-[80px]">
        {/* Upper section  */}
        <div className="flex justify-between">
          <Link to="/add-movie" className="flex items-center sm:gap-4 gap-3">
            <div className="text-[32px] sm:text-[48px] font-semibold text-white text-start font-custom">
              My Movies
            </div>
            <img
              src={addIcon}
              alt=""
              className="sm:w-[32px] w-[20px] h-[20px] sm:h-[32px] mt-[8px]"
            />
          </Link>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleLogout}
          >
            <div className="text-[16px] -bold text-white sm:block hidden font-Montserrat">
              Logout
            </div>
            <img
              src={logoutIcon}
              alt=""
              className="w-[32px] h-[32px] sm:w-[32px] sm:h-[32px]"
            />
          </div>
        </div>

        {!loading && movies && movies?.length === 0 && <EmptyMovieList />}
        {loading ? (
          <div className="flex flex-wrap gap-3 sm:mt-[120px] mt-[80px]  ">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : (
          <div>
            {/* Movie Table Card */}
            {!loading && movies && movies?.length > 0 && (
              <div className="flex flex-wrap gap-3 sm:mt-[120px] mt-[80px] ">
                {movies &&
                  movies?.map((ele, index) => (
                    <div
                      className="w-[180px]  sm:h-[510px] sm:w-[282px] h-[334px] bg-[#092C39] rounded-xl hover:bg-[#082935] cursor-pointer"
                      key={index}
                      onClick={() => {
                        navigate(`/edit-movie/${ele?._id}`);
                      }}
                    >
                      <img
                        src={ele?.poster}
                        alt={ele?.title}
                        className="w-[180px] h-[246px] sm:w-[266px] sm:h-[400px] border-2 mx-auto mt-2 rounded-xl object-cover transition-transform duration-1000 ease-in-out transform hover:scale-105"
                      />
                      <div className="pl-3 flex flex-col gap-3 my-4 text-white">
                        <div className="sm:text-[20px] text-[16px]">
                          {ele?.title}
                        </div>
                        <div className="font-normal text-sm">
                          {ele.publishingYear}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {totalPages && (
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyMovie;
