import React, { useState, useEffect } from "react";
import InputField from "../../Ui/InputField";
import InputArrow from "../../Ui/InputArrow";
import { toast } from "react-toastify";
import useGet from "../../Hooks/useGet";
import usePost from "../../Hooks/usePost";

const AddPaymentFromLead = ({ lead, onClose }) => {
  const [form, setForm] = useState({
    lead_id: lead?._id || "",
    product_id: "",
    offer_id: "",
    payment_method_id: "",
    amount: "",
    proof_image: "",
  });

  const { data: optionsData, get } = useGet();
  const { loading, post } = usePost();
  const [product, setProduct] = useState([]);
  const [offer, setOffer] = useState([]);
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    get("https://negotia.wegostation.com/api/sales/payments/payment");
  }, [get]);

  useEffect(() => {
    if (optionsData) {
      setProduct(
        optionsData.productOptions?.map((s) => ({ id: s.value, name: s.label }))
      );
      setOffer(
        optionsData.offerOptions?.map((s) => ({ id: s.value, name: s.label }))
      );
      setPayment(
        optionsData.paymentMethodOptions?.map((s) => ({
          id: s.value,
          name: s.label,
        }))
      );
    }
  }, [optionsData]);

  const handleChange = (name, value) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.amount || !form.product_id || !form.payment_method_id) {
      toast.error("All fields required ❌");
      return;
    }

    const res = await post(
      "https://negotia.wegostation.com/api/sales/payments/payment",
      form
    );

    if (res) {
      toast.success("Payment added 🎉");
      onClose(); // ✅ يقفل الـ popup بعد الحفظ
    } else {
      toast.error("Error saving payment ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-2">Add Payment </h2>

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
        placeholder="Amount"
        name="amount"
        type="number"
        min={0}
        value={form.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleChange("proof_image", e.target.value)}
        className="file:mr-4 file:rounded-lg file:border-1 file:border-four 
                   file:px-4 file:py-2 file:text-white file:cursor-pointer file:hover:bg-four 
                   text-sm text-gray-300"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-four px-4 py-2 rounded-xl mt-4 hover:bg-four/80"
      >
        {loading ? "Saving..." : "Save Payment"}
      </button>
    </form>
  );
};

export default AddPaymentFromLead;
