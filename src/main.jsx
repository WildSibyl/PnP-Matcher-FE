import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { InviteModalContextProvider } from "./context/InviteModalContextProvider.jsx";
import { AuthContextProvider } from "./context/AuthContextProvider.jsx";
import "@fontsource-variable/inter";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>
);
