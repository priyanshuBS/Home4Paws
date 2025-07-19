import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./routes/Routes.jsx";
import { AuthProvider } from "./auth/AuthProvider";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Toaster position="top-middle" />
    <StrictMode>
      <RouterProvider router={appRouter} />
    </StrictMode>
  </AuthProvider>
);
