// CharCountInput.jsx
import React from "react";

const CharCountInput = ({
  name,
  value,
  onChange,
  maxLength,
  placeholder,
  label,
  helperText,
  validation,
  type = "text",
}) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(e); // Pass the change up to parent
    }
  };

  return (
    <div>
      {label && (
        <div className="flex flex-row justify-between">
          <label className="label">{label}</label>
          {helperText && <p className="label-italic">{helperText}</p>}
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="input-bordered mb-0 w-full"
      />
      {validation ? (
        <div className="flex flex-row justify-between">
          <div className="mt-1">{validation}</div>{" "}
          <p className="text-xs text-gray-500 mt-1 text-right mb-4">
            {value.length} / {maxLength}
          </p>
        </div>
      ) : (
        <p className="text-xs text-gray-500 mt-1 text-right mb-4">
          {value.length} / {maxLength}
        </p>
      )}
    </div>
  );
};

export default CharCountInput;
