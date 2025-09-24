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

const AddPayment = () => {
  const [form, setForm] = useState({
    lead_id: "",
    product_id: "",
    offer_id: "",
    payment_method_id: "",
    amount: "",
  });
  const nav = useNavigate();

  const {
    data: optionsData,
    loading: loadingOptions,
    error: errorOptions,
    get,
  } = useGet();
const [leads, setLeads] = useState([]);
  const [product, setProduct] = useState([]);
  const [offer, setOffer] = useState([]);
  const [payment, setPayment] = useState([]);
 useEffect(() => {
    get(
      "https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/payments/payment"
    );
  }, [get]);
  
    useEffect(() => {
      console.log(optionsData)
      if (optionsData) {
        setLeads(
          optionsData.leadOptions?.map((l) => ({ id: l.value, name: l.label })) ||
            []
        );
       
        setProduct(
          optionsData.productOptions?.map((s) => ({ id: s.value, name: s.label })) ||
            []
        );
        setOffer(
          optionsData.offerOptions?.map((s) => ({ id: s.value, name: s.label })) ||
            []
        );
        setPayment(
          optionsData.paymentMethodOptions?.map((s) => ({ id: s.value, name: s.label })) ||
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

   if (!form.lead_id) {
  toast.error("Lead is required ❌");
  return;
}

if (!form.product_id) {
  toast.error("Product is required ❌");
  return;
}

if (!form.offer_id) {
  toast.error("Offer is required ❌");
  return;
}

if (!form.payment_method_id) {
  toast.error("Payment is required ❌");
  return;
}
if (!form.amount) {
  toast.error("amount is required ❌");
  return;
}

    const res = await post(
      "https://qpjgfr5x-3000.uks1.devtunnels.ms/api/sales/payments/payment",
      form
    );

    if (res) {
      toast.success("payment  added successfully 🎉");
      setForm({
        lead_id: "",
        offer_id: "",
        product_id: "",
        payment_method_id: "",
        amount: "",
      });
      nav("/seller/payment")
    } else {
      toast.error(error," ❌");
    }
  };
  return (
    <div className="p-6 text-white">
      <Titles title="Add Payment " nav={"/seller/payment"} />

      {loadingOptions ? (   
             <Loading rows={5} cols={6} />
):(  <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 mt-6 max-w-xl"
      >
        <InputArrow
          placeholder="Lead"
          name="lead_id"
          value={form.lead_id}
          onChange={(val) => handleChange("lead_id", val)}
          options={leads}
        />

       
        <InputArrow
          placeholder="Product"
          name="product_id"
          value={form.product_id}
          onChange={(val) => handleChange("product_id", val)}
          options={product}
        />
        <InputArrow
          placeholder="Offer"
          name="offer_id"
          value={form.offer_id}
          onChange={(val) => handleChange("offer_id", val)}
          options={offer}
        />
        <InputArrow
          placeholder="Payment Method"
          name="payment_method_id"
          value={form.payment_method_id}
          onChange={(val) => handleChange("payment_method_id", val)}
          options={payment}
        />

        <InputField
          placeholder="amount"
          name="amount"
          type="number"
          min={0}
          value={form.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
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

export default AddPayment;
