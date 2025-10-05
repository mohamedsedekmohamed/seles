import React, { useEffect, useState } from "react";
import useGet from "../../Hooks/useGet";
import Table from "../../Ui/Table"; 
import Loading from "../../Ui/Loading";
import { toast ,ToastContainer} from "react-toastify";
import Header from "../../Ui/Header";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Leads = () => {
 const { data, loading, error, status, get } = useGet();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    get("https://negotia.wegostation.com/api/leader/leads", 2, 1000); 
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

  const leadss = data?.leads || [];
const changeSales = async (leadId, newSalesId) => {
  try {
    await axios.post(
      `https://negotia.wegostation.com/api/leader/leads/transfer/${leadId}`,
      { salesId: newSalesId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    toast.success("✅ Sales changed successfully");
    get("https://negotia.wegostation.com/api/leader/leads", 2, 1000); 
  } catch (error) {
    toast.error("❌ Failed to change sales",error);
  }
};

   const columns = [
    { key: "leads", label: "Lead Name", render: (_, row) => row.name|| "—", },
      { key: "status", label: "Status", render: (_, row) => row.status || "—" },
 { key: "city", label: "City", render: (_, row) => row.city?.name|| "—" },
  { key: "country", label: "Country", render: (_, row) => row.country?.name || "—" },
    {
      key: "sales_name",
      label: "Sales Name",
      render: (_, row) => row.sales_id?.name || "—",
    },
    {
        key: "actions",
    label: "Change Sales",
   render: (_, row) => (
  <select
    onChange={(e) => changeSales(row._id, e.target.value)}
    value={row.sales_id?._id || ""} 
    className="px-3 py-1 bg-four text-white rounded border border-gray-600"
  >
    <option value="" disabled>
      Select Sales
    </option>
    {data?.salesOptions?.map((sales) => (
      <option key={sales._id} value={sales._id}>
        {sales.name}
      </option>
    ))}
  </select>
),

    }
  ];
const filteredProducts = leadss.filter((p) => {
  const search = searchQuery.toLowerCase();

  return Object.values(p).some((value) =>
    String(value || "").toLowerCase().includes(search)
  );
});

  return (
    <div className="p-4  text-white">
  <Header
        title="Lead"
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
export default Leads