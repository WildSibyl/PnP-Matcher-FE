import { useState, useEffect } from "react";
import { checkGroupname } from "../../data/groups";

const GroupnameInput = ({
  name,
  value,
  onChange,
  maxLength,
  placeholder,
  label,
  helperText,
  validation,
}) => {
  const [isGroupnameAvailable, setIsGroupnameAvailable] = useState(null);
  const [checkingGroupname, setCheckingGroupname] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (!value) {
      setIsGroupnameAvailable(null);
      setValidationError("");
      return;
    }

    if (/^[A-Za-z0-9\s]+$/.test(value)) {
      // allow letters, numbers, and spaces
      setValidationError("");

      const timeout = setTimeout(() => {
        setCheckingGroupname(true);

        checkGroupname(value)
          .then((isAvailable) => setIsGroupnameAvailable(isAvailable))
          .catch((err) => {
            console.error("Groupname check failed", err);
            setIsGroupnameAvailable(null);
          })
          .finally(() => setCheckingGroupname(false));
      }, 500); // debounce

      return () => clearTimeout(timeout);
    } else {
      setValidationError("Only letters, numbers, and spaces are allowed.");
      setIsGroupnameAvailable(null);
    }
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(e); // notify parent
    }
  };

  const usernameValidation = validationError ? (
    <p className="text-xs text-red-500">{validationError}</p>
  ) : checkingGroupname ? (
    <p className="text-xs text-gray-400">Checking availability...</p>
  ) : isGroupnameAvailable === false ? (
    <p className="text-xs text-red-500">Groupname is taken</p>
  ) : isGroupnameAvailable === true ? (
    <p className="text-xs text-green-500">Groupname is available!</p>
  ) : null;

  return (
    <div>
      {label && (
        <div className="flex flex-row justify-between">
          <label className="label">{label}</label>
          {helperText && <p className="label-italic">{helperText}</p>}
        </div>
      )}
      <input
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="input-bordered mb-0 w-full"
      />
      <div className="flex flex-row justify-between">
        <div className="mt-1">{usernameValidation}</div>
        <p className="text-xs text-gray-500 mt-1 text-right mb-4">
          {value.length} / {maxLength}
        </p>
      </div>
    </div>
  );
};

export default GroupnameInput;
