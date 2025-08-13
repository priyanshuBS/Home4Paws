import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./routes/Routes.jsx";
import { AuthProvider } from "./auth/AuthProvider";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./context/SocketProvider.jsx";

function AppWrapper() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Toaster position="top-center" />
        <RouterProvider router={appRouter} />
      </SocketProvider>
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
