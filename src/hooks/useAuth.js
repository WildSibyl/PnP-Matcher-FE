import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth context not available, itmust be used within an AuthProvider"
    );
  }
  //console.log("useAuth context:", context);
  return context;
};
