import { createContext, useState } from "react";
import { user } from "@/types/types";
import LoadingSpinner from "@/components/Loading";

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
  logout: () => {},
  getAccessToken: () => null
};

type contextType = {
  user: user;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<user>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
  getAccessToken: () => string | null
};

const AuthContext = createContext<contextType>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<user>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    setIsLoading(true)
    setUser(INITIAL_USER)
    setIsAuthenticated(false)
    setIsLoading(false)
  }

  const getAccessToken = () => user.accessToken

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoading, isAuthenticated, setIsAuthenticated, logout, getAccessToken }}
    >
      {!isLoading ? children : (
        <LoadingSpinner />
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;
