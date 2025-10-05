// Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoMdAddCircle } from "react-icons/io";

const Header = ({
  nav,
  title,
  searchQuery,
  setSearchQuery,
  like = false,
  stopsearch = false,
}) => {
  const navigate = useNavigate();

  return (
    <div className="my-5  px-1  ">
      <span className="py-10 md:py-15 font-bold text-[20px] md:text-[28px] text-white ">
        {title}
      </span>
      <div
        className={`flex ${
          stopsearch ? "justify-end" : "justify-between"
        } items-center gap-3`}
      >
        {!stopsearch && (
          <div className="relative mt-4 items-center w-1/2">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              placeholder="Search for anything in the table"
              className="w-full bg-one text-gray-200 placeholder-ten pl-10 pr-4 py-2 rounded-md border border-gray-600 focus:border-gray-400 focus:outline-none"
            />
            <i className="absolute left-0 top-0 h-full rounded-[12px] w-10 lg:w-[50px] flex items-center justify-center">
              <CiSearch className="text-ten text-2xl" />
            </i>
          </div>
        )}

        {!like && (
          <button
            onClick={() => navigate(nav)}
            className="bg-one flex gap-3 px-1 md:px-6 py-3 items-center rounded-2xl font-medium transition-transform hover:scale-105"
          >
            <span className="text-[12px] md:text-[16px] lg:text-[20px] lg:text-2xl bg-nine text-black px-8 py-2 rounded-[12px]">
              Add {title}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
