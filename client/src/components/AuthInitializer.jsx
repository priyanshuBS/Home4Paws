import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export const AuthInitializer = ({ children }) => {
  const { fetchUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const init = async () => {
      const publicRoutes = ["/login", "/signup"];
      if (!publicRoutes.includes(location.pathname)) {
        await fetchUser();
      }
    };
    init();
  }, [location.pathname]);

  return children;
};
