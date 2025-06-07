import { useEffect, useState } from "react";
import Select from "react-select";
import { getOptionsByCategory } from "../../data/options";

const TagMultiSelect = ({
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

  const customStyles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  }; //This is done to make sure the select window is always on top

  useEffect(() => {
    if (!category) return;

    const fetchOptions = async () => {
      try {
        const data = await getOptionsByCategory(category);
        console.log(`Options for ${category}:`, data);
        setOptions(
          data.map((opt) => ({
            id: opt._id,
            label: opt.label,
            value: opt.value,
            //value: opt._id,
          }))
        );
      } catch (err) {
        console.error(`Failed to load options for ${category}:`, err.message);
      }
    };

    fetchOptions();
  }, [category]);

  useEffect(() => {
    if (!options.length || !Array.isArray(value)) return; //are options and or value initialized, is value an array?

    const initialSelected = value
      .map((val) => {
        if (typeof val === "string") {
          //if only a id string is passed
          const option = options.find((opt) => opt.id === val);
          return option
            ? { id: option.id, label: option.label, value: option.value }
            : null;
        } else if (typeof val === "object" && val !== null && val.id) {
          //if a whole object with id, label and value is passed
          return val;
        }
        return null;
      })
      .filter(Boolean); // Filter out any nulls if an ID doesn't match an option

    setSelected(initialSelected);
  }, [value, options]);

  const handleSelectChange = (selectedOptions) => {
    const newSelections = selectedOptions || [];
    const updatedSelections = [...selected];

    newSelections.forEach((option) => {
      if (!updatedSelections.find((o) => o.value === option.value)) {
        updatedSelections.push(option);
      }
    });

    console.log("handleSelectChange - updatedSelections:", updatedSelections);
    setSelected(updatedSelections);
    onChange(updatedSelections.map((o) => ({ ...o })));
  };

  const handleRemove = (valToRemove) => {
    const updatedSelections = selected.filter(
      (opt) => opt.value !== valToRemove
    );
    console.log("handleRemove - updatedSelections:", updatedSelections);
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
        onChange={handleSelectChange}
        value={[]}
        placeholder={placeholder}
        className="input-bordered-multi"
        name={name}
        styles={customStyles}
        menuPortalTarget={document.body} //renders the menu in the body independent from the select field
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

export default TagMultiSelect;
