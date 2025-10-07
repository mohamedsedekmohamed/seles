import React, { useEffect, useState } from "react";
import Header from "../../Ui/Header";
import Table from "../../Ui/Table";
import Loading from "../../Ui/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGet from "../../Hooks/useGet";
import axios from "axios";
import AddPaymentFromLead from "../Payment/AddPaymentFromLead";
import { useNavigate } from "react-router-dom";

const Leads = () => {
  const { loading } = useGet();
  const [edit, setEdit] = useState(false);
  const [mainTab, setMainTab] = useState("company");
  const [subTab, setSubTab] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  const [openPayment, setOpenPayment] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
const navigate = useNavigate();
  const [tabData, setTabData] = useState({
    default: { company_leads: [], my_leads: [] },
    intersted: { company_leads: [], my_leads: [] },
    active: { company_leads: [], my_leads: [] },
    transfer: { company_leads: [], my_leads: [] },
    demo: { company_leads: [], my_leads: [] },
    approved: { company_leads: [], my_leads: [] },
    rejected: { company_leads: [], my_leads: [] },
  });

  const statusOptions = [
    { id: "intersted", name: "Interested" },
    { id: "negotiation", name: "Negotiation" },
    { id: "demo_request", name: "Demo Request" },
    { id: "demo_done", name: "Demo Done" },
    { id: "reject", name: "Reject" },
    { id: "approve", name: "Approve" },
  ];

  const handleStatusChange = async (id, newStatus, row) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://negotia.wegostation.com/api/sales/leads/${id}`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) throw new Error("Failed to update status");

      toast.success("Status updated ✅");
      setEdit((per) => !per);

      if (newStatus === "approve") {
        setSelectedLead(row);
        setOpenPayment(true);
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed ❌");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://negotia.wegostation.com/api/sales/leads",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const data = response.data;
          setTabData(data);
          toast.success("Leads loaded 🎉");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load data ❌");
      }
    };
    fetchData();
  }, [edit]);
  const normalizeLead = (lead) => ({
    _id: lead._id,
    name: lead.name || "-",
    phone: lead.phone || "-",
     country: lead.country ? lead.country.name : "-", 
  city: lead.city ? lead.city.name : "-",        
    type: lead.type || "-",
    status: lead.status || "-",
    activity_id: lead.activity_id ? lead.activity_id._id : null,
    activity: lead.activity_id ? lead.activity_id.name : "-",
    source: lead.source_id ? lead.source_id.name : "-",
    created_at: lead.created_at
      ? new Date(lead.created_at).toLocaleString()
      : "-",
      country_id:lead.country ? lead.country._id: "-",
      city_id: lead.city ? lead.city._id: "-",
      source_id: lead.source_id ? lead.source_id._id: "-",
  });
  const leads = tabData[subTab]?.[`${mainTab}_leads`] || [];
  const normalizedLeads = leads.map(normalizeLead);
