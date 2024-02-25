import { createContext, useState } from "react";
import { user } from "@/types/types";

export const INITIAL_USER = {
  id: "",
  name: "",
  email: "",
  accessToken: "",
  isSuperAdmin: false
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

type contextType = {
  user: user;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<user>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<contextType>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<user>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoading, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
