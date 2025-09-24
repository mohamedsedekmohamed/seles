// SwitchButton.jsx
import React from "react";

const SwitchButton = ({
  checked,
  onChange,
  disabled = false,
  onLabel = "On",
  offLabel = "Off",
}) => {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-8 w-16 items-center rounded-full border-2 border-two
          transition-all duration-500 ease-in-out
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span
          className={`
            inline-block h-8 w-8 transform rounded-full shadow-md
            transition-all duration-500 ease-in-out
            ${checked ? "translate-x-9 bg-green-400" : "bg-red-400"}
            ${checked ? "animate-pulse" : ""}
          `}
          style={{
            boxShadow: checked
              ? "0 0 10px rgba(34,197,94,0.6), 0 0 20px rgba(34,197,94,0.4)"
              : "0 0 10px rgba(239,68,68,0.6), 0 0 20px rgba(239,68,68,0.4)",
          }}
        />
      </button>
      <span
        className={`
          text-sm font-medium transition-colors duration-300
          ${checked ? "text-green-600" : "text-red-600"}
        `}
      >
        {checked ? onLabel : offLabel}
      </span>
    </div>
  );
};

export default SwitchButton;
