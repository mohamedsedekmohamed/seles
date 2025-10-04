import React, { useEffect, useState } from "react";
import Header from "../../Ui/Header";
import Loading from "../../Ui/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGet from "../../Hooks/useGet";
import { DollarSign, Calendar, CreditCard } from "lucide-react"; // ✅ Icons

const Product = () => {
  const { data, loading, error, status, get } = useGet();
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ استدعاء API
  useEffect(() => {
    get("https://negotia.wegostation.com/api/sales/products/product", 2, 1000);
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

  return (
    <div className="p-4 text-white">
      {/* Header */}
      <Header
        title="Products"
        like={true}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Loading */}
      {loading ? (
        <Loading rows={5} cols={6} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Title */}
                <h3 className="text-2xl font-bold text-green-400 mb-2 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-green-500" />
                  {product.name}
                </h3>

                {/* لو فيه subscription */}
                {product.subscription_type ? (
                  <div className="space-y-3">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <span className="font-semibold">
                        {product.subscription_type}:
                      </span>{" "}
                      ${product.price}
                    </p>
                    <p className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-pink-400" />
                      <span className="font-semibold">Setup Fees:</span> $
                      {product.setup_fees}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-pink-400" />
                      <span className="font-semibold">Setup Fees:</span> $
                      {product.setup_fees}
                    </p>
                  </div>
                )}

                {/* Action */}
                <div className="mt-6">
                  <button className="w-full py-2 px-4 rounded-xl bg-green-600 hover:bg-green-700 transition text-white font-semibold shadow-md">
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No products found ❌
            </p>
          )}
        </div>
      )}

      {/* Toast */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Product;
