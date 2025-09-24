import React, { useEffect, useState } from "react";
import Header from "../../Ui/Header";
import Table from "../../Ui/Table";
import Loading from "../../Ui/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGet from "../../Hooks/useGet";

const Product = () => {
  const { data, loading, error, status, get } = useGet();
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ استدعاء API
  useEffect(() => {
    get(
      "https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/products/product",
      2,
      1000
    );
  }, [get]);

  // ✅ عرض الخطأ
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // ✅ رسالة نجاح
  useEffect(() => {
    if (status === 200) {
      toast.success("Products loaded successfully 🎉");
    }
  }, [status]);

  // ✅ بيانات المنتجات
  const products = data?.products || [];

  // ✅ فلترة حسب البحث
  const filteredProducts = products.filter((p) => {
    const search = searchQuery.toLowerCase();
    return Object.values(p).some((value) =>
      String(value || "").toLowerCase().includes(search)
    );
  });

  // ✅ أعمدة الجدول
  const columns = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "price_month", label: "Monthly Price" },
    { key: "price_quarter", label: "Quarterly Price" },
    { key: "price_year", label: "Yearly Price" },
    { key: "setup_fees", label: "Setup Fees" },
  ];

  return (
    <div className="p-4 text-white">
      {/* Header */}
      <Header
        title="Products"
        like={true}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Table */}
      {loading ? (
        <Loading rows={5} cols={6} />
      ) : (
        <div className="mt-6">
          <Table columns={columns} data={filteredProducts} pageSize={5} />
        </div>
      )}

      {/* Toast */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Product;
