// Titles.jsx
import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Titles = ({ title }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // للرجوع للصفحة السابقة
  };

  return (
    <div className="flex items-center gap-4 py-4">
      <button 
        onClick={handleGoBack}
        className="pr-2 text-white rounded-full hover:bg-gray-700 focus:outline-none"
      >
        <IoMdArrowBack size={24} />
      </button>

      <h1 className=" text-[14px] md:text-[20px] lg:text-2xl font-bold text-four">
        {title}
      </h1>
    </div>
  );
};

export default Titles;
