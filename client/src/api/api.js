import axios from "axios";
import toast from "react-hot-toast";

// Create Axios instance
export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

// Flags and queues
let isRefreshing = false;
let failedQueue = [];
let sessionExpiredToastId = null;
let isRedirecting = false;

const processQueue = (error) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // If access token is invalid and the request is not a refresh attempt
    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/users/refresh")
    ) {
      originalRequest._retry = true;

      // If refresh is already happening, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(api(originalRequest)),
            reject: (error) => reject(error),
          });
        });
      }

      isRefreshing = true;

      try {
        // Try refreshing the token
        await api.post("/users/refresh");

        // Retry queued and current requests
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed — reject all queued requests
        processQueue(refreshError);

        // Show session expired toast only once
        if (!sessionExpiredToastId) {
          sessionExpiredToastId = toast.error(
            "Session expired. Please log in again.",
            {
              id: "session-expired",
            }
          );
        }

        // Redirect to login only once
        if (!isRedirecting) {
          isRedirecting = true;
          setTimeout(() => {
            window.location.href = "/login";
          }, 500); // short delay prevents UI freeze
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;

        // Reset flags after a short delay
        setTimeout(() => {
          sessionExpiredToastId = null;
          isRedirecting = false;
        }, 3000);
      }
    }

    // Any other errors
    return Promise.reject(err);
  }
);
