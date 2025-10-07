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

const AddLead = () => {
  const [form, setForm] = useState({
    name: "",
    source_id: "",
    phone: "",
    country: "",
    city: "",
    activity_id: "",
  });

  const nav = useNavigate();

  // 🔹 Custom hooks
  const {
    data: activitiesData,
    loading: loadingActivities,
    get: getActivities,
  } = useGet();

  const {
    data: sourcesData,
    loading: loadingSources,
    get: getSources,
  } = useGet();

  const {
    data: locationsData,
    loading: loadingLocations,
    get: getLocations,
  } = useGet();

  const [activities, setActivities] = useState([]);
  const [sources, setSources] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getActivities("https://negotia.wegostation.com/api/admin/activities");
    getLocations("https://negotia.wegostation.com/api/sales/leads/countries-cities");
    getSources("https://negotia.wegostation.com/api/sales/leads/sources");
  }, [getActivities, getLocations, getSources]);

  // 🔹 Parse activities
  useEffect(() => {
    if (activitiesData) {
      setActivities(
        activitiesData.data?.data?.map((l) => ({ id: l._id, name: l.name })) || []
      );
    }
  }, [activitiesData]);

  // 🔹 Parse sources
  useEffect(() => {
    if (sourcesData) {
      setSources(
        sourcesData.data?.data?.map((l) => ({ id: l._id, name: l.name })) || []
      );
    }
  }, [sourcesData]);

  // 🔹 Parse countries & cities
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

  // 🔹 Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name) return toast.error("Name is required ❌");
    if (!form.source_id) return toast.error("Source is required ❌");
    if (!form.phone) return toast.error("Phone is required ❌");
    if (!form.country) return toast.error("Country is required ❌");
    if (!form.city) return toast.error("City is required ❌");
    if (!form.activity_id) return toast.error("Activity is required ❌");

    // API call
    const res = await post("https://negotia.wegostation.com/api/sales/leads", form);

    if (res?.success) {
      toast.success("Lead added successfully 🎉");
      setForm({
        name: "",
        phone: "",
        country: "",
        city: "",
        activity_id: "",
        source_id: "",

      });
      nav("/seller/leads");
    } else {
      const errorMessage =
        res?.error?.message?.message ||
        res?.error ||
        "Something went wrong ❌";
      toast.error(errorMessage);
    }
  };

  // 🔹 Filter cities by country
  const filteredCities = form.country
    ? cities.filter((c) => c.countryId === form.country)
    : [];

  return (
    <div className="p-6 text-white">
      <Titles title="Add Lead" nav="/seller/lead" />

      {loadingActivities || loadingLocations || loadingSources ? (
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

          <InputArrow
            placeholder="Source"
            name="source_id"
            value={form.source_id}
            onChange={(val) => handleChange("source_id", val)}
            options={sources}
          />

          <InputArrow
            placeholder="Country"
            name="country"
            value={form.country}
            onChange={(val) => handleChange("country", val)}
            options={countries}
          />

          <InputArrow
            placeholder="City"
            name="city"
            value={form.city}
            onChange={(val) => handleChange("city", val)}
            options={filteredCities}
          />

          <InputArrow
            placeholder="Activity"
            name="activity_id"
            value={form.activity_id}
            onChange={(val) => handleChange("activity_id", val)}
            options={activities}
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

export default AddLead;
