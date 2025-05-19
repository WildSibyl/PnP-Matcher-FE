import { createContext, useContext, useState } from "react";

const TagContext = createContext();

const useTagContext = () => useContext(TagContext);

const TagsContextProvider = ({ children }) => {
  const [form, setForm] = useState({
    systems: [],
    playstyles: [],
    likes: [],
    dislikes: [],
  });

  return (
    <TagContext.Provider value={{ form, setForm }}>
      {children}
    </TagContext.Provider>
  );
};

export { useTagContext, TagsContextProvider };
