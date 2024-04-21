import { createContext, useContext } from "react";
import { useUser } from "../features/auth/useUser";

const UserContext = createContext();

function UserAuthentication({ children }) {
  const { data, isAuthenticated, isLoading, level, email, user } = useUser();

  // data = profile
  // user = auth user
  return (
    <UserContext.Provider
      value={{ email, data, isAuthenticated, user, isLoading, level }}
    >
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
