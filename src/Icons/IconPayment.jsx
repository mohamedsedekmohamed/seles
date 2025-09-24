import React from 'react'
import { MdPayment } from "react-icons/md";

const IconPayment = ({ active }) => {
  const iconColor = active ? "#31FF70" : "#6B7789";
  return (
    <div>
    <MdPayment className={`w-8 h-8 `} style={{ color: iconColor }}/>
    </div>
  );
};

export default IconPayment