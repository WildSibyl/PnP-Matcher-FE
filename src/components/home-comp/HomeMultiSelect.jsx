import { useEffect, useState } from "react";
import Select from "react-select";
import { getOptionsByCategory } from "../../data/options";

const HomeMultiSelect = ({
  placeholder = "Select options",
  label,
  helperText,
  name,
  onChange,
  category, // category to fetch options
  value,
}) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const customStyles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    control: (base, state) => ({
      ...base,
      backgroundColor: state.isDisabled ? "#b0b0b0" : "white", // light gray when disabled
      cursor: state.isDisabled ? "not-allowed" : "default",
    }),
  }; //This is done to make sure the select window is always on top

  useEffect(() => {
    if (!category) return;

    const fetchOptions = async () => {
      setLoading(true);
      try {
        const data = await getOptionsByCategory(category);
        setOptions(
          data.map((opt) => ({
            id: opt._id,
            label: opt.label,
            value: opt.value,
          }))
        );
      } catch (err) {
        console.error(`Failed to load options for ${category}:`, err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [category]);

  useEffect(() => {
    if (!options.length || !Array.isArray(value)) return; //are options and or value initialized, is value an array?
    // const mapped = options.filter((e) => value?.includes(e.value)); //Match values with entries in options
    setSelected(value); // Update selected
  }, [value, options]);

  const handleSelectChange = (selectedOptions) => {
    const newSelections = selectedOptions || [];
    const updatedSelections = [...selected];

    newSelections.forEach((option) => {
      if (!updatedSelections.find((o) => o.value === option.value)) {
        updatedSelections.push(option);
      }
    });

    setSelected(updatedSelections);
    onChange(updatedSelections.map((o) => ({ ...o })));
  };

  const handleRemove = (valToRemove) => {
    const updatedSelections = selected.filter(
      (opt) => opt.value !== valToRemove
    );
    setSelected(updatedSelections);
    onChange(updatedSelections.map((o) => ({ ...o })));
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
        options={options.filter(
          (opt) => !selected.find((sel) => sel.value === opt.value)
        )}
        isMulti
        isDisabled={selected.length >= 3} // Limit to 3 selections
        onChange={handleSelectChange}
        value={[]}
        placeholder={placeholder}
        className="input-bordered-multi"
        name={name}
        styles={customStyles}
        menuPortalTarget={document.body} //renders the menu in the body independent from the select field
        noOptionsMessage={() =>
          loading ? "Waking up server..." : "No options available"
        }
      />

      <div className="tag-field mt-2">
        {selected.map((opt) => (
          <span
            key={opt.value}
            className="flex items-center bg-pnp-black text-pnp-white px-3 py-1 rounded-full mr-2 mb-2"
          >
            {opt.label}
            <button
              className="ml-2 text-pnp-white"
              onClick={() => handleRemove(opt.value)}
              type="button"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default HomeMultiSelect;
