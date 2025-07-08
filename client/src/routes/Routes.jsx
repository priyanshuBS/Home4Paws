import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="/landing-page" replace />,
      },
      {
        path: "landing-page",
        element: <LandingPage />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);

export default router;
