import { getFilteredUsers } from "../data/user";
import { useState, useEffect } from "react";

const SelectUser = () => {
  const [input, setInput] = useState({ search: "" });
  const [inputTimer, setInputTimer] = useState({ search: "" });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(null);
  const [selected, setSelected] = useState(null);

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
        <img
          src={selected.avatarUrl}
          className="rounded-full h-auto w-[70px]"
          alt={selected.userName}
        ></img>
        <p>{selected.userName}</p>
        <button
          onClick={() => {
            setInput({ search: "" });
            setSelected(null);
          }}
        >
          (remove)
        </button>
      </div>
    );

  return (
    <>
      <input
        value={input.search}
        onChange={(e) =>
          setInput((prev) => ({ ...prev, search: e.target.value }))
        }
        className="input-bordered ml-2"
      ></input>
      {results && input.search !== "" ? (
        <div className="bg-pnp-white rounded-xl pnp-shadow">
          {loading ? (
            "Loading"
          ) : (
            <div>
              {results.slice(0, 5).map((e, index) => (
                <div
                  key={e._id}
                  className="flex items-center gap-4 hover-pointer"
                  onClick={() => setSelected(e)}
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
    </>
  );
};

export default SelectUser;
