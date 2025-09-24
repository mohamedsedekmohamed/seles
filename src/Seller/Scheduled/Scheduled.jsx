import React, { useEffect, useState } from "react";
import Header from "../../Ui/Header";
import Table from "../../Ui/Table";
import Loading from "../../Ui/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGet from "../../Hooks/useGet";

const Scheduled = () => {
  const { data, loading, error, status, get } = useGet();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    get(
      "https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/my-scheduled-contacts",
      2,
      1000
    );
  }, [get]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (status === 200) {
      toast.success("Scheduled loaded successfully 🎉");
    }
  }, [status]);

  const offers = data?.data?.data || [];

  const filteredOffers = offers.filter((o) => {
    const search = searchQuery.toLowerCase();
    return (
      o.lead_id?.name?.toLowerCase().includes(search) ||
      o.lead_id?.phone?.toLowerCase().includes(search) ||
      o.sales_id?.name?.toLowerCase().includes(search) ||
      o.notes?.toLowerCase().includes(search)
    );
  });

  const columns = [
    { key: "lead_name", label: "Client Name" },
    { key: "lead_phone", label: "Client Phone" },
    { key: "sales_name", label: "Sales Rep" },
    {
      key: "contact_date",
      label: "Date",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    { key: "notes", label: "Notes" },
    {
      key: "status",
      label: "Status",
      render: (value) => (value ? "✅ Done" : "❌ Pending"),
    },
  ];

  const tableData = filteredOffers.map((item) => ({
    lead_name: item.lead_id?.name,
    lead_phone: item.lead_id?.phone,
    sales_name: item.sales_id?.name,
    contact_date: item.contact_date,
    notes: item.notes,
    status: item.status,
  }));

  return (
    <div className="p-4 text-white">
      <Header
      nav="/seller/addscheduled"
        title="Scheduled"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {loading ? (
        <Loading rows={5} cols={6} />
      ) : (
        <Table columns={columns} data={tableData} pageSize={5} />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Scheduled;
