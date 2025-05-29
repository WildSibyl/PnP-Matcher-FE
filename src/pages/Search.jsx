import { useState, useEffect } from "react";
import { useTagContext } from "../context/TagsContextProvider";
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
  const { homeSearch, setHomeSearch } = useTagContext();
  const [filter, setFilter] = useState({
    search: "",
    systems: homeSearch.systems || [],
    playstyles: [],
    experience: [],
    likes: [],
    dislikes: [],
    radius: 5000,
    weekdays: [],
    playingModes: "",
    frequencyPerMonth: 1,
    languages: [],
    age: "",
    sortBy: "name",
  });

  const formatFilterForBackend = (filter) => {
    return {
      ...filter,
      systems: filter.systems.map((s) => s.id),
      playstyles: filter.playstyles.map((s) => s.id),
      experience: filter.experience.map((s) => s.id),
      likes: filter.likes.map((s) => s.id),
      dislikes: filter.dislikes.map((s) => s.id),
      languages: filter.languages.map((s) => s.id),
    };
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const formattedFilter = formatFilterForBackend(filter);
      const data = await getFilteredUsers(
        formattedFilter.radius,
        formattedFilter
      ); // amended to pass filter
      setResults(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  //Reset homeSearch so it doesn't affect future searches
  useEffect(() => {
    setHomeSearch({ systems: [] });
  }, []);

  //Automatically fetch new, when search field content changes
  useEffect(() => {
    fetchUsers();
  }, [filter.search]);

  //Automatically fetch new, when search field content changes
  useEffect(() => {
    fetchUsers();
  }, [filterCount]);

  useEffect(() => {
    const currFilterCount = countActiveFilters(filter);
    setFilterCount(currFilterCount);
  }, [filter]);

  return (
    <div className="flex flex-col w-full items-center justify-center gap-4">
      <h2 className="text-pnp-white">FIND PLAYERS</h2>
      <Searchbar setFilter={setFilter} filter={filter} />
      <Filterchips
        filter={filter}
        setFilter={setFilter}
        filterCount={filterCount}
        setIsModalOpen={setIsModalOpen}
        fetchUsers={fetchUsers}
      />
      {/* SORTING */}
      <div className="flex gap-4">
        <p className="text-pnp-white ">Sort by:</p>
        <select
          name="sort"
          id="sort"
          className="text-pnp-white underline"
          value={filter.sortBy}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, sortBy: e.target.value }))
          }
        >
          <option value="userName" className="text-pnp-black">
            Username
          </option>
          <option value="distance" className="text-pnp-black">
            Distance
          </option>
          <option value="matchScore" className="text-pnp-black">
            Match Score
          </option>
        </select>
      </div>
      {/* SORTING END */}
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

        {!user && (
          <div>
            <div className="flex">
              <div className="flex flex-col pl-4 py-4">
                <p className="text-pnp-white pb-2">
                  Roll the{" "}
                  <span className="font-extrabold text-[#FCFC3B]">
                    MAGIC DICE
                  </span>{" "}
                  and the wizard will find you players that fit your group
                  perfectly
                </p>
                <button className="btn-primary-light self-start">
                  <D20svg className="w-[3rem]" />
                  ROLL NOW!
                </button>
              </div>
              <div className="flex justify-end overflow-hidden h-auto min-w-[150px] w-[50%] relative">
                <img
                  src={renimg}
                  alt="Ren, our mascot"
                  className="absolute mx-auto w-auto max-h-[100%] bottom-0 translate-y-2"
                ></img>
              </div>
            </div>
          </div>
        )}
        <div>
          {results.map((e) => {
            return <PlayerCard key={e._id} details={e} />;
          })}
        </div>
      </div>
      {/* {console.log(filter)}; */}
      {/* {console.log(filterCount)}; */}
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setFilter={setFilter}
        filter={filter}
        filterCount={filterCount}
        setFilterCount={setFilterCount}
        fetchUsers={fetchUsers}
      />
    </div>
  );
};

export default Search;
