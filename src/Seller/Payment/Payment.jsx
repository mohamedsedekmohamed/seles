import React, { useEffect, useState } from "react";
import Header from "../../Ui/Header";
import Table from "../../Ui/Table";
import Loading from "../../Ui/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGet from "../../Hooks/useGet";
import { FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

const Payment = () => {
  const { data, loading, error, status, get } = useGet();
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    get(
      "https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/payments/payment",
      2,
      1000
    );
  }, [get]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (status === 200) toast.success("Payments leaded successfully 🎉");
  }, [status]);

  const payments = data || {};
  const tabData = payments[activeTab] || [];

  const filteredData = tabData.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.lead_name.toLowerCase().includes(query) ||
      item.product.toLowerCase().includes(query) ||
      item.offer.toLowerCase().includes(query)
    );
  });

  const columns = [
    { key: "lead_name", label: "Lead Name" },
    { key: "lead_phone", label: "Phone" },
    { key: "product", label: "Product" },
    { key: "offer", label: "Offer" },
    { key: "payment_method", label: "Payment Method" },
    { key: "amount", label: "Amount" },
    {
      key: "status",
      label: "Status",
      render: (value) =>
        value === "Pending" ? (
          <span className="flex items-center gap-1 text-yellow-600">
            <FiClock /> Pending
          </span>
        ) : value === "Approve" ? (
          <span className="flex items-center gap-1 text-green-600">
            <FiCheckCircle /> Approve
          </span>
        ) : (
          <span className="flex items-center gap-1 text-red-600">
            <FiXCircle /> Reject
          </span>
        ),
    },
    {
      key: "proof_image",
      label: "Image",
      render: (value) =>
       <img src={value} className="w-5 h-5"/>
    },
    {
      key: "sale_date",
      label: "Sale Date",
      render: (value) => new Date(value).toLocaleString(),
    },
  ];

  return (
    <div className="p-6 text-white">
    

      {loading ?( <Loading rows={5} cols={6}/> ):(
<>
  <Header
      nav={"/seller/addpayment"}
        title="Payments"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
         <div className="flex justify-around gap-4 mb-4">
        {["pending", "approve", "reject"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl font-medium transition ${
              activeTab === tab
                ? "bg-four text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <Table columns={columns} data={filteredData} pageSize={5} />
</>
      ) }

      {/* Tabs */}
   

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Payment;
