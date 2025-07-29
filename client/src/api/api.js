// src/api/api.js
import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

let hasTriedRefresh = false;

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    const isAboutMeRequest = originalRequest?.url?.includes("/users/about-me");

    if (
      err.response?.status === 401 &&
      isAboutMeRequest &&
      !originalRequest._retry &&
      !hasTriedRefresh
    ) {
      originalRequest._retry = true;
      hasTriedRefresh = true;

      try {
        await api.post("/users/refresh");
        return api(originalRequest); // retry about-me once
      } catch (refreshError) {
        toast.error("Session expired. Please log in again.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 100);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);
