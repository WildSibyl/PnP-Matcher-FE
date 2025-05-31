import { createContext, useContext, useEffect, useState } from "react";
import { me, signOut } from "../data/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const start = performance.now();
      try {
        const userData = await me();
        setUser(userData);
        console.log("User data fetched:", userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        console.error("User not logged in or session expired.");
      } finally {
        setLoading(false);
        const end = performance.now();
        console.log(`/me took ${Math.round(end - start)}ms`);
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

  const fetchUserId = async () => {
    setLoading(true);
    try {
      const userData = await me();
      const userId = userData._id; // extract _id
      setUser({ _id: userId }); // store only the _id
      console.log("User refreshed with _id:", userId);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const values = {
    user,
    setUser,
    logOut,
    loading,
    fetchUserId,
  };

  console.log("AuthContextProvider values:", values);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
//export { AuthContext, AuthContextProvider };

console.log("AuthContext", AuthContext);
