import { getFilteredUsers } from "../../data/user";
import { useState, useEffect } from "react";

const SelectUser = ({ selected, onChange, setSelected }) => {
  const [input, setInput] = useState({ search: "" });
  const [inputTimer, setInputTimer] = useState({ search: "" });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      console.log("Fetching users with filter:", inputTimer);
      const data = await getFilteredUsers(0, inputTimer);
      setResults(data);
      console.log("Name results ", data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.search != inputTimer.search) {
        setInputTimer(input);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    fetchUsers();
  }, [inputTimer]);

  if (selected)
    return (
      <div className="flex flex-col items-center">
        {selected.avatarUrl && (
          <img
            src={selected.avatarUrl}
            className="rounded-full h-auto w-[70px]"
            alt={selected.userName}
          />
        )}
        <p>{selected.userName}</p>
        <button
          onClick={() => {
            setInput({ search: "" });
            onChange({ search: "" });
            setSelected(null);
          }}
        >
          (remove)
        </button>
      </div>
    );

  return (
    <>
      <div className="relative w-full max-w-md">
        <input
          value={input.search}
          placeholder="Search playername"
          onChange={(e) =>
            setInput((prev) => ({ ...prev, search: e.target.value }))
          }
          className="input-bordered w-full"
        ></input>
        {results && input.search !== "" ? (
          <div className="absolute top-full left-0 w-full z-[999] bg-pnp-white rounded-xl pnp-shadow mt-1">
            {loading ? (
              "Loading"
            ) : (
              <div>
                {results.slice(0, 3).map((e, index) => (
                  <div
                    key={e._id}
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => {
                      onChange?.(e);
                    }}
                  >
                    <img
                      className="h-auto w-[50px] rounded-full"
                      src={e.avatarUrl}
                      alt={e.userName}
                    />
                    {e.userName}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default SelectUser;
