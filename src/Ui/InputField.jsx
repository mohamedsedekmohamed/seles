// InputField.jsx
import React from "react";

const InputField = ({
  placeholder = "",
  value,
  onChange,
  name,
  min=0,
  type = "text",
  disabled = false,
}) => {
  const maxLength =
    type === "number" ? 20 : type === "email" ? 45 : 200;

  const hasValue = value && value.trim() !== "";

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <label className="text-white font-normal text-lg">{placeholder}</label>
      <input
        type={type}
        name={name}
        disabled={disabled}
        value={value}
        min={min}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={`Enter${placeholder}`}
        className={`
          w-full px-5 py-3 rounded-xl
          bg-two text-black placeholder-gray-700
          border-2 border-zinc-700
          transition-all duration-300
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${hasValue ? "border-sky-500" : ""}
          focus:outline-none focus:ring-2 focus:ring-four/50 focus:border-four
        `}
      />
    </div>
  );
};

export default InputField;
