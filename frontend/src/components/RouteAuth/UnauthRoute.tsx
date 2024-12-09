import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

const UnauthRoute = ({children}: {children: React.ReactNode}) => {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated){
        if(window.history.length > 1){
            navigate(-1)
        }else{
            navigate("/")
        }
    }
  }, [isAuthenticated,navigate]);

  return children;
};

export default UnauthRoute;
