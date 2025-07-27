import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export const AuthInitializer = ({ children }) => {
  const { fetchUser, authLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const publicRoutes = ["/login", "/signup", "/landing-page"];
    if (!publicRoutes.includes(location.pathname)) {
      fetchUser();
    }
    // else no need to fetch user
  }, [location.pathname]);

  return children;
};
