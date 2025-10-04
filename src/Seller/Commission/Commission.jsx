import React, { useEffect, useState } from "react";
import useGet from "../../Hooks/useGet";
import Loading from "../../Ui/Loading";
import { toast, ToastContainer } from "react-toastify";
import Header from "../../Ui/Header";
import "react-toastify/dist/ReactToastify.css";
import { Award, TrendingUp, Star } from "lucide-react";

const Commission = () => {
  const { data, loading, error, status, get } = useGet();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    get("https://negotia.wegostation.com/api/sales/commission", 2, 1000);
  }, [get]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (status === 200) {
      toast.success("Commissions loaded successfully 🎉");
    }
  }, [status]);

  const commissions = data?.data?.data?.commissions || [];

  const filtered = commissions.filter((p) => {
    const search = searchQuery.toLowerCase();
    return Object.values(p).some((value) =>
      String(value || "").toLowerCase().includes(search)
    );
  });

  return (
    <div className="p-4 text-white">
      <Header
        title="Commission"
        like={true}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {loading ? (
        <Loading rows={5} cols={6} />
      ) : (
        <div className="relative ">
          {filtered.map((item, index) => {
            const isRight = index % 2 === 0;
            const isAchieved = item.my_level;

            return (
              <div key={item.id || index} className="relative mb-8 px-5">
                {/* الكارد */}
                <div className={`flex ${isRight ? "justify-end" : "justify-start"} relative z-10`}>
                  <div
                    className={`w-80 rounded-2xl shadow-2xl p-6 text-white transform transition-all hover:scale-105 hover:shadow-3xl relative ${
                      isAchieved ? "bg-green-600 ring-4 ring-green-400 ring-offset-2" : "bg-gray-400 opacity-80"
                    }`}
                  >
                    {/* أيقونة الإنجاز */}
                    <div className="absolute -top-4 -right-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                          isAchieved ? "bg-green-500" : "bg-gray-500"
                        }`}
                      >
                        {isAchieved ? (
                          <Star className="w-6 h-6 text-white fill-white" />
                        ) : (
                          <TrendingUp className="w-6 h-6 text-white" />
                        )}
                      </div>
                    </div>

                    {/* المحتوى */}
                    <div className="mt-2">
                      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                        <Award className="w-6 h-6" />
                        {item.level_name}
                      </h2>

                      <div className="space-y-2 bg-black bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold">Point :</span>
                          <span className="text-lg font-bold">{item.point_threshold}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold">Amount:</span>
                          <span className="text-lg font-bold">{item.amount}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold">Kind:</span>
                          <span className="text-lg font-bold">{item.type}</span>
                        </div>

                        <div className="flex justify-between items-center text-xs pt-2 border-t border-white border-opacity-30">
                          <span>Date:</span>
                          <span>{new Date(item.created_at).toLocaleDateString("en")}</span>
                        </div>
                      </div>

                      {/* حالة المستوى */}
                      <div className="mt-4 text-center">
                        {isAchieved ? (
                          <span className="inline-block px-4 py-2 bg-green-500 rounded-full text-sm font-bold shadow-lg">
                            ✓ Completed
                          </span>
                        ) : (
                          <span className="inline-block px-4 py-2 bg-gray-700 bg-opacity-50 rounded-full text-sm">
                            Not yet
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Commission;
