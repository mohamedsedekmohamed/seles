import React, { useEffect, useState } from "react";
import useGet from "../../Hooks/useGet";
import Table from "../../Ui/Table";
import Loading from "../../Ui/Loading";
import { toast, ToastContainer } from "react-toastify";
import Header from "../../Ui/Header";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Company = () => {
  const { data, loading, error, status, get } = useGet();
  const [searchQuery, setSearchQuery] = useState("");
  const [salesOptions, setSalesOptions] = useState([]);

  useEffect(() => {
    get(
      "https://negotia.wegostation.com/api/leader/leads/company",
      2,
      1000
    );
  }, [get]);
 useEffect(() => {
    const fetchSalesOptions = async () => {
      try {
        const res = await axios.get(
          "https://negotia.wegostation.com/api/leader/all_my_sales",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSalesOptions(res.data?.salesOptions || []);
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to load sales options");
      }
    };

    fetchSalesOptions();
  }, []);


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
      `https://negotia.wegostation.com/api/leader/leads/determine_sales/${leadId}`,
      { salesId: newSalesId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    toast.success("✅ Sales changed successfully");
    get("https://negotia.wegostation.com/api/leader/leads/company", 2, 1000); 
  } catch (error) {
    toast.error("❌ Failed to change sales");
  }
};
const columns = [
  { key: "leads", label: "Lead Name", render: (_, row) => row.name || "—" },
  { key: "phone", label: "Lead Phone", render: (_, row) => row.phone || "—" },
  { key: "address", label: "Lead Address", render: (_, row) => row.address || "—" },

  {
    key: "sales_id",
    label: "Sales",
    render: (_, row) => row.sales_id?.name || "—",
  },
  {
    key: "activity_name",
    label: "Activity Name",
    render: (_, row) => row.activity_id?.name || "—",
  },
  // {
  //   key: "activity_status",
  //   label: "Activity Status",
  //   render: (_, row) =>
  //     row.activity_id?.status ? "✅ Active" : row.activity_id ? "❌ Inactive" : "—",
  // },
  {
    key: "source_name",
    label: "Source Name",
    render: (_, row) => row.source_id?.name || "—",
  },
  // {
  //   key: "source_status",
  //   label: "Source Status",
  //   render: (_, row) => row.source_id?.status || "—",
  // },
  {
    key: "created_at",
    label: "Created At",
    render: (_, row) =>
      row.created_at ? new Date(row.created_at).toLocaleDateString() : "—",
  },
  {
    key: "actions",
    label: "Transfer",
    render: (_, row) => (
      <select
        onChange={(e) => changeSales(row._id, e.target.value)}
        value={row.sales_id?._id || ""}
        className="px-3 py-1 bg-four text-white rounded border border-gray-600"
      >
        <option  className="bg-gray-800" value="">Select Sales</option>
        {salesOptions?.map((sales) => (
          <option className="bg-gray-800" key={sales._id} value={sales._id}>
            {sales.name}
          </option>
        ))}
      </select>
    ),
  },
];

  const filteredProducts = leadss.filter((p) => {
    const search = searchQuery.toLowerCase();

    return Object.values(p).some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(search)
    );
  });

  return (
    <div className="p-4  text-white">
      <Header
        title="Company"
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
export default Company;
