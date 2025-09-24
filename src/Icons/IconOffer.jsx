import React from 'react'
import { BiSolidOffer } from "react-icons/bi";

const IconOffer = ({ active }) => {
  const iconColor = active ? "#31FF70" : "#6B7789";
  return (
    <div>
    <BiSolidOffer className={`w-8 h-8 `} style={{ color: iconColor }}/>
    </div>
  );
};

export default IconOffer