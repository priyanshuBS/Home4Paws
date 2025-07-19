import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await api.get("/users/about-me");
      setUser(res.data);
    } catch (error) {
      setUser(null);
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
      toast.success("Signup successfully!");
      return { success: true };
    } catch (err) {
      const message = err?.response?.err?.message || "Signup Failed";
      setAuthError(message);
      toast.error(message);
      return { success: false, error: message };
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
      toast.success("Login successfully!");
      return { success: true };
    } catch (err) {
      const message = err?.message || "Login failed";
      setAuthError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("users/logout");
      setUser(null);
      toast.success("Logout successfully!");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, authLoading, authError, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
