import React, { useState, useEffect } from "react";
import Titles from "../../Ui/Titles";
import InputField from "../../Ui/InputField";
import InputArrow from "../../Ui/InputArrow";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../Ui/Loading";

import useGet from "../../Hooks/useGet";
import usePost from "../../Hooks/usePost";

const AddScheduled = () => {
  const [form, setForm] = useState({
    lead_id: "",
    sales_id: "",
    contact_date: "",
    notes: "",
  });
  const nav = useNavigate();

  const { data: optionsData, loading: loadingOptions, error: errorOptions, get } =
    useGet();

  const { data, loading, error, post } = usePost();

  const [leads, setLeads] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    get(
      "https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/my-scheduled-contacts"
    );
  }, [get]);

  useEffect(() => {
    if (optionsData?.data) {
      setLeads(
        optionsData.data.leadOptions?.map((l) => ({ id: l._id, name: l.name })) ||
          []
      );
      setSales(
        optionsData.data.salesOptions?.map((s) => ({ id: s._id, name: s.name })) ||
          []
      );
    }
  }, [optionsData]);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.lead_id || !form.sales_id || !form.contact_date) {
      toast.error("Please fill all required fields ❌");
      return;
    }

    const res = await post(
      "https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/schedule-contact",
      form
    );

    if (res) {
      toast.success("Scheduled contact added successfully 🎉");
      setForm({
        lead_id: "",
        sales_id: "",
        contact_date: "",
        notes: "",
      });
      nav("/seller/addscheduled")
    } else {
      toast.error("Failed to add scheduled contact ❌");
    }
  };

  return (
    <div className="p-6 text-white">
      <Titles title="Add Scheduled Contact" nav={"/seller/addscheduled"} />

      {loadingOptions ? (        <Loading rows={5} cols={6} />
):(  <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 mt-6 max-w-xl"
      >
        <InputArrow
          placeholder="Lead"
          name="lead_id"
          value={form.lead_id}
          onChange={(val) => handleChange("lead_id", val)}
          options={leads}
        />

        <InputArrow
          placeholder="Sales"
          name="sales_id"
          value={form.sales_id}
          onChange={(val) => handleChange("sales_id", val)}
          options={sales}
        />

        <InputField
          placeholder="Contact Date"
          name="contact_date"
          type="date"
          value={form.contact_date}
          onChange={(e) => handleChange("contact_date", e.target.value)}
        />

        <InputField
          placeholder="Notes"
          name="notes"
          type="text"
          value={form.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-four hover:bg-four/75 disabled:opacity-50 transition px-6 py-3 rounded-xl font-medium"
        >
          {loading ? "Saving..." : "Save Scheduled Contact"}
        </button>
      </form>

)}

    
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddScheduled;
