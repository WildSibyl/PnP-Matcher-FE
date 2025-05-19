import { useEffect, useState } from "react";
import Select from "react-select";
import { useTagContext } from "../../context/TagsContextProvider";

//still very WIP

const TagMultiSelect = ({
  options,
  label,
  placeholder = "Select options",
  helpText,
}) => {
  return (
    <>
      {label && (
        <div className="flex flex-row justify-between">
          <label className="label">{label}</label>
          {helpText && <p className="label-italic">{helpText}</p>}
        </div>
      )}
      <Select
        options={options}
        isMulti
        onChange={handleChange}
        value={[]} // Always empty
        placeholder={placeholder}
        className="input-bordered-multi"
      />
    </>
  );
};

export default TagMultiSelect;
