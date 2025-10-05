import React, { useState, useEffect } from "react";
import Titles from "../../Ui/Titles";
import InputField from "../../Ui/InputField";
import InputArrow from "../../Ui/InputArrow";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../../Ui/Loading";

import useGet from "../../Hooks/useGet";
import usePost from "../../Hooks/usePost";

const AddScheduled = () => {
  const nav = useNavigate();
  const { state } = useLocation(); // ✅ نستقبل البيانات من navigate
  const isFromOtherPage = !!state; // لو فيه state معناها جاي من صفحة تانية

  const [form, setForm] = useState({
    lead_id: state?._id || "",
    contact_date: "",
    contact_time: "",
    notes: "",
  });

  const { data: optionsData, loading: loadingOptions, get } = useGet();
  const { data, loading, post } = usePost();
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    get("https://negotia.wegostation.com/api/sales/my-scheduled-contacts");
  }, [get]);

  useEffect(() => {
    if (optionsData?.data) {
      setLeads(
        optionsData.data.leadOptions?.map((l) => ({ id: l._id, name: l.name })) ||
          []
      );
    }
  }, [optionsData]);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.lead_id) return toast.error("Please select a lead ❌");
    if (!form.contact_date) return toast.error("Please choose a contact date ❌");
    if (!form.contact_time) return toast.error("Please choose a contact time ❌");
    if (!form.notes) return toast.error("Please enter your notes ❌");

    try {
      const res = await post(
        "https://negotia.wegostation.com/api/sales/schedule-contact",
        form
      );

      if (res.success) {
        toast.success("Scheduled contact added successfully 🎉");
        setForm({
          lead_id: "",
          contact_date: "",
          contact_time: "",
          notes: "",
        });
        nav("/seller/scheduled");
      } else {
        toast.error(res.error?.message || "Failed to add scheduled contact ❌");
      }
    } catch (error) {
      toast.error(error?.error?.details?.message || "Something went wrong ❌");
    }
  };

  return (
    <div className="p-6 text-white">
      <Titles title="Add Scheduled Contact" nav={"/seller/scheduled"} />

      {loadingOptions ? (
        <Loading rows={5} cols={6} />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 mt-6 max-w-xl"
        >
          {/* ✅ عرض Lead بشكل مختلف حسب الحالة */}
          {isFromOtherPage ? (
            <InputField
              placeholder="Lead"
              name="lead_name"
              value={form.lead_name}
              disabled
            />
          ) : (
            <InputArrow
              placeholder="Lead"
              name="lead_id"
              value={form.lead_id}
              onChange={(val) => handleChange("lead_id", val)}
              options={leads}
            />
          )}

          <InputField
            placeholder="Contact Date"
            name="contact_date"
            type="date"
            value={form.contact_date}
            onChange={(e) => handleChange("contact_date", e.target.value)}
          />

          <InputField
            placeholder="Contact Time"
            name="contact_time"
            type="time"
            value={form.contact_time}
            onChange={(e) => handleChange("contact_time", e.target.value)}
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
