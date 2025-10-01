import React, { use, useEffect, useState } from "react";
import Header from "../../Ui/Header";
import Table from "../../Ui/Table";
import Loading from "../../Ui/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGet from "../../Hooks/useGet";
import { useNavigate } from "react-router";
import axios from "axios";

const Leads = () => {
  const { data, loading, error, status, get } = useGet();
const [edit,setEdit]=useState(false)
  const [mainTab, setMainTab] = useState("company");
  const [subTab, setSubTab] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  const [tabData, setTabData] = useState({
    company: {
      default: [],
      demo: [],
      approve: [],
      reject: [],
      transfer: [],
    },
    my: {
      default: [],
      demo: [],
      approve: [],
      reject: [],
      transfer: [],
    },
  });
const statusOptions = [
  { id: "intersted", name: "Interested" },
  { id: "negotiation", name: "Negotiation" },
  { id: "demo_request", name: "Demo Request" },
  { id: "demo_done", name: "Demo Done" },
  { id: "reject", name: "Reject" },
  { id: "approve", name: "Approve" },
];
const handleStatusChange = async (id, newStatus) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/leads/${id}`,
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

   setEdit(per=>(!per))
  } catch (err) {
    console.error(err);
    toast.error("Update failed ❌");
  }
};


  const apiMap = {
    default: "https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/leads",
    demo: "https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/leads/demoLead",
    approve: "https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/leads/approveLead",
    reject: "https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/leads/rejectLead",
    transfer: "https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/leads/transferLead",
  };

  const [lastLoaded, setLastLoaded] = useState(null);

  useEffect(() => {
    setLastLoaded(null);
  }, [mainTab]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTabData((prev) => ({
          ...prev,
          [mainTab]: {
            ...prev[mainTab],
            [subTab]: [],
          },
        }));
        
        await get(apiMap[subTab], 2, 1000);
                toast.success(`${subTab} leads loaded 🎉`);

      } catch (err) {
        toast.error("Failed to load data ❌");
      }
    };
    
    fetchData();
  }, [subTab, mainTab, get,edit]); 

  useEffect(() => {
    if (status === 200 && data) {
      const key = `${mainTab}_${subTab}`;
      
      const newData = mainTab === "company" 
        ? data.company_leads || [] 
        : data.my_leads || [];

      if (newData.length > 0 || data) {

        setTabData((prev) => ({
          ...prev,
          [mainTab]: {
            ...prev[mainTab],
            [subTab]: newData,
          },
        }));

        setLastLoaded(key);
      }
    }
  }, [status, data, subTab, mainTab]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const normalizeLead = (lead) => ({
    _id: lead._id,
    name: lead.name || "-",
    phone: lead.phone || "-",
    type: lead.type || "-",
    address: lead.address || "-",
    status: lead.status || "-",
    activity_id: lead.activity_id ? lead.activity_id._id : null,
    activity: lead.activity_id ? lead.activity_id.name : "-",
    source: lead.source_id ? lead.source_id.name : "-",
    created_at: lead.created_at
      ? new Date(lead.created_at).toLocaleString()
      : "-",
  });

  const leads = tabData[mainTab]?.[subTab] || [];
  const normalizedLeads = leads.map(normalizeLead);

  const filteredData = normalizedLeads.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.phone.toLowerCase().includes(query) ||
      item.address.toLowerCase().includes(query)
    );
  });

  const navigate = useNavigate();
const handlePayment = (row) => {
    navigate("/seller/AddPaymentFromLead", { state: { row } });
  };
  const handleEdit = (row) => {
    navigate("/seller/editlead", { state: row });
  };

  const handleMainTabChange = (tab) => {
    if (tab !== mainTab) {
      setMainTab(tab);
      setLastLoaded(null); 
    }
  };

  // ✅ تحسين subTab handler  
  const handleSubTabChange = (tab) => {
    if (tab !== subTab) {
      setSubTab(tab);
    }
  };

  const baseColumns = [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
    { key: "status", label: "Status" },
    { key: "activity", label: "Activity" },
    { key: "source", label: "Source" },
  ];

  const columns =
    mainTab === "my"
      ? [
          ...baseColumns,
          {
            key: "actions",
            label: "Actions",
            render: (_, row) => (
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(row)}
                  className="px-3 py-1 text-sm rounded bg-four text-white hover:bg-four/80"
                >
                  Edit
                </button>
                {subTab==="approve"&&(
                   <button
                  onClick={() => handlePayment(row._id)}
                  className="px-3 py-1 text-sm rounded bg-four/50 text-white hover:bg-four/80"
                >
                  Payment
                </button>
                )
                }
             



              <select
              value={row.status}
              onChange={(e) => handleStatusChange(row._id, e.target.value)}
              className="px-2 py-1 rounded bg-gray-700 text-white"
            >
              {statusOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
              </div>
            ),
          },
        ]
      : baseColumns;

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
                onClick={() => handleMainTabChange(tab)}
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

          {/* Sub Tabs */}
          <div className="flex justify-around gap-4 mb-4 flex-wrap">
            {["default", "demo", "approve", "reject", "transfer"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleSubTabChange(tab)}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  subTab === tab
                    ? "bg-green-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

      

          <Table columns={columns} data={filteredData} pageSize={5} />
        </>
      )}

      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
};

export default Leads;