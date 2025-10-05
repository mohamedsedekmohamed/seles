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

const EditLead = () => {
  const { state } = useLocation(); // البيانات جاية من navigate
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: state?.name || "",
    phone: state?.phone || "",
    address: state?.address || "",
    activity_id: state?.activity_id || "",
    status: state?.status || "",
  });

  // Hooks
  const { data: optionsData , get } = useGet();
  const { loading: saving, put } = usePut();

  const [activity, setActivity] = useState([]);

  // جلب الأنشطة
  useEffect(() => {
    get("https://negotia.wegostation.com/api/admin/activities");
  }, [get]);

  useEffect(() => {
    if (optionsData) {
      setActivity(
        optionsData.data?.data?.map((l) => ({
          id: l._id,
          name: l.name,
        })) || []
      );
    }
  }, [optionsData]);

  // تحديث قيمة الفورم
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await put(
        `https://negotia.wegostation.com/api/sales/leads/${state._id}`,
        form
      );
      toast.success("Lead updated successfully 🎉");
      nav("/seller/lead");
    } catch (err) {
      toast.error("Update failed ❌",err);
    }
  };

  return (
    <div className="p-6 text-white">
      <Titles title="Edit Lead" nav={"/seller/lead"} />

      {!state ? (
        <p>No lead data found</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 mt-6 max-w-xl"
        >
          <InputField
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <InputField
            placeholder="Phone"
            name="phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <InputField
            placeholder="Address"
            name="address"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          <InputArrow
            placeholder="Activity"
            name="activity_id"
            value={form.activity_id}
            options={activity.map((a) => ({ id: a.id, name: a.name }))}
            onChange={(value) => handleChange("activity_id", value)}
          />
          <InputArrow
            placeholder="Status"
            value={form.status}
            options={[
              { id: "intersted", name: "Interested" },
              { id: "negotiation", name: "Negotiation" },
              { id: "demo_request", name: "Demo Request" },
              { id: "demo_done", name: "Demo Done" },
              { id: "reject", name: "Reject" },
              { id: "approve", name: "Approve" },
            ]}
            onChange={(value) => handleChange("status", value)}
          />

          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
      )}

      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
};

export default EditLead;
