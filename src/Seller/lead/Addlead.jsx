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
    source_name: "",
    phone: "",
    country: "",
    city: "",
    activity_id: "",
  });

  const nav = useNavigate();

  // ⬇️ لجلب الانشطة
  const {
    data: optionsData,
    loading: loadingOptions,
    get: getActivities,
  } = useGet();

  // ⬇️ لجلب الدول و المدن
  const {
    data: locationsData,
    loading: loadingLocations,
    get: getLocations,
  } = useGet();

  const [activity, setActivity] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  // ⬇️ Call APIs
  useEffect(() => {
    getActivities("https://negotia.wegostation.com/api/admin/activities");
    getLocations(
      "https://negotia.wegostation.com/api/sales/leads/countries-cities"
    );
  }, [getActivities, getLocations]);

  // ⬇️ Parse activities
  useEffect(() => {
    if (optionsData) {
      setActivity(
        optionsData.data?.data?.map((l) => ({ id: l._id, name: l.name })) || []
      );
    }
  }, [optionsData]);

  // ⬇️ Parse countries & cities
  useEffect(() => {
    if (locationsData) {
      setCountries(
        locationsData.data?.data?.countries?.map((c) => ({
          id: c._id,
          name: c.name,
        })) || []
      );
      setCities(
        locationsData.data?.data?.cities?.map((c) => ({
          id: c._id,
          name: c.name,
          countryId: c.country?._id,
        })) || []
      );
    }
  }, [locationsData]);

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
    if (!form.source_name) {
      toast.error("Source is required ❌");
      return;
    }

    if (!form.phone) {
      toast.error("Phone is required ❌");
      return;
    }

    if (!form.country) {
      toast.error("Country is required ❌");
      return;
    }

    if (!form.city) {
      toast.error("City is required ❌");
      return;
    }

    if (!form.activity_id) {
      toast.error("Activity is required ❌");
      return;
    }

    const res = await post(
      "https://negotia.wegostation.com/api/sales/leads",
      form
    );

    if (res) {
      toast.success("Lead added successfully 🎉");
      setForm({
        name: "",
        phone: "",
        country: "",
        city: "",
        source_name: "",
        activity_id: "",
      });
      nav("/seller/lead");
    } else {
      toast.error(error, " ❌");
    }
  };

  // ⬇️ Cities filtered by selected country
  const filteredCities = form.country
    ? cities.filter((c) => c.countryId === form.country)
    : [];

  return (
    <div className="p-6 text-white">
      <Titles title="Add Lead" nav={"/seller/lead"} />

      {loadingOptions || loadingLocations ? (
        <Loading rows={5} cols={6} />
      ) : (
        <form
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
            placeholder="Source Name"
            name="source_name"
            value={form.source_name}
            onChange={(e) => handleChange("source_name", e.target.value)}
          />

          {/* Country */}
          <InputArrow
            placeholder="Country"
            name="country"
            value={form.country}
            onChange={(val) => handleChange("country", val)}
            options={countries}
          />

          {/* City */}
          <InputArrow
            placeholder="City"
            name="city"
            value={form.city}
            onChange={(val) => handleChange("city", val)}
            options={filteredCities}
          />

          {/* Activity */}
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
            {loading ? "Saving..." : "Save Lead"}
          </button>
        </form>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Addlead;
