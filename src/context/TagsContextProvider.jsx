import { createContext, useContext, useState, useEffect } from "react";
import { getOptionsByCategory } from "../data/options";

const TagContext = createContext();

const useTagContext = () => useContext(TagContext);

const TagsContextProvider = ({ children }) => {
  const [form, setForm] = useState({
    experience: "",
    systems: [],
    languages: [],
    playerRoles: [],
    playstyles: [],
    likes: [],
    dislikes: [],
  });

  const [options, setOptions] = useState({
    experienceLevel: [],
    systems: [],
    languages: [],
    playerRoles: [],
    playstyles: [],
    likes: [],
    dislikes: [],
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const experience = await getOptionsByCategory("experience");
        const systems = await getOptionsByCategory("systems");
        const languages = await getOptionsByCategory("languages");
        const playerRoles = await getOptionsByCategory("playerRoles");
        const playstyles = await getOptionsByCategory("playstyles");
        const likes = await getOptionsByCategory("likes");
        const dislikes = await getOptionsByCategory("dislikes");

        setOptions({
          experienceLevel: experience,
          systems,
          languages,
          playerRoles,
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
    form,
    setForm,
    experienceLevel: options.experienceLevel,
    systems: options.systems,
    languages: options.languages,
    playerRoles: options.playerRoles,
    playstyles: options.playstyles,
    likes: options.likes,
    dislikes: options.dislikes,
  };

  return <TagContext.Provider value={values}>{children}</TagContext.Provider>;
};

export { useTagContext, TagsContextProvider };
