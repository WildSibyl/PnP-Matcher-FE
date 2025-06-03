import { getFilteredUsers } from "../data/user";
import { useState, useEffect } from "react";

const SelectUser = () => {
  const [input, setInput] = useState({ search: "" });
  const [inputTimer, setInputTimer] = useState({ search: "" });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getFilteredUsers(inputTimer);
      setResults(data);
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

  return (
    <>
      <input className="input-bordered ml-2"></input>
      {results ? (
        <div className="bg-pnp-white rounded-xl pnp-shadow">
          {loading ? "Loading" : "Results"}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SelectUser;
