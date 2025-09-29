import React from 'react'
import { FaPeopleGroup } from "react-icons/fa6";

const IconCompany = ({ active }) => {
  const iconColor = active ? "#31FF70" : "#6B7789";
  return (
    <div>
    <FaPeopleGroup className={`w-8 h-8 `} style={{ color: iconColor }}/>
    </div>
  );
};

export default IconCompany