const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.delete(
      `https://negotia.wegostation.com/api/sales/leads/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      toast.success("Lead deleted successfully 🗑️");
      setEdit((prev) => !prev); 
    } else {
      toast.error("Failed to delete lead ❌");
    }
  } catch (error) {
    console.error(error);
    toast.error("Server error while deleting ❌");
  }
};

  const filteredData = normalizedLeads.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.phone.toLowerCase().includes(query) ||
      item.city.toLowerCase().includes(query)||
      item.country.toLowerCase().includes(query)||
      item.activity.toLowerCase().includes(query) ||
      item.source.toLowerCase().includes(query)||
      item.status.toLowerCase().includes(query)

    );
  });

  const baseColumns = [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
{
  key: "address",
  label: "Address",
  render: (_, row) => (
    <span className="text-gray-200">
      {row.city && row.country
        ? `${row.city}, ${row.country}`
        : row.city || row.country || "-"}
    </span>
  ),
},

  {
  key: "status",
  label: "Status",
  render: (status) => {
    if (subTab === "demo") {
      if (status === "demo_request") {
        return (
          <span className="px-3 py-1 rounded-full bg-yellow-600 text-white text-sm">
            Demo Request
          </span>
        );
      }
      if (status === "demo_done") {
        return (
          <span className="px-3 py-1 rounded-full bg-green-600 text-white text-sm">
            Demo Done
          </span>
        );
      }
    }

    return (
      <span className=" p-3 text-gray-300 cursor-pointer">
        {status}
      </span>
    );
  },
}
,
    { key: "activity", label: "Activity" },
    { key: "source", label: "Source" },
   {
    key: "follow_up",
    label: "Follow Up",
    render: (_, row) => (
      <button
        onClick={() => navigate("/seller/addscheduled", { state: row })}
        className="px-4 py-2 bg-four hover:bg-four/70 text-white rounded-lg transition-all"
      >
        Follow Ups
      </button>
    ),
  },
   
    {
  key: "actions",
  label: "Actions",
  render: (_, row) => {
    const availableOptions = statusOptions.filter(
      (option) => option.id !== row.status   
    );

    return (
      <div className="flex gap-3">
        <select
          defaultValue="" // 👈   فاضي
          onChange={(e) => {
            if (e.target.value) {
              handleStatusChange(row._id, e.target.value, row);
            }
          }}
          className="px-3 py-1 rounded bg-gray-700 text-white cursor-pointer"
        >
          <option value="" disabled>
            Change status
          </option>
          {availableOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  },
}

  ];
const newColumns = [
  ...baseColumns,
  ...(mainTab === "my"
    ? [
        {
          key: "edit",
          label: "D%E",
          render: (_, row) => (
            <div className="flex gap-4">
            <button
              onClick={() => navigate("/seller/editlead", { state: row })}
              className="px-4 py-2 bg-four hover:bg-four/70 text-white rounded-lg transition-all"
              >
              Edit
            </button>
            <button
              onClick={()=>handleDelete(row._id)}
              className="px-4 py-2 bg-red-500 hover:bg-red-800 text-white rounded-lg transition-all"
              >
              Delete
            </button>
              </div>
          ),
        },
      ]
    : []),
];


  return (
    <div className="p-6 text-white">
      {loading ? (
        <Loading rows={5} cols={6} />
      ) : (
        <>
          <Header
            nav={"/seller/addlead"}
            title="Leads"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Main Tabs */}
          <div className="flex flex-wrap justify-around gap-4 mb-4">
            {["company", "my"].map((tab) => (
              <button
                key={tab}
                onClick={() => setMainTab(tab)}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  mainTab === tab
                    ? "bg-four text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {tab === "company" ? "Company Leads" : "My Leads"}
              </button>
            ))}
          </div>

<div className="flex justify-around gap-4 mb-4 flex-wrap">
  {[
    { value: "default", label: "Default" },
    { value: "intersted", label: "Intersted" },
    { value: "negotiation", label: "Negotiation" },
    { value: "demo", label: "Demo" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "transfer", label: "Transfer" },
  ].map((tab) => {
    const count =
      tabData[tab.value]?.[`${mainTab}_leads`]?.length || 0;

    return (
      <button
        key={tab.value}
        onClick={() => setSubTab(tab.value)}
        className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition ${
          subTab === tab.value
            ? "bg-green-600 text-white"
            : "bg-gray-700 text-gray-300"
        }`}
      >
        <span>{tab.label}</span>
        <span
          className={`text-sm px-2 py-0.5 rounded-full ${
            subTab === tab.value ? "bg-white text-green-600" : "bg-gray-500 text-white"
          }`}
        >
          {count}
        </span>
      </button>
    );
  })}
</div>



          <Table columns={newColumns} data={filteredData} pageSize={5} />
        </>
      )}

      {/* ✅ Popup */}
      {openPayment && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-2xl relative">
            <button
              onClick={() => setOpenPayment(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <AddPaymentFromLead
              lead={selectedLead}
              onClose={() => setOpenPayment(false)}
            />
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
};

export default Leads;
