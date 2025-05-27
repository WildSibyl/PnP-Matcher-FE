import { useState, useEffect } from "react";
import getIcon from "../utils/getIcon";
import { getFilteredUsers } from "../data/user";
import FilterModal from "../components/search-comp/FilterModal";

import PlayerCard from "../components/cards/PlayerCard";
import GroupCard from "../components/cards/Groupcard";
import Loader from "../components/Loader";
import countActiveFilters from "../utils/filterCount";
import Searchbar from "../components/search-comp/Searchbar";
import Filterchips from "../components/search-comp/Filterchips";

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const [filter, setFilter] = useState({
    search: "",
    systems: [],
    playstyles: [],
    experience: [],
    likes: [],
    dislikes: [],
    radius: 5,
    weekdays: [],
    playingModes: "",
    frequencyPerMonth: 1,
    languages: [],
    age: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getFilteredUsers(filter.radius, filter); // amended to pass filter
        setResults(data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const currFilterCount = countActiveFilters(filter);
    setFilterCount(currFilterCount);
  }, [filter]);

  return (
    <div className="flex flex-col w-full items-center justify-center gap-4">
      <h2 className="text-pnp-white">FIND PLAYERS</h2>
      <Searchbar />
      <Filterchips
        filter={filter}
        setFilter={setFilter}
        filterCount={filterCount}
        setIsModalOpen={setIsModalOpen}
      />
      {/* TAB */}
      {/* TAB END */}
      {/* RESULTS */}
      <div className="mt-2 flex flex-col items-center">
        <div className="my-8 text-pnp-white font-normal text-center ">
          {results.length > 0 ? (
            <h3>{results.length} results</h3>
          ) : (
            <>
              <h3>No users found!</h3> <p>Please change your filters.</p>
            </>
          )}
        </div>
        <div>
          {results.map((e) => {
            return <PlayerCard key={e._id} details={e} />;
          })}
        </div>
      </div>
      {console.log(filter)};{/* Filter selection modal */}
      {console.log(filterCount)};
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setFilter={setFilter}
        filter={filter}
        filterCount={filterCount}
        setFilterCount={setFilterCount}
      />
    </div>
  );
};

export default Search;
