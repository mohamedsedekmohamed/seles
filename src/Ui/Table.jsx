import React, { useState } from "react";

const Table = ({ columns, data, charLimit = 30, pageSize =10 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const truncateText = (text) => {
    if (!text) return "";
    return text.length > charLimit ? text.substring(0, charLimit) + "..." : text;
  };

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700 text-sm text-left">
        <thead className="bg-gray-800">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-semibold text-gray-200">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700 bg-gray-900">
          {currentData.length > 0 ? (
            currentData.map((row, idx) => (
              <tr key={row._id || idx} className="hover:bg-gray-800">
                {columns.map((col) => (
                 <td key={col.key} className="px-4 py-3 text-gray-300">
  {col.render
    ? col.render(row[col.key], row) 
    : truncateText(String(row[col.key] || ""))}
</td>

                  
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

       <div className="flex items-center justify-center gap-2 p-4 bg-gray-800">
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

  {/* زرار Next */}
  <button
    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
    disabled={currentPage === totalPages}
    className="px-3 py-1 rounded bg-gray-700 text-gray-200 disabled:opacity-50"
  >
    Next
  </button>
</div>

    </div>
  );
};

export default Table;
