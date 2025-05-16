import Footer from "../components/layout-comp/Footer";
import Navbar from "../components/layout-comp/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
