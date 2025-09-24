// LeaderNavbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LeaderNavbar = ({ setRole }) => {
  const navigate = useNavigate();

  const loghandled = () => {
    localStorage.removeItem("token");
    setRole(null);
    navigate("/");
  };

  return (
    <div className="w-full flex justify-between items-center relative">
      <div className="flex items-center gap-0.5">
        <div className="flex flex-col">
          <span className="text-[12px] md:text-2xl font-bold text-white">Admin</span>
          <div className="flex items-center text-five gap-0.5">
            <span className="text-[12px] md:text-[14px] font-bold text-five">
              Admin.@gmail.com
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-0.5">
        <button onClick={loghandled}>
          <span
            className="text-[12px] md:text-[18px] 
              text-white 
              border border-six 
              py-3 px-8 
              rounded-[12px] 
              transition-all duration-300 
              hover:bg-six 
              hover:text-black
              hover:border-white"
          >
            Log Out
          </span>
        </button>
      </div>
    </div>
  );
};

export default LeaderNavbar;
