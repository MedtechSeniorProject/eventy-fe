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
  logout: () => {}
};

type contextType = {
  user: user;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<user>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
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

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoading, isAuthenticated, setIsAuthenticated, logout }}
    >
      {!isLoading ? children : (
        <div className="h-full w-full flex justify-center items-center">
          <p className="font-bold">Loading...</p>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;
