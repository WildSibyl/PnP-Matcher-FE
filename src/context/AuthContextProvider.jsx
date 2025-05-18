import { createContext, useContext, useEffect, useState } from "react";
import { me, signOut } from "../data/auth";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await me();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        console.error("User not logged in or session expired.");
      }
    };

    getUser();
  }, []);

  const logOut = async () => {
    try {
      await signOut(); //cookie will be deleted
      setUser(null); // user data will be deleted from the state
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const values = {
    user,
    setUser,
    logOut,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthContextProvider };
