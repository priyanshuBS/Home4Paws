import { createContext, useContext, useState } from "react";
import { api } from "../api/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const fetchUser = async () => {
    setAuthLoading(true);
    try {
      const res = await api.get("/users/about-me");
      setUser(res?.data?.data);
      return true;
    } catch (error) {
      setUser(null);
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (loginData) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      await api.post("/users/login", loginData);
      await fetchUser();
      toast.success("Login successful!");
      return { success: true };
    } catch (err) {
      setAuthError(err?.message);
      toast.error("Login failed");
      return { success: false, error: err?.message };
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (signupData) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      await api.post("/users/signup", signupData);
      await fetchUser();
      toast.success("Signup successful!");
      return { success: true };
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Signup failed";
      toast.error(message);
      setAuthError(message);
      return { success: false, error: message };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
      setUser(null);
      toast.success("Logout successful!");
      return { success: true };
    } catch (error) {
      toast.error("Logout failed");
      return { success: false, error: error?.message };
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
