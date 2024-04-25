import { createContext, useEffect, useState } from "react";
import { user } from "@/types/types";
import Loading from "@/components/Loading";
import { axiosPrivate } from "@/lib/axios/axiosInstance";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";


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

  useEffect(() => {
    axiosPrivate.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response.status === 401) {
          toast({
            variant:"destructive",
            title: "Session Expired",
            description: "Click to extend the session !",
            action: (
              <ToastAction onClick={() => {
                axiosPrivate.post("/auth/extend", {
                  sessionkey: getAccessToken()
                }).then((response) => {
                  if (response.status === 200) {
                    toast({
                      title: "Session Extended",
                      description: "You can continue using the app"
                    });
                  }
                }).catch((error) => {
                  console.log(error);
                });
              }} altText="Extend Session">Extend</ToastAction>
            )
          });
        }
        return Promise.reject(error);
      }
    );
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoading, isAuthenticated, setIsAuthenticated, logout, getAccessToken }}
    >
      {!isLoading ? children : (
        <Loading />
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;
