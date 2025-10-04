import React, { useEffect } from "react";
import {
  FiUsers,
  FiCheckCircle,
  FiXCircle,
  FiTrendingUp,
  FiTarget,
  FiBarChart,
  FiEye,
} from "react-icons/fi";
import { TbTargetArrow } from "react-icons/tb";
import { GiOnTarget } from "react-icons/gi";
import { BiBuildings } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGet from "../Hooks/useGet";
import Loading from "../Ui/Loading";

const StatCard = ({ title, value, icon: Icon, color, bgColor, description }) => (
  <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all duration-300 hover:scale-105">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-3 rounded-lg ${bgColor} transition-colors`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <p className="text-2xl font-bold text-gray-800">{value ?? 0}</p>
    </div>
    <h3 className="text-gray-700 font-medium">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);

const ProgressBar = ({ label, value, total, color }) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2 text-sm text-gray-700">
        <span className="font-medium">{label}</span>
        <span className="font-semibold">
          {value ?? 0}/{total ?? 0}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${color} h-2.5 rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}%</p>
    </div>
  );
};

const Overview = () => {
  const { data, loading, error, status, get } = useGet();

  useEffect(() => {
    get("https://negotia.wegostation.com/api/sales/leads/home", 2, 1000);
  }, [get]);

  useEffect(() => {
    if (error) {
      toast.error(`Error loading data: ${error}`);
    }
    if (status === 200 && data) {
      toast.success("Sales data loaded successfully 🎉");
    }
  }, [error, status, data]);

  const sales = data?.data?.data || {
    total_leads: 0,
    NoOfApprove_company_leads: 0,
    NoOfApprove_my_leads: 0,
    NoOfReject_company_leads: 0,
    NoOfReject_my_leads: 0,
    interestedCount: 0,
    total_target: 0,
    my_target: 0,
  };

  const totalApproved =
    (sales.NoOfApprove_company_leads ?? 0) + (sales.NoOfApprove_my_leads ?? 0);
  const totalRejected =
    (sales.NoOfReject_company_leads ?? 0) + (sales.NoOfReject_my_leads ?? 0);

  if (loading) {
    return <Loading rows={10} cols={6} />;
  }

  return (
    <div className="min-h-screen bg-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FiBarChart className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-green-600">Sales Overview</h1>
          </div>
          <p className="text-gray-600">Track sales goals and leads</p>
          {data?.data?.message && (
            <p className="text-sm text-green-600 mt-1">✓ {data.data.message}</p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Leads"
            value={sales.total_leads ?? 0}
            icon={FiUsers}
            color="text-blue-600"
            bgColor="bg-blue-100"
            description="Total number of leads"
          />
          <StatCard
            title="My Target "
            value={sales.my_target ?? 0}
            icon={GiOnTarget}
            color="text-white"
            bgColor="bg-green-300"
          />
          <StatCard
            title="Interested Leads"
            value={sales.interestedCount ?? 0}
            icon={FiTrendingUp}
            color="text-green-600"
            bgColor="bg-green-100"
            description="Leads who showed interest"
          />
          <StatCard
            title="Approved Leads"
            value={totalApproved ?? 0}
            icon={FiCheckCircle}
            color="text-emerald-600"
            bgColor="bg-emerald-100"
            description="Total approvals"
          />
          <StatCard
            title="Rejected Leads"
            value={totalRejected ?? 0}
            icon={FiXCircle}
            color="text-red-600"
            bgColor="bg-red-100"
            description="Total rejections"
          />
          <StatCard
            title="Total Target "
            value={sales.total_target ?? 0}
            icon={TbTargetArrow}
            color="text-white"
            bgColor="bg-yellow-300"
          />
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Company vs My Leads */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <FiTarget className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Lead Details</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <BiBuildings className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-700">Company Leads</span>
                </div>
                <div className="flex gap-4">
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <FiCheckCircle className="w-4 h-4" />
                    {sales.NoOfApprove_company_leads ?? 0}
                  </span>
                  <span className="flex items-center gap-1 text-red-600 font-semibold">
                    <FiXCircle className="w-4 h-4" />
                    {sales.NoOfReject_company_leads ?? 0}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3">
                  <BsPerson className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-700">My Leads</span>
                </div>
                <div className="flex gap-4">
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <FiCheckCircle className="w-4 h-4" />
                    {sales.NoOfApprove_my_leads ?? 0}
                  </span>
                  <span className="flex items-center gap-1 text-red-600 font-semibold">
                    <FiXCircle className="w-4 h-4" />
                    {sales.NoOfReject_my_leads ?? 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <FiEye className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">Progress Tracking</h2>
            </div>

            <div className="space-y-6">
              <ProgressBar
                label="Interest Rate"
                value={sales.interestedCount ?? 0}
                total={sales.total_leads ?? 0}
                color="bg-gradient-to-r from-green-400 to-green-600"
              />
              <ProgressBar
                label="Approval Rate"
                value={totalApproved ?? 0}
                total={sales.total_leads ?? 0}
                color="bg-gradient-to-r from-blue-400 to-blue-600"
              />
              <ProgressBar
                label="Rejection Rate"
                value={totalRejected ?? 0}
                total={sales.total_leads ?? 0}
                color="bg-gradient-to-r from-red-400 to-red-600"
              />
          
              <ProgressBar
                label="Company Target Progress"
                value={totalApproved ?? 0}
                total={sales.total_target ?? 0}
                color="bg-gradient-to-r from-indigo-400 to-indigo-600"
              />
            </div>

            {/* Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-2xl font-bold text-green-600">
                    {sales.total_leads > 0
                      ? Math.round(((sales.interestedCount ?? 0) / (sales.total_leads ?? 0)) * 100)
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Interest Rate</p>
                </div>
                <div className="text-center bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-2xl font-bold text-blue-600">
                    {sales.total_leads > 0
                      ? Math.round(((totalApproved ?? 0) / (sales.total_leads ?? 0)) * 100)
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Success Rate</p>
                </div>
                <div className="text-center bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-2xl font-bold text-yellow-600">
                    {sales.total_target > 0
                      ? Math.round(((sales.my_target ?? 0) / (sales.total_target ?? 0)) * 100)
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-gray-600 font-medium">My Target %</p>
                </div>
                <div className="text-center bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <p className="text-2xl font-bold text-indigo-600">
                    {sales.total_target > 0
                      ? Math.round(((totalApproved ?? 0) / (sales.total_target ?? 0)) * 100)
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Company Target %</p>
                </div>
              </div>
            </div>

            {/* API Status */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Last updated: {new Date().toLocaleTimeString("en-US")}</span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() =>
              get("https://negotia.wegostation.com/api/sales/leads/home", 2, 1000)
            }
            className="bg-four text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
            disabled={loading}
          >
            <FiTarget className="w-4 h-4" />
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Overview;
