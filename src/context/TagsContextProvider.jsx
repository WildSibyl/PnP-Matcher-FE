import { createContext, useContext, useState, useEffect } from "react";
import { getOptionsByCategory } from "../data/options";

const TagContext = createContext();

const useTagContext = () => useContext(TagContext);

const TagsContextProvider = ({ children }) => {
  const [options, setOptions] = useState({
    experienceLevel: [],
    systems: [],
    languages: [],
    playingRoles: [],
    playingModes: [],
    playstyles: [],
    likes: [],
    dislikes: [],
  });

  const [homeSearch, setHomeSearch] = useState({
    systems: [],
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const experience = await getOptionsByCategory("experience");
        const systems = await getOptionsByCategory("systems");
        const languages = await getOptionsByCategory("languages");
        const playingRoles = await getOptionsByCategory("playingRoles");
        const playingModes = await getOptionsByCategory("playingModes");
        const playstyles = await getOptionsByCategory("playstyles");
        const likes = await getOptionsByCategory("likes");
        const dislikes = await getOptionsByCategory("dislikes");

        setOptions({
          experienceLevel: experience,
          systems,
          languages,
          playingRoles,
          playingModes,
          playstyles,
          likes,
          dislikes,
        });
      } catch (err) {
        console.error("Failed to fetch option categories:", err);
      }
    };

    fetchOptions();
  }, []);

  const values = {
    experienceLevel: options.experienceLevel,
    systems: options.systems,
    languages: options.languages,
    playingRoles: options.playingRoles,
    playingModes: options.playingModes,
    playstyles: options.playstyles,
    likes: options.likes,
    dislikes: options.dislikes,
    homeSearch,
    setHomeSearch,
  };

  return <TagContext.Provider value={values}>{children}</TagContext.Provider>;
};

export { useTagContext, TagsContextProvider };
