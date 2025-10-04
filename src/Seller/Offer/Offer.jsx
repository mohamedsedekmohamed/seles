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
    get("https://negotia.wegostation.com/api/sales/offers/offer", 2, 1000);
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
    {
      key: "discount",
      label: "Discount",
      render: (_, row) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            row.discount_type === "percentage"
              ? "bg-green-600 text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          {row.discount_type === "percentage"
            ? `${row.discount_amount}%`
            : `${row.discount_amount} EPG`}
        </span>
      ),
    },
    {
      key: "product",
      label: "Product",
      render: (_, row) => (
        <div>
          <p className="font-semibold">{row.product_name}</p>
          {row.product_subscription_type ? (
            <p className="text-sm text-gray-400">
              {row.product_subscription_type} - ${row.product_price}
            </p>
          ) : (
            <p className="text-sm text-gray-400">
              Setup Fees: ${row.product_setup_fees}
            </p>
          )}
        </div>
      ),
    },
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
          <Table columns={columns} data={filteredOffers} pageSize={3} />
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Offer;
