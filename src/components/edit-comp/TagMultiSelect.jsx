import { useEffect, useState } from "react";
import Select from "react-select";
import { useTagContext } from "../../context/TagsContextProvider";

//still very WIP

const TagMultiSelect = ({
  options = [],
  placeholder = "Select options",
  label,
  helperText,
  name,
  onChange, // expects (values: string[]) => void
}) => {
  const [selected, setSelected] = useState([]);

  const handleSelectChange = (selectedOptions) => {
    const newSelections = selectedOptions || [];

    const updatedSelections = [...selected];
    newSelections.forEach((option) => {
      if (!updatedSelections.find((o) => o.value === option.value)) {
        updatedSelections.push(option);
      }
      console.log("Updated selections:", updatedSelections);
    });

    setSelected(updatedSelections);
    onChange(updatedSelections.map((o) => o.value));
    console.log("Selected options:", updatedSelections);
  };

  const handleRemove = (valToRemove) => {
    const updatedSelections = selected.filter(
      (opt) => opt.value !== valToRemove
    );
    setSelected(updatedSelections);
    onChange(updatedSelections.map((o) => o.value));
    console.log("Removed option:", valToRemove);
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
      />

      <div className="tag-field mt-2">
        {selected.map((opt) => (
          <span
            key={opt.value}
            className="flex items-center bg-black text-white px-3 py-1 rounded-full mr-2 mb-2"
          >
            {opt.label}
            <button
              className="ml-2 text-white"
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
