import React, { useEffect, useState } from "react";
import { FiBarChart, FiTarget, FiUser, FiRefreshCw } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGet from "../Hooks/useGet";
import Loading from "../Ui/Loading";

const StatCard = ({ title, value, icon: Icon, color, bgColor }) => (
  <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all duration-300 hover:scale-105">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-3 rounded-lg ${bgColor}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <p className="text-2xl font-bold text-gray-800">{value ?? 0}</p>
    </div>
    <h3 className="text-gray-700 font-medium">{title}</h3>
  </div>
);

const OverView = () => {
  const { data, loading, error, status, get } = useGet();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; 

  const fetchData = () => {
    get(
      `https://qpjgfr5x-3000.uks1.devtunnels.ms/api/leader?month=${month}&year=${year}`,
      2,
      1000
    );
  };

  useEffect(() => {
    fetchData();
  }, [month, year]);

  useEffect(() => {
    if (error) toast.error(`Error: ${error}`);
    if (status === 200 && data) toast.success("Leader data loaded 🎉");
  }, [error, status, data]);

  const leaderData = data || {
    total_target: 0,
    salesPoint: 0,
    sales: [],
  };

  const filteredSales = leaderData.sales.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSales.length / pageSize);
  const paginatedSales = filteredSales.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FiBarChart className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-green-600">Leader Overview</h1>
            </div>
            <p className="text-gray-600">Track team target & performance</p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="px-3 py-2 rounded-lg border bg-white"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("en", { month: "long" })}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="px-3 py-2 rounded-lg border bg-white w-24"
            />

            <button
              onClick={fetchData}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FiRefreshCw />
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <Loading rows={10} cols={6} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <StatCard
                title="Total Target"
                value={leaderData.total_target}
                icon={FiTarget}
                color="text-blue-600"
                bgColor="bg-blue-100"
              />
              <StatCard
                title="Total Sales Points"
                value={leaderData.salesPoint}
                icon={FiUser}
                color="text-green-600"
                bgColor="bg-green-100"
              />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FiUser className="text-green-600" /> Sales Members
                </h2>
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Target Points</th>
                      <th className="px-4 py-2">Sales Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedSales.map((s, idx) => (
                      <tr key={idx} className="border-t text-gray-700">
                        <td className="px-4 py-2">{s.name}</td>
                        <td className="px-4 py-2">{s.email}</td>
                        <td className="px-4 py-2">{s.totalTargetPoints}</td>
                        <td className="px-4 py-2">{s.totalSalesPoints}</td>
                      </tr>
                    ))}
                    {paginatedSales.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center py-4 text-gray-500">
                          No sales data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default OverView;
