import Footer from "../components/layout-comp/Footer";
import Navbar from "../components/layout-comp/Navbar";
import { Outlet } from "react-router";
import { TagsContextProvider } from "../context/TagsContextProvider";
import { WSContextProvider } from "../context/WSContextProvider";
import { TeleportContextProvider } from "../context/TeleportContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuIcons from "../components/navbar-comp/MenuIcons";

const MainLayout = () => {
  return (
    <div className="w-full max-w-screen min-h-screen flex flex-col">
      <MenuIcons />
      <ToastContainer position="top-center" autoClose={1500} theme="light" />

      <TagsContextProvider>
        <WSContextProvider>
          <TeleportContextProvider>
            <Navbar />
            <div className="flex-1 overflow-x-hidden">
              <Outlet />
            </div>
            <Footer />
          </TeleportContextProvider>
        </WSContextProvider>
      </TagsContextProvider>
    </div>
  );
};

export default MainLayout;
