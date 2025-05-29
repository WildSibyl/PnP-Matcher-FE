import Footer from "../components/layout-comp/Footer";
import Navbar from "../components/layout-comp/Navbar";
import { Outlet } from "react-router";
import { TagsContextProvider } from "../context/TagsContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuIcons from "../components/navbar-comp/MenuIcons";

const MainLayout = () => {
  return (
    <div className="w-full max-w-screen min-h-screen flex flex-col">
      <MenuIcons />
      <ToastContainer position="top-center" autoClose={1500} theme="colored" />

      <TagsContextProvider>
        <Navbar />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </TagsContextProvider>
    </div>
  );
};

export default MainLayout;
