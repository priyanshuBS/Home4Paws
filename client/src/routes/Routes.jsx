import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Pets from "../pages/Pets";
import AddPet from "../pages/AddPet";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "../components/ProtectedRoute";
import OwnerDashboard from "../pages/OwnerDashboard";
import PetInfoShimmer from "../ui/shimmer/PetInfoShimmer";
import ChatPage from "../pages/ChatPage";
import { lazy, Suspense } from "react";
import CategoryPage from "../pages/CategoryPage";

const PetInfo = lazy(() => import("../pages/PetInfo"));

const appRouter = createBrowserRouter([
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
        element: <HomePage />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "pets",
        element: <Pets />,
      },
      {
        path: "add-pet",
        element: <AddPet />,
      },
      {
        path: "pets/:petId",
        element: (
          <ProtectedRoute allowedRoles={["customer"]}>
            <Suspense fallback={<PetInfoShimmer />}>
              <PetInfo />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "unauthorized",
        element: <Unauthorized />,
      },
      {
        path: "owner-dashboard",
        element: (
          <ProtectedRoute allowedRoles={["owner", "admin"]}>
            <OwnerDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "chat/:chatRoomId",
        element: (
          <ProtectedRoute allowedRoles={["customer", "owner", "admin"]}>
            <ChatPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "category/:categoryName",
        element: <CategoryPage />,
      },
    ],
  },
]);

export default appRouter;
