import React from 'react'
import { RiAlignItemLeftFill } from "react-icons/ri";

const IconProduct = ({ active }) => {
  const iconColor = active ? "#31FF70" : "#6B7789";
  return (
    <div>
    <RiAlignItemLeftFill className={`w-8 h-8 `} style={{ color: iconColor }}/>
    </div>
  );
};
export default IconProduct