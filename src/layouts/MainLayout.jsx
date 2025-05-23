import Footer from "../components/layout-comp/Footer";
import Navbar from "../components/layout-comp/Navbar";
import { Outlet } from "react-router";
import { TagsContextProvider } from "../context/TagsContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuIcons from "../components/navbar-comp/MenuIcons";

const MainLayout = () => {
  return (
    <>
      <MenuIcons />
      <ToastContainer position="top-center" autoClose={1500} theme="colored" />

      <TagsContextProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </TagsContextProvider>
    </>
  );
};

export default MainLayout;
