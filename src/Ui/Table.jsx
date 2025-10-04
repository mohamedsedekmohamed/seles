import React, { useState } from "react";

const Table = ({ columns, data, charLimit = 30, pageSize = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [popupContent, setPopupContent] = useState(null); // store clicked text

  const truncateText = (text) => {
    if (!text) return "";
    return text.length > charLimit ? text.substring(0, charLimit) + "..." : text;
  };

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700  relative">
      <table className="min-w-full divide-y divide-gray-700 text-sm text-left">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-200">#</th>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 font-semibold text-gray-200"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
   <tbody className="divide-y divide-gray-700 bg-gray-900">
  {currentData.length > 0 ? (
    currentData.map((row, idx) => (
      <tr key={row._id || idx} className="hover:bg-gray-800">
        <td className="px-4 py-3 text-gray-400 font-medium">
          {idx + 1}
        </td>

        {/* باقي الأعمدة */}
        {columns.map((col) => {
          const value = String(row[col.key] || "");
          const isTruncated = value.length > charLimit;
          return (
            <td
              key={col.key}
              className="px-4 py-3 text-gray-300 cursor-pointer"
              onClick={() =>
                isTruncated ? setPopupContent(value) : null
              }
            >
              {col.render
                ? col.render(row[col.key], row)
                : truncateText(value)}
            </td>
          );
        })}
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan={columns.length + 1} // +1 علشان عمود الـ index الجديد
        className="px-4 py-6 text-center text-gray-500"
      >
        No data available
      </td>
    </tr>
  )}
</tbody>

      </table>

   <div className="sticky bottom-0 left-0 w-full bg-gray-800 p-4">
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-700 text-gray-200 disabled:opacity-50"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1
              ? "bg-four text-white"
              : "bg-gray-700 text-gray-200 hover:bg-gray-600"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-700 text-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>


      {/* Popup Modal */}
      {popupContent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">Full Data</h2>
            <p className="text-gray-300 break-words">{popupContent}</p>
            <button
              onClick={() => setPopupContent(null)}
              className="mt-4 px-4 py-2 rounded bg-four text-white hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
