import React, { useEffect, useState } from "react";
import useGet from "../../Hooks/useGet";
import Table from "../../Ui/Table"; 
import Loading from "../../Ui/Loading";
import { toast ,ToastContainer} from "react-toastify";
import Header from "../../Ui/Header";
import "react-toastify/dist/ReactToastify.css";
const Commission = () => {
  const { data, loading, error, status, get } = useGet();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    get("https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/commission", 2, 1000); 
  }, [get]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (status === 200) {
      toast.success("Commissions loaded successfully 🎉");
    }
  }, [status]);

  const commissions = data?.data?.data?.commissions || [];

  const columns = [
    { key: "point_threshold", label: "Point Threshold" },
    { key: "amount", label: "Amount" },
    { key: "type", label: "Type" },
    { key: "level_name", label: "Level Name" },
    {
      key: "created_at",
      label: "Created At",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "my_level",
      label: "My Level",
      render: (value) => (value ? "✅ Yes" : "❌ No"),
    },
  ];
const filteredProducts = commissions.filter((p) => {
  const search = searchQuery.toLowerCase();

  return Object.values(p).some((value) =>
    String(value || "").toLowerCase().includes(search)
  );
});

  return (
    <div className="p-4  text-white">
  <Header
        title="Commission"
        like={true}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {loading ? (
        <Loading rows={5} cols={6} />
      ) : (
        <Table columns={columns} data={filteredProducts} pageSize={5} />
      )}
            <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
};

export default Commission;
