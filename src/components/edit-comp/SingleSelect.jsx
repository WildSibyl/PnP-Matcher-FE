import { useEffect, useState } from "react";
import Select from "react-select";
import { getOptionsByCategory } from "../../data/options";

const SingleSelect = ({
  placeholder = "Select option",
  label,
  helperText,
  name,
  onChange,
  value = null,
  category,
}) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  const customStyles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  useEffect(() => {
    if (!category) return;

    const fetchOptions = async () => {
      try {
        const data = await getOptionsByCategory(category);
        setOptions(
          data.map((opt) => ({
            id: opt._id,
            label: opt.label,
            value: opt._id,
          }))
        );
      } catch (err) {
        console.error(`Failed to load options for ${category}:`, err.message);
      }
    };

    fetchOptions();
  }, [category]);

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

export default SingleSelect;
