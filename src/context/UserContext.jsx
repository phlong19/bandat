import { createContext, useContext } from "react";
import { useUser } from "../features/auth/useUser";

const UserContext = createContext();

function UserAuthentication({ children }) {
  const { user, isAuthenticated, isLoading, level } = useUser();

  return (
    <UserContext.Provider value={{ user, isAuthenticated, isLoading, level }}>
      {children}
    </UserContext.Provider>
  );
}

function useAuth() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("Context has been using outside provider");
  return context;
}

export { UserAuthentication, useAuth };
