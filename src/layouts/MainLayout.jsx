import Footer from "../components/layout-comp/Footer";
import Navbar from "../components/layout-comp/Navbar";
import { Outlet } from "react-router";
import { AuthContextProvider } from "../context/AuthContextProvider";
import { TagsContextProvider } from "../context/TagsContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuIcons from "../components/navbar-comp/MenuIcons";

const MainLayout = () => {
  return (
    <>
      <MenuIcons />
      <ToastContainer position="bottom-left" autoClose={1500} theme="colored" />
      <AuthContextProvider>
        <TagsContextProvider>
          <Navbar />
          <Outlet />
          <Footer />
        </TagsContextProvider>
      </AuthContextProvider>
    </>
  );
};

export default MainLayout;
