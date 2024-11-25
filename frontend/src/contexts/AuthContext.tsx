import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserApi from "../api/user-api";
import { AuthRequest } from "../types";

type AuthContext = {
  isAuthenticated: boolean;
  token: string | null;
  username: string;
  userId: number;
  login: (payload: AuthRequest) => void;
  logout: () => void;
  update: boolean;
  setUpdate: (prop: boolean) => void;
};

const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  token: null,
  login: () => {},
  logout: () => {},
  username: "",
  userId: 0,
  update: false,
  setUpdate: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("user");
  const [userId, setUserId] = useState(0);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token");

      if (token) {
        try {
          const user = await UserApi.getSelf();

          if (user) {
            setIsAuthenticated(true);

            setUsername(user.username);
            setUserId(user.id);

            setToken(token);
          }
        } catch (error) {
          console.log(error)
          Cookies.remove("token");
        }
      }

      setIsLoading(false);
    };

    fetchUser();
  }, [update]);

  const login = async (payload: AuthRequest) => {
      const auth = await UserApi.login(payload);

      if (auth) {
        setIsAuthenticated(true);

        Cookies.set("token", auth.token);
        setToken(auth.token);
      }
    }

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove("token");
    setToken(null);
  };

  if (isLoading) return null;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, logout, username, userId, update, setUpdate }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};
