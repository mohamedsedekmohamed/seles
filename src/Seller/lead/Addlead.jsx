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

const Addlead = () => {
   const [form, setForm] = useState({
     name: "",
      phone: "",
      address: "",
      activity_id: "",
    });
      const nav = useNavigate();
    const {
        data: optionsData,
        loading: loadingOptions,
        error: errorOptions,
        get,
      } = useGet();
      const[activity,setActivity]=useState([])
 useEffect(() => {
    get(
      "https://qpjgfr5x-3000.uks1.devtunnels.ms/api/admin/activities"
    );
  }, [get]);
     useEffect(() => {
        if (optionsData) {
          setActivity(
            optionsData.data?.data?.map((l) => ({ id: l._id, name: l.name })) ||
              []
          );
        }
      }, [optionsData]);
       const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };
   const { data, loading, error, post } = usePost();
  const handleSubmit = async (e) => {
    e.preventDefault();

   if (!form.name) {
  toast.error("Name is required ❌");
  return;
}

if (!form.phone) {
  toast.error("Phone is required ❌");
  return;
}

if (!form.address) {
  toast.error("Address is required ❌");
  return;
}

if (!form.activity_id) {
  toast.error("Activity is required ❌");
  return;
}

    const res = await post(
      "https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/leads",
      form
    );
    if (res) {
      toast.success("Lead  added successfully 🎉");
      setForm({
        name: "",
        phone: "",
        address: "",
        activity_id: "",
      });
      nav("/seller/lead")
    } else {
      toast.error(error," ❌");
    }
  };

  return (
       <div className="p-6 text-white">
      <Titles title="Add Lead " nav={"/seller/lead"} />

      {loadingOptions ? (   
             <Loading rows={5} cols={6} />
):(  <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 mt-6 max-w-xl"
      > 
        <InputField
          placeholder="Name"
          name="name"
          type="text"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <InputField
          placeholder="Phone"
          name="phone"
          type="number"
          min={0}
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <InputField
          placeholder="Address"
          name="address"
          type="text"
          value={form.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />
  <InputArrow
          placeholder="Activity"
          name="activity_id"
          value={form.activity_id}
          onChange={(val) => handleChange("activity_id", val)}
          options={activity}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-four hover:bg-four/75 disabled:opacity-50 transition px-6 py-3 rounded-xl font-medium"
        >
          {loading ? "Saving..." : "Save Payment "}
        </button>
      </form>

)}

    
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};


export default Addlead

