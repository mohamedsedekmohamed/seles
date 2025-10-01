import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Titles from "../../Ui/Titles";
import Loading from "../../Ui/Loading";
import usePut from "../../Hooks/usePut";
import useGet from "../../Hooks/useGet";
import InputField from "../../Ui/InputField";
import InputArrow from "../../Ui/InputArrow";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditScheduled = () => {
  const { state } = useLocation();
  const nav = useNavigate();

  const [form, setForm] = useState({
    lead_id: "",
    sales_id: "",
    contact_date: "",
    contact_time: "",
    notes: "",
  });

  const [leads, setLeads] = useState([]);
  const [sales, setSales] = useState([]);

  const { data: details, loading: loadingDetails, get } = useGet();
  const { data: updateData, loading: updating, put } = usePut();
  const { data: optionsData, loading: loadingOptions, get: getOptions } = useGet();

  useEffect(() => {
    console.log(state.row._id)
   if (state.row._id) {
  get(`https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/schedule-contact/${state.row._id}`);
}

    getOptions(
      "https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/my-scheduled-contacts"
    );
  }, [state, get, getOptions]);

  // fill form after fetch
  useEffect(() => {
    if (details?.data?.data) {
      const d = details.data.data;
      setForm({
        lead_id: d.lead_id?._id || "",
        sales_id: d.sales_id?._id || "",
        contact_date: d.contact_date
          ? new Date(d.contact_date).toISOString().split("T")[0]
          : "",
        contact_time: d.contact_time || "",
        notes: d.notes || "",
      });
    }
  }, [details]);

  // prepare options for selects
  useEffect(() => {
    if (optionsData?.data) {
      setLeads(
        optionsData.data.leadOptions?.map((l) => ({ id: l._id, name: l.name })) || []
      );
      setSales(
        optionsData.data.salesOptions?.map((s) => ({ id: s._id, name: s.name })) || []
      );
    }
  }, [optionsData]);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.lead_id) return toast.error("Please select a lead ❌");
    if (!form.sales_id) return toast.error("Please select a sales person ❌");
    if (!form.contact_date) return toast.error("Please choose a contact date ❌");
    if (!form.contact_time) return toast.error("Please choose a contact time ❌");
    if (!form.notes) return toast.error("Please enter your notes ❌");

    try {
     const res = await put(
  `https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/schedule-contact/${state.row._id}`,
  form
);

      

      if (res.success) {
        toast.success("Scheduled contact updated successfully 🎉");
        nav("/seller/scheduled");
      } else {
        toast.error(res.error?.message || "Failed to update scheduled contact ❌");
      }
    } catch (error) {
      toast.error(error?.error?.details?.message || "Something went wrong ❌");
    }
  };

  return (
    <div className="p-6 text-white">
      <Titles title="Edit Scheduled Contact" nav={"/seller/scheduled"} />

      {loadingDetails || loadingOptions ? (
        <Loading rows={5} cols={6} />
      ) : (
        <form
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
            disabled={updating}
            className="bg-four hover:bg-four/75 disabled:opacity-50 transition px-6 py-3 rounded-xl font-medium"
          >
            {updating ? "Updating..." : "Update Scheduled Contact"}
          </button>
        </form>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditScheduled;
