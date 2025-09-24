import React from 'react'
import { AiFillSchedule } from "react-icons/ai";

const IconScheduled= ({ active }) => {
  const iconColor = active ? "#31FF70" : "#6B7789";
  return (
    <div>
         <AiFillSchedule className={`w-8 h-8 `} style={{ color: iconColor }}/>
     
    </div>
  );
};

export default IconScheduled;
