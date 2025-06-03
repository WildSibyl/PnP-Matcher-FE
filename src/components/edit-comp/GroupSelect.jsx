import { useEffect, useState } from "react";
import Select from "react-select";
import { getGroupsAuthoredByMe } from "../../data/user";

const GroupAuthorSelect = ({
  placeholder = "Choose from your groups",
  onChange,
  value = null,
}) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getGroupsAuthoredByMe();
        const mapped = data.map((group) => ({
          id: group._id,
          label: group.name,
          value: group._id,
        }));
        setOptions(mapped);
      } catch (err) {
        console.error("Error loading groups:", err.message);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    if (!value) return setSelected(null);
    const match = options.find(
      (opt) => opt.id === value || opt.value === value
    );
    setSelected(match || null);
  }, [value, options]);

  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
    onChange(selectedOption);
  };

  return (
    <Select
      options={options}
      value={selected}
      onChange={handleChange}
      placeholder={placeholder}
      className="input-bordered-multi"
      isClearable
    />
  );
};

export default GroupAuthorSelect;
