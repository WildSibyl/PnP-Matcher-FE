import { useEffect, useState } from "react";
import Select from "react-select";
import { useAuth } from "../../hooks/useAuth";

const GroupSelect = ({
  placeholder = "Choose from your groups",
  label,
  helperText,
  name,
  onChange,
  value = null,
}) => {
  const { user } = useAuth();
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  const customStyles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  useEffect(() => {
    if (user?.groups) {
      const mappedOptions = user.groups.map((group) => ({
        id: group._id,
        label: group.name,
        value: group._id,
      }));
      setOptions(mappedOptions);
    }
  }, [user]);

  useEffect(() => {
    if (!value) {
      setSelected(null);
      return;
    }

    if (typeof value === "object" && value.id) {
      setSelected(value);
    } else {
      const match = options.find((opt) => opt.id === value);
      setSelected(match || null);
    }
  }, [value, options]);

  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
    onChange(selectedOption);
  };

  return (
    <div className="mb-4">
      {label && (
        <div className="flex flex-row justify-between">
          <label className="label">{label}</label>
          {helperText && <p className="label-italic">{helperText}</p>}
        </div>
      )}

      <Select
        options={options}
        value={selected}
        onChange={handleChange}
        placeholder={placeholder}
        className="input-bordered-multi"
        name={name}
        styles={customStyles}
        isClearable
        menuPortalTarget={document.body}
      />
    </div>
  );
};

export default GroupSelect;
