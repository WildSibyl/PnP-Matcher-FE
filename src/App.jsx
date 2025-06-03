import { useContext, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router";

//LAYOUTS & PAGES
import MainLayout from "./layouts/MainLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import AdminRoute from "./layouts/AdminRoute";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
const AccountSettings = lazy(() => import("./pages/AccountSettings"));
const Search = lazy(() => import("./pages/Search"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const CreateGroup = lazy(() => import("./pages/CreateGroup"));
const UpdateGroup = lazy(() => import("./pages/UpdateGroup"));
const Group = lazy(() => import("./pages/Group"));
const Grouplist = lazy(() => import("./pages/Grouplist"));
const ChatList = lazy(() => import("./pages/ChatList"));
const Imprint = lazy(() => import("./pages/Imprint"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Error = lazy(() => import("./pages/Error"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Player = lazy(() => import("./pages/Player"));
const GroupDetail = lazy(() => import("./components/GroupDetail"));
const PlayerDetail = lazy(() => import("./pages/PlayerDetail"));
const SearchedPlayer = lazy(() => import("./pages/SearchedPlayer"));

const Test = lazy(() => import("./pages/Test"));

const App = () => {
  //Remember on which page the user is/was
  const location = useLocation();
  const state = location.state;

  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
          <Loader />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<MainLayout />} errorElement={<Error />}>
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/grouplist" element={<Grouplist />} />
          <Route path="/imprint" element={<Imprint />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/test" element={<Test />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/create" element={<CreateGroup />} />
            <Route path="/edit/:id" element={<UpdateGroup />} />
            <Route path="/group/:id" element={<Group />} />
            <Route path="/settings" element={<AccountSettings />} />
            <Route path="/profile" element={<PlayerDetail />} />
            <Route path="/player/:id" element={<SearchedPlayer />} />
            <Route path="/chat" element={<ChatList />} />
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {/* Seperate Routes for the group modal so it can be placed over the current page */}
    </Suspense>
  );
};

export default App;
