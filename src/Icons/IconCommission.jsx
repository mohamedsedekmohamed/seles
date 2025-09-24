import React from 'react'
import { GiTakeMyMoney } from "react-icons/gi";

const IconCommission = ({ active }) => {
  const iconColor = active ? "#31FF70" : "#6B7789";
  return (
    <div>
    <GiTakeMyMoney className={`w-8 h-8 `} style={{ color: iconColor }}/>
    </div>
  );
};


export default IconCommission