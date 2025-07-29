import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./routes/Routes.jsx";
import { AuthProvider } from "./auth/AuthProvider";
import { Toaster } from "react-hot-toast";
import { AuthInitializer } from "./components/AuthInitializer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-center" />
      <RouterProvider router={appRouter} />
    </AuthProvider>
  </StrictMode>
);
