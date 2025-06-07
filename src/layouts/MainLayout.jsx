import Footer from "../components/layout-comp/Footer";
import Navbar from "../components/layout-comp/Navbar";
import { Outlet } from "react-router";
import { TagsContextProvider } from "../context/TagsContextProvider";
import { WSContextProvider } from "../context/WSContextProvider";
import { TeleportContextProvider } from "../context/TeleportContextProvider";
import { InviteModalContextProvider } from "../context/InviteModalContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuIcons from "../components/navbar-comp/MenuIcons";
import InviteToGroupModal from "../components/InviteToGroupModal";
import WelcomeModal from "../components/register-comp/WelcomeModal";
import { WelcomeModalContextProvider } from "../context/WelcomeModalContextProvider";

const MainLayout = () => {
  return (
    <div className="w-full max-w-screen min-h-screen flex flex-col">
      <MenuIcons />
      <ToastContainer position="top-center" autoClose={1500} theme="light" />

      <TagsContextProvider>
        <WSContextProvider>
          <TeleportContextProvider>
            <InviteModalContextProvider>
              <WelcomeModalContextProvider>
                <Navbar />
                <div className="flex-1 overflow-x-hidden">
                  <Outlet />
                </div>
                <Footer />
                <InviteToGroupModal />
                <WelcomeModal />
              </WelcomeModalContextProvider>
            </InviteModalContextProvider>
          </TeleportContextProvider>
        </WSContextProvider>
      </TagsContextProvider>
    </div>
  );
};

export default MainLayout;
