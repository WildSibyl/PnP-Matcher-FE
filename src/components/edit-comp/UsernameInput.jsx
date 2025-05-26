import { useState, useEffect } from "react";
import { checkUsername } from "../../data/user";

const UsernameInput = ({
  name,
  value,
  onChange,
  maxLength,
  placeholder,
  label,
  helperText,
  validation,
}) => {
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (!value) {
      setIsUsernameAvailable(null);
      setValidationError("");
      return;
    }

    if (/^[A-Za-z\s]*$/.test(value)) {
      setValidationError("");

      const timeout = setTimeout(() => {
        setCheckingUsername(true);

        checkUsername(value)
          .then((isAvailable) => setIsUsernameAvailable(isAvailable))
          .catch((err) => {
            console.error("Username check failed", err);
            setIsUsernameAvailable(null);
          })
          .finally(() => setCheckingUsername(false));
      }, 500); // debounce

      return () => clearTimeout(timeout);
    } else {
      setValidationError("Only letters and spaces are allowed.");
      setIsUsernameAvailable(null);
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
  ) : checkingUsername ? (
    <p className="text-xs text-gray-400">Checking availability...</p>
  ) : isUsernameAvailable === false ? (
    <p className="text-xs text-red-500">Username is taken</p>
  ) : isUsernameAvailable === true ? (
    <p className="text-xs text-green-500">Username is available!</p>
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

export default UsernameInput;
