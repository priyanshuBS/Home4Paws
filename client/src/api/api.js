import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    const isAboutMe = originalRequest?.url?.includes("/users/about-me");

    if (err.response?.status === 401 && isAboutMe && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/users/refresh");

        return api(originalRequest);
      } catch (refreshError) {
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);
