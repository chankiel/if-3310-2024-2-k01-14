import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
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
    checkAuth();
  }, [isAuthenticated,navigate]);

  return children;
};

export default ProtectedRoute;
