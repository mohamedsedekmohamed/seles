import React, { useEffect, useState } from "react";
import Header from "../../Ui/Header";
import Table from "../../Ui/Table";
import Loading from "../../Ui/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGet from "../../Hooks/useGet";
const Offer = () => {
  const { data, loading, error, status, get } = useGet();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    get(
      "https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/offers/offer",
      2,
      1000
    );
  }, [get]);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  useEffect(() => {
    if (status === 200) {
      toast.success("Offers loaded successfully 🎉");
    }
  }, [status]);
  const offers = data?.offers || [];

  const filteredOffers = offers.filter((o) => {
    const search = searchQuery.toLowerCase();
    return Object.values(o).some((value) =>
      String(value || "").toLowerCase().includes(search)
    );
  });
const columns = [
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
  {
    key: "start_date",
    label: "Start Date",
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    key: "end_date",
    label: "End Date",
    render: (value) => new Date(value).toLocaleDateString(),
  },
  { key: "discount_type", label: "Discount Type" },
  { key: "discount_amount", label: "Discount Amount" },
  { key: "subscription_details", label: "Subscription Details" },
  { key: "setup_phase", label: "Setup Phase" },
  { key: "product_id", label: "Product" },
  { key: "price_month", label: "Price (Month)" },
  { key: "price_quarter", label: "Price (Quarter)" },
  { key: "price_year", label: "Price (Year)" },
];

  return (
    <div className="p-4 text-white">
      <Header
        title="Offers"
        like={true}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {loading ? (
        <Loading rows={5} cols={7} />
      ) : (
        <div className="mt-6">
          <Table columns={columns} data={filteredOffers} pageSize={5} />
        </div>
      )}
      {/* Toast */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Offer;
