import { createContext, useContext, useEffect, useState } from "react";
import UserApi from "../api/user-api";
import { APIResponse, AuthRequest } from "../types";

type AuthContext = {
  isAuthenticated: boolean;
  currentId: number;
  username: string;
  name: string | null;
  profile_photo: string | null;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  login: (payload: AuthRequest) => Promise<APIResponse>;
  logout: () => Promise<APIResponse>;
};

const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  name: "",
  username: "",
  currentId: 0,
  update: false,
  setUpdate: () => {},
  login: UserApi.login,
  logout: UserApi.logout,
  profile_photo: "",
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [currentId, setCurrentId] = useState(0);
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState("");
  const [profile_photo, setProfile] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      try {
        const user = await UserApi.getSelf();
        if(user){
          setIsAuthenticated(true);
          setUsername(user.username);
          setCurrentId(Number(user.id));
          setName(user.name ?? "");
          setProfile(user.profile_photo ?? "")
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    
    fetchUser();
  }, [update]);

  
  const login = async (payload: AuthRequest): Promise<APIResponse> => {
    const res = await UserApi.login(payload);
    setUpdate((prev)=>!prev)
    return res;
  };
  
  const logout = async (): Promise<APIResponse> => {
    const res = await UserApi.logout();
    setIsAuthenticated(false)
    return res;
  };

  if (isLoading){
    console.log("SINI")
    return null
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        name,
        currentId,
        profile_photo,
        update,
        setUpdate,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};
