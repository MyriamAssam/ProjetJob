import { useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("");
  }

  return context;
};