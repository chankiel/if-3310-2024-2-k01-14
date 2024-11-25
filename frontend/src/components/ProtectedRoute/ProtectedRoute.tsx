import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UseAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
  const isAuthenticated = UseAuth();
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
      return;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return children;
};

export default ProtectedRoute;
