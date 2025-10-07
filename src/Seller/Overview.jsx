import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiUsers,
  FiCheckCircle,
  FiXCircle,
  FiTrendingUp,
  FiBarChart,
  FiTarget,
    FiEye,
} from "react-icons/fi";

import { BiBuildings } from "react-icons/bi";
import { TbTargetArrow } from "react-icons/tb";
import { GiOnTarget } from "react-icons/gi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGet from "../Hooks/useGet";
import Loading from "../Ui/Loading";
import { BsPerson } from "react-icons/bs";

const StatCard = ({ title, value, icon: Icon, color, bgColor, description }) => (
  <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all duration-300 hover:scale-105">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-3 rounded-lg ${bgColor}`}>
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
      <div className="flex justify-between mb-1 text-sm text-gray-700">
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
  const [popupOffers, setPopupOffers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    get("https://negotia.wegostation.com/api/sales/leads/home", 2, 1000);
  }, [get]);

  useEffect(() => {
    if (error) toast.error(`Error loading data: ${error}`);
    if (status === 200 && data) toast.success("Sales data loaded successfully 🎉");

    const offers = data?.data?.data?.popup_offers || [];
    setPopupOffers(offers);
    setCurrentIndex(0);
  }, [error, status, data]);

  const sales = data?.data?.data || {};

  const totalApproved =
    (sales.NoOfApprove_company_leads ?? 0) + (sales.NoOfApprove_my_leads ?? 0);
  const totalRejected =
    (sales.NoOfReject_company_leads ?? 0) + (sales.NoOfReject_my_leads ?? 0);

  const totalTransfer =
    (sales.NoOfTransfer_company_leads ?? 0) + (sales.NoOfTransfer_my_leads ?? 0);

  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://negotia.wegostation.com/api/sales/popup-offers/mark-read",
        { popup_offer_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Offer marked as read ✅");
        setCurrentIndex((prev) => prev + 1);
      } else {
        toast.error("Failed to update status ❌");
      }
    } catch {
      toast.error("Server connection error ❌");
    }
  };

  if (loading) return <Loading rows={10} cols={6} />;

  const currentOffer = popupOffers[currentIndex];

  return (
    <div className="relative min-h-screen bg-indigo-100 p-6">
      {/* ✅ Popup Overlay */}
      {currentOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-[90%] relative animate-fadeIn">
            <img
              src={currentOffer.image}
              alt={currentOffer.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {currentOffer.title}
              </h2>
              <a
                href={currentOffer.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleMarkAsRead(currentOffer._id);
                  }}
                  className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-all duration-300"
                >
                  View Offer
                </button>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* باقي الصفحة */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FiBarChart className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-green-600">Sales Overview</h1>
          </div>
          <p className="text-gray-600">Track sales goals and leads</p>
        </div>

        {/* الإحصائيات */}
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
            title="My Target"
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
            title="My Point"
            value={sales.my_point ?? 0}
            icon={TbTargetArrow}
            color="text-white"
            bgColor="bg-yellow-300"
          />
        </div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
  {/* ✅ Performance Progress */}
  <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
    <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
      <FiTrendingUp className="text-green-500 w-5 h-5" />
      Performance Progress
    </h2>

    <div className="space-y-5">
      <ProgressBar
        label="Approved Leads Progress"
        value={totalApproved}
        total={sales.total_leads}
        color="bg-green-500"
      />
      <ProgressBar
        label="Rejected Leads Progress"
        value={totalRejected}
        total={sales.total_leads}
        color="bg-red-500"
      />
      <ProgressBar
        label="Interest Rate"
        value={sales.interestedCount}
        total={sales.total_leads}
        color="bg-yellow-500"
      />
      <ProgressBar
        label="Transfer Rate"
        value={totalTransfer}
        total={sales.total_leads}
        color="bg-gray-500"
      />
    </div>
  </div>

  {/* ✅ Lead Details */}
  <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
    <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
      <FiTarget className="text-blue-600 w-5 h-5" />
      Lead Details
    </h2>

    <div className="space-y-5">
      {/* Company Leads */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
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

      {/* My Leads */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200">
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
</div>

       


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

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Overview;
