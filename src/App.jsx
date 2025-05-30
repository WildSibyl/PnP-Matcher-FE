import { useContext, lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

//LAYOUTS & PAGES
import MainLayout from "./layouts/MainLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import AdminRoute from "./layouts/AdminRoute";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
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

const Test = lazy(() => import("./pages/Test"));

const App = () => {
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/group/:id" element={<Group />} />
          <Route path="/grouplist" element={<Grouplist />} />
          <Route path="/chat" element={<ChatList />} />
          <Route path="/imprint" element={<Imprint />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/test" element={<Test />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/create" element={<CreateGroup />} />
            <Route path="/edit/:id" element={<UpdateGroup />} />
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
