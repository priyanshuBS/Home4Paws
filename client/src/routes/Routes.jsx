import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Pets from "../pages/Pets";
import AddPet from "../pages/AddPet";
import PetInfo from "../pages/PetInfo";

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
        element: <PetInfo />,
      },
    ],
  },
]);

export default appRouter;
