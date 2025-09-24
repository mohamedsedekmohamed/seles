// Ui/Loading.jsx
import React from "react";

const Loading = ({ rows = 5, cols = 4 }) => {
  return (
    <div className="animate-pulse space-y-4 p-2">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-6 flex-1 rounded bg-gray-700"
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Loading;
