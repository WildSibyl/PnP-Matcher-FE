import { useState } from "react";
import { Routes, Route } from "react-router";

//LAYOUTS & PAGES
import MainLayout from "./layouts/MainLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateGroup from "./pages/CreateGroup";
import UpdateGroup from "./pages/UpdateGroup";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Group from "./pages/Group";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="group/:id" element={<Group />} />
        <Route element={<ProtectedLayout />}>
          <Route path="create" element={<CreateGroup />} />
          <Route path="edit/:id" element={<UpdateGroup />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
