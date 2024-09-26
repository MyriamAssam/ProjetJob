import { createContext } from "react";
export const AdminContext = createContext({
  isAdminLoggedIn: false,
  adminlogin: () => {},
  adminlogout: () => {},
});

