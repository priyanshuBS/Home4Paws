import { createContext, useContext, useState } from "react";
import { api } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false); // ✅ tracks first fetch

  const fetchUser = async () => {
    setAuthLoading(true);
    try {
      const res = await api.get("/users/about-me");
      setUser(res?.data?.data);
    } catch (err) {
      setUser(null);
    } finally {
      setAuthLoading(false);
      setIsInitialized(true);
    }
  };

  const login = async (payload) => {
    setAuthLoading(true);
    try {
      const res = await api.post("/users/login", payload);
      await fetchUser();
      return res?.data;
    } catch (err) {
      setAuthError(err?.response?.data?.message || "Login failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    try {
      await api.post("/users/logout");
      setUser(null);
    } catch (err) {
      setAuthError(err?.response?.data?.message || "Logout failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (payload) => {
    setAuthLoading(true);
    try {
      const res = await api.post("/users/signup", payload);
      await fetchUser();
      return res?.data;
    } catch (err) {
      setAuthError(err?.response?.data?.message || "Signup failed");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        authError,
        login,
        logout,
        signup,
        fetchUser,
        setUser,
        isInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
