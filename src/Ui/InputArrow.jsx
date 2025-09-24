// InputArrow.jsx
import React from "react";

const InputArrow = ({
  placeholder = "",
  value,
  onChange,
  name,
  options,
  disabled = false,
}) => {
  const hasValue = value !== "" && value !== null && value !== undefined;

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <label className="text-white font-normal text-lg">{placeholder}</label>
      <select
        name={name}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-5 py-3 rounded-xl
          bg-two text-black
          border-2 border-zinc-700
          transition-all duration-300
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${hasValue ? "border-four" : ""}
          focus:outline-none focus:ring-2 focus:ring-four/50 focus:border-four
        `}
      >
        <option value="" disabled>
          -- Select {placeholder} --
        </option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputArrow;
