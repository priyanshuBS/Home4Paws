import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { AuthInitializer } from "../components/AuthInitializer";

const RootLayout = () => {
  return (
    <>
      <Header />
      <AuthInitializer>
        <Outlet />
      </AuthInitializer>
      <Footer />
    </>
  );
};

export default RootLayout;
