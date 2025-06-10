import { useState, useEffect } from "react";
import { useTagContext } from "../context/TagsContextProvider";
import getIcon from "../utils/getIcon";
import { getFilteredUsers } from "../data/user";
import { getFilteredGroups } from "../data/groups";
import FilterModal from "../components/search-comp/FilterModal";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

import PlayerCard from "../components/cards/PlayerCard";
import GroupCard from "../components/cards/Groupcard";
import Loader from "../components/Loader";
import countActiveFilters from "../utils/filterCount";
import Searchbar from "../components/search-comp/Searchbar";
import Filterchips from "../components/search-comp/Filterchips";
import renimg from "../assets/ren/Ren-die.png";

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupResults, setGroupResults] = useState([]);
  const [groupLoading, setGroupLoading] = useState(false);
  const [groupsFetched, setGroupsFetched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const { homeSearch, setHomeSearch } = useTagContext();
  const [activeTab, setActiveTab] = useState("players");
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    search: "",
    systems: homeSearch.systems || [],
    playstyles: [],
    experience: [],
    likes: [],
    dislikes: [],
    radius: 100000,
    weekdays: [],
    playingModes: "",
    frequencyPerMonth: null,
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

  const fetchGroups = async () => {
    setGroupLoading(true);
    try {
      const formattedFilter = formatFilterForBackend(filter);
      const data = await getFilteredGroups(
        formattedFilter.radius,
        formattedFilter
      );
      setGroupResults(data);
      setGroupsFetched(true);
    } catch (error) {
      console.error("Error fetching groups:", error.message);
      setGroupResults([]);
    } finally {
      setGroupLoading(false);
    }
  };

  //Reset homeSearch so it doesn't affect future searches
  useEffect(() => {
    setHomeSearch({ systems: [] });
  }, []);

  //Automatically fetch new, when search field content or filter count changes
  useEffect(() => {
    if (activeTab === "players") {
      fetchUsers();
    } else if (activeTab === "groups") {
      fetchGroups();
    }
  }, [filterCount, filter.search, filter.sortBy, filter.radius, activeTab]);

  useEffect(() => {
    const currFilterCount = countActiveFilters(filter);
    setFilterCount(currFilterCount);
  }, [filter]);

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center gap-4">
        {/* {loading && (
          <div>
            <Loader />
            <div className="absolute bg-pnp-black w-full h-full"></div>
          </div>
        )} */}
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
        {user && (
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
                Name
              </option>
              <option value="distance" className="text-pnp-black">
                Distance
              </option>
              <option value="matchScore" className="text-pnp-black">
                Match Score
              </option>
            </select>
          </div>
        )}
        {/* SORTING END */}
        {/* TAB */}
        <div className="flex gap-4 font-semibold text-sm justify-center lg:justify-start">
          <button
            onClick={() => setActiveTab("players")}
            className={`pb-2 cursor-pointer ${
              activeTab === "players"
                ? "border-b-2 border-pnp-white text-pnp-white"
                : "text-gray-400"
            }`}
          >
            ABOUT
          </button>
          <button
            onClick={() => setActiveTab("groups")}
            className={`pb-2 cursor-pointer ${
              activeTab === "groups"
                ? "border-b-2 border-pnp-white text-pnp-white"
                : "text-gray-400"
            }`}
          >
            GROUPS
          </button>
        </div>
        {/* TAB END */}
        {/* RESULTS */}

        {activeTab === "players" && (
          <div className="mt-2 flex flex-col items-center">
            <div className="my-8 text-pnp-white font-normal text-center ">
              {loading ? (
                <div className="h-[80vh]">
                  <Loader />
                </div>
              ) : results.length > 0 ? (
                <h3>{results.length} results</h3>
              ) : (
                <>
                  <h3>No users found!</h3>
                  <p>Please change your filters.</p>
                </>
              )}
            </div>

            {!loading && results.length > 0 && (
              <div>
                {results.map((e, index) => {
                  if (index === 2) {
                    return (
                      <div key={e._id}>
                        {!user && (
                          <div className="flex flex-col mx-auto w-[95vw] min-w-[350px] max-w-[500px] bg-linear-165 from-pnp-darkpurple to-pnp-darkblue rounded-2xl mb-4">
                            <h2 className="text-pnp-white pt-4 px-4">
                              Get the most out of it
                            </h2>
                            <div className="flex">
                              <div className="flex flex-col pl-4 py-4">
                                <p className="text-pnp-white pb-2">
                                  Register to find players near you and see how
                                  good they match your playstyle!
                                </p>
                                <button
                                  onClick={() => {
                                    navigate("/register");
                                  }}
                                  disabled={loading}
                                  className="btn-primary-light self-start"
                                >
                                  {getIcon("Sword")}
                                  Sign Up!
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

                        <PlayerCard key={e._id} details={e} />
                      </div>
                    );
                  }

                  return <PlayerCard key={e._id} details={e} />;
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === "groups" && (
          <div className="mt-2 flex flex-col items-center">
            {groupLoading ? (
              <div className="h-[80vh]">
                <Loader />
              </div>
            ) : (
              <>
                <div className="my-8 text-pnp-white font-normal text-center">
                  {groupResults.length > 0 ? (
                    <h3>{groupResults.length} groups found</h3>
                  ) : (
                    <>
                      <h3>No groups found!</h3>
                      <p>Please change your filters.</p>
                    </>
                  )}
                </div>
                {groupResults.map((g) => (
                  <GroupCard key={g._id} details={g} />
                ))}
              </>
            )}
          </div>
        )}

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
    </>
  );
};

export default Search;
