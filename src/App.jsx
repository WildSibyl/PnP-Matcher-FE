import { useState } from "react";
import { Routes, Route } from "react-router";

//LAYOUTS & PAGES
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
