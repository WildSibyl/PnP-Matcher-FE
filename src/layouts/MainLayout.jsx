import Footer from "../components/layout-comp/Footer";
import Navbar from "../components/layout-comp/Navbar";
import { Outlet } from "react-router";
import { AuthContextProvider } from "../context/AuthContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  return (
    <>
      <ToastContainer position="bottom-left" autoClose={1500} theme="colored" />
      <AuthContextProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </AuthContextProvider>
    </>
  );
};

export default MainLayout;
