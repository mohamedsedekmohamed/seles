import React, { useEffect, useState } from "react";
import Header from "../../Ui/Header";
import Loading from "../../Ui/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGet from "../../Hooks/useGet";
import {
  DollarSign,
  Calendar,
  CreditCard,
  Clock,
  Tag,
  Percent,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Product = () => {
  const { data, loading, error, status, get } = useGet();
  const [searchQuery, setSearchQuery] = useState("");
  const [openedId, setOpenedId] = useState(null); // ✅ لتحديد الكارت المفتوح

  // ✅ استدعاء API
  useEffect(() => {
    get("https://negotia.wegostation.com/api/sales/products/product", 2, 1000);
  }, [get]);

  // ✅ عرض الخطأ
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // ✅ رسالة نجاح
  useEffect(() => {
    if (status === 200) toast.success("Products loaded successfully 🎉");
  }, [status]);

  // ✅ بيانات المنتجات
  const products = data?.data?.data || [];

  // ✅ فلترة حسب البحث
  const filteredProducts = products.filter((p) => {
    const search = searchQuery.toLowerCase();
    return Object.values(p).some((value) =>
      String(value || "").toLowerCase().includes(search)
    );
  });

  // ✅ تنسيق التاريخ
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 items-start">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => {
              const isOpen = openedId === product._id;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
                >
                  {/* الاسم */}
                  <h3 className="text-2xl font-bold text-green-400 mb-2 flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-green-500" />
                    {product.name}
                  </h3>

                  {/* الحالة */}
                  <div className="flex items-center gap-2 mb-3">
                    {product.status ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-semibold">
                      {product.status ? "Active" : "Inactive"}
                    </span>
                  </div>

                  {/* التفاصيل */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[1000px] mt-3 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="border-t border-gray-700 pt-4 space-y-3">
                      {/* الوصف */}
                      {product.description && (
                        <p className="text-gray-300">{product.description}</p>
                      )}

                      {/* الأسعار */}
                      <div className="space-y-2">
                        {product.subscription_type && (
                          <p className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-blue-400" />
                            <span className="font-semibold">
                              Subscription Type:
                            </span>{" "}
                            {product.subscription_type}
                          </p>
                        )}

                        {product.price && (
                          <p className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-yellow-400" />
                            <span className="font-semibold">Price:</span> $
                            {product.price}
                          </p>
                        )}

                        {product.price_month && (
                          <p>
                            <span className="font-semibold text-green-300">
                              Monthly:
                            </span>{" "}
                            ${product.price_month}
                          </p>
                        )}
                        {product.price_quarter && (
                          <p>
                            <span className="font-semibold text-green-300">
                              Quarterly:
                            </span>{" "}
                            ${product.price_quarter}
                          </p>
                        )}
                        {product.price_year && (
                          <p>
                            <span className="font-semibold text-green-300">
                              Yearly:
                            </span>{" "}
                            ${product.price_year}
                          </p>
                        )}

                        <p className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-pink-400" />
                          <span className="font-semibold">Setup Fees:</span> $
                          {product.setup_fees}
                        </p>
                      </div>

                      {/* تاريخ الإنشاء */}
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-5 h-5" />
                        <span>Created at: {formatDate(product.created_at)}</span>
                      </div>

                      {/* العرض (Offer) */}
                      {product.offer && (
                        <div className="mt-4 p-3 border border-yellow-600 rounded-xl bg-yellow-900/20">
                          <h4 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                            <Tag className="w-5 h-5" />
                            Offer: {product.offer.name}
                          </h4>
                          <div className="mt-2 text-sm text-gray-200 space-y-1">
                           <p className="flex items-center gap-2">
  <Percent className="w-4 h-4 text-yellow-400" />
  Discount:{" "}
  {product.offer.discount_type === "percentage"
    ? `${product.offer.discount_amount}%`
    : `${product.offer.discount_amount} EGP`}
</p>
                              <p>
  price :{product.price - (product.offer.discount_type === "percentage"
    ? (product.price * product.offer.discount_amount) / 100
    : product.offer.discount_amount)} EGP
  
  </p>
                    
                            <p>
                              Period: {formatDate(product.offer.start_date)} →{" "}
                              {formatDate(product.offer.end_date)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* زر التفاصيل */}
                  <div className="mt-5">
                    <button
                      onClick={() =>
                        setOpenedId(isOpen ? null : product._id)
                      }
                      className="w-full py-2 px-4 rounded-xl bg-green-600 hover:bg-green-700 transition text-white font-semibold shadow-md flex items-center justify-center gap-2"
                    >
                      {isOpen ? (
                        <>
                          Hide Details <ChevronUp className="w-5 h-5" />
                        </>
                      ) : (
                        <>
                          View Details <ChevronDown className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No products found ❌
            </p>
          )}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Product;
